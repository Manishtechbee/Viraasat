import { Outlet } from "react-router-dom";
import { useState } from "react";

import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import HeritageNav from "../components/Heritage/HeritageNav";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#2F2118]">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-[999]
          w-full
          border-b
          border-[#E8DED2]/80
          bg-[#FFFDF9]/75
          backdrop-blur-2xl
          supports-[backdrop-filter]:bg-[#FFFDF9]/60
        "
      >
        <div className="relative">
          <HeritageNav />
        </div>
      </header>


      {/* =====================================================
          DASHBOARD AREA
      ===================================================== */}

      <div className="relative min-h-[calc(100vh-72px)]">

        {/* -----------------------------------------------
            Background decoration
        ----------------------------------------------- */}

        <div
          className="
            pointer-events-none
            fixed
            inset-0
            -z-10
            overflow-hidden
          "
        >
          {/* Top warm glow */}
          <div
            className="
              absolute
              -left-32
              -top-32
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#E8D2B8]/25
              blur-[100px]
            "
          />

          {/* Right subtle blue glow */}
          <div
            className="
              absolute
              -right-40
              top-[20%]
              h-[500px]
              w-[500px]
              rounded-full
              bg-[#C9DDE1]/20
              blur-[120px]
            "
          />

          {/* Bottom warm glow */}
          <div
            className="
              absolute
              bottom-[-180px]
              left-[35%]
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#DCC5A8]/15
              blur-[100px]
            "
          />
        </div>


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <DashboardSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main
          className={`
            relative
            min-h-[calc(100vh-72px)]
            min-w-0

            transition-[margin]
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${isOpen ? "ml-[285px]" : "ml-[56px]"}
          `}
        >
          {/* Content container */}

          <div
            className="
              min-h-[calc(100vh-72px)]
              px-5
              py-6
              sm:px-7
              sm:py-7
              lg:px-9
              lg:py-8
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-[1600px]
              "
            >
              <Outlet />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}