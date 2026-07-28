import {
  Volume2,
  Languages,
  MapPin,
  Navigation,
  Bookmark,
} from "lucide-react";

export default function ChatMessage({
  message,
  onAction,
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      {!isUser && (
        <div className="
          flex h-9 w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#F5E8D7]
          text-lg
        ">
          ✨
        </div>
      )}

      <div
        className={`
          max-w-[75%]
          ${isUser
            ? "rounded-[18px_18px_4px_18px] bg-[#F9EBD7]"
            : "rounded-[4px_18px_18px_18px] border border-[#EEE3D7] bg-white"
          }
          px-5 py-4
        `}
      >

        <p className="text-[14px] leading-7 whitespace-pre-line">
          {message.text}
        </p>

        {message.image && (
          <img
            src={message.image}
            alt=""
            className="
              mt-4
              w-full
              rounded-[14px]
              object-cover
              max-h-[280px]
            "
          />
        )}

        {/* AI ACTIONS */}
        {message.actions?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">

            {message.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => onAction(action)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border border-[#E6D7C6]
                  px-4 py-2
                  text-xs
                  text-[#70401D]
                  hover:bg-[#FBF3E7]
                  transition
                "
              >

                {action.type === "map" && (
                  <MapPin size={14} />
                )}

                {action.type === "route" && (
                  <Navigation size={14} />
                )}

                {action.type === "bookmark" && (
                  <Bookmark size={14} />
                )}

                {action.label}

              </button>
            ))}

          </div>
        )}

        {!isUser && (
          <div className="mt-4 flex gap-2">

            <button className="
              flex items-center gap-1.5
              rounded-full
              border border-[#E8DCCE]
              px-3 py-1.5
              text-xs
            ">
              <Volume2 size={13} />
              Listen
            </button>

            <button className="
              flex items-center gap-1.5
              rounded-full
              border border-[#E8DCCE]
              px-3 py-1.5
              text-xs
            ">
              <Languages size={13} />
              Translate
            </button>

          </div>
        )}

        <div className="mt-2 text-[10px] text-[#A79A90]">
          {message.time}
        </div>

      </div>

    </div>
  );
}