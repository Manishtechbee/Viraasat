import {
  Search,
  SlidersHorizontal,
  MapPin,
  Navigation,
  Landmark,
  Church,
  Castle,
  Building2,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";

export default function Sidebar({
  heritages = [],
  filters,
  loading,
  onSearch,
  onCategoryChange,
  onOpenFilters,
  onSelectHeritage,
  onClearFilters,
  onNearMe,
}) {
  const [searchValue, setSearchValue] = useState(
    filters?.search || ""
  );

  useEffect(() => {
    setSearchValue(filters?.search || "");
  }, [filters?.search]);

  const categories = [
    {
      text: "All",
      icon: Landmark,
    },
    {
      text: "UNESCO",
      icon: Landmark,
    },
    {
      text: "Temple",
      icon: Church,
    },
    {
      text: "Fort",
      icon: Castle,
    },
    {
      text: "Museum",
      icon: Building2,
    },
    {
      text: "Palace",
      icon: Landmark,
    },
  ];

  const activeFilterCount = Object.entries(filters || {}).filter(
    ([key, value]) =>
      key !== "sort" &&
      value !== ""
  ).length;

  const hasActiveFilters =
    filters?.search ||
    filters?.category ||
    filters?.state ||
    filters?.city ||
    filters?.era ||
    filters?.rating ||
    filters?.unesco;

  const handleSearchSubmit = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div
      className="
        flex
        h-[calc(100vh-130px)]
        w-[390px]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-[#E4D6C6]
        bg-[#FFFDF9]/95
        shadow-[0_20px_70px_rgba(65,45,25,0.18)]
        backdrop-blur-2xl
      "
    >

      {/* ================================
          HEADER
      ================================= */}

      <div className="p-5 pb-3">

        <div className="flex items-start justify-between">

          <div>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[2px]
                text-[#B16D32]
              "
            >
              Viraasat Explorer
            </p>

            <h2
              className="
                mt-1
                font-cormorant
                text-[30px]
                font-bold
                leading-none
                text-[#2B190F]
              "
            >
              Explore Heritage
            </h2>
          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#F8E8CF]
              text-[#8C4A15]
            "
          >
            <MapPin size={18} />
          </div>

        </div>

        {/* Search */}

        <div className="mt-5">
          <SearchBar
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
            }}
            onSearch={handleSearchSubmit}
          />
        </div>

        {/* Filter button */}

        <button
          onClick={onOpenFilters}
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#E4D6C6]
            bg-[#FBF5ED]
            py-3
            text-sm
            font-medium
            text-[#70401B]
            transition
            hover:bg-[#F6EBDD]
          "
        >
          <SlidersHorizontal size={16} />

          Filters

          {activeFilterCount > 0 && (
            <span
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-[#8C4A15]
                px-1.5
                text-[10px]
                text-white
              "
            >
              {activeFilterCount}
            </span>
          )}
        </button>

      </div>

      {/* ================================
          CATEGORIES
      ================================= */}

      <div
        className="
          flex
          gap-2
          overflow-x-auto
          px-5
          pb-4
          scrollbar-none
        "
      >

        {categories.map(({ text, icon: Icon }) => {

          const active =
            text === "All"
              ? filters?.category === ""
              : filters?.category === text;

          return (
            <button
              key={text}
              onClick={() => onCategoryChange(text)}
              className={`
                flex
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                px-3.5
                py-2
                text-xs
                font-medium
                transition

                ${
                  active
                    ? "border-[#8C4A15] bg-[#8C4A15] text-white shadow-sm"
                    : "border-[#E4D6C6] bg-white text-[#70401B] hover:bg-[#FBF1E5]"
                }
              `}
            >
              <Icon size={13} />

              {text}
            </button>
          );
        })}

      </div>

      {/* ================================
          HERITAGE LIST
      ================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-4
          py-4
          scrollbar-thin
          scrollbar-thumb-[#D8C4AF]
          scrollbar-track-transparent
        "
      >

        {/* Loading */}

        {loading ? (

          <div className="space-y-3">

            {Array.from({ length: 6 }).map((_, index) => (

              <div
                key={index}
                className="
                  animate-pulse
                  rounded-2xl
                  border
                  border-[#E9DED1]
                  bg-white
                  p-3
                "
              >

                <div className="flex gap-3">

                  <div
                    className="
                      h-[72px]
                      w-[82px]
                      shrink-0
                      rounded-xl
                      bg-[#EDE2D5]
                    "
                  />

                  <div className="flex-1">

                    <div
                      className="
                        h-4
                        w-3/4
                        rounded
                        bg-[#EDE2D5]
                      "
                    />

                    <div
                      className="
                        mt-3
                        h-3
                        w-1/2
                        rounded
                        bg-[#EDE2D5]
                      "
                    />

                    <div
                      className="
                        mt-2
                        h-3
                        w-1/3
                        rounded
                        bg-[#EDE2D5]
                      "
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : heritages.length === 0 ? (

          /* ================================
             NO RESULTS
          ================================= */

          <div className="flex h-full items-center justify-center">

            <div className="px-8 text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F8E8CF]
                  text-[#9B6030]
                "
              >
                <Search size={22} />
              </div>

              <p
                className="
                  mt-3
                  font-semibold
                  text-[#38261B]
                "
              >
                No heritage found
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#8A7969]
                "
              >
                Try another search or filter.
              </p>

              {hasActiveFilters && (
                <button
                  onClick={onClearFilters}
                  className="
                    mt-4
                    rounded-xl
                    bg-[#8C4A15]
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-white
                    transition
                    hover:bg-[#744016]
                  "
                >
                  Clear Filters
                </button>
              )}

            </div>

          </div>

        ) : (

          /* ================================
             HERITAGE CARDS
          ================================= */

          <div className="space-y-3">

            {heritages.map((heritage) => (

              <button
                key={heritage._id}
                onClick={() =>
                  onSelectHeritage(heritage)
                }
                className="
                  group
                  w-full
                  rounded-2xl
                  border
                  border-[#E9DED1]
                  bg-white
                  p-3
                  text-left
                  transition
                  duration-200
                  hover:-translate-y-[1px]
                  hover:border-[#CFAE8A]
                  hover:bg-[#FFFCF8]
                  hover:shadow-[0_8px_25px_rgba(80,50,25,.08)]
                "
              >

                <div className="flex gap-3">

                  {/* IMAGE */}

                  <div
  className="
    h-[72px]
    w-[82px]
    shrink-0
    overflow-hidden
    rounded-xl
    bg-[#EFE3D5]
  "
>
  {heritage.image ? (
    <img
      src={heritage.image}
      alt={heritage.name}
      onError={(e) => {
        e.currentTarget.style.display = "none";
        e.currentTarget.parentElement
          .querySelector(".image-fallback")
          ?.classList.remove("hidden");
      }}
      className="
        h-full
        w-full
        object-cover
        transition
        duration-300
        group-hover:scale-105
      "
    />
  ) : null}

  <div
    className={`
      image-fallback
      h-full
      w-full
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-[#F7EBDD]
      via-[#F1DDCA]
      to-[#E7CDB2]
      text-[#8C4A15]
      ${heritage.image ? "hidden" : ""}
    `}
  >
    <MapPin
      size={25}
      strokeWidth={1.5}
    />

    <span className="mt-1 text-[9px] font-medium">
      Heritage Site
    </span>
  </div>
</div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-2
                      "
                    >

                      <h3
                        className="
                          line-clamp-1
                          text-sm
                          font-semibold
                          text-[#38261B]
                        "
                      >
                        {heritage.name}
                      </h3>

                      <ChevronRight
                        size={15}
                        className="
                          shrink-0
                          text-[#B88A61]
                          transition
                          group-hover:translate-x-1
                        "
                      />

                    </div>

                    <p
                      className="
                        mt-1
                        line-clamp-1
                        text-xs
                        text-[#7E6D5D]
                      "
                    >
                      {heritage.city},{" "}
                      {heritage.state}
                    </p>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                      "
                    >

                      {heritage.category && (
                        <span
                          className="
                            rounded-full
                            bg-[#F7EBDD]
                            px-2
                            py-1
                            text-[10px]
                            font-medium
                            text-[#8C4A15]
                          "
                        >
                          {heritage.category}
                        </span>
                      )}

                      {heritage.rating && (
                        <span
                          className="
                            text-[11px]
                            font-medium
                            text-[#806A56]
                          "
                        >
                          ★ {heritage.rating}
                        </span>
                      )}

                      {heritage.isUnesco && (
                        <span
                          className="
                            rounded-full
                            bg-[#EEF4EA]
                            px-2
                            py-1
                            text-[10px]
                            font-medium
                            text-[#587044]
                          "
                        >
                          UNESCO
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </button>

            ))}

          </div>

        )}

      </div>

      {/* ================================
          CLEAR FILTERS
          Small bottom action only
      ================================= */}

      {hasActiveFilters && heritages.length > 0 && (
        <div
          className="
            border-t
            border-[#E9DED1]
            bg-[#FCF8F2]
            px-5
            py-3
          "
        >
          <button
            onClick={onClearFilters}
            className="
              w-full
              text-xs
              font-medium
              text-[#A45E24]
              transition
              hover:text-[#7F4215]
              hover:underline
            "
          >
            Clear all filters
          </button>
        </div>
      )}

    </div>
  );
}