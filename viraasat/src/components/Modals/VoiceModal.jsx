import { Mic, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VoiceModal({
  open,
  onClose,
  transcript = "",
  listening = false,
  processing = false,
  status = "Tap the mic to begin",
}) {
  const modalRef = useRef(null);
  const [bars, setBars] = useState([12, 32, 20, 44, 26, 40, 18, 30, 16]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 38) + 10));
    }, 120);

    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[440px] overflow-hidden rounded-[34px] border border-[#E7D9C8] bg-[#FFF9F2] shadow-[0_25px_70px_rgba(0,0,0,0.18)]"
      >
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D8B27B]/30 blur-3xl"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full p-2 text-[#8B6F47] transition hover:bg-[#F3E8D7] z-[10]"
        >
          <X size={22} />
        </button>

        <div className="relative px-10 py-12">
          {/* Mic */}
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center">

              <div className="absolute h-36 w-36 rounded-full border-4 border-[#D6A66D]/30 animate-ping"></div>

              <div className="absolute h-28 w-28 rounded-full bg-[#EED8B6]/50 animate-pulse"></div>

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A15E] to-[#B98241] shadow-xl">
                <Mic
                  size={38}
                  className={`text-white ${processing ? "animate-spin" : listening ? "animate-pulse" : "animate-pulse"}`}
                />
              </div>

            </div>
          </div>

          <h2 className="mt-8 text-center text-3xl font-bold text-[#3A2A17]">
            {processing ? "Processing..." : listening ? "Listening..." : "Ready"}
          </h2>

          <p className="mt-3 text-center text-[#7B6854]">
            {processing ? "Processing your input..." : transcript || status}
          </p>

          {/* Wave */}
          <div className="mt-10 flex h-16 items-end justify-center gap-[5px]">
            {bars.map((height, index) => {
              const colors = [
                "bg-[#C48A44]",
                "bg-[#D29A58]",
                "bg-[#B98241]",
                "bg-[#8A5B2E]",
                "bg-[#D29A58]",
                "bg-[#B98241]",
                "bg-[#D29A58]",
                "bg-[#C48A44]",
                "bg-[#8A5B2E]",
              ];

              return (
                <div
                  key={index}
                  className={`w-2 rounded-full ${colors[index]} transition-all duration-300`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>

          <button
            onClick={onClose}
            disabled={processing}
            className="mt-10 h-14 w-full rounded-xl bg-gradient-to-r from-[#d49446] to-[#b05f14] font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            {processing ? "Processing..." : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}