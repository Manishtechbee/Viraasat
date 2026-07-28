import {
  MapPin,
  Star,
  Share2,
  Heart,
  Landmark,
  CalendarDays,
  Building2,
  Clock3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ShareModal from "../Modals/ShareModal";

import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import {
  savePlace,
  removeSavedPlace,
} from "../../services/savedPlaces.service";

export default function HeroInfo({
  heritage,
  heritageId,
  isSaved = false,
}) {
  const [shareOpen, setShareOpen] = useState(false);

  // Backend saved state
  const [liked, setLiked] = useState(Boolean(isSaved));

  const [saving, setSaving] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const descriptionRef = useRef(null);

  /*
  ==========================================================
  SYNC BACKEND SAVED STATE
  ==========================================================
  */

  useEffect(() => {
    setLiked(Boolean(isSaved));
  }, [isSaved, heritageId]);

  /*
  ==========================================================
  DESCRIPTION
  ==========================================================
  */

  const description =
    heritage?.description ||
    heritage?.shortDescription ||
    "No description available.";

  useEffect(() => {
    if (!descriptionRef.current) return;

    const element = descriptionRef.current;

    const checkOverflow = () => {
      setIsOverflowing(
        element.scrollHeight > element.clientHeight
      );
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [description]);

  /*
  ==========================================================
  SAVE / REMOVE
  ==========================================================
  */

  const handleSave = async () => {
    /*
    IMPORTANT:
    We can get the ID from either prop or heritage object.
    */

    const id = heritageId || heritage?._id;

    if (!id) {
      console.error("Missing heritage ID:", {
        heritageId,
        heritage,
      });

      toast.error("Heritage information is missing.");
      return;
    }

    if (saving) return;

    try {
      setSaving(true);

      if (liked) {
        /*
        ============================================
        REMOVE FROM SAVED PLACES
        ============================================
        */

        await removeSavedPlace(id);

        setLiked(false);

        toast.success("Removed from saved places");
      } else {
        /*
        ============================================
        SAVE PLACE
        ============================================
        */

        await savePlace(id);

        setLiked(true);

        toast.success("Heritage saved successfully");
      }
    } catch (error) {
      console.error("Save/remove heritage error:", error);

      /*
      Show backend error if available
      */

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        (liked
          ? "Unable to remove the heritage"
          : "Unable to save the heritage");

      toast.error(message);

      /*
      Don't change liked state if API failed
      */
    } finally {
      setSaving(false);
    }
  };

  /*
  ==========================================================
  SAFETY
  ==========================================================
  */

  if (!heritage) return null;

  return (
    <div
      className={`
        flex
        flex-col
        h-[380px]
        ${expanded ? "h-auto min-h-[510px]" : ""}
      `}
    >

      {/* =====================================================
          TOP ACTIONS
      ===================================================== */}

      <div className="flex justify-between items-start">

        {/* CATEGORY */}

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-[#FFF6EA]
            border
            border-[#ECD7BE]
            text-[#8B4A17]
            text-sm
            font-medium
            shrink-0
          "
        >
          {heritage.category || "Heritage Site"}
        </span>


        {/* ACTIONS */}

        <div className="flex gap-7">

          {/* SHARE */}

          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="
              flex
              items-center
              gap-2
              text-[#5A3C23]
              hover:text-[#8B4A17]
              transition
            "
          >
            <Share2 size={19} />

            <span className="font-medium">
              Share
            </span>
          </button>


          {/* =================================================
              SAVE
          ================================================= */}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`
              flex
              items-center
              gap-2
              transition
              disabled:cursor-not-allowed
              disabled:opacity-60

              ${
                liked
                  ? "text-red-500"
                  : "text-[#5A3C23] hover:text-red-500"
              }
            `}
          >

            <Heart
              size={19}
              className={`
                transition
                ${liked ? "fill-red-500 text-red-500" : ""}
                ${saving ? "animate-pulse" : ""}
              `}
            />

            <span className="font-medium">
              {saving
                ? "Saving..."
                : liked
                ? "Saved"
                : "Save"}
            </span>

          </button>

        </div>


        {/* SHARE MODAL */}

        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          place={{
            title: heritage.name,
            url: window.location.href,
          }}
        />

      </div>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <h1
        className="
          mt-5
          text-[59px]
          leading-none
          font-cormorant
          font-bold
          text-[#2B1C12]
        "
      >
        {heritage.name}
      </h1>


      {/* =====================================================
          LOCATION + RATING
      ===================================================== */}

      <div className="flex items-center gap-7 mt-5">

        {/* LOCATION */}

        <div className="flex items-center gap-2">

          <MapPin
            size={18}
            className="text-[#A86A3D]"
          />

          <span className="text-[16px] text-[#57473D]">
            {heritage.city}

            {heritage.state &&
              `, ${heritage.state}`}
          </span>

        </div>


        {/* RATING */}

        <div className="flex items-center gap-2">

          <Star
            size={18}
            fill="#FDB022"
            className="text-[#FDB022]"
          />

          <span className="text-[16px] font-semibold text-[#2E2118]">
            {heritage.rating
              ? Number(heritage.rating).toFixed(1)
              : "N/A"}
          </span>

          <span className="text-[16px] text-[#72665B]">
            ({heritage.reviewCount || 0} reviews)
          </span>

        </div>

      </div>


      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="mt-7">

        <p
          ref={descriptionRef}
          className={`
            leading-8
            text-[17px]
            text-[#5B4B40]
            transition-all
            duration-300
            overflow-hidden

            ${
              expanded
                ? "max-h-[1000px]"
                : "max-h-[120px]"
            }
          `}
        >
          {description}
        </p>


        {/* READ MORE */}

        {isOverflowing && (
          <button
            type="button"
            onClick={() =>
              setExpanded((prev) => !prev)
            }
            className="
              mt-2
              flex
              items-center
              gap-1
              text-[15px]
              font-semibold
              text-[#8B4A17]
              hover:text-[#6E3812]
              transition
            "
          >
            {expanded
              ? "Read less"
              : "Read more"}

            {expanded ? (
              <ChevronUp size={17} />
            ) : (
              <ChevronDown size={17} />
            )}
          </button>
        )}

      </div>


      {/* =====================================================
          FACTS
      ===================================================== */}

      <div
        className="
          mt-7
          rounded-[14px]
          border
          border-[#E8DDD0]
          bg-white/40
          shadow-sm
          overflow-hidden
        "
      >

        <div className="grid grid-cols-4">

          <Fact
            icon={CalendarDays}
            title="Built In"
            value={
              heritage.builtYear ||
              "Not available"
            }
          />

          <Fact
            icon={Clock3}
            title="Era"
            value={
              heritage.era ||
              "Not available"
            }
          />

          <Fact
            icon={Building2}
            title="Type"
            value={
              heritage.category ||
              "Heritage Site"
            }
          />

          <Fact
            icon={Landmark}
            title="Location"
            value={
              heritage.country ||
              "India"
            }
            last
          />

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   FACT COMPONENT
============================================================ */

function Fact({
  icon: Icon,
  title,
  value,
  last,
}) {
  return (
    <div
      className={`
        relative
        min-w-0
        px-5
        py-5
        flex
        items-start
        gap-4

        ${
          !last
            ? "after:absolute after:right-0 after:top-5 after:bottom-5 after:w-px after:bg-[#E8DDD0]"
            : ""
        }
      `}
    >

      {/* ICON */}

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-[#FFF5EC]
          flex
          items-center
          justify-center
          shrink-0
          pt-[2px]
        "
      >
        <Icon
          size={21}
          className="text-[#8B4A17]"
        />
      </div>


      {/* CONTENT */}

      <div className="min-w-0">

        <p
          className="
            text-[13px]
            leading-5
            text-[#806F62]
            whitespace-nowrap
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1.5
            text-[16px]
            leading-6
            font-medium
            text-[#2E2118]
            break-words
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}