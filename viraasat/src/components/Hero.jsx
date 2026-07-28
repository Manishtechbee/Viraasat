import {
  Search,
  Mic,
  Play,
  MapPinned,
  Landmark,
  Globe2,
  HeartHandshake,
} from "lucide-react";
import HeroImage from "../assets/hero.png"
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import VoiceModal from "./Modals/VoiceModal";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import toast from "react-hot-toast";

import { processVoiceCommand } from "../utils/voiceCommands";

const stats = [
  {
    icon: MapPinned,
    value: "2,500+",
    label: "Heritage Sites",
    color: "text-indigo-600",
  },
  {
    icon: Landmark,
    value: "28",
    label: "States Covered",
    color: "text-orange-500",
  },
  {
    icon: Globe2,
    value: "150+",
    label: "UNESCO Sites",
    color: "text-indigo-600",
  },
  {
    icon: HeartHandshake,
    value: "10K+",
    label: "Happy Explorers",
    color: "text-orange-500",
  },
];

const Divider = ({height}) => (
  <div className={`w-px h-${height} bg-gray-300 mx-4 shrink-0`} />
);

const Stat = ({ icon, value, label, color }) => (
  <div className="flex items-center gap-3">

    <div
      className={`w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center ${color}`}
    >
      {icon}
    </div>

    <div>

      <h3 className="font-bold text-[20px] text-gray-800 leading-none">
        {value}
      </h3>

      <p className="text-[13px] text-gray-500 mt-1">
        {label}
      </p>

    </div>

  </div>
);


const HeroSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Tap the mic to begin");
  const navigate = useNavigate();

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!finalTranscript) return;

    setSearchQuery(finalTranscript);
    setStatusMessage("Processing your voice command...");
    setIsProcessing(true);
    toast.loading("Processing your voice command...", { id: "voice-processing" });
  }, [finalTranscript]);

  useEffect(() => {
    if (!isProcessing) return;

    const timer = window.setTimeout(async () => {
      const commandText = finalTranscript || transcript || searchQuery;
      toast.dismiss("voice-processing");

      if (commandText) {
        toast.success("Command received", { id: "voice-success" });
        await processVoiceCommand(commandText, navigate);
      } else {
        toast.error("No speech detected. Please try again.", { id: "voice-error" });
      }

      setIsProcessing(false);
      setIsListening(false);
      setStatusMessage("Voice command completed");
      resetTranscript();
      setSearchQuery("");
      SpeechRecognition.stopListening();
    }, 900);

    return () => window.clearTimeout(timer);
  }, [isProcessing, finalTranscript, transcript, searchQuery, navigate, resetTranscript]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;

    const handleError = (event) => {
      const errorCode = event?.error || "unknown";
      let message = "Unable to start voice recognition.";

      if (errorCode === "not-allowed") {
        message = "Microphone permission denied.";
      } else if (errorCode === "no-speech") {
        message = "No speech detected. Please try again.";
      }

      toast.error(message, { id: "voice-error" });
      setIsListening(false);
      setIsProcessing(false);
      setStatusMessage(message);
    };

    SpeechRecognition.onerror = handleError;
    return () => {
      SpeechRecognition.onerror = null;
    };
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (!isListening || !browserSupportsSpeechRecognition) return;

    const timeoutId = window.setTimeout(() => {
      if (!listening && !transcript) {
        toast.error("No voice input detected. Stopping listening.", { id: "voice-timeout" });
        setStatusMessage("No voice input detected");
        setIsListening(false);
        setIsProcessing(false);
        SpeechRecognition.stopListening();
      }
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [isListening, listening, transcript, browserSupportsSpeechRecognition]);

  const stopVoiceListening = () => {
    if (typeof SpeechRecognition.stopListening === "function") {
      SpeechRecognition.stopListening();
    }

    toast.dismiss("voice-processing");
    toast.dismiss("voice-error");
    toast.success("Listening stopped.", { id: "voice-stopped" });
    setIsListening(false);
    setIsProcessing(false);
    setStatusMessage("Listening stopped");
    resetTranscript();
    setSearchQuery("");
  };

  const startVoiceListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.", { id: "voice-error" });
      setStatusMessage("Speech recognition is not supported");
      return;
    }

    if (isListening) {
      stopVoiceListening();
      return;
    }

    toast.loading("Asking permission...", { id: "voice-permission" });
    setStatusMessage("Asking permission...");

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      toast.dismiss("voice-permission");
      toast.success("Permission granted", { id: "voice-granted" });
      setStatusMessage("Permission granted. Listening...");
      resetTranscript();
      setSearchQuery("");
      setIsProcessing(false);
      setIsListening(true);
      SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
      toast.loading("Listening...", { id: "voice-listening" });
    } catch (error) {
      toast.dismiss("voice-permission");
      toast.error("Permission denied. Please allow microphone access.", { id: "voice-error" });
      setStatusMessage("Permission denied");
      setIsListening(false);
      setIsProcessing(false);
    }
  };


  const handleSearch = () => {
  const query = searchQuery.trim();

  if (!query) {
    toast.error("Please enter something to search.");
    return;
  }

  navigate(`/explore?search=${encodeURIComponent(query)}`);
};
  
  return (
    <>
    <section className="relative h-[760px] overflow-hidden border border-[#E8E2D8]">
  {/* Background Image */}
  <img
    src={HeroImage}
    alt="Hero"
    className="
      absolute
      top-0
      right-0
      h-full
      w-full
      object-cover
      object-left
      select-none
      pointer-events-none
      z-0
    "
  />

  {/* Warm overlay over image */}
  <div
   className="
absolute
inset-0
bg-gradient-to-r
from-[#f4e5d2ad]
via-[#F6EBDD]/5

to-transparent
z-10
    "
  />
 <div
  className="
    absolute
    top-0
    left-0
    w-full
    h-24
    bg-gradient-to-b
    from-[#F4E5D2]/70
    via-[#F4E5D2]/30
    to-transparent
    z-10
  "
/>

  <div className="relative z-20">
  <Navbar />
</div>

  {/* Hero Content */}
  <div className=" h-full max-w-[90rem] mx-auto px-10 relative z-20 ">
    {/* Put your Heading, Search, Buttons and Stats here */}
     
  
   

      
   {/* Heading */}
    <h1 className="mt-6 text-[68px] leading-[1.05] font-extrabold font-cormorant text-gray-900">

      Discover India's
      <br />

        Living Heritage
      

    </h1>

    {/* Description */}
    <p className="mt-6 max-w-xl text-lg leading-8 text-gray-700 ">

      Explore stories, monuments, artifacts and<br></br> cultures that shape our glorious pasts.

    </p>


    <div className="w-full mt-8 relative z-30">

      {/* Search */}
      <div className="relative w-full">

        <div className="flex items-center h-[58px] w-[59%] rounded-3xl bg-white shadow-lg border border-[#ECE7DF] overflow-hidden">

          <button
  type="button"
  onClick={handleSearch}
  disabled={!searchQuery.trim()}
  className={`
    ml-5
    shrink-0
    flex
    items-center
    justify-center
    transition-all
    duration-200
    ${
      searchQuery.trim()
        ? "text-gray-600 hover:text-[#292b95] cursor-pointer scale-105"
        : isFocused
        ? "text-gray-600"
        : "text-gray-400"
    }
  `}
  aria-label="Search"
>
  <Search
    size={22}
    strokeWidth={3}
  />
</button>
          <Divider height={7}/>

          <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}
  placeholder="Search for heritage sites, monuments..."
  className="
    flex-1
    px-4
    outline-none
    text-[15px]
    placeholder:text-gray-400
    bg-transparent
  "
/>

          <button
          onClick={startVoiceListening}
            className="
            w-12
            h-12
            rounded-full
            bg-[#292b95]
            hover:bg-[#232583]
            flex
            items-center
            justify-center
            text-white
            mr-[5px]
            transition
            "
          >
            <Mic size={20} />
          </button>
          <VoiceModal
            open={isListening}
            transcript={transcript}
            listening={listening}
            processing={isProcessing}
            status={statusMessage}
            onClose={stopVoiceListening}
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex items-center gap-4 mt-5">

        <button
        onClick={()=>navigate("/explore")}
          className="
          h-12
          px-6
          flex
          items-center
          rounded-2xl
          bg-[#E68928]/95
          backdrop-blur-md
          hover:bg-[#E69030]/80
          text-white
          font-semibold
          text-[15px]
          shadow-lg
          transition-all
    duration-300
           hover:shadow-xl
    hover:-translate-y-1
    hover:scale-[1.001]
    active:scale-95
          "
        >
          Explore Now
        </button>

      
  

        <button
        onClick={()=>navigate("/watchdemo")}
  className="
    h-12
    px-6
    rounded-2xl

    bg-white/60
    backdrop-blur-md

    border
    border-white/60

    shadow-lg

    flex
    items-center
    gap-3

    text-gray-800
    font-medium

    transition-all
    duration-300

    hover:bg-white/70
    hover:shadow-xl
    hover:-translate-y-1
    hover:scale-[1.001]
    active:scale-95
  "
>
  <div
    className="
      w-8
      h-8
      rounded-full

      bg-[#1F2937]

      flex
      items-center
      justify-center

      transition-all
      duration-300

      group-hover:bg-[#111827]
    "
  >
    <Play
      size={14}
      fill="currentColor"
      strokeWidth={1.5}
      className="text-white ml-[2px]"
    />
  </div>

  <span>Watch Demo</span>
</button>

      </div>

      {/* Stats */}

      <div
  className="
    absolute
    -bottom-50
    left-1/2
    -translate-x-1/2
    z-40

    w-[97%]

    bg-white
    rounded-2xl
    shadow-2xl
    border
    border-[#ECE6DE]

    px-8
    py-5

    flex
    items-center
    justify-between
  "
>

{stats.map((stat, index) => {
    const Icon = stat.icon;

    return (
      
        <React.Fragment key={stat.label}>
        <Stat
          icon={<Icon size={20} />}
          value={stat.value}
          label={stat.label}
          color={stat.color}
        />
        {index !== stats.length - 1 && <Divider height={12}/>}
        </React.Fragment>
      
    );
  })}


      </div>

    </div>
  </div>

</section>
</>
  );
};



export default HeroSearch;