import {
  Camera,
  Award,
  Heart,
  MapPinned,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Visited Taj Mahal",
    subtitle: "Agra, Uttar Pradesh",
    time: "2 hours ago",
    icon: Camera,
    color: "bg-[#FFF2E3]",
    iconColor: "text-[#D9822B]",
  },
  {
    id: 2,
    title: "Earned Heritage Badge",
    subtitle: "Explorer Level 3",
    time: "Yesterday",
    icon: Award,
    color: "bg-[#F4EEFF]",
    iconColor: "text-[#7758D8]",
  },
  {
    id: 3,
    title: "Saved Hampi",
    subtitle: "Karnataka",
    time: "2 days ago",
    icon: Heart,
    color: "bg-[#FFEDED]",
    iconColor: "text-[#E14D5A]",
  },
  {
    id: 4,
    title: "Completed Delhi Tour",
    subtitle: "4 Heritage Sites",
    time: "Last Week",
    icon: MapPinned,
    color: "bg-[#EEF8EF]",
    iconColor: "text-[#4B9D65]",
  },
];

export default function RecentActivity() {
  return (
    <section
      className="
      bg-white
      rounded-[28px]
      border
      border-[#EEE3D7]
      p-7
      h-full
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2
            className="
            font-cormorant
            text-[30px]
            font-semibold
            text-[#2E221B]
          "
          >
            Recent Activity
          </h2>

          <p className="text-[#8B7B6D] mt-1">
            Your latest heritage journey.
          </p>

        </div>

      </div>

      {/* Timeline */}

      <div className="relative mt-8">

        {/* Vertical Line */}

        <div
          className="
          absolute
          left-[23px]
          top-0
          bottom-0
          w-[2px]
          bg-[#EFE3D8]
        "
        />

        <div className="space-y-6">

          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="relative flex gap-4"
              >
                {/* Icon */}

                <div
                  className={`
                  relative
                  z-10
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  ${activity.color}
                `}
                >
                  <Icon
                    size={20}
                    className={activity.iconColor}
                  />
                </div>

                {/* Card */}

                <div
                  className="
                  flex-1
                  rounded-2xl
                  border
                  border-[#F1E6DA]
                  bg-[#FCFAF8]
                  px-5
                  py-4
                  hover:shadow-md
                  transition
                "
                >
                  <h3 className="font-semibold text-[#2E221B]">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-[#8A7B6C] mt-1">
                    {activity.subtitle}
                  </p>

                  <p className="text-xs text-[#B0A193] mt-3">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <button
        className="
        w-full
        mt-8
        h-12
        rounded-xl
        border
        border-[#E8DCCD]
        text-[#8B5A2B]
        font-medium
        hover:bg-[#FBF5EF]
        transition
      "
      >
        View All Activity
      </button>
    </section>
  );
}