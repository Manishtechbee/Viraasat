import {
  MapPin,
  Castle,
  Flag,
  ChevronRight,
} from "lucide-react";

const places = [
  {
    id: 1,
    name: "Red Fort",
    x: "12%",
    y: "65%",
    active: true,
  },
  {
    id: 2,
    name: "Taj Mahal",
    x: "36%",
    y: "48%",
    active: true,
  },
  {
    id: 3,
    name: "Hawa Mahal",
    x: "60%",
    y: "35%",
    active: false,
  },
  {
    id: 4,
    name: "Konark",
    x: "84%",
    y: "60%",
    active: false,
  },
];

export default function JourneyMap() {
  return (
    <section
      className="
      bg-white
      rounded-[28px]
      border
      border-[#EEE3D7]
      overflow-hidden
      "
    >
      {/* Header */}

      <div className="px-7 pt-7 flex justify-between items-center">

        <div>

          <h2 className="font-cormorant text-[32px] font-semibold text-[#2E221B]">
            Journey Map
          </h2>

          <p className="text-[#8B7B6D] mt-1">
            Track your heritage exploration.
          </p>

        </div>

        <button
          className="
          flex
          items-center
          gap-2
          text-[#8B5A2B]
          font-medium
          "
        >
          View Route

          <ChevronRight size={18} />
        </button>

      </div>

      {/* Map */}

      <div
        className="
        relative
        h-[370px]
        mt-7
        bg-[#F7F2EB]
        "
      >
        {/* Decorative Paths */}

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <path
            d="M100 350
               C250 220,
               350 260,
               480 180
               S700 140,
               880 250"
            stroke="#D6B48C"
            strokeWidth="4"
            strokeDasharray="12 12"
            fill="none"
          />
        </svg>

        {/* Markers */}

        {places.map((place) => (
          <div
            key={place.id}
            style={{
              left: place.x,
              top: place.y,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={`
                w-12
                h-12
                rounded-full
                flex
                items-center
                justify-center
                shadow-lg
                ${
                  place.active
                    ? "bg-[#B97434]"
                    : "bg-white"
                }
              `}
            >
              {place.active ? (
                <Castle
                  size={22}
                  className="text-white"
                />
              ) : (
                <MapPin
                  size={22}
                  className="text-[#B97434]"
                />
              )}
            </div>

            <p
              className="
              mt-2
              text-center
              text-[13px]
              font-medium
              text-[#5D4A3B]
              whitespace-nowrap
              "
            >
              {place.name}
            </p>
          </div>
        ))}

        {/* Destination */}

        <div
          className="
          absolute
          bottom-8
          right-8
          bg-white
          rounded-2xl
          shadow-lg
          border
          border-[#EEE3D7]
          px-5
          py-4
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            w-11
            h-11
            rounded-full
            bg-[#F7E8D6]
            flex
            items-center
            justify-center
            "
          >
            <Flag
              size={20}
              className="text-[#B97434]"
            />
          </div>

          <div>

            <p className="text-sm text-[#7A6B5C]">
              Next Destination
            </p>

            <h4 className="font-semibold text-[#2E221B]">
              Hampi
            </h4>

          </div>

        </div>

      </div>
    </section>
  );
}