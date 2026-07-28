import {
  Compass,
  Map,
  Headphones,
  Quote,
  Landmark,
  Sparkles,
  ArrowRight,
  Home,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import bannerBg from "./assets/bannerBg.png";
import Error from "./assets/error.png";

const cards = [
  {
    title: "Explore Places",
    desc: "Discover heritage sites, monuments and cultural landmarks.",
    icon: Compass,
    link: "/explore",
    button: "Browse Places",
    bg: "bg-[#E8E3FF]",
    color: "text-[#312783]",
  },
  {
    title: "View Map",
    desc: "Find heritage locations and plan your journey easily.",
    icon: Map,
    link: "/map",
    button: "Open Map",
    bg: "bg-[#FFEEDF]",
    color: "text-[#8B4513]",
  },
  {
    title: "Audio Tours",
    desc: "Listen to immersive stories and experiences from across India.",
    icon: Headphones,
    link: "/audio-guides",
    button: "Listen Now",
    bg: "bg-[#DDF8F2]",
    color: "text-[#0F766E]",
  },
  {
    title: "AI Guide",
    desc: "Ask anything about India's history, culture and traditions.",
    icon: Sparkles,
    link: "/ai-guide",
    button: "Ask AI Guide",
    bg: "bg-[#FFF4DD]",
    color: "text-[#C58A00]",
  },
];

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
    <section className="relative overflow-hidden bg-[#FDF8F2] h-[calc(100vh-80px)] flex flex-col items-center justify-center mb-0">

      {/* Background Texture */}
      <img
        src={Error}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        alt=""
      />

      

      {/* Birds */}
      <img
        src="/birds.png"
        className="absolute left-24 top-28 w-48 opacity-60"
        alt=""
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-10">

        

        {/* 404 */}
        <h1
          className="font-['Cormorant_Garamond'] text-[180px] leading-none font-semibold text-[#232766]"
        >
          404
        </h1>

        {/* Title */}
        <div className="mt-1 flex items-center gap-5">
          <div className="h-[1px] w-10 bg-[#C89C60]" />
          <span className="text-[#C89C60] text-2xl">❦</span>

          <h2
            className="font-['Cormorant_Garamond'] text-[56px] font-semibold text-[#232766]"
          >
            Page Not Found
          </h2>

          <span className="text-[#C89C60] text-2xl">❦</span>
          <div className="h-[1px] w-10 bg-[#C89C60]" />
        </div>

        {/* Description */}
        <p className="mt-4 max-w-xl text-center font-['Plus_Jakarta_Sans'] text-[20px] leading-9 text-[#55556A]">
          Oops! The page you're looking for seems to have
          <br />
          taken a detour through history.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex gap-6">

          <button onClick={()=>navigate("/")} className="flex h-16 items-center gap-3 rounded-2xl bg-[#1c1c5a] px-9 font-['Plus_Jakarta_Sans'] text-lg font-medium text-white shadow-xl transition hover:scale-[1.02]">
            <Home size={20} />
            Go to Home
          </button>

          <button onClick={()=>navigate("/explore")} className="flex h-16 items-center gap-3 rounded-2xl border border-[#1c1c5a] bg-white px-9 font-['Plus_Jakarta_Sans'] text-lg font-medium text-[#1c1c5a] transition hover:bg-[#FAFAFF]">
            <Compass size={20} />
            Explore Heritage
          </button>

        </div>
      </div>

      
<div className="relative z-10 mt-8 flex flex-col items-center">
  {/* Heading */}
    <h2 className="font-['Cormorant_Garamond'] text-[52px] font-semibold text-[#1F235B]">
      What can you do?
    </h2>

    {/* Ornament */}
    <div className="mt-2 flex items-center justify-center gap-3">
      <div className="h-[1px] w-14 bg-[#C9A46A]" />
      <span className="text-[#C9A46A] text-xl leading-none">✦</span>
      <div className="h-[1px] w-14 bg-[#C9A46A]" />
    </div>
</div>


    

    </section>






{/* Cards */}

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 m-16">

        {cards.map(({ title, desc, icon: Icon, bg, color, link, button }) => (

            <div
  key={title}
  className="group bg-white rounded-[28px] border border-[#EFE4D5] p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-[360px]"
>
  <div
    className={`w-20 h-20 rounded-full ${bg} flex items-center justify-center mx-auto`}
  >
    <Icon size={34} className={color} />
  </div>

  <h3 className="mt-7 text-[30px] font-semibold text-[#20196D] text-center">
    {title}
  </h3>

  <p className="mt-4 text-gray-600 leading-7 text-center flex-1">
    {desc}
  </p>

  <Link
    to={link}
    className="inline-flex items-center justify-center gap-2 mt-6 text-[#20196D] font-semibold hover:gap-3 transition-all"
  >
    {button}
    <ArrowRight size={18} />
  </Link>
</div>

        ))}

    </div>


<div className="w-[90%]  px-10  mx-auto mb-20">
      <div className="relative overflow-hidden rounded-[22px] border border-[#E7D8C5] h-[162px]">

        {/* Background Image */}
        <img
          src={bannerBg}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-[#FFF9F2]/30 backdrop-blur-[1px]" />

        {/* Content */}
        <div className="relative flex h-[128px] items-center justify-around pt-5px-10">

          {/* Left */}
          <div className="flex items-start gap-4">

            <Quote
              size={26}
              strokeWidth={2.2}
              fill="#B67A42"
              className="rotate-180 text-[#B67A42]"
            />

            <div>
              <h2 className="font-cormorant text-[20px] leading-7 tracking-[0.04em] text-[#44352B] font-bold">
                History is not a burden on the memory
                <br />
                but an illumination of the soul.
              </h2>

              <p className="mt-3 text-[15px] text-[#6E5D4D] ">
                – Lord Acton
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-14 w-px bg-[#DCC8B3]" />

          {/* Right */}
          <div className="flex items-center gap-5 ">

            <Landmark
              size={38}
              strokeWidth={1.7}
              className="text-[#A86D3D]"
            />

            <div>
              <h3 className="font-cormorant text-[21px] text-[#44352B] tracking-[0.04em] font-bold">
                Let's keep exploring
              </h3>

              <p className="mt-1 max-w-[240px] text-[16px] leading-6  tracking-[0.03em] text-[#65584C]">
                There's so much more of India's
                <br />
                heritage waiting for you.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
    </>
  )
}
