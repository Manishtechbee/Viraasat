export default function OverviewSection({ heritage }) {
  if (!heritage) return null;

  return (
    <section
      id="overview"
      className="
        w-full
        px-[16px]
        py-[18px]
      "
    >
      {/* =====================================================
          HISTORY
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-[1fr_154px]
          gap-7
          pb-5
        "
      >
        {/* Text */}

        <div className="min-w-0">

          <h2
            className="
              font-cormorant
              text-[21px]
              font-semibold
              leading-tight
              text-[#2B1C12]
              mb-3
            "
          >
            History
          </h2>

          <p
            className="
              text-[13px]
              leading-[1.65]
              font-normal
              text-[#4F4741]
              max-w-[620px]
            "
          >
            {heritage.history || heritage.description}
          </p>

        </div>


        {/* History Image */}

        {(heritage.historyImage || heritage.image) && (
          <div
            className="
              w-[154px]
              h-[126px]
              rounded-[10px]
              overflow-hidden
              self-start
            "
          >
            <img
              src={heritage.historyImage || heritage.image}
              alt={`${heritage.name} history`}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          </div>
        )}

      </div>


      {/* =====================================================
          OVERVIEW CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-[12px]
        "
      >

        <OverviewCard
          title="Cuisine"
          text={heritage.cuisine}
          image={heritage.cuisineImage}
        />

        <OverviewCard
          title="Market"
          text={heritage.market}
          image={heritage.marketImage}
        />

        <OverviewCard
          title="Locals"
          text={heritage.locals}
          image={heritage.localsImage}
        />

        <OverviewCard
          title="Places to Visit"
          text={heritage.nearbyDescription}
          image={heritage.placesImage}
        />

      </div>

    </section>
  );
}


/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
  title,
  text,
  image,
}) {
  return (
    <article
      className="
        min-h-[145px]
        rounded-[10px]
        border
        border-[#EEE4D8]
        bg-[#FFFDFC]
        px-[12px]
        py-[12px]

        flex
        items-center
        gap-4

        transition-all
        duration-300

        hover:border-[#E3D1BD]
        hover:shadow-[0_4px_14px_rgba(91,65,42,0.06)]
      "
    >

      {/* TEXT */}

      <div className="flex-1 min-w-0">

        <h3
          className="
            font-cormorant
            text-[16px]
            font-semibold
            leading-tight
            text-[#2B1C12]
            mb-[9px]
          "
        >
          {title}
        </h3>

        <p
          className="
            text-[12px]
            leading-[1.55]
            font-normal
            text-[#4F4741]
          "
        >
          {text || "Information not available."}
        </p>

      </div>


      {/* IMAGE */}

      {image && (
        <div
          className="
            shrink-0
            w-[114px]
            h-[110px]
            rounded-[9px]
            overflow-hidden
          "
        >
          <img
            src={image}
            alt={title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      )}

    </article>
  );
}