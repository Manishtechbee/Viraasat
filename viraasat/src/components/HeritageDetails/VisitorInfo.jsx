import {
  Clock3,
  IndianRupee,
  CalendarDays,
  Plane,
  Train,
  MapPinned,
  Navigation,
  Phone,
  Globe,
} from "lucide-react";

export default function VisitorInfo() {
  return (
    <div className="sticky top-28 space-y-6">

      {/* Visitor Information */}

      <div
        className="
        rounded-lg
        border
        border-[#E8DDD0]
        bg-white/65
        shadow-[0_15px_40px_rgba(0,0,0,.05)]
        overflow-hidden
        w-[350px]
      "
      >

        {/* Header */}

        <div className="px-6 py-5 border-b border-[#EFE5DA]">

          <h2 className="text-[22px] font-semibold text-[#2D2118]">
            Visitor Information
          </h2>

        </div>

        {/* Content */}

        <div className="p-6 space-y-5">

          <InfoRow
            icon={Clock3}
            title="Opening Hours"
            value="6:00 AM – 6:30 PM"
          />

          <InfoRow
            icon={IndianRupee}
            title="Entry Fee"
            value="₹50 (Indian)"
          />

          <InfoRow
            icon={CalendarDays}
            title="Recommended Duration"
            value="2–3 Hours"
          />

          <InfoRow
            icon={Plane}
            title="Nearest Airport"
            value="Agra Airport"
          />

          <InfoRow
            icon={Train}
            title="Railway Station"
            value="Agra Cantt"
          />

          <InfoRow
            icon={MapPinned}
            title="Distance"
            value="4 km from City Centre"
          />

          {/* Button */}

          <button
            className="
            mt-3
            w-full
            h-12
            rounded-xl
            bg-[#8B4A17]
            hover:bg-[#744016]
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition
          "
          >
            <Navigation size={18} />

            Get Directions

          </button>

        </div>

      </div>

      {/* Contact */}

      <div
        className="
        rounded-[28px]
        bg-white
        border
        border-[#E8DDD0]
        shadow-sm
        p-6
      "
      >

        <h3 className="text-lg font-semibold text-[#2B2018]">
          Official Information
        </h3>

        <div className="mt-5 space-y-4">

          <SmallRow
            icon={Phone}
            text="+91 562 2227261"
          />

          <SmallRow
            icon={Globe}
            text="www.asi.gov.in"
          />

        </div>

      </div>

    </div>
  );
}

/* ---------- Large Rows ---------- */

function InfoRow({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex gap-4">

      <div
        className="
        w-12
        h-12
        rounded-xl
        bg-[#FFF5EC]
        flex
        items-center
        justify-center
        shrink-0
      "
      >

        <Icon
          size={20}
          className="text-[#8B4A17]"
        />

      </div>

      <div>

        <p className="text-[13px] text-[#9B8877]">
          {title}
        </p>

        <p className="mt-1 font-semibold text-[#2D2118]">
          {value}
        </p>

      </div>

    </div>
  );
}

/* ---------- Small Rows ---------- */

function SmallRow({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex items-center gap-3">

      <Icon
        size={18}
        className="text-[#8B4A17]"
      />

      <span className="text-[#4A3A31]">
        {text}
      </span>

    </div>
  );
}