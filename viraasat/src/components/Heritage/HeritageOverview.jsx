import {
  Clock3,
  CalendarDays,
  MapPin,
  IndianRupee,
  Sparkles,
  Play,
} from "lucide-react";

const tabs = [
  "Overview",
  "History",
  "Architecture",
  "Gallery",
  "Nearby",
  "Reviews",
  "Audio Guide",
];

export default function HeritageOverview() {
  return (
    <div className="relative bg-white rounded-b-3xl border border-t-0 border-gray-200">

      {/* ================= Tabs ================= */}

      <div className="border-b border-gray-200 px-8">

        <div className="flex items-center gap-8 h-14">

          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`relative text-sm font-medium transition ${
                index === 0
                  ? "text-[#312783]"
                  : "text-gray-500 hover:text-[#312783]"
              }`}
            >
              {tab}

              {index === 0 && (
                <span className="absolute left-0 -bottom-[18px] h-[3px] w-full rounded-full bg-[#312783]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Content ================= */}

      <div className="grid grid-cols-2 gap-8 p-8">

        {/* Left */}

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            About Hampi
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-gray-600">
            Hampi, the ancient capital of the Vijayanagara Empire, is a
            UNESCO World Heritage Site famous for its magnificent ruins,
            temples and rich cultural heritage. Massive stone structures,
            bustling bazaars and breathtaking landscapes make it one of
            India's most fascinating historical destinations.
          </p>

          {/* Information */}

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-8">

            <InfoItem
              icon={<CalendarDays size={18} />}
              title="Best Time"
              value="Oct – Feb"
            />

            <InfoItem
              icon={<Clock3 size={18} />}
              title="Timings"
              value="6:00 AM – 6:00 PM"
            />

            <InfoItem
              icon={<IndianRupee size={18} />}
              title="Entry Fee"
              value="₹40 (Indians)"
            />

            <InfoItem
              icon={<MapPin size={18} />}
              title="Location"
              value="Hospet, Karnataka"
            />

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="overflow-hidden rounded-2xl border border-gray-200 h-[290px]">

            <iframe
              title="Map"
              className="w-full h-full"
              loading="lazy"
              src="https://maps.google.com/maps?q=Hampi&t=&z=11&ie=UTF8&iwloc=&output=embed"
            />

          </div>

        </div>

      </div>

      {/* Floating Buttons */}

      <div className="absolute right-6 top-20 flex flex-col gap-3">

        <button className="flex items-center gap-2 rounded-full bg-[#312783] text-white px-5 h-11 shadow-lg hover:bg-[#251c64] transition">
          <Sparkles size={18} />
          Ask AI
        </button>

        <button className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-5 h-11 shadow hover:bg-gray-50 transition">
          <Play size={16} />
          Play Audio
        </button>

      </div>

    </div>
  );
}

function InfoItem({ icon, title, value }) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 text-[#312783]">
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-500">
          {title}
        </p>

        <p className="font-medium text-gray-900">
          {value}
        </p>

      </div>

    </div>
  );
}