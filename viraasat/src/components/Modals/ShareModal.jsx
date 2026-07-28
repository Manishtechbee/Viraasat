import {
  X,
  Link2,
  Check,
} from "lucide-react";

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { useState } from "react";

export default function ShareModal({
  open,
  onClose,
  place = {
    title: "Taj Mahal",
    url: window.location.href,
  },
}) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const shareUrl = place.url;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const socials = [
    {
      title: "Copy Link",
      color: "#8B4A17",
      icon: <Link2 size={22} />,
      onClick: copyLink,
    },

    {
      title: "WhatsApp",
      color: "#25D366",
      icon: <FaWhatsapp size={22} />,
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
        ),
    },

    {
      title: "Facebook",
      color: "#1877F2",
      icon: <FaFacebook size={22} />,
      onClick: () =>
        window.open(
          `https://facebook.com/sharer/sharer.php?u=${shareUrl}`
        ),
    },

    {
      title: "Twitter",
      color: "#1DA1F2",
      icon: <FaTwitter size={22} />,
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${shareUrl}`
        ),
    },

  ];

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
          fixed
          inset-0
          z-[999]
          bg-black/45
          backdrop-blur-md
          flex
          items-center
          justify-center
          p-5
        "
        >

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: .92,
              y: 60,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .92,
              y: 60,
            }}
            transition={{
              duration: .45,
              ease: [.22,1,.36,1],
            }}
            className="
            w-full
            max-w-[430px]
            rounded-[30px]
            bg-[#FFFDF9]
            border
            border-[#E8DDD0]
            shadow-[0_30px_80px_rgba(0,0,0,.18)]
            overflow-hidden
          "
          >

            {/* Header */}

            <div
              className="
              flex
              items-center
              justify-between
              px-7
              py-4
              border-b
              border-[#EFE5DA]
            "
            >

              <h2
                className="
                text-[26px]
                font-semibold
                text-[#2F2118]
              "
              >
                Share
              </h2>

              <button
                onClick={onClose}
                className="
                w-10
                h-10
                rounded-full
                hover:bg-[#F6EFE8]
                transition
                flex
                items-center
                justify-center
              "
              >
                <X size={20}/>
              </button>

            </div>

            {/* Body */}

            <div className="px-8 py-7">

              {/* Social Grid */}

              <div className="grid grid-cols-4 gap-5">

                {socials.slice(0,4).map((item)=>(
                  <button
                    key={item.title}
                    onClick={item.onClick}
                    className="
                    flex
                    flex-col
                    items-center
                    gap-3
                    group
                  "
                  >

                    <div
                      className="
                      w-15
                      h-15
                      rounded-full
                      bg-[#FFF7EF]
                      border
                      border-[#EFE2D3]
                      flex
                      items-center
                      justify-center
                      transition
                      group-hover:scale-110
                    "
                      style={{
                        color:item.color,
                      }}
                    >

                      {item.icon}

                    </div>

                    <span
                      className="
                      text-[13px]
                      font-medium
                      text-[#5B4A3F]
                    "
                    >
                      {item.title}
                    </span>

                  </button>
                ))}

              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">

                {socials.slice(4).map((item)=>(
                  <button
                    key={item.title}
                    onClick={item.onClick}
                    className="
                    rounded-2xl
                    border
                    border-[#EFE2D3]
                    h-20
                    flex
                    items-center
                    gap-4
                    px-5
                    hover:bg-[#FFF8F2]
                    transition
                  "
                  >

                    <div
                      style={{color:item.color}}
                    >
                      {item.icon}
                    </div>

                    <span
                      className="
                      font-medium
                      text-[#5C4A40]
                    "
                    >
                      {item.title}
                    </span>

                  </button>
                ))}

              </div>
                            {/* Divider */}

              <div className="my-5 flex items-center">

                <div className="flex-1 h-px bg-[#EFE3D6]" />

                <p className="px-4 text-[15px] text-[#8A7668] font-medium">
                  Or scan QR code
                </p>

                <div className="flex-1 h-px bg-[#EFE3D6]" />

              </div>

              {/* QR */}

              <div className="flex justify-center">

                <div
                  className="
                  rounded-[22px]
                  border
                  border-[#EFE3D6]
                  bg-white
                  p-5
                  shadow-sm
                "
                >

                  <QRCode
                    value={shareUrl}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#2F2118"
                  />

                </div>

              </div>

              {/* Copy Success */}

              <AnimatePresence>

                {copied && (

                  <motion.div
                    initial={{
                      opacity:0,
                      y:10,
                    }}
                    animate={{
                      opacity:1,
                      y:0,
                    }}
                    exit={{
                      opacity:0,
                      y:10,
                    }}
                    className="
                    mt-6
                    rounded-xl
                    bg-[#EAF8EF]
                    border
                    border-[#B8E4C7]
                    px-4
                    py-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[#20894B]
                    font-medium
                  "
                  >

                    <Check size={18}/>

                    Link copied successfully

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {/* Footer */}

            <div
              className="
              px-8
              pb-8
            "
            >

              <button
                onClick={onClose}
                className="
                w-full
                h-[56px]
                rounded-2xl
                border
                border-[#E8DDD0]
                text-[#5B473A]
                font-semibold
                bg-[#a1571e]
                hover:bg-[#8B4A17]
                transition-all
                duration-300
                text-white
              "
              >
                Close
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}