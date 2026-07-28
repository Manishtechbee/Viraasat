export default function MarketSection({ heritage }) {

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
        Local Markets
      </h2>

      <p
        className="
          text-[14px]
          leading-7
          text-[#4F4741]
          max-w-[850px]
        "
      >
        {heritage?.market ||
          "Explore traditional markets where visitors can discover handicrafts, textiles, jewellery, souvenirs and locally made products."}
      </p>

    </section>
  );
}