import {
  Heart,
  Star,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function RecommendationCard({ place }) {
  return (
    <div
      className="
      group
      relative
      w-[340px]
      h-[420px]
      rounded-[26px]
      overflow-hidden
      cursor-pointer
      "
    >
      {/* Image */}

      <img
        src={place.image}
        alt={place.name}
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        transition-transform
        duration-700
        group-hover:scale-110
      "
      />

      {/* Gradient */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/80
        via-black/20
        to-transparent
      "
      />

      {/* Rating */}

      <div
        className="
        absolute
        top-5
        left-5
        flex
        items-center
        gap-1
        bg-white/90
        backdrop-blur-xl
        rounded-full
        px-3
        py-1.5
      "
      >
        <Star
          size={14}
          fill="#FDBA12"
          className="text-yellow-400"
        />

        <span className="text-sm font-semibold">
          {place.rating}
        </span>
      </div>

      {/* Favourite */}

      <button
        className="
        absolute
        top-5
        right-5
        w-11
        h-11
        rounded-full
        bg-white/20
        backdrop-blur-xl
        flex
        items-center
        justify-center
      "
      >
        <Heart
          size={20}
          className="text-white"
        />
      </button>

      {/* Bottom */}

      <div
        className="
        absolute
        bottom-0
        left-0
        right-0
        p-7
      "
      >
        <div className="flex gap-2 mb-4">

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-white/20
            backdrop-blur-lg
            text-white
            text-xs
          "
          >
            {place.type}
          </span>

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-white/20
            backdrop-blur-lg
            text-white
            text-xs
          "
          >
            UNESCO
          </span>

        </div>

        <h2
          className="
          font-cormorant
          text-4xl
          font-semibold
          text-white
        "
        >
          {place.name}
        </h2>

        <div className="flex items-center gap-2 mt-2">

          <MapPin
            size={16}
            className="text-[#FFD79C]"
          />

          <span className="text-white/90">
            {place.location}
          </span>

        </div>

        <button
          className="
          mt-6
          flex
          items-center
          gap-2
          bg-[#B77937]
          hover:bg-[#A86B2B]
          text-white
          h-12
          px-6
          rounded-xl
          transition
        "
        >
          Explore

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}