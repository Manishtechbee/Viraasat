import JourneyPlaceCard from "./JourneyPlaceCard";

// import hawa from "../../assets/dashboard/hawa.jpg";
// import qutub from "../../assets/dashboard/qutub.jpg";
// import meenakshi from "../../assets/dashboard/meenakshi.jpg";
// import sunTemple from "../../assets/dashboard/suntemple.jpg";

const places = [
  {
    name: "Hawa Mahal",
    location: "Jaipur, Rajasthan",
    progress: 60,
    image:undefined,
  },
  {
    name: "Qutub Minar",
    location: "Delhi",
    progress: 40,
    image:undefined,
  },
  {
    name: "Meenakshi Temple",
    location: "Madurai, Tamil Nadu",
    progress: 20,
    image:undefined,
  },
  {
    name: "Sun Temple",
    location: "Konark, Odisha",
    progress: 10,
    image:undefined,
  },
];

export default function ContinueJourney() {
  return (
    <section
      className="
        bg-white
        rounded-[28px]
        border border-[#EEE3D8]
        p-8
      "
    >
      {/* Heading */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-[34px] font-cormorant font-semibold text-[#2D221A]">
            Continue Your Journey
          </h2>

          <p className="text-[#8C7A69] mt-1">
            Resume exploring the places you've started.
          </p>

        </div>

        <button
          className="
            text-[#8B5A2B]
            font-medium
            hover:underline
          "
        >
          View All
        </button>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-4 gap-6 mt-8">

        {places.map((place) => (
          <JourneyPlaceCard
            key={place.name}
            place={place}
          />
        ))}

      </div>

    </section>
  );
}