export default function CuisineSection({ heritage }) {

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
        Cuisine
      </h2>

      <p
        className="
          text-[14px]
          leading-7
          text-[#4F4741]
          max-w-[850px]
        "
      >
        {heritage?.cuisine ||
          "Discover the traditional cuisine of the region, from Mughlai delicacies and local sweets to traditional snacks and beverages."}
      </p>

    </section>
  );
}