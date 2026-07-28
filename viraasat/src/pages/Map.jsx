import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import HeritageNav from "../components/Heritage/HeritageNav";

import GoogleMap from "../components/Map/GoogleMap";
import MapControls from "../components/Map/MapControls";
import PlacePreviewCard from "../components/Map/PlacePreviewCard";
import Sidebar from "../components/Map/Sidebar";

import FilterModal from "../components/Modals/FilterModal";

import { getHeritages } from "../services/exploreHeritage.service";

const DEFAULT_FILTERS = {
  search: "",
  category: "",
  state: "",
  city: "",
  era: "",
  rating: "",
  unesco: "",
  sort: "newest",
};

export default function MapPage() {
  const [searchParams] =
    useSearchParams();

  // =====================================================
  // URL PARAMS
  // =====================================================

  const latParam =
    searchParams.get("lat");

  const lngParam =
    searchParams.get("lng");

  const latitude = latParam
    ? Number(latParam)
    : undefined;

  const longitude = lngParam
    ? Number(lngParam)
    : undefined;

  const name =
    searchParams.get("name");

  // =====================================================
  // STATES
  // =====================================================

  const [heritageData, setHeritageData] =
    useState([]);

  const [
    selectedHeritage,
    setSelectedHeritage,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [userLocation, setUserLocation] =
    useState(null);

  const [nearMeActive, setNearMeActive] =
    useState(false);

  // =====================================================
  // ROUTING
  // =====================================================

  const [routeMode, setRouteMode] =
    useState("DRIVING");

  const [routeRequested, setRouteRequested] =
    useState(false);

  const [routeInfo, setRouteInfo] =
    useState(null);

  const [selectedRoute, setSelectedRoute] =
    useState(0);

  const [filters, setFilters] =
    useState(DEFAULT_FILTERS);

  // =====================================================
  // FETCH HERITAGES
  // =====================================================

  const fetchHeritages = async (
    customFilters = DEFAULT_FILTERS,
    showToast = false
  ) => {
    let toastId;

    try {
      setLoading(true);
      setError(null);

      if (showToast) {
        toastId = toast.loading(
          "Updating map..."
        );
      }

      const response =
        await getHeritages({
          ...customFilters,
          page: 1,
          limit: 1000,
        });

      const data =
        response?.data?.data || [];

      setHeritageData(data);

      // Keep selected heritage only if it
      // still exists after filtering.
      setSelectedHeritage(
        (current) => {
          if (!current) return null;

          const stillExists =
            data.some(
              (item) =>
                item._id ===
                current._id
            );

          return stillExists
            ? current
            : null;
        }
      );

      if (showToast) {
        if (data.length === 0) {
          toast.error(
            "No heritage places found",
            {
              id: toastId,
            }
          );
        } else {
          toast.success(
            "Map updated",
            {
              id: toastId,
            }
          );
        }
      }

      // Select from URL
      if (name && !showToast) {
        const matched =
          data.find(
            (item) =>
              item.name
                ?.toLowerCase() ===
              name.toLowerCase()
          );

        if (matched) {
          setSelectedHeritage(
            matched
          );
        }
      }

      return data;
    } catch (err) {
      console.error(
        "Failed to fetch map heritages:",
        err
      );

      const message =
        err.response?.data?.message ||
        "Failed to load heritage places";

      setError(message);

      if (showToast) {
        toast.error(
          "Failed to update map",
          {
            id: toastId,
          }
        );
      } else {
        toast.error(
          "Failed to load heritage places"
        );
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchHeritages(filters);
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async (
    value
  ) => {
    const newFilters = {
      ...filters,
      search: value,
    };

    setFilters(newFilters);

    await fetchHeritages(
      newFilters,
      true
    );
  };

  // =====================================================
  // CATEGORY
  // =====================================================

  const handleCategoryChange =
    async (category) => {
      const newFilters = {
        ...filters,
        category:
          category === "All"
            ? ""
            : category,
      };

      setFilters(newFilters);

      await fetchHeritages(
        newFilters,
        true
      );
    };

  // =====================================================
  // FILTER MODAL
  // =====================================================

  const handleApplyFilters =
    async (newFilters) => {
      setFilters(newFilters);
      setFilterOpen(false);

      await fetchHeritages(
        newFilters,
        true
      );
    };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters =
    async () => {
      const defaultFilters = {
        ...DEFAULT_FILTERS,
      };

      setFilters(defaultFilters);

      setSelectedHeritage(null);

      setNearMeActive(false);

      setRouteRequested(false);

      setRouteInfo(null);

      setSelectedRoute(0);

      await fetchHeritages(
        defaultFilters,
        true
      );
    };

  // =====================================================
  // SELECT HERITAGE
  // =====================================================

  const handleSelectHeritage =
    (heritage) => {
      setSelectedHeritage(
        heritage
      );

      // Existing route belongs to the
      // previous destination.
      setRouteRequested(false);

      setRouteInfo(null);

      setSelectedRoute(0);

      setNearMeActive(false);
    };

  // =====================================================
  // DETECT USER LOCATION
  // =====================================================

  const detectUserLocation = (
    callback
  ) => {
    if (!navigator.geolocation) {
      toast.error(
        "Geolocation is not supported by your browser."
      );

      callback?.(null);

      return;
    }

    const toastId =
      toast.loading(
        "Finding your location..."
      );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat:
            position.coords.latitude,

          lng:
            position.coords.longitude,
        };

        setUserLocation(
          location
        );

        toast.success(
          "Location found successfully!",
          {
            id: toastId,
          }
        );

        callback?.(location);
      },

      (error) => {
        let message =
          "Unable to get your location.";

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          message =
            "Location permission denied.";
        }

        if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          message =
            "Location information unavailable.";
        }

        if (
          error.code ===
          error.TIMEOUT
        ) {
          message =
            "Location request timed out.";
        }

        toast.error(message, {
          id: toastId,
        });

        callback?.(null);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // START ROUTE
  // =====================================================

  const handleRouteHere = () => {
    if (!selectedHeritage) {
      toast.error(
        "Select a heritage site first."
      );

      return;
    }

    const destinationLat =
      Number(
        selectedHeritage.location
          ?.latitude
      );

    const destinationLng =
      Number(
        selectedHeritage.location
          ?.longitude
      );

    if (
      !Number.isFinite(
        destinationLat
      ) ||
      !Number.isFinite(
        destinationLng
      )
    ) {
      toast.error(
        "This heritage site does not have a valid location."
      );

      return;
    }

    const startRouting = (
      location
    ) => {
      if (!location) return;

      setSelectedRoute(0);

      setRouteInfo(null);

      setRouteRequested(true);
    };

    if (!userLocation) {
      detectUserLocation(
        startRouting
      );

      return;
    }

    startRouting(userLocation);
  };

  // =====================================================
  // HAVERSINE
  // =====================================================
  //
  // IMPORTANT:
  // This is ONLY used for "Near Me" sorting.
  // It is NOT used as the displayed route distance.
  //
  // Actual travel distance comes from Google Routes API.
  // =====================================================

  const calculateDistance = (
    lat1,
    lng1,
    lat2,
    lng2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) *
        Math.PI) /
      180;

    const dLng =
      ((lng2 - lng1) *
        Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) **
        2 +
      Math.cos(
        (lat1 * Math.PI) /
          180
      ) *
        Math.cos(
          (lat2 * Math.PI) /
            180
        ) *
        Math.sin(dLng / 2) **
          2;

    return (
      R *
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      )
    );
  };

  // =====================================================
  // NEAREST HERITAGES
  // =====================================================

  const getNearestHeritages =
    () => {
      const sortHeritagesByDistance =
        (location) => {
          const sorted =
            [...heritageData]
              .map((heritage) => {
                const lat =
                  Number(
                    heritage
                      .location
                      ?.latitude
                  );

                const lng =
                  Number(
                    heritage
                      .location
                      ?.longitude
                  );

                if (
                  !Number.isFinite(
                    lat
                  ) ||
                  !Number.isFinite(
                    lng
                  )
                ) {
                  return null;
                }

                return {
                  ...heritage,

                  // Only for approximate
                  // geographic proximity.
                  distanceFromUser:
                    calculateDistance(
                      location.lat,
                      location.lng,
                      lat,
                      lng
                    ),
                };
              })
              .filter(Boolean)
              .sort(
                (a, b) =>
                  a.distanceFromUser -
                  b.distanceFromUser
              );

          setHeritageData(
            sorted
          );

          setNearMeActive(
            true
          );

          if (sorted[0]) {
            setSelectedHeritage(
              sorted[0]
            );
          }

          toast.success(
            "Nearby heritage places shown"
          );
        };

      if (!userLocation) {
        detectUserLocation(
          (location) => {
            if (location) {
              sortHeritagesByDistance(
                location
              );
            }
          }
        );

        return;
      }

      sortHeritagesByDistance(
        userLocation
      );
    };

  // =====================================================
  // ROUTE SELECTION
  // =====================================================

  const handleRouteSelect =
    (routeIndex) => {
      setSelectedRoute(
        routeIndex
      );

      setRouteInfo(
        (current) => {
          if (
            !current?.routes?.[
              routeIndex
            ]
          ) {
            return current;
          }

          const selected =
            current.routes[
              routeIndex
            ];

          return {
            ...current,

            ...selected,

            selectedRoute:
              routeIndex,

            mode: routeMode,

            routes:
              current.routes,
          };
        }
      );
    };

  // =====================================================
  // ERROR
  // =====================================================

  if (
    error &&
    !loading &&
    heritageData.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#F8F5F0]">
        <div
          className="
            sticky
            top-0
            z-999
            w-full
            border
            border-white/40
            bg-white/30
            shadow-md
            backdrop-blur-2xl
          "
        >
          <HeritageNav />
        </div>

        <div
          className="
            flex
            h-[calc(100vh-82px)]
            items-center
            justify-center
          "
        >
          <div className="text-center">
            <p className="text-[#6A594C]">
              {error}
            </p>

            <button
              onClick={() =>
                fetchHeritages(
                  filters
                )
              }
              className="
                mt-4
                rounded-xl
                bg-[#8C4A15]
                px-5
                py-2.5
                text-white
                transition
                hover:bg-[#744016]
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F5F0]">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <div
        className="
          sticky
          left-0
          top-0
          z-999
          w-full
          border
          border-white/40
          bg-white/30
          shadow-md
          backdrop-blur-2xl
        "
      >
        <HeritageNav />
      </div>

      {/* =================================================
          MAP
      ================================================= */}

      <section
        id="google-map"
        className="
          relative
          h-[calc(100vh-82px)]
          w-full
        "
      >
        <GoogleMap
          latitude={latitude}
          longitude={longitude}
          name={name}
          heritages={heritageData}
          selectedHeritage={
            selectedHeritage
          }
          onSelectHeritage={
            handleSelectHeritage
          }
          userLocation={
            userLocation
          }
          nearMeActive={
            nearMeActive
          }
          routeMode={routeMode}
          routeRequested={
            routeRequested
          }
          onRouteInfo={
            setRouteInfo
          }
          onRouteSelect={
            handleRouteSelect
          }
        />

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <div
          className="
            absolute
            left-8
            top-6
            z-20
          "
        >
          <Sidebar
            heritages={heritageData}
            filters={filters}
            loading={loading}
            onSearch={handleSearch}
            onCategoryChange={
              handleCategoryChange
            }
            onOpenFilters={() =>
              setFilterOpen(true)
            }
            onSelectHeritage={
              handleSelectHeritage
            }
            onClearFilters={
              handleClearFilters
            }
            onNearMe={
              getNearestHeritages
            }
          />
        </div>

        {/* =================================================
            FILTER MODAL
        ================================================= */}

        <FilterModal
          open={filterOpen}
          onClose={() =>
            setFilterOpen(false)
          }
          filters={filters}
          onApply={
            handleApplyFilters
          }
        />

        {/* =================================================
            SELECTED HERITAGE CARD
        ================================================= */}

        {selectedHeritage && (
          <div
            className="
              absolute
              bottom-7
              right-7
              z-20
            "
          >
            <PlacePreviewCard
              heritage={
                selectedHeritage
              }
              onRoute={
                handleRouteHere
              }
              routeMode={
                routeMode
              }
              setRouteMode={(
                mode
              ) => {
                setRouteMode(mode);

                // If a route is already displayed,
                // changing mode immediately recalculates it.
                if (routeRequested) {
                  setRouteInfo(null);
                  setSelectedRoute(0);
                }
              }}
              routeInfo={routeInfo}
              selectedRoute={
                selectedRoute
              }
              onSelectRoute={
                handleRouteSelect
              }
              routeRequested={
                routeRequested
              }
            />
          </div>
        )}

        {/* =================================================
            MAP CONTROLS
        ================================================= */}

        <div
          className="
            absolute
            right-8
            top-8
            z-20
          "
        >
          <MapControls
            onLocate={() => {
              detectUserLocation(
                (location) => {
                  if (location) {
                    getNearestHeritages();
                  }
                }
              );
            }}
            onNearMe={
              getNearestHeritages
            }
          />
        </div>
      </section>
    </div>
  );
}