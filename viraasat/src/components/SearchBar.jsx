import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
}) {
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;

    onChange(newValue);

    // Clear previous timer
    clearTimeout(timerRef.current);

    // Search immediately when input becomes empty
    if (!newValue.trim()) {
      onSearch("");
      return;
    }

    // Small debounce while typing
    timerRef.current = setTimeout(() => {
      onSearch(newValue);
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(timerRef.current);
      onSearch(value);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-black "
 />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search heritage places..."
        className="
      w-full
      h-[50px]
      rounded-lg
      border
      border-gray-200
      bg-white
      pl-10
      pr-4
      text-sm
      focus:outline-none
      focus:ring-2
      focus:ring-[#7A3B12]/20
        "
      />
    </div>
  );
}
