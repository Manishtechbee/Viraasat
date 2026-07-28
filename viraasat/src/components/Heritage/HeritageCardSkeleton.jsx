export default function HeritageCardSkeleton() {
  return (
    <div
      className="
        w-[360px]
        overflow-hidden
        rounded-[16px]
        border
        border-[#E8DDD1]
        bg-white
        shadow-[0_3px_10px_rgba(91,55,28,0.06)]
      "
    >
      {/* Image */}
      <div
        className="
          h-[180px]
          w-full
          animate-pulse
          bg-[#E9DED2]
        "
      />

      {/* Content */}
      <div className="px-4 pt-3 pb-4">

        {/* Title */}
        <div
          className="
            h-[17px]
            w-[65%]
            animate-pulse
            rounded-[5px]
            bg-[#DCCABB]
          "
        />

        {/* Location + Rating */}
        <div className="mt-4 flex items-center justify-between">

          {/* Location */}
          <div className="flex items-center gap-2">
            <div
              className="
                h-[15px]
                w-[15px]
                animate-pulse
                rounded-full
                bg-[#D8C8B8]
              "
            />

            <div
              className="
                h-[14px]
                w-[115px]
                animate-pulse
                rounded-[4px]
                bg-[#E2D5C8]
              "
            />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div
              className="
                h-[14px]
                w-[14px]
                animate-pulse
                rounded-[3px]
                bg-[#E2C49C]
              "
            />

            <div
              className="
                h-[14px]
                w-[25px]
                animate-pulse
                rounded-[4px]
                bg-[#E2D5C8]
              "
            />
          </div>

        </div>

      </div>
    </div>
  );
}