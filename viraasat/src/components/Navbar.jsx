import { ChevronDown, Globe, Sun, Bell,
  
  User,
  LogOut,
  Settings,
  Bookmark,
  LayoutDashboard } from "lucide-react";
import Navlogo from "../assets/Navlogo.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import LanguageSelector from "./LanguageSelector";
// import * as authService from "../services/auth.service";

const tabs=[
  {tabName:"Explore",
   tabLink:"/explore",
  },
  {tabName:"States",
   tabLink:"/map",
  },
  {tabName:"Map",
   tabLink:"/map",
  },
  {tabName:"AI Guide",
   tabLink:"/ai_guide",
  },
  {tabName:"About",
   tabLink:"/about",
  },
]




const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = !!user; // from context/redux
  // const [open, setOpen] = useState(false); // for user dropdown
  useEffect(()=>{

},[isLoggedIn])
  // const languages = [
  //   "English",
  //   "Hindi",
  //   "Punjabi",
  //   "French",
  //   "Spanish",
  // ];
  return (
    <nav className="w-full px-8 py-3 flex items-center justify-between  ">
      {/* Logo */}
      <Link to={"/"}>
      <div className="flex items-center gap-2">
        <img
          src={Navlogo}
          alt="Viraasat"
          className="w-9 h-9 object-contain"
        />
        <h1 className="text-[#8B5E3C] text-2xl font-bold tracking-wide font-cormorant">
          VIRAASAT
        </h1>
      </div>
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-8 text-[16px] text-gray-700 font-medium">
        {tabs.map((tab)=>{
          return(
            <Link to={tab.tabLink} key={tab.tabName}>
            <li className="cursor-pointer hover:text-[#000000] transition">
          {tab.tabName}
        </li>
            </Link>
          )
        })}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Auth Buttons */}
{!isLoggedIn ? (
  <>
    <button
      className="hover:text-black text-gray-700 px-6 py-2 text-[16px] font-semibold transition"
      onClick={() => navigate("/login")}
    >
      Log In
    </button>

    <button
      className="bg-[#1f2078] hover:bg-[#171867] text-white px-5 py-1.5 rounded-xl text-[16px] font-semibold transition"
      onClick={() => navigate("/signup")}
    >
      Sign Up
    </button>
  </>
) : (
  <div className="relative flex items-center gap-5">

    

    <button
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-2
               h-11 px-5
               rounded-full
               bg-[#FFF7ED]
               border border-[#E7D7C7]
               text-[#8B5E3C]
               hover:bg-[#F8EBDD]
               hover:border-[#D6B89B]
               transition-all duration-300"
  >
    <LayoutDashboard size={18} />
    <span className="font-medium">Dashboard</span>
  </button>

  </div>
)}

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400"></div>
        {/* Language */}
       <LanguageSelector/>
      </div>
    </nav>
  );
};

export default Navbar;