import {
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function GoogleMap({
  latitude,
  longitude,
  name,
  heritages = [],
  selectedHeritage,
  onSelectHeritage,

  userLocation,
  nearMeActive = false,

  routeMode = "DRIVING",
  routeRequested = false,

  onRouteInfo,
  onRouteSelect,
}) {
  const map = useMap();

  const routePolylinesRef = useRef([]);
  const routeRequestIdRef = useRef(0);

  const [selectedPlace, setSelectedPlace] =
    useState(null);

  // =====================================================
  // MAP STYLE
  // =====================================================

  const heritageMapStyle = [
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#F8F4ED" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#E6D8C5" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#D7B88A" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#D8ECEC" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#DCE8D1" }],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6C5844" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7A6551" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#4C7A8A" }],
    },
  ];

  // =====================================================
  // CENTER
  // =====================================================

  const hasSelectedLocation =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  const center = hasSelectedLocation
    ? {
        lat: latitude,
        lng: longitude,
      }
    : {
        lat: 22.5937,
        lng: 78.9629,
      };

  // =====================================================
  // HELPERS
  // =====================================================

  const clearRoutePolylines = () => {
    routePolylinesRef.current.forEach(
      (polyline) => {
        polyline.setMap(null);
      }
    );

    routePolylinesRef.current = [];
  };

  const normalizePath = (path = []) => {
    return path
      .map((point) => {
        if (!point) return null;

        // google.maps.LatLng
        if (
          typeof point.lat === "function" &&
          typeof point.lng === "function"
        ) {
          return {
            lat: point.lat(),
            lng: point.lng(),
          };
        }

        // LatLngLiteral / compatible object
        if (
          Number.isFinite(point.lat) &&
          Number.isFinite(point.lng)
        ) {
          return {
            lat: Number(point.lat),
            lng: Number(point.lng),
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const formatRoute = (
    route,
    index,
    defaultIndex
  ) => {
    const distanceMeters =
      Number(route.distanceMeters) || 0;

    const durationMillis =
      Number(route.durationMillis) || 0;

    const distanceText =
      route.localizedValues?.distance ||
      (distanceMeters >= 1000
        ? `${(distanceMeters / 1000).toFixed(1)} km`
        : `${Math.round(distanceMeters)} m`);

    const durationText =
      route.localizedValues?.duration ||
      `${Math.max(
        1,
        Math.round(durationMillis / 60000)
      )} min`;

    const isDefault =
      index === defaultIndex ||
      route.routeLabels?.includes(
        "DEFAULT_ROUTE"
      );

    return {
      index,

      summary:
        route.description ||
        (isDefault
          ? "Recommended route"
          : `Alternative route ${index}`),

      distance: distanceText,
      duration: durationText,

      distanceText,
      durationText,

      distanceValue: distanceMeters,
      durationValue: durationMillis,

      warnings: route.warnings || [],

      isDefault,

      path: normalizePath(route.path || []),
    };
  };

  // =====================================================
  // SELECTED HERITAGE
  // =====================================================

  useEffect(() => {
    if (!map || !selectedHeritage) return;

    // When "Near Me" is active, don't immediately
    // move the map away from the user.
    if (nearMeActive && userLocation) {
      return;
    }

    const lat = Number(
      selectedHeritage.location?.latitude
    );

    const lng = Number(
      selectedHeritage.location?.longitude
    );

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      return;
    }

    map.panTo({
      lat,
      lng,
    });

    map.setZoom(15);
  }, [
    map,
    selectedHeritage,
    nearMeActive,
    userLocation,
  ]);

  // =====================================================
  // NEAR ME VIEW
  // =====================================================

  useEffect(() => {
    if (
      !map ||
      !nearMeActive ||
      !userLocation ||
      !window.google?.maps
    ) {
      return;
    }

    const bounds =
      new window.google.maps.LatLngBounds();

    bounds.extend({
      lat: userLocation.lat,
      lng: userLocation.lng,
    });

    const nearbyPoints = heritages
      .slice(0, 8)
      .map((heritage) => {
        const lat = Number(
          heritage.location?.latitude
        );

        const lng = Number(
          heritage.location?.longitude
        );

        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng)
        ) {
          return null;
        }

        return {
          lat,
          lng,
        };
      })
      .filter(Boolean);

    nearbyPoints.forEach((point) => {
      bounds.extend(point);
    });

    if (nearbyPoints.length === 0) {
      map.panTo({
        lat: userLocation.lat,
        lng: userLocation.lng,
      });

      map.setZoom(12);

      return;
    }

    map.fitBounds(bounds, 80);
  }, [
    map,
    nearMeActive,
    userLocation,
    heritages,
  ]);

  // =====================================================
  // CURRENT ROUTE
  // =====================================================

  useEffect(() => {
    if (!map) return;

    let cancelled = false;

    const calculateRoute = async () => {
      // If routing isn't requested, clear any
      // previously displayed route.
      if (
        !routeRequested ||
        !selectedHeritage ||
        !userLocation
      ) {
        clearRoutePolylines();

        onRouteInfo?.(null);

        return;
      }

      const destinationLat = Number(
        selectedHeritage.location?.latitude
      );

      const destinationLng = Number(
        selectedHeritage.location?.longitude
      );

      if (
        !Number.isFinite(destinationLat) ||
        !Number.isFinite(destinationLng)
      ) {
        clearRoutePolylines();

        onRouteInfo?.({
          distanceText: "—",
          durationText: "—",
          distance: "—",
          duration: "—",
          routeCount: 0,
          selectedRoute: null,
          routes: [],
          warnings: [
            "This heritage site does not have a valid location.",
          ],
          mode: routeMode,
        });

        toast.error(
          "This heritage site does not have a valid location."
        );

        return;
      }

      const requestId =
        ++routeRequestIdRef.current;

      try {
        // =============================================
        // LOAD CURRENT GOOGLE ROUTES LIBRARY
        // =============================================

        if (!window.google?.maps?.importLibrary) {
          throw new Error(
            "Google Maps Routes library is not available."
          );
        }

        const { Route } =
          await window.google.maps.importLibrary(
            "routes"
          );

        if (cancelled) return;

        // =============================================
        // COMPUTE ACTUAL ROAD ROUTE
        // =============================================

        const request = {
          origin: {
            lat: Number(userLocation.lat),
            lng: Number(userLocation.lng),
          },

          destination: {
            lat: destinationLat,
            lng: destinationLng,
          },

          travelMode: routeMode,

          // Actual alternative routes
          computeAlternativeRoutes: true,

          // Metric values + localized display strings
          units:
            window.google.maps.UnitSystem.METRIC,

          language: "en",

          // We only request fields we actually use.
          fields: [
            "path",
            "distanceMeters",
            "durationMillis",
            "localizedValues",
            "viewport",
            "warnings",
            "description",
            "routeLabels",
          ],
        };

        const result =
          await Route.computeRoutes(request);

        if (cancelled) return;

        if (
          requestId !==
          routeRequestIdRef.current
        ) {
          return;
        }

        const routes = result?.routes || [];

        // =============================================
        // NO ROUTE
        // =============================================

        if (routes.length === 0) {
          clearRoutePolylines();

          onRouteInfo?.({
            distanceText: "—",
            durationText: "—",
            distance: "—",
            duration: "—",

            routeCount: 0,
            selectedRoute: null,

            routes: [],

            warnings: [
              "Google could not find a route for this travel mode.",
            ],

            mode: routeMode,
          });

          toast.error(
            "No road route available for this travel mode."
          );

          return;
        }

        // =============================================
        // FIND DEFAULT ROUTE
        // =============================================

        const defaultIndex = Math.max(
          0,
          routes.findIndex((route) =>
            route.routeLabels?.includes(
              "DEFAULT_ROUTE"
            )
          )
        );

        const routeData = routes.map(
          (route, index) =>
            formatRoute(
              route,
              index,
              defaultIndex
            )
        );

        // =============================================
        // DRAW ALL ROUTES
        // =============================================

        clearRoutePolylines();

        routes.forEach((route, index) => {
          const path = normalizePath(
            route.path || []
          );

          if (path.length < 2) return;

          const isSelected =
            index === defaultIndex;

          const polyline =
            new window.google.maps.Polyline({
              map,

              path,

              strokeColor: isSelected
                ? "#8B4A17"
                : "#B8A99A",

              strokeOpacity: isSelected
                ? 0.95
                : 0.65,

              strokeWeight: isSelected
                ? 6
                : 4,

              zIndex: isSelected ? 20 : 10,

              clickable: true,
            });

          polyline.addListener(
            "click",
            () => {
              selectRouteInternal(index);
            }
          );

          routePolylinesRef.current.push(
            polyline
          );
        });

        // =============================================
        // FIT MAP TO SELECTED ROUTE
        // =============================================

        const selectedRoute =
          routes[defaultIndex];

        if (selectedRoute?.viewport) {
          map.fitBounds(
            selectedRoute.viewport,
            80
          );
        } else {
          const bounds =
            new window.google.maps.LatLngBounds();

          bounds.extend({
            lat: userLocation.lat,
            lng: userLocation.lng,
          });

          bounds.extend({
            lat: destinationLat,
            lng: destinationLng,
          });

          map.fitBounds(bounds, 80);
        }

        // =============================================
        // ROUTE INFORMATION
        // =============================================

        const selectedInfo =
          routeData[defaultIndex] ||
          routeData[0];

        const warnings = [
          ...(selectedInfo?.warnings || []),
        ];

        // Google requires an appropriate warning
        // for beta walking/cycling/two-wheel routes.
        if (
          [
            "WALKING",
            "BICYCLING",
            "TWO_WHEELER",
          ].includes(routeMode)
        ) {
          warnings.push(
            "Walking, cycling and two-wheeler routes are beta and may not include every path or road condition."
          );
        }

        onRouteInfo?.({
          ...selectedInfo,

          routes: routeData,

          selectedRoute: defaultIndex,

          routeCount: routeData.length,

          mode: routeMode,

          warnings: [
            ...new Set(warnings),
          ],
        });
      } catch (error) {
  console.error("========== ROUTES API ERROR ==========");
  console.error("Error:", error);
  console.error("Name:", error?.name);
  console.error("Message:", error?.message);
  console.error("Code:", error?.code);
  console.error("Status:", error?.status);
  console.error("Details:", error?.details);
  console.error("======================================");

  if (cancelled) return;

  clearRoutePolylines();

  const errorMessage =
    error?.message ||
    "Unable to calculate the road route.";

  onRouteInfo?.({
    distanceText: "—",
    durationText: "—",
    distance: "—",
    duration: "—",
    routeCount: 0,
    selectedRoute: null,
    routes: [],
    warnings: [errorMessage],
    mode: routeMode,
  });

  toast.error(errorMessage);
}
    };

    calculateRoute();

    return () => {
      cancelled = true;
      clearRoutePolylines();
    };
  }, [
    map,
    routeRequested,
    selectedHeritage,
    userLocation,
    routeMode,
    onRouteInfo,
  ]);

  // =====================================================
  // ROUTE SELECTION
  // =====================================================

  const selectRouteInternal = async (
    routeIndex
  ) => {
    if (
      !routePolylinesRef.current.length
    ) {
      return;
    }

    routePolylinesRef.current.forEach(
      (polyline, index) => {
        const active =
          index === routeIndex;

        polyline.setOptions({
          strokeColor: active
            ? "#8B4A17"
            : "#B8A99A",

          strokeOpacity: active
            ? 0.95
            : 0.65,

          strokeWeight: active
            ? 6
            : 4,

          zIndex: active ? 20 : 10,
        });
      }
    );

    onRouteSelect?.(routeIndex);

    // We don't need to recalculate the route.
    // MapPage receives the selection event and
    // PlacePreviewCard can show the selected route.
  };

  // =====================================================
  // MARKERS
  // =====================================================

  return (
    <Map
      defaultCenter={center}
      defaultZoom={
        hasSelectedLocation ? 16 : 5
      }
      disableDefaultUI
      gestureHandling="greedy"
      styles={heritageMapStyle}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* ===============================================
          SELECTED LOCATION
      =============================================== */}

      {hasSelectedLocation && (
        <Marker
          position={{
            lat: latitude,
            lng: longitude,
          }}
          title={
            name || "Heritage Site"
          }
          onClick={() =>
            setSelectedPlace({
              id: "selected",
              name:
                name || "Heritage Site",
              lat: latitude,
              lng: longitude,
            })
          }
        />
      )}

      {/* ===============================================
          ALL HERITAGE MARKERS
      =============================================== */}

      {heritages.map((heritage) => {
        const lat = Number(
          heritage.location?.latitude
        );

        const lng = Number(
          heritage.location?.longitude
        );

        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng)
        ) {
          return null;
        }

        // Avoid duplicate marker if this location
        // is already represented by URL params.
        if (
          hasSelectedLocation &&
          Math.abs(lat - latitude) <
            0.0001 &&
          Math.abs(lng - longitude) <
            0.0001
        ) {
          return null;
        }

        const isSelected =
          selectedHeritage?._id ===
          heritage._id;

        return (
          <Marker
            key={heritage._id}
            position={{
              lat,
              lng,
            }}
            title={heritage.name}
            onClick={() => {
              setSelectedPlace(
                heritage
              );

              onSelectHeritage?.(
                heritage
              );
            }}
            zIndex={
              isSelected ? 100 : 1
            }
          />
        );
      })}

      {/* ===============================================
          USER LOCATION
      =============================================== */}

      {userLocation && (
        <Marker
          position={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
          title="Your location"
          icon={{
            path:
              window.google?.maps
                ?.SymbolPath?.CIRCLE,

            scale: 8,

            fillColor: "#2563EB",
            fillOpacity: 1,

            strokeColor: "#FFFFFF",
            strokeWeight: 3,
          }}
          zIndex={1000}
        />
      )}
    </Map>
  );
}