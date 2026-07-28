export default function GallerySection({ heritage }) {

  const images = [
    heritage?.image,
    ...(heritage?.images || []),
  ].filter(Boolean);


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
        Gallery
      </h2>


      <div className="grid grid-cols-3 gap-3">

        {images.map((image, index) => (

          <img
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            className="
              w-full
              h-[190px]
              object-cover
              rounded-[10px]
            "
          />

        ))}

      </div>

    </section>
  );
}