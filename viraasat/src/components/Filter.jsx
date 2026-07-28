import { SlidersHorizontal } from "lucide-react";

export default function Filter({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        items-center
        justify-center
        gap-2
        h-[49px]
        px-6
        rounded-lg
        bg-[#7A3B12]
        text-white
        text-sm
        font-medium
        shadow-sm
        hover:bg-[#623010]
        transition-all
        duration-200
      "
    >
      <SlidersHorizontal size={16} />
      Filters
    </button>
  );
}