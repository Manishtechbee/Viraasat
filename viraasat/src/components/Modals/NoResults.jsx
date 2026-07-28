export default function NoResults({
  image,
  onClear,
  title = "No results found",
  description = "We couldn't find any heritage places matching your filters.",
}) {
  return (
    <div className="flex w-full items-center justify-center py-20">
      <div
        className="
          bg-white
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Illustration */}

        <img
          src={image}
          alt="No Results"
          className="w-[265px] h-auto object-contain mb-7 select-none pointer-events-none"
        />

        {/* Title */}

        <h2 className="font-serif text-[30px] font-semibold text-[#2E2117]">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-4 max-w-[250px] text-[15px] leading-7 text-[#6F6257]">
          {description}
        </p>

        {/* Button */}

        <button
          onClick={onClear}
          className="
            mt-8
            mb-9
            h-11
            px-8
            rounded-xl
            border
            border-[#D8B28A]
            bg-white
            text-[#8B4A17]
            text-[15px]
            font-medium
            transition-all
            duration-200
            hover:bg-[#FFF7F0]
            hover:border-[#B87438]
          "
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}