export default function HistorySection({ heritage }) {

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
        History
      </h2>

      <div className="grid grid-cols-[1fr_260px] gap-8">

        <div>

          <p
            className="
              text-[14px]
              leading-7
              text-[#4F4741]
            "
          >
            {heritage?.history ||
              heritage?.description ||
              "The history of this heritage site is deeply connected with the cultural and architectural development of the region."}
          </p>

        </div>


        <img
          src={
            heritage?.historyImage ||
            heritage?.image
          }
          alt="History"
          className="
            w-full
            h-[210px]
            object-cover
            rounded-[12px]
          "
        />

      </div>

    </section>
  );
}