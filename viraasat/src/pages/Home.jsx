import React from "react";
import Navbar from "../components/Navbar";
import HeroSearch from "../components/Hero";

import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";

import taj from "../assets/taj.jpg";
import hampi from "../assets/hampi.jpg";
import golden from "../assets/goldenTemple.jpg";
import konark from "../assets/konark.jpg";
import fort from "../assets/mehrangarh.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const places = [
  {
    title: "Taj Mahal",
    location: "Uttar Pradesh",
    image: taj,
    rating: "4.8",
    slug:"taj-mahal",
  },
  {
    title: "Hampi",
    location: "Karnataka",
    image: hampi,
    rating: "4.8",
    slug:"hampi",
  },
  {
    title: "Golden Temple",
    location: "Punjab",
    image: golden,
    rating: "4.9",
    slug:"golden-temple",
  },
  {
    title: "Konark Sun Temple",
    location: "Odisha",
    image: konark,
    rating: "4.8",
    slug:"konark-sun-temple",
  },
  {
    title: "Mehrangarh Fort",
    location: "Rajasthan",
    image: fort,
    rating: "4.7",
    slug:"mehrangarh-fort",
  },
  {
    title: "Konark Sun Temple",
    location: "Odisha",
    image: konark,
    rating: "4.8",
    slug:"konark-sun-temple",
  },
  
];

export default function Home() {
  const { t } = useTranslation("common");
  const navigate= useNavigate();
  const sliderRef = useRef(null);
  const scrollLeft = () => {
  sliderRef.current?.scrollBy({
    left: -350,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  sliderRef.current?.scrollBy({
    left: 350,
    behavior: "smooth",
  });
};
  return (
    <>
      <HeroSearch />
      
      <section className="w-full mt-10 px-10 mb-10">
        {/* Heading */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[34px] font-cormorant font-bold text-[#2F241B]">
              Featured Heritage
            </h2>

            <p className="text-gray-500 mt-1">
              Explore India's most iconic cultural treasures
            </p>
          </div>
        </div>

        {/* Slider Layout */}
        <div className="flex items-center">
          {/* Left Arrow */}
          <button
          onClick={scrollLeft}

            className="
        w-12
        h-12
        transition
        shrink-0
        
      "
          >
            <ChevronLeft className="mx-auto" size={20} />
          </button>

          {/* Cards */}
            <div
  ref={sliderRef}
  className="
    flex
    overflow-x-auto
    gap-5
    scroll-smooth
    flex-1
    scrollbar-hide
  "
>
            {places.map((item, idx) => (
              <div
  key={idx || item.slug}
  onClick={() => navigate(`/exploreHeritages/${item.slug}`)}
  className="
    min-w-[290px]
    max-w-[300px]
    shrink-0
    group
    rounded-2xl
    overflow-hidden
    bg-white
    border
    border-[#ECE5DA]
    shadow-md
    hover:shadow-lg
    hover:-translate-y-2
    transition-all
    duration-500
    cursor-pointer
    mt-[10px]
  "
>
                <div className="relative h-[230px] overflow-hidden" >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                w-full
                h-full
                object-cover
                group-hover:scale-110
                transition-transform
                duration-700
              "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold">
                      {item.title}
                    </h3>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-white" />

                        <span className="text-white text-xs">
                          {item.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star
                          size={13}
                          fill="#FBBF24"
                          className="text-yellow-400"
                        />

                        <span className="text-white text-xs">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
          onClick={scrollRight}

            className="
        w-12
        h-12
        transition
        shrink-0
      "
          >
            <ChevronRight className="mx-auto" size={20} />
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}




function LanguageTest() {

  return (
    <div className="p-10 space-y-4">
      <h1>{t("home.title")}</h1>

      <p>{t("navbar.home")}</p>

      <p>{t("navbar.explore")}</p>

      <p>{t("navbar.map")}</p>

      <p>{t("navbar.aiGuide")}</p>
    </div>
  );
}