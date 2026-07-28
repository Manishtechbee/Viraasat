import {
  X,
  Landmark,
  Church,
  Castle,
  Building2,
  MapPinned,
  ChevronDown,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";



const categories = [
  { name: "All", icon: SlidersHorizontal, value: ""},
  { name: "Temple", icon: Church, value: "Temple",},
  { name: "Fort", icon: Castle, value: "Fort" },
  { name: "Museum", icon: Landmark, value: "Museum" },
  { name: "Palace", icon: Building2, value: "Palace" },
  { name: "More", icon: "", value: "" },
];

const moreCategories = [
  "Cave",
  "Church",
  "Stepwell",
  "Archaeological Site",
  "Historic Building",
];

const ratings = [
  { label: "All", value: "" },
  { label: "4 ★ & above", value: "4" },
  { label: "3 ★ & above", value: "3" },
  { label: "2 ★ & above", value: "2" },
];
const DEFAULT_FILTERS = {
  search: "",
  category: "",
  state: "",
  city: "",
  era: "",
  sort: "newest",
  rating: "",
  unesco: "",
};

// const categories = [
//   "Temple",
//   "Fort",
//   "Museum",
//   "Palace",
//   "Monument",
//   "Gurudwara",
//   "Cave",
//   "Church",
//   "Stepwell",
//   "Archaeological Site",
//   "Historic Building",
// ];

const eras = [
  "Ancient",
  "Medieval",
  "Mughal",
  "Colonial",
  "Modern",
];

const states = [
  "Punjab",
  "Rajasthan",
  "Delhi",
  "Uttar Pradesh",
  "Maharashtra",
  "Karnataka",
  "Odisha",
  "Madhya Pradesh",
  "Telangana",
  "West Bengal",
  "Tamil Nadu",
  "Gujarat",
  "Kerala",
];

export default function FilterModal({ open,
  onClose,
  filters,
  onApply, }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [activeTab, setActiveTab] =useState("All");

  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);

  if (!open) return null;

  const updateFilter = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
  const resetFilters = {
    ...DEFAULT_FILTERS,
  };

  // Reset modal UI
  setLocalFilters(resetFilters);

  // Reset category UI
  setActiveTab("All");

  // Close More dropdown if open
  setShowMoreCategories(false);

  // IMPORTANT:
  // Update parent filters + fetch all heritage sites
  onApply(resetFilters);
};

  const handleApply = () => {
    onApply(localFilters);
  };

  return (<AnimatePresence>
    {open && (
    <div
  onClick={onClose}
  className="
    fixed inset-0 z-[999]
    flex items-center justify-center
    bg-black/45
    backdrop-blur-md
    p-5
  "
>
  <motion.div
  onClick={(e) => e.stopPropagation()}
  initial={{
    opacity: 0,
    x: 700,
    y: -250,
    scale: 0.75,
    rotate: 0,
  }}
  animate={{
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  }}
  exit={{
    opacity: 0,
    x: 700,
    y: -250,
    scale: 0.75,
    rotate: 0,
  }}
  transition={{
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    w-full
    max-w-[620px]
    h-[88vh]
    rounded-[28px]
    bg-[#FFFDF9]
    border border-[#EFE3D6]
    shadow-[0_30px_90px_rgba(0,0,0,0.18)]
    overflow-hidden
  "
>

  
        {/* Header */}
        <div
  className="
    sticky
    top-0
    z-20
    flex
    items-center
    justify-between
    px-7
    py-5
    bg-[#FFFDF9]/90
    backdrop-blur-xl
    border-b border-[#EFE5DA]
  "
><h2 className="text-[30px] font-semibold text-[#2F2118]">
        Filters
    </h2>

    <button
        onClick={onClose}
        className="rounded-full p-1.5 hover:bg-[#F6EFE8]"
    >
        <X size={18}/>
    </button>
</div>


        <div
  className="
    h-[calc(88vh-150px)]
    overflow-y-auto
    px-7
    py-6

    scrollbar-thin
    scrollbar-thumb-[#D8C4AF]
    scrollbar-track-transparent
  "
>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-[15px] text-[#3C2B20] mb-4">
              Categories
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {categories.map((item) => {
                const Icon = item.icon;
                if(item.name=="More"){
                  return (<div className="relative">
      <button
        type="button"
        onClick={() =>
          setShowMoreCategories((prev) => !prev)
        }
        className={`
          w-full
          rounded-xl
          border
          h-16
          flex
          flex-col
          justify-center
          items-center
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-md

          ${
            moreCategories.includes(localFilters.category)
              ? "bg-[#8B4A17] text-white border-[#8B4A17]"
              : "bg-white border-[#E8DDCF] text-[#7A5638] hover:border-[#B87945]"
          }
        `}
      >
        <ChevronDown
          size={18}
          className={`
            transition-transform duration-200
            ${showMoreCategories ? "rotate-180" : ""}
          `}
        />

        <span className="text-xs mt-2">
          {moreCategories.includes(localFilters.category)
            ? localFilters.category
            : "More"}
        </span>
      </button>

      {showMoreCategories && (
        <div
          className="
            absolute
            left-0
            top-full
            mt-2
            z-[100]
            w-full
            rounded-xl
            border
            border-[#E8DDCF]
            bg-white
            p-2
            shadow-[0_10px_30px_rgba(91,55,28,0.15)]
          "
        >
          {moreCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
  updateFilter("category", category);
  setActiveTab("More");
  setShowMoreCategories(false);
}}
              className={`
                w-full
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                transition
                ${
                  localFilters.category === category
                    ? "bg-[#FFF1E4] text-[#8B4A17] font-medium"
                    : "text-[#5E4939] hover:bg-[#FAF0E7]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>)
                }

                return (
                  <button
                  onClick={() => {updateFilter("category", item.value)
                    setActiveTab(item.name)
                  }}
                    key={item.name}
                    className={`rounded-xl border h-16 flex flex-col justify-center items-center transition-all duration-300
hover:-translate-y-1
hover:shadow-md
                      ${
  activeTab === item.name
    ? "bg-[#8B4A17] text-white border-[#8B4A17]"
    : "bg-white border-[#E8DDCF] text-[#7A5638] hover:border-[#B87945]"
}`}
                  >
                    <Icon size={18} />
                    <span className="text-xs mt-2">{item.name}</span>
                  </button>
                );
              })}
              

             

  




            </div>
          </div>

          {/* State */}
          <div className="mt-8">
            <label className="block mb-3 font-semibold text-[15px] text-[#3C2B20]">
              State
            </label>

            <div className="relative">
              <select value={localFilters.state}
                onChange={(e) =>
                  updateFilter("state", e.target.value)
                } className="appearance-none w-full rounded-xl border border-[#E7D9C8] bg-white h-12 px-4 text-[15px] outline-none focus:border-[#A96B3A]">
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* UNESCO */}
          <div className="mt-8">
            <label className="block mb-3 font-semibold text-[15px] text-[#3C2B20]">
              UNESCO Status
            </label>

            <div className="relative">
              <select
  value={localFilters.unesco}
  onChange={(e) =>
    updateFilter("unesco", e.target.value)
  }
  className="appearance-none w-full rounded-xl border border-[#E7D9C8] bg-white h-12 px-4 text-[15px] outline-none focus:border-[#A96B3A]"
>
  <option value="">All</option>
  <option value="true">UNESCO Sites</option>
  <option value="false">Non-UNESCO Sites</option>
</select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-8">
            <label className="block mb-4 font-semibold text-[15px] text-[#3C2B20]">
              Rating
            </label>

            <div className="grid grid-cols-2 gap-3">
              {ratings.map((item) => (
                <button
  key={item.label}
  type="button"
  onClick={() =>
    updateFilter("rating", item.value)
  }
  className={`h-11 rounded-xl border text-sm flex items-center justify-center gap-2
    ${
      localFilters.rating === item.value
        ? "bg-[#FFF6EE] border-[#D98A44] text-[#8B4A17]"
        : "bg-white border-[#E6D9CB]"
    }
  `}
>
  {item.value && (
    <Star
      size={14}
      fill="#F7A825"
      className="text-[#F7A825]"
    />
  )}

  {item.label}
</button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mt-8">
            <label className="block mb-3 font-semibold text-[15px] text-[#3C2B20]">
              Sort By
            </label>

            <div className="relative mb-8">
              <select value={localFilters.sort}
              onChange={(e) =>
                updateFilter("sort", e.target.value)
              } className="appearance-none w-full rounded-xl border border-[#E7D9C8] bg-white h-12 px-4 text-[15px] outline-none focus:border-[#A96B3A]">
              
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Added (A-Z)</option>
                <option value="oldest">
                Oldest Heritage
              </option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
  className="
    sticky
    bottom-0
    bg-[#FFFDF9]/95
    backdrop-blur-xl
    border-t border-[#EFE5DA]
    p-6
    flex
    gap-4
  "
>

          <button
          onClick={handleReset}
            className="flex-1 h-12 rounded-xl border border-[#DCCDBC]
            text-[#6D4A2C] font-medium hover:bg-[#F8F1EA]"
          >
            Reset
          </button>

          <button
          onClick={handleApply}
            className="flex-1 h-12 rounded-xl bg-[#8B4A17]
            text-white font-medium hover:bg-[#744016]"
          >
            Apply Filters
          </button>

        </div>

      </motion.div>
    </div>
  )}
  </AnimatePresence>);
}







  

 