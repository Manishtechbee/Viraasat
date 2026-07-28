export default function HeritageDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFFBF6]">

      {/* =====================================================
          NAVBAR SKELETON
      ===================================================== */}

      <div
        className="
          sticky
          top-0
          z-[999]
          w-full
          h-[78px]
          bg-[#FFFBF6]/90
          backdrop-blur-[30px]
          border-b
          border-[#EDE2D6]
          flex
          items-center
          px-10
        "
      >

        <div className="flex items-center justify-between w-full">

          {/* Logo */}

          <Skeleton
            className="
              w-[145px]
              h-[34px]
              rounded-lg
            "
          />

          {/* Navigation */}

          <div className="flex items-center gap-8">

            <Skeleton className="w-[55px] h-4 rounded-full" />
            <Skeleton className="w-[72px] h-4 rounded-full" />
            <Skeleton className="w-[65px] h-4 rounded-full" />
            <Skeleton className="w-[80px] h-4 rounded-full" />

          </div>

          {/* Profile */}

          <div className="flex items-center gap-3">

            <Skeleton className="w-10 h-10 rounded-full" />

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          max-w-[1550px]
          mx-auto
          px-8
          pb-20
          ml-10
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            grid
            grid-cols-12
            gap-12
            mt-5
          "
        >

          {/* ===============================
              LEFT — GALLERY
          =============================== */}

          <div className="col-span-4">

            <GallerySkeleton />

            {/* ABOUT BELOW GALLERY */}

            <AboutSkeleton />

            {/* LOCATION BELOW ABOUT */}

            <LocationSkeleton />

          </div>


          {/* ===============================
              CENTER — HERO INFO
          =============================== */}

          <div className="col-span-8">

            <HeroInfoSkeleton />

            {/* =========================
                TABS
            ========================= */}

            <TabsSkeleton />

            {/* =========================
                TAB CONTENT
            ========================= */}

            <OverviewSkeleton />

          </div>

        </section>

      </div>


      {/* =====================================================
          FOOTER SKELETON
      ===================================================== */}

      <FooterSkeleton />

    </div>
  );
}


/* ============================================================
   BASE SKELETON
============================================================ */

