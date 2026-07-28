import {
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";

import useSpeechRecognition
  from "../../hooks/useSpeechRecognition";

export default function VoiceAssistant({
  language = "en-IN",
  onResult,
  enabled = true,
  large = false,
}) {

  const {
    listening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language,
    onResult,
  });

  if (!enabled) return null;

  if (large) {
    return (
      <div className="
        rounded-[22px]
        border border-[#E9DED2]
        bg-[#FBF3E6]
        px-7 py-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>
            <h3 className="font-serif text-lg">
              Voice Assistant
            </h3>

            <p className="
              mt-1
              text-xs
              text-[#88796C]
            ">
              {listening
                ? "I'm listening..."
                : "Tap the mic and speak your query"
              }
            </p>
          </div>

          <div className="flex items-center gap-6">

            <div className="
              hidden
              md:flex
              items-center
              gap-1
            ">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <span
                  key={i}
                  className={`
                    w-1
                    rounded-full
                    bg-[#C98C50]
                    ${
                      listening
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                  style={{
                    height: `${10 + (i % 4) * 6}px`,
                  }}
                />
              ))}
            </div>

            <button
              onClick={
                listening
                  ? stopListening
                  : startListening
              }
              className="
                flex
                h-16 w-16
                items-center
                justify-center
                rounded-full
                bg-[#753B10]
                text-white
                shadow-md
              "
            >
              {listening ? (
                <MicOff size={24} />
              ) : (
                <Mic size={24} />
              )}
            </button>

            <div className="hidden md:block">
              <Volume2
                size={18}
                className="text-[#8B684D]"
              />
            </div>

          </div>

        </div>

        {transcript && (
          <div className="
            mt-4
            rounded-xl
            bg-white/70
            px-4 py-3
            text-sm
            text-[#6C5B4D]
          ">
            {transcript}
          </div>
        )}

      </div>
    );
  }

  return (
    <button
      onClick={
        listening
          ? stopListening
          : startListening
      }
      className={`
        flex
        items-center
        gap-2
        rounded-full
        px-5 py-3
        text-sm
        transition
        ${
          listening
            ? "bg-red-700 text-white"
            : "bg-[#753B10] text-white"
        }
      `}
    >
      {listening ? (
        <MicOff size={17} />
      ) : (
        <Mic size={17} />
      )}

      {listening
        ? "Listening..."
        : "Voice On"}
    </button>
  );
}