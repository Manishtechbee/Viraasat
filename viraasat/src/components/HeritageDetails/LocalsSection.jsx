export default function LocalsSection({ heritage }) {

  return (
    <section className="p-6">

      <h2
        className="
          font-cormorant
          text-[28px]
          font-semibold
          text-[#2B1C12]
          mb-4
        "
      >
        Locals & Culture
      </h2>

      <p
        className="
          text-[14px]
          leading-7
          text-[#4F4741]
          max-w-[850px]
        "
      >
        {heritage?.locals ||
          "Meet the local communities and discover stories, traditions, customs and cultural experiences that make this destination unique."}
      </p>

    </section>
  );
}