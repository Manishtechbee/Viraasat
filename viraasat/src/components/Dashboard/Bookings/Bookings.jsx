// import React, { useState } from "react";
// import {
//   CalendarDays,
//   Clock3,
//   MapPin,
//   Ticket,
//   Download,
//   ChevronRight,
// } from "lucide-react";

// const bookings = [
//   {
//     id: "VRST-284921",
//     title: "Golden Temple Heritage Tour",
//     location: "Amritsar, Punjab",
//     date: "18 Aug 2026",
//     time: "10:30 AM",
//     visitors: 2,
//     type: "Heritage Tour",
//     status: "Upcoming",
//   },
//   {
//     id: "VRST-193822",
//     title: "Mehrangarh Fort Guided Visit",
//     location: "Jodhpur, Rajasthan",
//     date: "26 May 2026",
//     time: "11:00 AM",
//     visitors: 3,
//     type: "Guided Tour",
//     status: "Completed",
//   },
// ];

// export default function Bookings() {
//   const [tab, setTab] = useState("Upcoming");

//   const filtered = bookings.filter((item) => item.status === tab);

//   return (
//     <div className="min-h-screen bg-[#faf7f2] px-8 py-7">

//       <div className="mb-8">
//         <h1 className="font-serif text-[36px] text-[#241b15]">
//           Bookings
//         </h1>

//         <p className="text-[#806f62] mt-1">
//           Keep track of your heritage experiences and visits.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-7 border-b border-[#e6dbd0] mb-7">

//         {["Upcoming", "Completed", "Cancelled"].map((item) => (
//           <button
//             key={item}
//             onClick={() => setTab(item)}
//             className={`pb-3 text-sm ${
//               tab === item
//                 ? "text-[#ad6417] border-b-2 border-[#ad6417]"
//                 : "text-[#796b60]"
//             }`}
//           >
//             {item}
//           </button>
//         ))}

//       </div>

//       {filtered.length === 0 ? (
//         <div className="bg-white border border-[#eadfd3] rounded-2xl py-20 text-center">
//           <Ticket className="mx-auto text-[#c18a4e]" size={42} />
//           <h3 className="font-serif text-2xl mt-4">
//             No {tab.toLowerCase()} bookings
//           </h3>
//           <p className="text-[#89786c] mt-2">
//             Your heritage experiences will appear here.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-5">

//           {filtered.map((booking) => (
//             <div
//               key={booking.id}
//               className="bg-white border border-[#eadfd3] rounded-2xl p-6"
//             >

//               <div className="flex justify-between">

//                 <div className="flex gap-4">

//                   <div className="w-12 h-12 rounded-xl bg-[#f8ead7] text-[#b86b18] flex items-center justify-center">
//                     <Ticket size={21} />
//                   </div>

//                   <div>
//                     <h2 className="font-serif text-[23px]">
//                       {booking.title}
//                     </h2>

//                     <p className="text-sm text-[#89786c] mt-1 flex items-center gap-1">
//                       <MapPin size={14} />
//                       {booking.location}
//                     </p>
//                   </div>

//                 </div>

//                 <span className="h-fit px-3 py-1.5 rounded-full text-xs bg-[#edf5ea] text-[#58704d]">
//                   {booking.status}
//                 </span>

//               </div>

//               <div className="grid grid-cols-4 mt-7 border-y border-[#eee4da] py-5">

//                 <Info
//                   icon={<CalendarDays size={16} />}
//                   label="Date"
//                   value={booking.date}
//                 />

//                 <Info
//                   icon={<Clock3 size={16} />}
//                   label="Time"
//                   value={booking.time}
//                 />

//                 <Info
//                   icon={<Ticket size={16} />}
//                   label="Visitors"
//                   value={`${booking.visitors} People`}
//                 />

//                 <Info
//                   label="Booking ID"
//                   value={booking.id}
//                 />

//               </div>

//               <div className="flex justify-between items-center mt-5">

//                 <span className="text-sm text-[#89786c]">
//                   {booking.type}
//                 </span>

//                 <div className="flex gap-3">

//                   <button className="h-10 px-4 rounded-lg border border-[#e4d8cc] flex items-center gap-2 text-sm">
//                     <Download size={15} />
//                     Ticket
//                   </button>

//                   <button className="h-10 px-4 rounded-lg bg-[#b86b18] text-white flex items-center gap-2 text-sm">
//                     View Details
//                     <ChevronRight size={15} />
//                   </button>

//                 </div>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }

// function Info({ icon, label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-[#98877a] mb-1 flex items-center gap-1.5">
//         {icon}
//         {label}
//       </p>

//       <p className="text-sm text-[#40342c]">
//         {value}
//       </p>
//     </div>
//   );
// }



