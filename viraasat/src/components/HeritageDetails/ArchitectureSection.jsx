export default function ArchitectureSection({ heritage }) {

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
        Architecture
      </h2>

      <div className="grid grid-cols-2 gap-8">

        <div>

          <p
            className="
              text-[14px]
              leading-7
              text-[#4F4741]
            "
          >
            {heritage?.architecture ||
              "The architecture showcases remarkable craftsmanship, symmetry, intricate detailing and the artistic traditions of its era."}
          </p>

        </div>


        <img
          src={
            heritage?.architectureImage ||
            heritage?.image
          }
          alt="Architecture"
          className="
            w-full
            h-[230px]
            object-cover
            rounded-[12px]
          "
        />

      </div>

    </section>
  );
}