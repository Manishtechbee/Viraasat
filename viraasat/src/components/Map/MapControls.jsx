import {
  Plus,
  Minus,
  LocateFixed,
  Maximize2,
  Navigation,
} from "lucide-react";
import { useMap } from "@vis.gl/react-google-maps";
import toast from "react-hot-toast";




export default function MapControls({ onLocate, onNearMe }) {
  
  const map = useMap();
const enterFullscreen = async () => {
  try {
    const mapContainer = document.getElementById("google-map");

    if (!mapContainer) {
      toast.error("Map container not found");
      return;
    }

    // EXIT fullscreen
    if (document.fullscreenElement) {
      await document.exitFullscreen();

      toast.success("Fullscreen mode disabled", {
        duration: 2000,
      });

      return;
    }

    // ENTER fullscreen
    toast.loading("Entering fullscreen...", {
      id: "fullscreen-toast",
    });

    await mapContainer.requestFullscreen();

    toast.success("Fullscreen mode enabled — press ESC to exit!", {
      id: "fullscreen-toast",
      duration: 2500,
    });

  } catch (err) {
    console.error("Fullscreen error:", err);

    toast.error(
      err?.message || "Unable to enter fullscreen mode",
      {
        id: "fullscreen-toast",
      }
    );
  }
};
  const maximize=() => {
    if (!map) return;

    map.setZoom((map.getZoom() || 5) + 1);
  }

const minimize=() => {
    if (!map) return;

    map.setZoom((map.getZoom() || 5) - 1);
  }

const getLocation = () => {
  onLocate?.();
};
// const getLocation=() => {

//     if (!map){
//       toast.error("Map is not ready yet.");
//       return;}

//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser.");
//       return;}

//     const toastId = toast.loading("Finding your location...");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         map.panTo({
//           lat: latitude,
//           lng: longitude,
//         });

//         map.setZoom(15);

//         toast.success("Location found successfully!", {
//         id: toastId,
//       });
//       },
//       (error) => {
//       let message = "Unable to get your location.";

//       switch (error.code) {
//         case error.PERMISSION_DENIED:
//           message =
//             "Location permission denied. Please allow access.";
//           break;

//         case error.POSITION_UNAVAILABLE:
//           message =
//             "Location information is unavailable.";
//           break;

//         case error.TIMEOUT:
//           message =
//             "Location request timed out.";
//           break;
//       }

//       toast.error(message, {
//         id: toastId,
//       });
//     },

//     {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0,
//     }
//   );
// };
  return (
    <div className="flex flex-col gap-5">

      {/* Fullscreen */}

      <button
        className="
        w-12
        h-12
        rounded-2xl
        bg-white/95
        border border-[#E9DDD2]
        shadow-[0_10px_25px_rgba(0,0,0,.08)]
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:bg-[#FBF6F0]
        hover:scale-105
        transition-all
        duration-300
      "
      onClick={enterFullscreen}
       
      >
        <Maximize2
          size={20}
          className="text-[#2F2118]"
        />
      </button>

      {/* Zoom Controls */}

      <div
        className="
        rounded-[22px]
        overflow-hidden
        bg-white/95
        border border-[#E9DDD2]
        shadow-[0_12px_30px_rgba(0,0,0,.08)]
        backdrop-blur-xl
      "
      >

        <button
          className="
          w-12
          h-12
          flex
          items-center
          justify-center
          hover:bg-[#FAF5EF]
          transition
        "
        onClick={maximize}
        >
          <Plus
            size={20}
            className="text-[#2F2118]"
          />
        </button>

        <div className="h-px bg-[#EFE4D8]" />

        <button
          className="
          w-12
          h-12
          flex
          items-center
          justify-center
          hover:bg-[#FAF5EF]
          transition
        "
        onClick={minimize}
        >
          <Minus
            size={20}
            className="text-[#2F2118]"
          />
        </button>

      </div>

      {/* Current Location */}

      <button
        className="
        w-12
        h-12
        rounded-2xl
        bg-white/95
        border border-[#E9DDD2]
        shadow-[0_10px_25px_rgba(0,0,0,.08)]
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:bg-[#FBF6F0]
        hover:scale-105
        transition-all
        duration-300
      "
      onClick={getLocation}
      >
        <LocateFixed
          size={20}
          className="text-[#2F2118]"
        />
      </button>

      <button
        className="
        w-12
        h-12
        rounded-2xl
        bg-[#8C4A15]
        border border-[#E9DDD2]
        shadow-[0_10px_25px_rgba(0,0,0,.08)]
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:bg-[#744016]
        hover:scale-105
        transition-all
        duration-300
      "
      onClick={onNearMe}
      >
        <Navigation
          size={20}
          className="text-white"
        />
      </button>

    </div>
  );
}