import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Bookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-8 py-7 text-[#35281F]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        <div className="mb-2 flex items-center gap-3">
          <div className="h-px w-9 bg-[#C98A45]" />

          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A56A32]">
            Your Experiences
          </span>
        </div>

        <h1 className="font-cormorant text-[40px] font-bold leading-none text-[#241B15]">
          Bookings
        </h1>

        <p className="mt-2 max-w-xl text-[13px] leading-6 text-[#806F62]">
          Reserve heritage experiences, guided tours and cultural visits —
          all from one place.
        </p>

      </div>


      {/* =====================================================
          COMING SOON HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#E5D6C5]
          bg-white
          shadow-[0_8px_30px_rgba(76,48,27,0.05)]
        "
      >

        {/* Decorative background */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#F3E3D0]
            blur-2xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-64
            w-64
            rounded-full
            bg-[#F8EDE0]
            blur-3xl
          "
        />


        <div className="relative grid min-h-[390px] grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="flex flex-col justify-center px-8 py-12 lg:px-12">

            {/* Badge */}

            <div
              className="
                mb-5
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-[#E5CDB3]
                bg-[#FFF8EE]
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[1.5px]
                text-[#A96017]
              "
            >
              <Sparkles size={13} />
              Coming Soon
            </div>


            <h2
              className="
                max-w-xl
                font-cormorant
                text-[42px]
                font-bold
                leading-[1.05]
                text-[#2E2118]
              "
            >
              Your next heritage
              <span className="text-[#B86B18]"> experience awaits.</span>
            </h2>


            <p
              className="
                mt-5
                max-w-lg
                text-[14px]
                leading-7
                text-[#806F62]
              "
            >
              Soon you'll be able to book guided tours, heritage experiences,
              cultural activities and visitor slots directly through Viraasat.
            </p>


            {/* CTA */}

            <div className="mt-7 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#B86B18]
                  px-5
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_6px_16px_rgba(184,107,24,0.18)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#965511]
                "
              >
                Explore Heritage
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/map")}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DFD2C5]
                  bg-white
                  px-5
                  text-[13px]
                  font-medium
                  text-[#654D3A]
                  transition
                  hover:border-[#CDA77E]
                  hover:bg-[#FFFDFC]
                "
              >
                <Compass size={16} />
                Explore Map
              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT — VISUAL BOOKING CARD
          ================================================= */}

          <div className="relative flex items-center justify-center px-8 py-10">

            <div
              className="
                relative
                w-full
                max-w-[360px]
                rotate-[1deg]
                rounded-[22px]
                border
                border-[#E5D7C8]
                bg-[#FCFAF7]
                p-5
                shadow-[0_18px_45px_rgba(76,48,27,0.10)]
              "
            >

              {/* Fake booking header */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#F3E3D0]
                      text-[#B86B18]
                    "
                  >
                    <Ticket size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[1.5px] text-[#9A8777]">
                      Viraasat
                    </p>

                    <p className="font-cormorant text-[19px] font-bold text-[#34271F]">
                      Heritage Experience
                    </p>
                  </div>

                </div>

                <span
                  className="
                    rounded-full
                    bg-[#F3E3D0]
                    px-2.5
                    py-1
                    text-[9px]
                    font-semibold
                    text-[#A96017]
                  "
                >
                  COMING SOON
                </span>

              </div>


              {/* Divider */}

              <div className="my-5 border-t border-dashed border-[#DCCDBD]" />


              {/* Fake details */}

              <div className="space-y-4">

                <BookingPreview
                  icon={<MapPin size={15} />}
                  label="Experience"
                  value="Heritage guided tour"
                />

                <BookingPreview
                  icon={<CalendarDays size={15} />}
                  label="Visit Date"
                  value="Choose your preferred date"
                />

                <BookingPreview
                  icon={<Clock3 size={15} />}
                  label="Time"
                  value="Select available slot"
                />

              </div>


              {/* Disabled button */}

              <div
                className="
                  mt-6
                  flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EADFD4]
                  text-[11px]
                  font-semibold
                  text-[#9A8777]
                "
              >
                Booking will be available soon
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        <FeatureCard
          icon={<Ticket size={18} />}
          title="Easy Reservations"
          description="Reserve heritage tours and experiences directly from Viraasat."
        />

        <FeatureCard
          icon={<ShieldCheck size={18} />}
          title="Secure Booking"
          description="Your booking details and visitor information stay protected."
        />

        <FeatureCard
          icon={<Smartphone size={18} />}
          title="Digital Tickets"
          description="Keep your confirmed experiences and tickets in one place."
        />

      </div>


      {/* =====================================================
          FOOTER NOTE
      ===================================================== */}

      <div className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] text-[#9A8777]">
        <Sparkles size={13} className="text-[#B86B18]" />
        We're working on making heritage experiences easier to discover and book.
      </div>

    </div>
  );
}


/* ============================================================
   BOOKING PREVIEW
============================================================ */

function BookingPreview({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8DC] text-[#A96017]">
        {icon}
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[1px] text-[#9A8777]">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] font-medium text-[#514238]">
          {value}
        </p>
      </div>

    </div>
  );
}


/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-[#E8DCD0]
        bg-white
        p-5
        shadow-[0_4px_16px_rgba(76,48,27,0.035)]
        transition
        hover:-translate-y-0.5
        hover:shadow-[0_8px_22px_rgba(76,48,27,0.06)]
      "
    >

      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F4E5D4]
            text-[#A96017]
          "
        >
          {icon}
        </div>

        <div>

          <h3 className="font-cormorant text-[18px] font-bold text-[#35271E]">
            {title}
          </h3>

          <p className="mt-1 text-[11px] leading-5 text-[#89776A]">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

