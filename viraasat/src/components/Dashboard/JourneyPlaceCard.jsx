import { Heart } from "lucide-react";

export default function JourneyPlaceCard({ place }) {
  return (
    <div
      className="
        group
        rounded-2xl
        overflow-hidden
        bg-white
        border border-[#EFE4D8]
        hover:shadow-xl
        transition-all
        duration-300
        cursor-pointer
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={place.image}
          alt={place.name}
          className="
            w-full
            h-[180px]
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Favourite */}

        <button
          className="
            absolute
            top-3
            right-3
            w-9
            h-9
            rounded-full
            bg-white/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            hover:bg-white
          "
        >
          <Heart
            size={18}
            className="text-white"
            fill="rgba(255,255,255,.6)"
          />
        </button>

      </div>

      {/* Content */}

      <div className="p-4">

        <h3 className="font-semibold text-[19px] text-[#2E221B] font-cormorant">
          {place.name}
        </h3>

        <p className="text-[14px] text-[#8C7B6B] mt-1">
          {place.location}
        </p>

        <div className="mt-5">

          <div className="flex justify-between text-[13px] text-[#78695C]">
            <span>{place.progress}% Explored</span>
          </div>

          <div className="mt-2 h-[7px] rounded-full bg-[#EFE5DA] overflow-hidden">

            <div
              className="h-full rounded-full bg-[#C78643]"
              style={{
                width: `${place.progress}%`,
              }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}