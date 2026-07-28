import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HeritageAbout({ heritage }) {
  const [expanded, setExpanded] = useState(false);

  if (!heritage) return null;

  const description =
    heritage.description ||
    heritage.shortDescription ||
    "No information is available for this heritage site.";

  // Don't show Read More when description is already short
  const shouldExpand = description.length > 300;

  return (
    <section
      className="
        mt-5
        pt-5
        border-t
        border-[#E8DDD0]
      "
    >
      {/* Heading */}

      <h2
        className="
          font-cormorant

          text-[24px]
          leading-tight
          font-bold
          text-[#2B1C12]
        "
      >
        About {heritage.name}
      </h2>

      {/* Description */}

      <div className="mt-4">

        <p
          className={`
            text-[14px]
            leading-[1.75]
            text-[#4F4741]
            transition-all
            duration-300
            font-medium

            ${
              !expanded && shouldExpand
                ? "line-clamp-5"
                : ""
            }
          `}
        >
          {description}
        </p>

        {/* Read More */}

        {shouldExpand && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="
              mt-3
              inline-flex
              items-center
              gap-1.5
              text-[13px]
              font-semibold
              text-[#8B4A17]
              hover:text-[#6E3812]
              transition-colors
            "
          >
            {expanded ? "Read Less" : "Read More"}

            {expanded ? (
              <ChevronUp size={15} />
            ) : (
              <ChevronDown size={15} />
            )}
          </button>
        )}

      </div>
    </section>
  );
}