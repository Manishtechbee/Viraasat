import RecommendationCard from "./RecommendationCard";

import taj from "../../assets/taj.jpg";
// import amer from "../../assets/dashboard/amer.jpg";
import hampi from "../../assets/hampi.jpg";

const places = [
  {
    name: "Taj Mahal",
    image: taj,
    rating: "4.9",
    location: "Agra",
    type: "Monument",
  },
  {
    name: "Amer Fort",
    image: undefined,
    rating: "4.8",
    location: "Jaipur",
    type: "Fort",
  },
  {
    name: "Hampi",
    image: hampi,
    rating: "4.9",
    location: "Karnataka",
    type: "Ancient City",
  },
];

export default function RecommendedPlaces() {
  return (
    <section
      className="
      mt-10
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-8
      "
      >
        <div>

          <h2
            className="
            text-[38px]
            font-cormorant
            font-semibold
            text-[#2E221B]
          "
          >
            Recommended For You
          </h2>

          <p className="text-[#88796A] mt-1">
            Handpicked heritage destinations based on your interests.
          </p>

        </div>

        <button
          className="
          px-6
          h-12
          rounded-xl
          bg-[#8B5A2B]
          text-white
          hover:bg-[#76481E]
        "
        >
          View All
        </button>

      </div>

      <div
        className="
        flex
        gap-7
        overflow-x-auto
        pb-4
        no-scrollbar
      "
      >
        {places.map((place) => (
          <RecommendationCard
            key={place.name}
            place={place}
          />
        ))}
      </div>
    </section>
  );
}