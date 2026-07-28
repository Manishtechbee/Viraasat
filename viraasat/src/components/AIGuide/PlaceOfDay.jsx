import { Bookmark, MessageCircle } from "lucide-react";

const place = {
  name: "Taj Mahal",
  location: "Agra, Uttar Pradesh",
  description:
    "A timeless symbol of love, built by Mughal Emperor Shah Jahan.",
  image:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
};

export default function PlaceOfDay({ onAsk }) {
  return (
    <div className="
      rounded-[22px]
      border border-[#E9DED2]
      bg-white
      p-4
    ">

      <h3 className="
        px-1
        font-serif
        text-lg
      ">
        Place of the Day
      </h3>

      <div className="mt-4 overflow-hidden rounded-[15px]">

        <img
          src={place.image}
          alt={place.name}
          className="
            h-[155px]
            w-full
            object-cover
          "
        />

      </div>

      <div className="mt-3">

        <div className="flex items-center justify-between">

          <h4 className="font-serif text-lg">
            {place.name}
          </h4>

          <Bookmark
            size={18}
            className="text-[#8B4C1D]"
          />

        </div>

        <p className="mt-1 text-xs text-[#88796C]">
          {place.location}
        </p>

        <p className="
          mt-3
          text-xs
          leading-5
          text-[#70645B]
        ">
          {place.description}
        </p>

        <button
          onClick={() => onAsk(place)}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#753B10]
            py-3
            text-xs
            text-white
            hover:bg-[#65320C]
            transition
          "
        >
          <MessageCircle size={14} />
          Ask about this place
        </button>

      </div>

    </div>
  );
}