function Skeleton({
  className = "",
}) {

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-[#EFE4D7]
        ${className}
      `}
    >

      <div
        className="
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_1.8s_infinite]
          bg-gradient-to-r
          from-transparent
          via-[#F9F2E9]/80
          to-transparent
        "
      />

    </div>
  );
}


/* ============================================================
   GALLERY
============================================================ */

function GallerySkeleton() {

  return (
    <div>

      {/* Main image */}

      <div
        className="
          relative
          w-full
          h-[610px]
          rounded-[28px]
          overflow-hidden
          border
          border-[#E8DDD0]
          bg-[#F0E7DC]
        "
      >

        <Skeleton
          className="
            absolute
            inset-0
            w-full
            h-full
            rounded-none
          "
        />


        {/* Heart */}

        <Skeleton
          className="
            absolute
            top-5
            right-5
            w-11
            h-11
            rounded-full
          "
        />


        {/* Arrows */}

        <div
          className="
            absolute
            left-5
            right-5
            top-1/2
            -translate-y-1/2
            flex
            justify-between
          "
        >

          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />

        </div>


        {/* Bottom image indicator */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            flex
            gap-2
          "
        >

          <Skeleton className="w-7 h-1.5 rounded-full" />
          <Skeleton className="w-2 h-1.5 rounded-full" />
          <Skeleton className="w-2 h-1.5 rounded-full" />

        </div>

      </div>


      {/* thumbnails */}

      <div className="flex gap-3 mt-4">

        {[1, 2, 3, 4].map((item) => (

          <Skeleton
            key={item}
            className="
              w-[72px]
              h-[62px]
              rounded-[10px]
            "
          />

        ))}

      </div>

    </div>
  );
}


/* ============================================================
   HERO INFO
============================================================ */

function HeroInfoSkeleton() {

  return (
    <div className="flex flex-col">

      {/* category + actions */}

      <div className="flex justify-between items-center">

        <Skeleton
          className="
            w-[105px]
            h-[32px]
            rounded-full
          "
        />

        <div className="flex gap-7">

          <Skeleton className="w-[68px] h-5 rounded-full" />
          <Skeleton className="w-[60px] h-5 rounded-full" />

        </div>

      </div>


      {/* title */}

      <Skeleton
        className="
          mt-6
          w-[70%]
          h-[67px]
          rounded-xl
        "
      />


      {/* location / rating */}

      <div className="flex items-center gap-8 mt-6">

        <div className="flex items-center gap-2">

          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-[145px] h-4 rounded-full" />

        </div>

        <div className="flex items-center gap-2">

          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-[32px] h-4 rounded-full" />
          <Skeleton className="w-[95px] h-4 rounded-full" />

        </div>

      </div>


      {/* description */}

      <div className="mt-7 space-y-3">

        <Skeleton className="w-full h-4 rounded-full" />
        <Skeleton className="w-[96%] h-4 rounded-full" />
        <Skeleton className="w-[88%] h-4 rounded-full" />
        <Skeleton className="w-[64%] h-4 rounded-full" />

      </div>


      {/* facts */}

      <div
        className="
          mt-8
          rounded-[14px]
          border
          border-[#E8DDD0]
          overflow-hidden
          bg-[#FFFDFC]
        "
      >

        <div className="grid grid-cols-4">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="
                px-5
                py-5
                flex
                items-center
                gap-4
                border-r
                border-[#E8DDD0]
                last:border-r-0
              "
            >

              <Skeleton
                className="
                  w-10
                  h-10
                  rounded-xl
                  shrink-0
                "
              />

              <div className="space-y-2">

                <Skeleton className="w-[55px] h-3 rounded-full" />
                <Skeleton className="w-[75px] h-4 rounded-full" />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   TABS
============================================================ */

function TabsSkeleton() {

  const tabs = [
    "Overview",
    "History",
    "Architecture",
    "Gallery",
    "Places to Visit",
  ];

  return (
    <div
      className="
        mt-7
        h-[58px]
        border-b
        border-[#E6D9CC]
        flex
        items-end
        gap-8
      "
    >

      {tabs.map((tab, index) => (

        <div
          key={tab}
          className="
            relative
            pb-4
            px-1
          "
        >

          <Skeleton
            className={`
              h-4
              rounded-full
              ${
                index === 0
                  ? "w-[70px]"
                  : index === 1
                  ? "w-[58px]"
                  : index === 2
                  ? "w-[92px]"
                  : index === 3
                  ? "w-[55px]"
                  : "w-[110px]"
              }
            `}
          />

          {index === 0 && (

            <Skeleton
              className="
                absolute
                bottom-[-1px]
                left-0
                right-0
                h-[3px]
                rounded-full
              "
            />

          )}

        </div>

      ))}

    </div>
  );
}


/* ============================================================
   OVERVIEW
============================================================ */

function OverviewSkeleton() {

  return (
    <div className="mt-6 p-[16px]">

      {/* History */}

      <div
        className="
          grid
          grid-cols-[1fr_154px]
          gap-7
          px-[3px]
          pb-[20px]
        "
      >

        <div>

          <Skeleton
            className="
              w-[75px]
              h-6
              rounded-full
              mb-4
            "
          />

          <div className="space-y-2">

            <Skeleton className="w-full h-3 rounded-full" />
            <Skeleton className="w-[96%] h-3 rounded-full" />
            <Skeleton className="w-[90%] h-3 rounded-full" />
            <Skeleton className="w-[72%] h-3 rounded-full" />

          </div>

        </div>

        <Skeleton
          className="
            w-[154px]
            h-[126px]
            rounded-[10px]
          "
        />

      </div>


      {/* Cards */}

      <div className="grid grid-cols-2 gap-[12px]">

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="
              min-h-[145px]
              rounded-[10px]
              border
              border-[#EEE4D8]
              p-[12px]
              flex
              items-center
              gap-4
              bg-[#FFFDFC]
            "
          >

            <div className="flex-1 space-y-3">

              <Skeleton
                className="
                  w-[75px]
                  h-4
                  rounded-full
                "
              />

              <Skeleton className="w-full h-3 rounded-full" />
              <Skeleton className="w-[90%] h-3 rounded-full" />
              <Skeleton className="w-[72%] h-3 rounded-full" />

            </div>

            <Skeleton
              className="
                shrink-0
                w-[114px]
                h-[110px]
                rounded-[9px]
              "
            />

          </div>

        ))}

      </div>

    </div>
  );
}


/* ============================================================
   ABOUT
============================================================ */

function AboutSkeleton() {

  return (
    <section className="mt-8">

      <Skeleton
        className="
          w-[85px]
          h-7
          rounded-full
          mb-4
        "
      />

      <div className="space-y-3">

        <Skeleton className="w-full h-4 rounded-full" />
        <Skeleton className="w-[94%] h-4 rounded-full" />
        <Skeleton className="w-[82%] h-4 rounded-full" />
        <Skeleton className="w-[60%] h-4 rounded-full" />

      </div>

    </section>
  );
}


/* ============================================================
   LOCATION
============================================================ */

function LocationSkeleton() {

  return (
    <section className="mt-8">

      <div className="flex items-center gap-3 mb-4">

        <Skeleton
          className="
            w-8
            h-8
            rounded-[8px]
          "
        />

        <Skeleton
          className="
            w-[90px]
            h-7
            rounded-full
          "
        />

      </div>


      <div
        className="
          w-full
          rounded-[14px]
          border
          border-[#E7DCCE]
          bg-[#FFFDFC]
          overflow-hidden
        "
      >

        {/* Map */}

        <Skeleton
          className="
            w-full
            h-[180px]
            rounded-none
          "
        />


        {/* Details */}

        <div className="p-5">

          <div className="flex items-center gap-4">

            <Skeleton
              className="
                w-[48px]
                h-[48px]
                rounded-[13px]
                shrink-0
              "
            />

            <div className="flex-1 space-y-2">

              <Skeleton className="w-[75px] h-3 rounded-full" />

              <Skeleton className="w-full h-5 rounded-full" />

              <Skeleton className="w-[120px] h-3 rounded-full" />

            </div>

          </div>


          <Skeleton
            className="
              mt-5
              w-full
              h-[45px]
              rounded-[11px]
            "
          />

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   FOOTER
============================================================ */

function FooterSkeleton() {

  return (
    <div
      className="
        mt-10
        border-t
        border-[#E8DDD0]
        bg-[#F8F0E6]
        px-12
        py-12
      "
    >

      <div className="max-w-[1450px] mx-auto">

        <Skeleton className="w-[150px] h-7 rounded-lg" />

        <div className="grid grid-cols-4 gap-10 mt-8">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="space-y-3"
            >

              <Skeleton className="w-[90px] h-4 rounded-full" />
              <Skeleton className="w-[130px] h-3 rounded-full" />
              <Skeleton className="w-[110px] h-3 rounded-full" />
              <Skeleton className="w-[145px] h-3 rounded-full" />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}