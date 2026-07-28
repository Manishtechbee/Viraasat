import {
  Sparkles,
  Send,
  Mic,
  ArrowRight,
} from "lucide-react";

const prompts = [
  "Tell me the history",
  "Hidden facts",
  "Best photography spots",
  "Nearby restaurants",
  "Architecture explained",
  "What should I not miss?",
];

export default function AIGuideSection() {
  return (
    <section
      className="mt-8"
      id="ai"
    >
      <div
        className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-[#E8DDD0]
        bg-gradient-to-br
        from-[#FFFDF9]
        via-[#FFF8F2]
        to-[#FDF3E8]
        shadow-[0_20px_60px_rgba(0,0,0,.08)]
      "
      >

        {/* Decorative Blur */}

        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#E9C39A]/20 blur-[100px]" />

        <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-[#B98B61]/10 blur-[120px]" />

        <div className="relative z-10 p-10">

          {/* Heading */}

          <div className="flex items-center gap-3">

            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-[#8B4A17]
              flex
              items-center
              justify-center
            "
            >
              <Sparkles
                size={24}
                className="text-white"
              />
            </div>

            <div>

              <h2 className="text-[34px] font-bold text-[#2D2218]">
                Ask Viraasat AI
              </h2>

              <p className="text-[#7B6A5E] mt-1">
                Learn stories, legends, architecture and hidden facts instantly.
              </p>

            </div>

          </div>

          {/* Search */}

          <div
            className="
            mt-8
            rounded-2xl
            border
            border-[#E8DDD0]
            bg-white
            p-3
            flex
            items-center
            gap-3
            shadow-sm
          "
          >

            <input
              placeholder="Ask anything about this heritage site..."
              className="
              flex-1
              bg-transparent
              outline-none
              text-[16px]
              px-2
            "
            />

            <button
              className="
              w-11
              h-11
              rounded-xl
              bg-[#FFF6ED]
              hover:bg-[#FBE8D5]
            "
            >
              <Mic size={18}/>
            </button>

            <button
              className="
              w-11
              h-11
              rounded-xl
              bg-[#8B4A17]
              text-white
              hover:bg-[#734015]
            "
            >
              <Send size={18}/>
            </button>

          </div>

          {/* Suggestions */}

          <div className="flex flex-wrap gap-3 mt-7">

            {prompts.map((prompt)=>(
              <button
                key={prompt}
                className="
                rounded-full
                px-5
                py-3
                bg-white
                border
                border-[#E8DDD0]
                hover:bg-[#FFF5EC]
                hover:border-[#C68C58]
                transition
              "
              >
                {prompt}
              </button>
            ))}

          </div>

          {/* Bottom */}

          <div
            className="
            mt-10
            rounded-2xl
            bg-[#8B4A17]
            p-6
            flex
            items-center
            justify-between
            text-white
          "
          >

            <div>

              <h3 className="text-xl font-semibold">
                Discover More With AI
              </h3>

              <p className="opacity-80 mt-2">
                Personalized recommendations, travel plans, hidden gems and local insights.
              </p>

            </div>

            <button
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-[#8B4A17]
              font-semibold
            "
            >
              Open AI Guide

              <ArrowRight size={18}/>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}