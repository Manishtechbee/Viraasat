import {
  ArrowLeft,
  Bookmark,
  Share2,
  Star,
  Mountain,
} from "lucide-react";

export default function HeritageHeader({
  image,
  title,
  location,
  category,
  rating,
  reviews,
}) {
  return (
    <div className="relative w-full h-[320px] overflow-hidden rounded-3xl">

      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Top Buttons */}
      <div className="absolute top-5 left-5 right-5 flex justify-between">

        <button
          className="
            w-10 h-10
            rounded-full
            bg-white/15
            backdrop-blur-md
            border border-white/20
            flex items-center justify-center
            text-white
            hover:bg-white/25
            transition
          "
        >
          <ArrowLeft size={18} />
        </button>

        <button
          className="
            w-10 h-10
            rounded-full
            bg-white/15
            backdrop-blur-md
            border border-white/20
            flex items-center justify-center
            text-white
            hover:bg-white/25
            transition
          "
        >
          <Mountain size={18} />
        </button>

      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-7 left-7 right-7">

        <h1 className="text-5xl font-bold text-white">
          {title}
        </h1>

        <div className="flex items-center gap-3 mt-2">

          <p className="text-white/90 text-sm">
            {location}
          </p>

          <span className="text-white/40">•</span>

          <span className="text-white/90 text-sm">
            {category}
          </span>

        </div>

        <div className="flex items-center justify-between mt-6">

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2">

              <Star
                size={18}
                fill="#FDBA22"
                stroke="#FDBA22"
              />

              <span className="text-white font-medium">
                {rating}
              </span>

              <span className="text-white/70 text-sm">
                ({reviews} reviews)
              </span>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              className="
                flex items-center gap-2
                px-5
                h-11
                rounded-full
                bg-white
                text-gray-800
                text-sm
                font-medium
                hover:bg-gray-100
              "
            >
              <Bookmark size={16} />
              Bookmark
            </button>

            <button
              className="
                flex items-center gap-2
                px-5
                h-11
                rounded-full
                bg-white
                text-gray-800
                text-sm
                font-medium
                hover:bg-gray-100
              "
            >
              <Share2 size={16} />
              Share
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}