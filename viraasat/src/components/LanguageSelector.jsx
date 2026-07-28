import { Globe, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const {
    language,
    languages,
    setSiteLanguage,
    loading,
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const selected = languages.find(
    (item) => item.code === language
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageChange = async (code) => {
    console.log("CLICKED LANGUAGE:", code);

    setIsOpen(false);

    try {
      await setSiteLanguage(code);
      console.log("LANGUAGE CHANGED:", code);
    } catch (error) {
      console.error("LANGUAGE CHANGE ERROR:", error);
    }
  };

  const getDropdownPosition = () => {
    if (!buttonRef.current) {
      return {
        top: 0,
        right: 0,
      };
    }

    const rect = buttonRef.current.getBoundingClientRect();

    return {
      top: rect.bottom + 10,
      right: window.innerWidth - rect.right,
    };
  };

  const position = getDropdownPosition();

  return (
    <>
      {/* Language button */}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          disabled={loading}
          onClick={handleToggle}
          className="
            flex
            items-center
            gap-1
            text-gray-700
            hover:text-black
            transition
            cursor-pointer
          "
        >
          <Globe size={19} />

          <span className="text-[16px]">
            {selected?.nativeName || "English"}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown rendered outside navbar */}
      {isOpen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: `${position.top}px`,
              right: `${position.right}px`,
            }}
            className="
              w-40
              bg-white/70
              rounded-lg
              shadow-2xl
              border
              border-gray-200
              overflow-hidden
              z-[999999]
            "
          >
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onMouseDown={() => {
                  console.log("MOUSE DOWN:", item.code);
                }}
                onClick={() =>
                  handleLanguageChange(item.code)
                }
                className={`
                  block
                  w-full
                  px-4
                  py-2.5
                  text-left
                  cursor-pointer
                  hover:bg-gray-100/50
                  hover:text-blue-600/80
                  transition
                  ${
                    language === item.code
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700"
                  }
                `}
              >
                {item.nativeName}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}