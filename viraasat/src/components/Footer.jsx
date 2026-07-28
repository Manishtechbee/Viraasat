import {
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export const companyLinks = [
  {
    name: "About Us",
    LinkTo: "/about",
  },
  {
    name: "Our Mission",
    LinkTo: "/mission",
  },
  {
    name: "Blog",
    LinkTo: "/blog",
  },
  {
    name: "Careers",
    LinkTo: "/careers",
  },
  {
    name: "Privacy Policy",
    LinkTo: "/privacy",
  },
  {
    name: "Terms & Conditions",
    LinkTo: "/terms",
  },
];
export const exploreLinks = [
  {
    name: "Heritage Sites",
    LinkTo: "/heritage-sites",
  },
  {
    name: "Interactive Map",
    LinkTo: "/map",
  },
  {
    name: "Virtual Tours",
    LinkTo: "/virtual-tours",
  },
  {
    name: "AI Heritage Guide",
    LinkTo: "/ai-guide",
  },
  {
    name: "Audio Guides",
    LinkTo: "/audio-guides",
  },
  {
    name: "Gallery",
    LinkTo: "/gallery",
  },
];

const contacts = [
  {
    icon: Mail,
    value: "support@viraasat.in",
  },
  {
    icon: Phone,
    value: "+91 98765 43210",
  },
  {
    icon: MapPin,
    value: "Chandigarh, India",
  },
];

export const socials = [
  {
    icon: FaFacebookF,
    name: "Facebook",
    LinkTo: "https://facebook.com",
  },
  {
    icon: FaInstagram,
    name: "Instagram",
    LinkTo: "https://instagram.com",
  },
  {
    icon: FaXTwitter,
    name: "X",
    LinkTo: "https://x.com",
  },
  {
    icon: FaLinkedinIn,
    name: "LinkedIn",
    LinkTo: "https://linkedin.com",
  },
  {
    icon: FaYoutube,
    name: "YouTube",
    LinkTo: "https://youtube.com",
  },
];

const bottomLinks=[
  {LinkName:"Privacy",
   LinkTo:"/privacy",
  },
  {LinkName:"Terms",
   LinkTo:"/terms",
  },
  {LinkName:"Cookies",
   LinkTo:"/cookies",
  },
]

import Navlogo from "../assets/Navlogo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#111827] text-white mt-24">

      {/* Top */}

      <div className="max-w-7xl mx-auto py-16">

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <img
                src={Navlogo}
                alt="Viraasat"
                className="w-12 h-14"
              />

              <div>

                <h2 className="text-2xl font-bold tracking-wide">
                  VIRAASAT
                </h2>

                <p className="text-gray-400 text-sm">
                  Discover India's Heritage
                </p>

              </div>

            </div>

            <p className="mt-6 text-gray-400 leading-7 max-w-md">
              Viraasat is an immersive heritage exploration platform that
              helps travelers, students and history enthusiasts discover,
              preserve and experience India's rich cultural legacy.
            </p>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              {socials.map(({icon:Icon,name,LinkTo}, i) => (

                <button
                  key={name}
                  onClick={()=>window.open(LinkTo, "_blank", "noopener,noreferrer")}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#312783] transition flex items-center justify-center"
                >
                  <Icon size={18} />
                </button>

              ))}

            </div>

          </div>

          {/* Explore */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-gray-400">
              {exploreLinks.map((item) => (
    <Link to={item.LinkTo} 
      key={item.name}>
      <li
      className="text-gray-400 hover:text-white transition cursor-pointer"
    >
      {item.name}
    </li>
    </Link>
  ))}

        

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">

              {companyLinks.map((item) => (
    <Link to={item.LinkTo} 
      key={item.name}>
      <li
      className="text-gray-400 hover:text-white transition cursor-pointer"
    >
      {item.name}
    </li>
    </Link>
  ))}
            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

               {contacts.map(({ icon: Icon, value }) => (
    <div key={value} className="flex gap-3 items-start">
      <Icon size={18} className="text-[#6D5DF6] mt-1" />
      <span className="text-gray-400">{value}</span>
    </div>
  ))}

            </div>

          </div>

        </div>

      </div>

      

      {/* Bottom */}

      <div className="max-w-7xl mx-auto  py-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-400">
          © 2026 Viraasat. All rights reserved.
        </p>

        <div className="flex gap-8 text-sm text-gray-400">
          {bottomLinks.map((item)=>{
            return (<Link to={item.LinkTo} key={item.LinkName}>
              <button  className="hover:text-white transition">
            {item.LinkName}
          </button>
            </Link>)
          })}
          

          

        </div>

      </div>

    </footer>
  );
}