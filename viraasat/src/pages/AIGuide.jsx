import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe2,
  Mic,
  Volume2,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import GuideIntro from "../components/AIGuide/GuideIntro";
import ChatWindow from "../components/AIGuide/ChatWindow";
import QuickActions from "../components/AIGuide/QuickActions";
import PlaceOfDay from "../components/AIGuide/PlaceOfDay";
import SuggestionChips from "../components/AIGuide/SuggestionChips";
import VoiceAssistant from "../components/AIGuide/VoiceAssistant";

export default function AIGuide() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en-IN");
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Namaste! I'm your AI travel guide. Ask me anything about India's heritage, places, history, routes or your journey.",
      time: "10:30 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = input) => {
    const query = text.trim();

    if (!query || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Temporary frontend response.
    // Backend will replace this later.
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: `I understood your question: "${query}". Once the AI backend is connected, I will answer this dynamically and can also perform actions on the site.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
  };

  const executeAction = (action) => {
    if (!action) return;

    switch (action.type) {
      case "navigate":
        navigate(action.path);
        break;

      case "open_heritage":
        navigate(`/explore/${action.slug}`);
        break;

      case "search":
        navigate(`/explore?search=${encodeURIComponent(action.query)}`);
        break;

      case "map":
        navigate("/map");
        break;

      default:
        console.log("Unknown AI action:", action);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#2D2119]">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-6">
        <div>
          <div className="flex items-center gap-3">
            <Sparkles
              size={28}
              strokeWidth={1.6}
              className="text-[#9A5A20]"
            />

            <h1 className="font-serif text-4xl">
              AI Guide
            </h1>
          </div>

          <p className="mt-1 ml-10 text-sm text-[#806F62]">
            Your intelligent travel companion
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* LANGUAGE */}
          <button className="
            flex items-center gap-2
            rounded-full
            border border-[#E8DCCB]
            bg-white
            px-5 py-3
            text-sm
            hover:bg-[#FAF5EC]
            transition
          ">
            <Globe2 size={18} />

            <span>
              {language === "en-IN" ? "English" : "हिंदी"}
            </span>

            <ChevronDown size={15} />
          </button>

          {/* SPEAKER */}
          <button
            onClick={() => setVoiceEnabled((prev) => !prev)}
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-full
              border border-[#E8DCCB]
              bg-white
              hover:bg-[#FAF5EC]
              transition
            "
          >
            <Volume2 size={19} />
          </button>

          {/* VOICE */}
          <VoiceAssistant
            language={language}
            onResult={sendMessage}
            enabled={voiceEnabled}
          />

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1250px] px-6 pb-12">

        <GuideIntro />

        <div className="mt-7 grid grid-cols-[1fr_300px] gap-6">

          {/* CHAT */}
          <section
            className="
              rounded-[24px]
              border border-[#E9DED0]
              bg-white
              overflow-hidden
            "
          >
            <ChatWindow
              messages={messages}
              loading={loading}
              onAction={executeAction}
            />

            <SuggestionChips
              onSelect={sendMessage}
            />

            {/* INPUT */}
            <div className="border-t border-[#EFE5DA] p-5">
              <div className="
                flex
                items-center
                gap-3
                rounded-[18px]
                border border-[#E4D6C5]
                bg-[#FFFCF8]
                px-4
                py-3
              ">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    text-sm
                    placeholder:text-[#A99B90]
                  "
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    bg-[#7A3E12]
                    text-white
                    disabled:opacity-40
                  "
                >
                  <Send size={17} />
                </button>

                <button
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-[#E7D8C7]
                  "
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">

            <QuickActions
              onAction={executeAction}
            />

            <PlaceOfDay
              onAsk={(place) => {
                sendMessage(
                  `Tell me about ${place.name}`
                );
              }}
            />

          </aside>

        </div>

        <div className="mt-6">
          <VoiceAssistant
            language={language}
            onResult={sendMessage}
            enabled={voiceEnabled}
            large
          />
        </div>

      </main>
    </div>
  );
}