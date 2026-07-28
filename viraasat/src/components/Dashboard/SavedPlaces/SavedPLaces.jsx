import {
  Search,
  Heart,
  MapPin,
  Star,
  Navigation,
  Landmark,
  Church,
  Castle,
  Building2,
  SlidersHorizontal,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as savedPlacesService from "../../../services/savedPlaces.service";
import toast from "react-hot-toast";

const categories = [
  { label: "All", icon: SlidersHorizontal },
  { label: "Monument", icon: Landmark },
  { label: "Temple", icon: Church },
  { label: "Fort", icon: Castle },
  { label: "Museum", icon: Building2 },
];

export default function SavedPlaces() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH SAVED PLACES
  // --------------------------------------------------

  const fetchSavedPlaces = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await savedPlacesService.getSavedPlaces();

      console.log("SAVED PLACES RESPONSE:", data);

      setSavedPlaces(data.places || []);
    } catch (error) {
      console.error("Failed to fetch saved places:", error);
      setError("Unable to load your saved places.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const filteredPlaces = useMemo(() => {
    return savedPlaces.filter((place) => {
      const searchText = `
        ${place.name || ""}
        ${place.category || ""}
        ${place.description || ""}
      `.toLowerCase();

      const matchesSearch = searchText.includes(
        search.trim().toLowerCase()
      );

      const matchesCategory =
        activeCategory === "All" ||
        place.category?.toLowerCase() ===
          activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [savedPlaces, search, activeCategory]);

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const savedCount = savedPlaces.length;

  const visitedCount = savedPlaces.filter(
    (place) => place.visited === true
  ).length;

  const remainingCount = Math.max(
    savedCount - visitedCount,
    0
  );

  // --------------------------------------------------
  // REMOVE
  // --------------------------------------------------

  const handleRemove = async (heritageId) => {
    try {
      setRemovingId(heritageId);

      await savedPlacesService.removeSavedPlace(heritageId);

      setSavedPlaces((prev) =>
        prev.filter((place) => place._id !== heritageId)
      );

      toast.success("Removed from saved places");
    } catch (error) {
      console.error("Remove saved place error:", error);
      toast.error("Unable to remove place");
    } finally {
      setRemovingId(null);
    }
  };

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const handleNavigate = (place) => {
    const latitude = place.location?.latitude;
    const longitude = place.location?.longitude;

    if (!latitude || !longitude) {
      toast.error("Location coordinates unavailable");
      return;
    }

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  // --------------------------------------------------
  // VIEW DETAILS
  // --------------------------------------------------

  const handleViewDetails = (place) => {
  if (!place.slug) {
    toast.error("Heritage slug unavailable");
    return;
  }

  navigate(`/exploreHeritages/${place.slug}`);
};

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-8 py-8">

        <div className="mb-10">
          <div className="h-10 w-64 rounded-xl bg-[#EDE3D8] animate-pulse" />
          <div className="mt-3 h-4 w-80 rounded bg-[#EDE3D8] animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-5 mb-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[105px] rounded-[22px] bg-white border border-[#E9DED2] animate-pulse"
            />
          ))}
        </div>

        <div className="h-12 w-[65%] rounded-2xl bg-white border border-[#E9DED2] animate-pulse mb-7" />

        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-10 w-28 rounded-xl bg-[#EDE3D8] animate-pulse"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[390px] rounded-[22px] bg-white border border-[#E9DED2] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#7A6657] mb-4">{error}</p>

          <button
            onClick={fetchSavedPlaces}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-[#8C4A15]
              text-white
              text-sm
              font-medium
              hover:bg-[#733B10]
              transition
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#35281F] px-8 py-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-end justify-between mb-9">

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-10 bg-[#C98A45]" />

            <span className="uppercase tracking-[3px] text-[11px] font-semibold text-[#A56A32]">
              Your Collection
            </span>
          </div>

          <h1 className="font-cormorant text-[44px] leading-none font-bold text-[#2B1B12]">
            Saved Places
          </h1>

          <p className="mt-3 text-[14px] text-[#857367]">
            Your personal collection of India's heritage.
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#E7D8C8]
            bg-white/70
            backdrop-blur-xl
            px-4
            py-2
            shadow-[0_5px_20px_rgba(91,55,28,0.05)]
          "
        >
          <Heart
            size={16}
            className="fill-[#B86B18] text-[#B86B18]"
          />

          <span className="text-sm font-medium text-[#654D3A]">
            {savedCount} saved
          </span>
        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid grid-cols-3 gap-5 mb-9">

        <StatCard
          number={savedCount}
          label="Places Saved"
          icon={<Heart size={19} />}
        />

        <StatCard
          number={visitedCount}
          label="Places Visited"
          icon={<MapPin size={19} />}
        />

        <StatCard
          number={remainingCount}
          label="Yet to Explore"
          icon={<Landmark size={19} />}
        />

      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="relative w-[65%] mb-7">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[#9A8879]
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your saved heritage..."
          className="
            w-full
            h-[50px]
            pl-11
            pr-12
            rounded-2xl
            border
            border-[#E5D8CC]
            bg-white/80
            backdrop-blur-xl
            text-[14px]
            text-[#3A2B20]
            placeholder:text-[#A59689]
            outline-none
            shadow-[0_4px_18px_rgba(91,55,28,0.04)]
            transition
            focus:border-[#C38A50]
            focus:shadow-[0_5px_22px_rgba(180,106,42,0.10)]
          "
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-[12px]
              text-[#947E6D]
              hover:text-[#8C4A15]
              transition
            "
          >
            Clear
          </button>
        )}

      </div>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <div className="flex gap-3 mb-8">

        {categories.map((item) => {
          const Icon = item.icon;

          const active = activeCategory === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveCategory(item.label)}
              className={`
                group
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                border
                text-[13px]
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-[#8C4A15]
                      border-[#8C4A15]
                      text-white
                      shadow-[0_5px_15px_rgba(140,74,21,0.18)]
                    `
                    : `
                      bg-white/75
                      border-[#E5DACE]
                      text-[#6B5A4C]
                      hover:border-[#D4B99C]
                      hover:bg-[#FFFDFC]
                      hover:text-[#8C4A15]
                    `
                }
              `}
            >
              <Icon
                size={15}
                strokeWidth={active ? 2.3 : 2}
              />

              {item.label}
            </button>
          );
        })}

      </div>

      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      {!loading && (
        <div className="flex items-center justify-between mb-5">

          <p className="text-[13px] text-[#8C7A6B]">
            Showing{" "}
            <span className="font-semibold text-[#5A4535]">
              {filteredPlaces.length}
            </span>{" "}
            {filteredPlaces.length === 1
              ? "heritage place"
              : "heritage places"}
          </p>

        </div>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredPlaces.length === 0 ? (
        <div
          className="
            min-h-[350px]
            flex
            items-center
            justify-center
            rounded-[24px]
            border
            border-dashed
            border-[#DDCDBD]
            bg-white/45
          "
        >
          <div className="text-center">

            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#F4E5D2]
                text-[#A86627]
              "
            >
              <Heart size={25} />
            </div>

            <h3 className="font-cormorant text-[25px] font-bold text-[#3A281B]">
              No saved places found
            </h3>

            <p className="mt-2 text-sm text-[#89786A]">
              Try another search or category.
            </p>

          </div>
        </div>
      ) : (

        /* =====================================================
           CARDS
        ===================================================== */

        <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
  {filteredPlaces.map((place) => (
    <SavedPlaceCard
      key={place._id}
      place={place}
      removingId={removingId}
      handleRemove={handleRemove}
      handleViewDetails={handleViewDetails}
      handleNavigate={handleNavigate}
    />
  ))}
</div>
      )}

    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({ number, label, icon }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#E7D9CB]
        bg-white/75
        p-5
        backdrop-blur-xl
        shadow-[0_5px_20px_rgba(76,48,27,0.045)]
        transition
        hover:-translate-y-0.5
        hover:shadow-[0_10px_25px_rgba(76,48,27,0.08)]
      "
    >

      {/* subtle decorative glow */}

      <div
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-[#F7E9D8]
          opacity-60
          blur-2xl
        "
      />

      <div className="relative flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#F7E8D4]
            text-[#B86B18]
            transition
            group-hover:scale-105
          "
        >
          {icon}
        </div>

        <div>

          <p className="font-cormorant text-[30px] font-bold leading-none text-[#302117]">
            {number}
          </p>

          <p className="mt-1 text-[12px] font-medium text-[#8A7768]">
            {label}
          </p>

        </div>

      </div>

    </div>
  );
}
function SavedPlaceCard({
  place,
  removingId,
  handleRemove,
  handleViewDetails,
  handleNavigate,
}) {
  const [imageError, setImageError] = useState(false);

  const showImage = place.image && !imageError;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[20px]
        border
        border-[#E8DCD0]
        bg-white
        shadow-[0_4px_18px_rgba(76,48,27,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(76,48,27,0.10)]
      "
    >
      {/* =========================================
          IMAGE
      ========================================= */}

      <div className="relative h-[185px] overflow-hidden">
        {showImage ? (
          <img
            src={place.image}
            alt={place.name || "Heritage site"}
            onError={() => setImageError(true)}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-[1.04]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              bg-gradient-to-br
              from-[#F7EBDD]
              via-[#EED8C1]
              to-[#DFC09D]
              text-[#9A5B25]
            "
          >
            <MapPin
              size={38}
              strokeWidth={1.25}
            />

            <span className="mt-2 text-[11px] font-medium tracking-wide">
              Heritage Site
            </span>
          </div>
        )}

        {/* Image overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-black/5
          "
        />

        {/* Category */}
        <span
          className="
            absolute
            left-3.5
            top-3.5
            rounded-full
            bg-[#633817]/90
            px-2.5
            py-1
            text-[10px]
            font-semibold
            tracking-wide
            text-white
            backdrop-blur-md
          "
        >
          {place.category || "Heritage"}
        </span>

        {/* Remove */}
        <button
          type="button"
          disabled={removingId === place._id}
          onClick={() => handleRemove(place._id)}
          aria-label="Remove saved place"
          className="
            absolute
            right-3.5
            top-3.5
            flex
            h-8.5
            w-8.5
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-sm
            backdrop-blur-md
            transition
            hover:scale-105
            hover:bg-white
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {removingId === place._id ? (
            <Loader2
              size={15}
              className="animate-spin text-[#A95F13]"
            />
          ) : (
            <Heart
              size={16}
              className="fill-[#B86B18] text-[#B86B18]"
            />
          )}
        </button>

        {/* Visited */}
        {place.visited && (
          <span
            className="
              absolute
              bottom-3.5
              left-3.5
              rounded-full
              bg-[#FFF8ED]/95
              px-2.5
              py-1
              text-[10px]
              font-semibold
              text-[#A45F18]
              backdrop-blur-md
            "
          >
            Visited
          </span>
        )}
      </div>

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="p-4.5">

        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">
            <h3
              className="
                truncate
                font-cormorant
                text-[22px]
                font-bold
                leading-tight
                text-[#2E2118]
              "
              title={place.name}
            >
              {place.name || "Heritage Site"}
            </h3>

            {/* Location */}
            <div
              className="
                mt-1.5
                flex
                items-center
                gap-1.5
                text-[11px]
                text-[#89786A]
              "
            >
              <MapPin
                size={13}
                className="shrink-0 text-[#A56A32]"
              />

              <span className="truncate">
                {place.location?.latitude != null &&
                place.location?.longitude != null
                  ? `${Number(place.location.latitude).toFixed(
                      3
                    )}°, ${Number(place.location.longitude).toFixed(
                      3
                    )}°`
                  : "Location unavailable"}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded-lg
              bg-[#FBF2E6]
              px-2
              py-1
            "
          >
            <Star
              size={12}
              className="fill-[#C77B25] text-[#C77B25]"
            />

            <span className="text-[11px] font-semibold text-[#594536]">
              {place.rating ?? "—"}
            </span>
          </div>
        </div>

        {/* Description */}
        {place.description && (
          <p
            className="
              mt-2.5
              line-clamp-2
              text-[11.5px]
              leading-[18px]
              text-[#8A796B]
            "
          >
            {place.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2.5">

          <button
            type="button"
            onClick={() => handleViewDetails(place)}
            className="
              group/button
              flex
              h-9.5
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-[#8C4A15]
              text-[12px]
              font-semibold
              text-white
              shadow-[0_4px_12px_rgba(140,74,21,0.14)]
              transition-all
              hover:bg-[#733B10]
            "
          >
            View Details

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                group-hover/button:-translate-y-0.5
                group-hover/button:translate-x-0.5
              "
            />
          </button>

          <button
            type="button"
            onClick={() => handleNavigate(place)}
            title="Open directions"
            className="
              flex
              h-9.5
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#E4D8CC]
              bg-[#FCFAF7]
              text-[#765D49]
              transition-all
              hover:border-[#CDA77E]
              hover:bg-[#F8ECDE]
              hover:text-[#8C4A15]
            "
          >
            <Navigation size={15} />
          </button>

        </div>
      </div>
    </article>
  );
}