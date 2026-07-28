import React from 'react'

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function HeritageFooter() {
  return (
    
 <footer className=" border-t border-[#E8D9C8] bg-[#fff5eb] relative bottom-0 w-full">

      

      {/* Bottom */}

      <div className=" border-[#E8D9C8]">

        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-14 py-3.5">

          <p className="text-[15px] text-[#736659]">
            © 2026 Viraasat. Preserving India's Legacy.
          </p>

          <div className="flex gap-8 text-[15px] text-[#736659]">
            {[{ LinkName: "About", LinkTo: "/about" },
              { LinkName: "Privacy", LinkTo: "/privacy" },
              { LinkName: "Terms", LinkTo: "/terms" },
            {LinkName:"Cookies", LinkTo: "/cookies"}].map((item)=>{
                return (<Link to={item.LinkTo} key={item.LinkName}>
                  <button  className="hover:text-[#8C4A18] transition">
                {item.LinkName}
              </button>
                </Link>)
              })}
            

          </div>

          <div className="flex gap-4">

            {[FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
              <button
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8D9C8] text-[#8B4A18] transition hover:bg-[#8B4A18] hover:text-white"
              >
                <Icon size={16} />
              </button>
            ))}

          </div>

        </div>

      </div>

    </footer>
  )
}
