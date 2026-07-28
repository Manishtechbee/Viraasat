import { useState } from "react";
import { X } from "lucide-react";

const options = [
  "Most Popular",
  "Highest Rated",
  "Newest Added",
  "A - Z",
  "Z - A",
];

export default function SortModal({
  open,
  onClose,
  value = "Most Popular",
  onChange,
}) {
  const [selected, setSelected] = useState(value);

  if (!open) return null;

  const handleSelect = (option) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">

      <div className="mt-[480px] mr-6 w-[370px] rounded-[22px] bg-[#FFFDF9] shadow-2xl border border-[#E9DDD0] overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFE4D7]">

          <h2 className="text-[28px] font-semibold text-[#2F2118]">
            Sort By
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#F3EBE2]"
          >
            <X size={18} />
          </button>

        </div>

        {/* Options */}

        <div className="px-6 py-4 space-y-5">

          {options.map((item) => (
            <label
              key={item}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div
                onClick={() => handleSelect(item)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition
                ${
                  selected === item
                    ? "border-[#8B4A17]"
                    : "border-[#C8B6A5]"
                }`}
              >
                {selected === item && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B4A17]" />
                )}
              </div>

              <span
                className={`text-[15px]
                  ${
                    selected === item
                      ? "text-[#2D241E] font-medium"
                      : "text-[#666]"
                  }`}
              >
                {item}
              </span>
            </label>
          ))}

        </div>

      </div>

    </div>
  );
}


// Usage of SortModal in Heritage.jsx:
// const [sortOpen, setSortOpen] = useState(false);
// const [sort, setSort] = useState("Most Popular");

// <button onClick={() => setSortOpen(true)}>
//     Sort
// </button>

// <SortModal
//     open={sortOpen}
//     value={sort}
//     onChange={(value) => {
//         setSort(value);
//         setSortOpen(false);
//     }}
//     onClose={() => setSortOpen(false)}
// />