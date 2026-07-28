import { useState } from "react";

import {
  Eye,
  History,
  Landmark,
  Utensils,
  Store,
  Users,
  MapPin,
  Images,
  Star,
  CircleHelp,
} from "lucide-react";

import OverviewSection from "./OverviewSection";
import HistorySection from "./HistorySection";
import ArchitectureSection from "./ArchitectureSection";
import CuisineSection from "./CuisineSection";
import MarketSection from "./MarketSection";
import LocalsSection from "./LocalsSection";
import PlacesToVisitSection from "./PlacesToVisitSection";
import GallerySection from "./GallerySection";


const defaultTabs = [
  {
    label: "Overview",
    icon: Eye,
  },
  {
    label: "History",
    icon: History,
  },
  {
    label: "Architecture",
    icon: Landmark,
  },
  {
    label: "Cuisine",
    icon: Utensils,
  },
  {
    label: "Market",
    icon: Store,
  },
  {
    label: "Locals",
    icon: Users,
  },
  {
    label: "Places to Visit",
    icon: MapPin,
  },
  
];


export default function DetailTabs({
  heritage,
  tabs = defaultTabs,
}) {

  const [active, setActive] = useState(
    tabs[0]?.label || "Overview"
  );


  const renderContent = () => {

    switch (active) {

      case "Overview":
        return (
          <OverviewSection
            heritage={heritage}
          />
        );


      case "History":
        return (
          <HistorySection
            heritage={heritage}
          />
        );


      case "Architecture":
        return (
          <ArchitectureSection
            heritage={heritage}
          />
        );


      case "Cuisine":
        return (
          <CuisineSection
            heritage={heritage}
          />
        );


      case "Market":
        return (
          <MarketSection
            heritage={heritage}
          />
        );


      case "Locals":
        return (
          <LocalsSection
            heritage={heritage}
          />
        );


      case "Places to Visit":
        return (
          <PlacesToVisitSection
            heritage={heritage}
          />
        );


      case "Gallery":
        return (
          <GallerySection
            heritage={heritage}
          />
        );


     


      default:
        return (
          <OverviewSection
            heritage={heritage}
          />
        );
    }
  };


  return (
    <div
      className="
        w-full
        h-[650px]
        rounded-[14px]
        px-4

        bg-[#FFFDFC]

        border
        border-[#E9DED2]

        shadow-[0_8px_25px_rgba(70,40,15,0.05)]

        overflow-hidden
      "
    >

      {/* ==================================================
          TABS
      ================================================== */}

      <div
        className="
          w-full
          h-[60px]

          flex
          items-stretch

          border-b
          border-[#E9DED2]

          px-2
        "
      >

        {tabs.map((tab, index) => {

          const Icon = tab.icon;
          const isActive = active === tab.label;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(tab.label)}
              className={`
                relative

                flex-1
                min-w-0

                h-full

                flex
                items-center
                justify-center

                gap-[4px]

                px-[2px]

                text-[15px]
                

                font-semibold

                whitespace-nowrap

                transition-all
                duration-200

                ${
                  isActive
                    ? "text-[#8B4A17]"
                    : "text-[#5F554E] hover:text-[#8B4A17]"
                }
              `}
            >

              <Icon
                size={16}
                strokeWidth={1.8}
                className={`
                  shrink-0

                  ${
                    isActive
                      ? "text-[#A85D24]"
                      : "text-[#776B62]"
                  }
                `}
              />

              <span className="truncate">
                {tab.label}
              </span>


              {/* ACTIVE INDICATOR */}

              {isActive && (
                <span
                  className="
                    absolute

                    bottom-0
                    left-[12%]
                    right-[10%]

                    h-[3px]

                    rounded-t-full

                    bg-[#8B4A17]
                  "
                />
              )}

            </button>
          );

        })}

      </div>


      {/* ==================================================
          ACTIVE TAB CONTENT
      ================================================== */}

      <div className="w-full">

        {renderContent()}

      </div>

    </div>
  );
}