const suggestions = [
  "Best time to visit?",
  "Nearby places",
  "Fun facts",
  "Tell me a story",
];

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="
      flex
      flex-wrap
      gap-2
      px-6
      pb-5
    ">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="
            rounded-full
            border border-[#E8DCCE]
            bg-[#FFFCF8]
            px-4 py-2
            text-xs
            text-[#6E5D50]
            hover:bg-[#FBF2E5]
            transition
          "
        >
          {item}
        </button>
      ))}
    </div>
  );
}