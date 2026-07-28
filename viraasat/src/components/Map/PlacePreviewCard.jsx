import {
  Heart,
  MapPin,
  Star,
  ArrowRight,
  Navigation,
  Clock3,
  Route,
  Car,
  Footprints,
  Bike,
  Motorbike,
  RefreshCw,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PlacePreviewCard({
  heritage,

  onRoute,

  routeMode,
  setRouteMode,

  routeInfo,

  selectedRoute = 0,
  onSelectRoute,

  routeRequested = false,
}) {
  const navigate = useNavigate();

  const [imageError, setImageError] =
    useState(false);

  const [isCalculating, setIsCalculating] =
    useState(false);

  if (!heritage) return null;

  // =====================================================
  // DATA
  // =====================================================

  const image =
    heritage.image;

  const title =
    heritage.name ||
    "Heritage Site";

  const location =
    `${heritage.city || ""}${
      heritage.city &&
      heritage.state
        ? ", "
        : ""
    }${heritage.state || ""}`;

  const rating =
    heritage.rating ||
    "N/A";

  const reviewCount =
    heritage.reviewCount || 0;

  const isUnesco =
    heritage.isUnesco ||
    heritage.unesco;

  const description =
    heritage.description ||
    "Discover the history, architecture and cultural significance of this heritage site.";

  // =====================================================
  // TRAVEL MODES
  // =====================================================

  const travelModes = [
    {
      value: "DRIVING",
      label: "Drive",
      icon: Car,
    },
    {
      value: "WALKING",
      label: "Walk",
      icon: Footprints,
    },
    {
      value: "BICYCLING",
      label: "Cycle",
      icon: Bike,
    },
    {
      value: "TWO_WHEELER",
      label: "Bike",
      icon: Motorbike,
    },
  ];

  // =====================================================
  // DETAILS
  // =====================================================

  const handleDetails = () => {
    if (heritage.slug) {
      navigate(
        `/exploreHeritages/${heritage.slug}`
      );
    }
  };

  // =====================================================
  // ROUTE
  // =====================================================

  const handleRouteClick = async () => {
    if (!onRoute) return;

    setIsCalculating(true);

    try {
      await onRoute();
    } finally {
      // Google route computation happens
      // asynchronously in GoogleMap.
      // Keep this brief so the button doesn't
      // remain permanently locked.
      window.setTimeout(() => {
        setIsCalculating(false);
      }, 500);
    }
  };

  // =====================================================
  // ROUTE DATA
  // =====================================================

  const routes =
    routeInfo?.routes || [];

  const activeRoute =
    routes[selectedRoute] ||
    routeInfo;

  const hasRoute =
    routeRequested &&
    routeInfo &&
    routeInfo.routeCount > 0 &&
    activeRoute;

  const routeWarnings =
    routeInfo?.warnings || [];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
  className="
    w-[370px]
    max-w-[calc(100vw-32px)]
    max-h-[calc(100vh-120px)]
    overflow-y-auto
    overflow-x-hidden
    rounded-[28px]
    border
    border-[#EADFD4]
    bg-[#FFFDF9]/95
    shadow-[0_25px_70px_rgba(0,0,0,.15)]
    backdrop-blur-2xl

    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
  "
>
      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative p-4 pb-0">
        {image && !imageError ? (
          <img
            src={image}
            alt={title}
            onError={() =>
              setImageError(true)
            }
            className="
              h-[190px]
              w-full
              rounded-2xl
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-[190px]
              w-full
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-linear-to-br
              from-[#F7EBDD]
              via-[#F1DDCA]
              to-[#E7CDB2]
              text-[#8C4A15]
            "
          >
            <MapPin
              size={42}
              strokeWidth={1.5}
            />

            <span className="mt-2 text-sm font-medium">
              Heritage Site
            </span>
          </div>
        )}

        {/* Favorite */}

        <button
          type="button"
          onClick={() =>
            toast.success(
              "Save this heritage from Explore"
            )
          }
          className="
            absolute
            right-7
            top-7
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-md
            transition
            hover:scale-105
          "
        >
          <Heart
            size={19}
            className="text-[#8B4A17]"
          />
        </button>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="px-5 py-3">
        {/* Title */}

        <div className="flex items-start justify-between gap-3">
          <h2
            className="
              font-cormorant
              text-[26px]
              font-bold
              leading-none
              text-[#2F2118]
            "
          >
            {title}
          </h2>

          {isUnesco && (
            <span
              className="
                shrink-0
                rounded-full
                bg-[#EEF4EA]
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-[#587044]
              "
            >
              UNESCO
            </span>
          )}
        </div>

        {/* Location */}

        <div className="mt-3 flex items-center gap-2">
          <MapPin
            size={14}
            className="text-[#8B4A17]"
          />

          <span className="text-[13px] text-[#6D635A]">
            {location || "India"}
          </span>
        </div>

        {/* Rating */}

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star
              size={14}
              fill="#F5A623"
              className="text-[#F5A623]"
            />

            <span className="text-[13px] font-semibold">
              {rating}
            </span>
          </div>

          <span className="text-[12px] text-[#8A8078]">
            (
            {reviewCount.toLocaleString()}
            {" "}
            reviews)
          </span>
        </div>

        {/* Category */}

        {heritage.category && (
          <span
            className="
              mt-3
              inline-flex
              rounded-lg
              bg-[#FFF3E6]
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-[#8B4A17]
            "
          >
            {heritage.category}
          </span>
        )}

        {/* Description */}

        <p
          className="
            mt-3
            line-clamp-3
            text-[12px]
            leading-6
            text-[#54463C]
          "
        >
          {description}
        </p>

        {/* =================================================
            ROUTE MODE
        ================================================= */}

        <div className="mt-4">
          <div className="mb-2 flex items-center gap-2">
            <Route
              size={15}
              className="text-[#8B4A17]"
            />

            <span className="text-xs font-semibold text-[#3D2B20]">
              Choose travel mode
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {travelModes.map(
              ({
                value,
                label,
                icon: Icon,
              }) => {
                const active =
                  routeMode === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setRouteMode(
                        value
                      );
                    }}
                    className={`
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-1
                      rounded-xl
                      border
                      py-2
                      text-[10px]
                      transition
                      ${
                        active
                          ? "border-[#8C4A15] bg-[#8C4A15] text-white"
                          : "border-[#E9DDD2] bg-[#FBF6F0] text-[#6D5A49] hover:bg-[#F5EBDD]"
                      }
                    `}
                  >
                    <Icon size={15} />

                    {label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            ROUTE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={
            handleRouteClick
          }
          disabled={
            isCalculating
          }
          className="
            mt-3
            flex
            h-11.5
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-linear-to-r
            from-[#8B4A17]
            to-[#A55A20]
            text-[13px]
            font-semibold
            text-white
            shadow-[0_10px_24px_rgba(139,74,23,0.25)]
            transition
            hover:-translate-y-px
            hover:from-[#784014]
            hover:to-[#8B4A17]
            disabled:cursor-not-allowed
            disabled:opacity-80
          "
        >
          {isCalculating ? (
            <>
              <RefreshCw
                size={16}
                className="animate-spin"
              />

              Calculating route...
            </>
          ) : (
            <>
              <Navigation size={16} />

              {routeRequested
                ? "Recalculate Route"
                : "Get Route"}
            </>
          )}
        </button>

        <p className="mt-2 text-center text-[11px] text-[#8A7969]">
          Uses Google's real road network to
          calculate your route.
        </p>

        {/* =================================================
            ROUTE INFORMATION
        ================================================= */}

        {hasRoute && (
          <div
            className="
              mt-4
              rounded-2xl
              border
              border-[#E9DDD2]
              bg-[#FBF6F0]
              p-3
            "
          >
            {/* Main route stats */}

            <div className="grid grid-cols-2 gap-2">
              <div
                className="
                  rounded-xl
                  bg-white/80
                  p-3
                "
              >
                <div className="flex items-center gap-2">
                  <Route
                    size={15}
                    className="text-[#8B4A17]"
                  />

                  <span className="text-[10px] font-medium text-[#817367]">
                    Road distance
                  </span>
                </div>

                <p className="mt-1 text-[16px] font-bold text-[#3D2B20]">
                  {activeRoute.distanceText ||
                    activeRoute.distance ||
                    "—"}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  bg-white/80
                  p-3
                "
              >
                <div className="flex items-center gap-2">
                  <Clock3
                    size={15}
                    className="text-[#8B4A17]"
                  />

                  <span className="text-[10px] font-medium text-[#817367]">
                    Estimated time
                  </span>
                </div>

                <p className="mt-1 text-[16px] font-bold text-[#3D2B20]">
                  {activeRoute.durationText ||
                    activeRoute.duration ||
                    "—"}
                </p>
              </div>
            </div>

            {/* Route summary */}

            {activeRoute.summary && (
              <div className="mt-3">
                <p className="text-[11px] font-semibold text-[#6D5A49]">
                  {activeRoute.summary}
                </p>
              </div>
            )}

            {/* =================================================
                ALTERNATE ROUTES
            ================================================= */}

            {routes.length > 1 && (
              <div className="mt-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A7969]">
                  Available routes
                </p>

                <div className="space-y-1.5">
                  {routes.map(
                    (route, index) => {
                      const active =
                        selectedRoute ===
                        index;

                      return (
                        <button
                          key={
                            `route-${index}`
                          }
                          type="button"
                          onClick={() =>
                            onSelectRoute?.(
                              index
                            )
                          }
                          className={`
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-xl
                            border
                            px-3
                            py-2
                            text-left
                            transition
                            ${
                              active
                                ? "border-[#8C4A15] bg-[#F3E5D6]"
                                : "border-[#E9DDD2] bg-white/70 hover:bg-white"
                            }
                          `}
                        >
                          <div>
                            <p className="text-[11px] font-semibold text-[#49382D]">
                              {route.isDefault
                                ? "Recommended route"
                                : `Alternative ${index}`}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#7E7167]">
                              {route.summary ||
                                "Road route"}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[11px] font-bold text-[#3D2B20]">
                              {
                                route.distanceText
                              }
                            </p>

                            <p className="text-[10px] text-[#7E7167]">
                              {
                                route.durationText
                              }
                            </p>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* =================================================
                WARNINGS
            ================================================= */}

            {routeWarnings.length >
              0 && (
              <div
                className="
                  mt-3
                  rounded-xl
                  border
                  border-[#E8D7C4]
                  bg-[#FFF7ED]
                  px-3
                  py-2
                "
              >
                {routeWarnings.map(
                  (
                    warning,
                    index
                  ) => (
                    <p
                      key={
                        `warning-${index}`
                      }
                      className="
                        text-[10px]
                        leading-4
                        text-[#79583D]
                      "
                    >
                      • {warning}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* =================================================
            DETAILS
        ================================================= */}

        <button
          type="button"
          onClick={
            handleDetails
          }
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#E2D3C3]
            bg-transparent
            py-2.5
            text-[13px]
            font-semibold
            text-[#7B451E]
            transition
            hover:bg-[#F9F0E7]
          "
        >
          View Details

          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}