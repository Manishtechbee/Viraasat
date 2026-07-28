import {
  MapPinned,
  Route,
  ShieldCheck,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Places Explored",
    value: "24",
    subtitle: "Keep exploring!",
    icon: MapPinned,
    bg: "bg-[#FFF3E8]",
    color: "text-[#E58C2B]",
  },
  {
    title: "Journeys Completed",
    value: "6",
    subtitle: "Amazing journeys",
    icon: Route,
    bg: "bg-[#EEF8EF]",
    color: "text-[#4C9A63]",
  },
  {
    title: "Badges Earned",
    value: "8",
    subtitle: "You're doing great!",
    icon: ShieldCheck,
    bg: "bg-[#F3EEFF]",
    color: "text-[#8266D4]",
  },
  {
    title: "Points",
    value: "1250",
    subtitle: "Level 3 Explorer",
    icon: Star,
    bg: "bg-[#F7F0FF]",
    color: "text-[#9C6ADE]",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              rounded-[22px]
              border border-[#EFE3D7]
              px-6
              py-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-3">

              <div
                className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  ${item.bg}
                `}
              >
                <Icon
                  className={item.color}
                  size={22}
                />
              </div>

              <div>
                <p className="text-[14px] text-[#6D5F53]">
                  {item.title}
                </p>

                <h2 className="mt-1 text-[38px] font-semibold font-cormorant text-[#2E221B] leading-none">
                  {item.value}
                </h2>
              </div>

            </div>

            <p className="mt-4 text-[13px] text-[#A09082]">
              {item.subtitle}
            </p>

          </div>
        );
      })}

    </div>
  );
}