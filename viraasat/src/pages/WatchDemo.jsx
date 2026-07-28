import { Play, Clock3, Cpu, Star } from "lucide-react";
import watchBg from "../assets/watchBg.png";      // Light background
import videoThumb from "../assets/videoThumb.png"; // Video thumbnail
import Navbar from "../components/Navbar";
import { useRef, useState } from "react";
import demoVideo from "../assets/demo.mp4"
// import leftPattern from "../../assets/pattern-left.png";
// import rightPattern from "../../assets/pattern-right.png";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true)
    } else {
      videoRef.current.pause();
      setPlaying(false)
    }
  };
  return (
   <>
   
    <section className="relative overflow-hidden bg-[#F8F3EC]">
<div className="relative z-20">
  <Navbar />
</div>

      

      <div className="absolute inset-0">
        <div className="absolute top-32 left-52 h-2 w-2 rounded-full bg-[#E6B14B] blur-sm opacity-70"></div>
        <div className="absolute top-72 right-60 h-3 w-3 rounded-full bg-[#E6B14B] blur-sm opacity-50"></div>
        <div className="absolute bottom-48 left-32 h-2 w-2 rounded-full bg-[#E6B14B] blur-sm opacity-70"></div>
        <div className="absolute bottom-24 right-80 h-2 w-2 rounded-full bg-[#E6B14B] blur-sm opacity-70"></div>
      </div>

      {/* Background Image */}

      <img
        src={watchBg}
        className="absolute bottom-0 left-0 w-full object-cover opacity-88 pointer-events-none"
        alt=""
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[280px] bg-gradient-to-t from-[#0f0b08]/80 via-[#0f0b08]/35 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 pt-16">

        {/* Heading */}

        <div className="text-center">

          <h1
            className="
            font-serif
            text-[72px]
            leading-[82px]
            font-medium
            text-[#2F2016]"
          >
            Experience
            <br />
            <span className="font-semibold">India's Living Heritage</span>
          </h1>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">

            <div className="h-[1px] w-[150px] bg-[#C7A061]"></div>

            <div className="text-[#B57B29] text-lg">
              ✦
            </div>

            <div className="h-[1px] w-[150px] bg-[#C7A061]"></div>

          </div>

          <p
            className="
            mt-6
            text-[24px]
            leading-[38px]
            text-[#5A4C40]
            font-medium"
          >
            Watch how Viraasat brings culture to life
            <br />
            through AI, immersive storytelling, and exploration.
          </p>

        </div>

        {/* Video Card */}
<div
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    h-[520px]
    w-[1080px]
    rounded-[40px]
    bg-[#D9A441]/20
    blur-[90px]
    -z-10
  "
/>
        <div
  className="
    relative
    mx-auto
    mt-8
    mb-10
    w-[980px]
    overflow-hidden
    rounded-[36px]
    border-[4px]
    border-[#D5AE63]
    bg-[#20160F]

    shadow-[0_12px_30px_rgba(0,0,0,0.18),0_35px_70px_rgba(0,0,0,0.35),0_80px_120px_rgba(0,0,0,0.28)]

"
>
    

         
          <video
  ref={videoRef}
  className="h-[580px] w-full object-cover"
  poster={videoThumb}
  preload="metadata"
>
  <source src={demoVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/25"></div>

          {/* Logo */}

          {!playing && <div className="absolute left-16 top-40">

            <h2
              className="
              text-[58px]
              font-serif
              tracking-wide
              text-white"
            >
              VIRAASAT
            </h2>

            <p className="mt-2 text-xl text-white/90">
              Discover. Learn. Preserve.
            </p>

          </div>}

          {/* Play Button */}

          <div className="absolute inset-0 flex items-center justify-center">

            <button
            onClick={handlePlay}
              className={`
              flex
              
              ${playing?"h-25":"h-36 "}
              ${playing?"w-25":"w-36"}
              
              items-center
              justify-center
              rounded-full
              border-[4px]
              bg-black/20
              backdrop-blur-sm
              ${playing?"border-[#D6A73B]/30":"border-[#D6A73B] "}
              shadow-[0_0_60px_rgba(214,167,59,.8)]
              transition
              hover:scale-105`}
            >
              <Play
                fill={playing?"white/80":"white"}
                size={playing?34:54}
                color={playing?"white/80":"white"}
                className="ml-2"
              />
            </button>

          </div>

          {/* Watch Demo */}

          {!playing && <button
          onClick={handlePlay}
            className="
            absolute
            bottom-10
            left-1/2
            -translate-x-1/2
            flex
            items-center
            gap-3
            rounded-full
            border
            border-white/30
            bg-black/55
            px-10
            py-5
            text-[26px]
            text-white
            backdrop-blur-lg"
          >
            <Play fill="white" size={20} />
            Watch Demo
          </button>}

        </div>

        <div
  className="
    absolute
    -bottom-12
    left-1/2
    -translate-x-1/2
    h-20
    w-[92%]
    rounded-full
    bg-black/35
    blur-3xl
    -z-10
  "
/>


        {/* Bottom Info */}

       
         <div
          className="
          mx-auto
          flex
          w-[1040px]
          items-center
          justify-around
          rounded-b-[20px]
          px-10
          py-8"
        >

          {/* Item */}

          <div className="flex items-center gap-5">

            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#8b5f2574]"
            >
              <Clock3 size={28} color="#F7D27A" />
            </div>

            <div>

              <h4 className="text-[26px] text-white">
                2 Min Demo
              </h4>

              <p className="text-lg text-white/70">
                Quick overview
              </p>

            </div>

          </div>

          <div className="h-16 w-px bg-white/20"></div>

          <div className="flex items-center gap-5">

            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#8B5E2574]"
            >
              <Cpu size={28} color="#F7D27A" />
            </div>

            <div>

              <h4 className="text-[26px] text-white">
                AI Powered
              </h4>

              <p className="text-lg text-white/70">
                Smart cultural guide
              </p>

            </div>

          </div>

          <div className="h-16 w-px bg-white/20"></div>

          <div className="flex items-center gap-5">

            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#8B5E2574]"
            >
              <Star size={28} color="#F7D27A" />
            </div>

            <div>

              <h4 className="text-[26px] text-white">
                Free Access
              </h4>

              <p className="text-lg text-white/70">
                Explore without limits
              </p>

            </div>

          </div>

        </div>
       </div>

    </section>
   </>
  );
}