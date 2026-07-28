import ChatMessage from "./ChatMessage";

export default function ChatWindow({
  messages,
  loading,
  onAction,
}) {
  return (
    <div className="min-h-[620px]">

      <div className="
        flex
        justify-center
        py-5
      ">
        <span className="
          text-xs
          text-[#9B8C80]
          before:mr-3
          before:inline-block
          before:h-px
          before:w-8
          before:bg-[#E5D9CC]
          after:ml-3
          after:inline-block
          after:h-px
          after:w-8
          after:bg-[#E5D9CC]
        ">
          Today
        </span>
      </div>

      <div className="space-y-6 px-7 pb-5">

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onAction={onAction}
          />
        ))}

        {loading && (
          <div className="flex gap-3">

            <div className="
              flex h-9 w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F5E8D7]
            ">
              ✨
            </div>

            <div className="
              rounded-[18px]
              border border-[#EEE2D6]
              px-5 py-4
            ">
              <div className="flex gap-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce [animation-delay:100ms]">•</span>
                <span className="animate-bounce [animation-delay:200ms]">•</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}