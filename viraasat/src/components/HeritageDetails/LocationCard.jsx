import {
  Navigation,
  MapPin,
  ExternalLink,
  Compass,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import GoogleMap from "../Map/GoogleMap";

export default function LocationCard({ heritage }) {
  const navigate = useNavigate();

  if (!heritage) return null;

  const latitude = heritage?.location?.latitude;
  const longitude = heritage?.location?.longitude;

  const hasLocation =
    Number.isFinite(latitude) &&
    Number.isFinite(longitude);

  const address = [
    heritage.city,
    heritage.state,
    heritage.country,
  ]
    .filter(Boolean)
    .join(", ");

  const handleOpenMap = () => {
    if (!hasLocation) return;

    navigate(
      `/map?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(
        heritage.name
      )}&city=${encodeURIComponent(heritage.city || "")}`
    );
  };

  return (
    <section className="mt-7">

      {/* ================= HEADER ================= */}

      <div className="flex items-center gap-3 mb-4 px-1">

        <div
          className="
            w-[36px]
            h-[36px]
            rounded-[10px]
            bg-[#FFF3E6]
            border border-[#EBD7C0]
            flex
            items-center
            justify-center
          "
        >
          <MapPin
            size={19}
            strokeWidth={2}
            className="text-[#8B4A17]"
          />
        </div>

        <div>
          <h2
            className="
              font-cormorant
              text-[28px]
              leading-none
              font-semibold
              text-[#2B1C12]
            "
          >
            Location
          </h2>

          <p className="mt-1 text-[13px] text-[#806F62]">
            Find this heritage site on the map
          </p>
        </div>

      </div>


      {/* ================= CARD ================= */}

      <div
        className="
          w-[460px]
          rounded-[18px]
          border border-[#E7DCCE]
          bg-[#FFFDFC]
          overflow-hidden
          shadow-[0_8px_30px_rgba(91,62,35,0.08)]
        "
      >

        {/* ================= MAP ================= */}

        <div
          className="
            relative
            w-full
            h-[220px]
            overflow-hidden
            bg-[#F4EEE7]
          "
        >

          {hasLocation ? (
            <GoogleMap
              latitude={latitude}
              longitude={longitude}
              name={heritage.name}
            />
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                items-center
                justify-center
                text-[14px]
                font-medium
                text-[#806F62]
              "
            >
              Location unavailable
            </div>
          )}


          {/* MAP LABEL */}

          {hasLocation && (
            <div
              className="
                absolute
                top-4
                left-4
                px-3.5
                py-2
                rounded-full
                bg-white/95
                backdrop-blur-md
                border border-white
                shadow-[0_3px_12px_rgba(0,0,0,0.10)]
                flex
                items-center
                gap-2
                pointer-events-none
              "
            >
              <Compass
                size={15}
                strokeWidth={2}
                className="text-[#8B4A17]"
              />

              <span
                className="
                  text-[12px]
                  font-semibold
                  text-[#3B2A1D]
                "
              >
                {heritage.name}
              </span>
            </div>
          )}

        </div>


        {/* ================= DETAILS ================= */}

        <div className="p-6">

          <div className="flex gap-4">

            {/* LOCATION ICON */}

            <div
              className="
                w-[50px]
                h-[50px]
                shrink-0
                rounded-[14px]
                bg-[#FFF3E6]
                border border-[#EBD7C0]
                flex
                items-center
                justify-center
              "
            >
              <MapPin
                size={23}
                strokeWidth={2}
                className="text-[#8B4A17]"
              />
            </div>


            {/* LOCATION TEXT */}

            <div className="min-w-0">

              <p
                className="
                  text-[12px]
                  uppercase
                  tracking-[0.08em]
                  font-semibold
                  text-[#907C6D]
                "
              >
                Located in
              </p>

              <p
                className="
                  mt-1
                  text-[18px]
                  leading-[1.4]
                  font-semibold
                  text-[#2B1C12]
                "
              >
                {address || "Location not available"}
              </p>

              {hasLocation && (
                <p
                  className="
                    mt-2
                    text-[12px]
                    font-medium
                    text-[#9A887A]
                  "
                >
                  {latitude.toFixed(4)}° N
                  <span className="mx-2">•</span>
                  {longitude.toFixed(4)}° E
                </p>
              )}

            </div>

          </div>


          {/* ================= CTA ================= */}

          <button
            type="button"
            onClick={handleOpenMap}
            disabled={!hasLocation}
            className="
              mt-6
              w-full
              h-[49px]
              rounded-[12px]
              bg-[#A5591F]
              hover:bg-[#843F13]
              disabled:bg-[#C7B8AA]
              disabled:cursor-not-allowed
              text-white
              text-[14px]
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-[0_5px_15px_rgba(139,74,23,0.18)]
              hover:shadow-[0_7px_18px_rgba(139,74,23,0.25)]
              active:scale-[0.99]
              transition-all
            "
          >
            <Navigation
              size={17}
              strokeWidth={2.2}
            />

            Open in Viraasat Maps

            <ExternalLink
              size={15}
              strokeWidth={2}
            />
          </button>

        </div>

      </div>

    </section>
  );
}