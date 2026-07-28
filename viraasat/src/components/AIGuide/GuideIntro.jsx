import { Sparkles } from "lucide-react";

export default function GuideIntro() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border border-[#E9DDCE]
        bg-[#FBF3E5]
        px-8 py-7
      "
    >
      <div className="relative z-10 max-w-[580px]">

        <div className="flex items-start gap-5">

          <div
            className="
              flex h-14 w-14
              shrink-0
              items-center justify-center
              rounded-full
              border border-[#E1CDB7]
              bg-white
              text-2xl
            "
          >
            🕌
          </div>

          <div>
            <h2 className="font-serif text-xl">
              Namaste! I'm your AI travel guide.
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#786A5E]">
              Ask me anything. I can help you explore,
              learn and plan your perfect journey.
            </p>
          </div>

        </div>
      </div>

      <div className="
        absolute
        right-8
        bottom-[-20px]
        text-[100px]
        opacity-[0.08]
      ">
        🕌
      </div>

    </section>
  );
}