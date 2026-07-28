import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as savedPlacesService from "../../services/savedPlaces.service";

export default function HeritageCard({
  id,
  image,
  title,
  location,
  rating,
  tag,
  slug,
   isSaved: initialIsSaved = false,
}) {
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const handleSave = async (e) => {
  e.stopPropagation();

  if (saving) return;

  try {
    setSaving(true);

    if (isSaved) {
      await savedPlacesService.removeSavedPlace(id);

      setIsSaved(false);

      toast.success("Removed from saved places");
    } else {
      await savedPlacesService.savePlace(id);

      setIsSaved(true);

      toast.success("Saved to your places");
    }
  } catch (error) {
    console.error("Save place error:", error);

    toast.error(
      isSaved
        ? "Unable to remove place"
        : "Unable to save place"
    );
  } finally {
    setSaving(false);
  }
};
  return (
    <div className="w-[360px] overflow-hidden rounded-[16px] border border-[#E8DDD1] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)] transform transition duration-300 hover:scale-105">

      {/* Image */}
      <div className="relative h-[180px] overflow-hidden">
        
        {image && !imageError ? (
  <img
  onClick={() => navigate(`/exploreHeritages/${slug}`)}
          src={image}
          alt={title}
          onError={()=> setImageError(true)}
          className="h-full w-full object-cover transform transition duration-300 hover:scale-105"
        />
) : (
  <div
  onClick={() => navigate(`/exploreHeritages/${slug}`)}
    className="
      h-full
      w-full
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-[#F7EBDD]
      via-[#F1DDCA]
      to-[#E7CDB2]
      text-[#8C4A15]
    "
  >
    <MapPin size={42} strokeWidth={1.5} />

    <span className="mt-2 text-sm font-medium">
      Heritage Site
    </span>
  </div>
)}

        {/* Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-[#6C3D17] px-3 py-[4px] text-[12px] font-semibold text-white leading-none">
          {tag}
        </div>

        {/* Heart */}
        <button
  type="button"
  onClick={handleSave}
  disabled={saving}
  className="
    absolute
    right-4
    top-4
    flex
    h-9
    w-9
    items-center
    justify-center
    rounded-full
    bg-black/20
    backdrop-blur-sm
    transition-all
    duration-300
    hover:bg-black/30
    hover:scale-110
    active:scale-90
  "
>
  <Heart
    size={21}
    strokeWidth={2}
    className={`
      transition-all
      duration-300
      ${
        isSaved
          ? "fill-[#BD741F] text-[#BD741F]"
          : "text-white fill-white/15"
      }
      ${saving ? "opacity-50" : ""}
    `}
  />
</button>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4">

        <h3 className="text-[17px] font-semibold text-[#2B2118] leading-none">
          {title}
        </h3>

        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-1.5">
            <MapPin
              size={15}
              className="text-[#6D6257]"
            />

            <span className="text-[14px] text-[#6D6257]">
              {location}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Star
              size={14}
              fill="#F6A400"
              stroke="#F6A400"
            />

            <span className="text-[14px] font-medium text-[#4B4036]">
              {rating}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}