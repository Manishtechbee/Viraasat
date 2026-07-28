export default function PlacesToVisitSection({ heritage }) {

  return (
    <section className="p-6">

      <h2
        className="
          font-cormorant
          text-[28px]
          font-semibold
          text-[#2B1C12]
          mb-5
        "
      >
        Places to Visit
      </h2>


      <div className="grid grid-cols-2 gap-4">

        {(heritage?.nearbyAttractions || []).map(
          (place, index) => (

            <div
              key={place._id || index}
              className="
                rounded-[12px]
                border
                border-[#EEE4D8]
                p-3

                flex
                items-center
                gap-4
              "
            >

              <img
                src={place.image}
                alt={place.name}
                className="
                  w-[100px]
                  h-[80px]
                  rounded-[8px]
                  object-cover
                "
              />

              <div>

                <h3
                  className="
                    text-[14px]
                    font-semibold
                    text-[#2B1C12]
                  "
                >
                  {place.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-[12px]
                    text-[#776B62]
                  "
                >
                  {place.distance || ""}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </section>
  );
}