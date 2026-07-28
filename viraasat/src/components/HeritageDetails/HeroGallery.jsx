import { useEffect, useState } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  savePlace,
  removeSavedPlace,
} from "../../services/savedPlaces.service";

export default function HeroGallery({
  heritageId,
  image,
  images = [],
  isSaved = false,
}) {
  const galleryImages = [
    ...(image ? [image] : []),
    ...images.filter((img) => img && img !== image),
  ];

  const [current, setCurrent] = useState(0);

  // IMPORTANT:
  // Initial state comes from backend
  const [liked, setLiked] = useState(isSaved);

  const [saving, setSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset when heritage changes
  useEffect(() => {
    setCurrent(0);
    setImageError(false);
    setLiked(isSaved);
  }, [heritageId, image, isSaved]);

  const next = () => {
    setImageError(false);

    setCurrent((prev) =>
      (prev + 1) % galleryImages.length
    );
  };

  const prev = () => {
    setImageError(false);

    setCurrent((prev) =>
      prev === 0
        ? galleryImages.length - 1
        : prev - 1
    );
  };

  // =====================================================
  // SAVE / REMOVE
  // =====================================================

  const handleSave = async () => {
    if (!heritageId) {
      toast.error("Heritage information is missing.");
      return;
    }

    if (saving) return;

    try {
      setSaving(true);

      if (liked) {
        // Currently saved → remove it
        await removeSavedPlace(heritageId);

        setLiked(false);

        toast.success("Removed from saved places");
      } else {
        // Currently not saved → save it
        await savePlace(heritageId);

        setLiked(true);

        toast.success("Heritage saved successfully");
      }
    } catch (error) {
      console.error("Save place error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to save the heritage"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // NO IMAGES
  // =====================================================

  if (galleryImages.length === 0) {
    return (
      <div
        className="
          h-[610px]
          rounded-[28px]
          overflow-hidden
          border
          border-[#E9DED2]
          bg-gradient-to-br
          from-[#F6EBDD]
          via-[#EFE0CE]
          to-[#E1C7A8]
          shadow-[0_18px_45px_rgba(0,0,0,.06)]
          flex
          items-center
          justify-center
        "
      >
        <div className="flex flex-col items-center text-[#765D49]">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-white/60
              border
              border-[#D8C2A8]
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <MapPin
              size={36}
              strokeWidth={1.4}
            />
          </div>

          <p className="mt-4 font-cormorant text-2xl font-semibold">
            Heritage Location
          </p>

          <p className="mt-1 text-sm text-[#806F62]">
            No images available
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div
      className="
        rounded-[28px]
        overflow-hidden
        bg-white
        border
        border-[#E9DED2]
        shadow-[0_18px_45px_rgba(0,0,0,.06)]
      "
    >

      <div className="relative h-[610px] group overflow-hidden">

        {/* =================================================
            IMAGE
        ================================================= */}

        {!imageError ? (
          <img
            src={galleryImages[current]}
            alt={image ? "Heritage monument" : "Heritage"}
            onError={() => setImageError(true)}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              h-full
              w-full
              flex
              flex-col
              items-center
              justify-center
              bg-gradient-to-br
              from-[#F6EBDD]
              via-[#EFE0CE]
              to-[#E1C7A8]
              text-[#765D49]
            "
          >

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-white/60
                border
                border-[#D8C2A8]
                flex
                items-center
                justify-center
              "
            >
              <MapPin
                size={38}
                strokeWidth={1.4}
              />
            </div>

            <p className="mt-4 font-cormorant text-2xl font-semibold">
              Heritage Location
            </p>

            <p className="mt-1 text-sm text-[#806F62]">
              Image unavailable
            </p>

          </div>
        )}

        {/* =================================================
            GRADIENT
        ================================================= */}

        {!imageError && (
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-44
              bg-gradient-to-t
              from-black/65
              via-black/10
              to-transparent
            "
          />
        )}

        {/* =================================================
            SAVE / FAVORITE
        ================================================= */}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="
            absolute
            top-5
            right-5
            w-12
            h-12
            rounded-full
            backdrop-blur-xl
            bg-white/80
            flex
            items-center
            justify-center
            shadow-lg
            hover:scale-110
            transition
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
          aria-label={
            liked
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            size={22}
            className={`
              transition
              ${liked
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
              }
              ${saving ? "animate-pulse" : ""}
            `}
          />
        </button>

        {/* =================================================
            PREVIOUS
        ================================================= */}

        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={prev}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              w-11
              h-11
              rounded-full
              bg-white/80
              backdrop-blur-lg
              shadow-lg
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition
            "
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* =================================================
            NEXT
        ================================================= */}

        {galleryImages.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              w-11
              h-11
              rounded-full
              bg-white/80
              backdrop-blur-lg
              shadow-lg
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition
            "
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* =================================================
            BOTTOM CONTROLS
        ================================================= */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            flex
            items-center
            justify-between
          "
        >

          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              px-5
              h-11
              rounded-full
              bg-black/45
              backdrop-blur-xl
              text-white
              text-sm
              hover:bg-black/55
              transition
            "
          >
            <Images size={18} />
            View Gallery
          </button>

          {galleryImages.length > 1 && (
            <div className="flex items-center gap-2">

              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCurrent(i);
                    setImageError(false);
                  }}
                  aria-label={`View image ${i + 1}`}
                  className={`
                    transition-all
                    duration-300
                    rounded-full

                    ${
                      current === i
                        ? "w-7 h-2 bg-white"
                        : "w-2 h-2 bg-white/60"
                    }
                  `}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}