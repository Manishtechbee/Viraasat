import {
  Compass,
  MapPin,
  CalendarDays,
  Heart,
  ChevronRight,
} from "lucide-react";

const actions = [
  {
    label: "Explore Places",
    icon: Compass,
    action: {
      type: "navigate",
      path: "/explore",
    },
  },
  {
    label: "Plan My Trip",
    icon: CalendarDays,
    action: {
      type: "navigate",
      path: "/trips",
    },
  },
  {
    label: "Show on Map",
    icon: MapPin,
    action: {
      type: "map",
    },
  },
  {
    label: "Events Around Me",
    icon: CalendarDays,
    action: {
      type: "navigate",
      path: "/events",
    },
  },
  {
    label: "Recommend Places",
    icon: Heart,
    action: {
      type: "search",
      query: "recommended heritage places",
    },
  },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="
      rounded-[22px]
      border border-[#E9DED2]
      bg-white
      p-5
    ">

      <h3 className="font-serif text-lg">
        Quick Actions
      </h3>

      <div className="
        mt-4
        overflow-hidden
        rounded-[16px]
        border border-[#E9DED2]
      ">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => onAction(item.action)}
              className={`
                flex
                w-full
                items-center
                gap-3
                px-4 py-4
                text-sm
                hover:bg-[#FCF7EF]
                transition
                ${index !== actions.length - 1
                  ? "border-b border-[#EEE5DB]"
                  : ""
                }
              `}
            >

              <Icon
                size={18}
                strokeWidth={1.6}
                className="text-[#9A571E]"
              />

              <span className="flex-1 text-left">
                {item.label}
              </span>

              <ChevronRight size={16} />

            </button>
          );
        })}

      </div>
    </div>
  );
}