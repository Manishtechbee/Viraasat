import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navlogo from "../../assets/Navlogo.png";
import { ChevronDown, Globe, Sun, Bell,
  
  User,
  LogOut,
  Settings,
  Bookmark,
  Home,
  LayoutDashboard } from "lucide-react";
import * as authService from "../../services/auth.service";
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import LanguageSelector from '../LanguageSelector';

const menuItems = [
  {
    itemName: "My Profile",
    LinkTo: "/profile",
    icon: <User size={18} />,
  },
  {
    itemName: "Dashboard",
    LinkTo: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    itemName: "Collections",
    LinkTo: "/collections",
    icon: <Bookmark size={18} />,
  },
  {
    itemName: "Settings",
    LinkTo: "/settings",
    icon: <Settings size={18} />,
  },
  {
    itemName: "Logout",
    icon: <LogOut size={18} />,
    logout: true,
  },
];
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


export default function HeritageNav() {
 const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const {user,setUser}= useAuth();
  const isLoggedIn = !!user; // from context/redux
  const [open, setOpen] = useState(false); // for user dropdown
  const languages = [
    "English",
    "Hindi",
    "Punjabi",
    "French",
    "Spanish",
  ];
  const navigate= useNavigate();
  const handleLogout = async () => {
  try {
    await authService.logout();

    // If you're storing token manually
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("User logged out successfully.")

    // Clear user from context
    // (replace with whatever your context provides)

    navigate("/");
  } catch (err) {
    toast.error("Can't Log out!")
    console.error(err);
  }
};
  return (
    <>
    <nav className="w-full px-8 py-3 flex items-center justify-between  ">
       {/* Logo */}


<Link to={"/"}>
      <div className="flex items-center gap-2">
        <img
          src={Navlogo}
          alt="Viraasat"
          className="w-9 h-9 object-contain"
        />
        <div>
            <h1 className="text-[#8B5E3C] text-2xl font-bold tracking-wide font-cormorant">
          VIRAASAT
        </h1>
        <p className="text-[11px] text-[#8A7A6C]">
            Preserving India's Legacy
        </p>
        </div>
      </div>
      </Link>
    


{/* Navigation */}


<ul className="flex items-center gap-8 text-[16px] text-gray-700 font-medium">
    {tabs.map((tab) => (
        <li key={tab.tabName}>
            <NavLink
                to={tab.tabLink}
                className={({ isActive }) =>
                    `
                    relative
                    py-3.5
                    transition
                    ${
                        isActive
                            ? "text-[#8B4A17] font-semibold"
                            : "text-[#4A3A31] hover:text-[#8B4A17]"
                    }
                `
                }
            >
                {({ isActive }) => (
                    <>
                        {tab.tabName}

                        {isActive && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    bottom-0
                                    h-[3px]
                                    w-full
                                    rounded-full
                                    bg-[#8B4A17]
                                "
                            />
                        )}
                    </>
                )}
            </NavLink>
        </li>
    ))}
</ul>




<div className="flex items-center gap-5">
    {/* Language */}
       {/* <div className="relative">
      {/* Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-700 hover:text-black transition"
      >
        <Globe size={19} />
        <span className="text-[16px]">{selectedLanguage}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button> */}

      {/* Dropdown */}
      {/* {isOpen && (
        <div className="absolute right-0 mt-2.5 w-40 bg-white/50 rounded-lg shadow-lg border border-gray-200 z-[999] backdrop-blur-2xl">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                selectedLanguage === language
                  ? "bg-blue-50/50 text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div> */} 
    <LanguageSelector/>


<button
    className="
        w-10
        h-10
        rounded-full
        flex
        items-center
        justify-center
        hover:bg-[#F7F0E8]
        transition
    "
>
    <Bell size={18}/>
</button>


{/* user profile */}

    <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-3
               pl-2 pr-4
               h-12
               rounded-full
               bg-white
               border border-[#E7D7C7]
               hover:shadow-lg
               hover:border-[#D6B89B]
               transition-all duration-300"
  >
      {user?.avatar ? (
      <img
        src={user?.avatar}
        className="w-11 h-11 rounded-full object-cover border-2 border-[#E9D9C5]"
      />):(<User/>)}

      <div className="text-left hidden lg:block">
        <p className="font-semibold text-[15px]">
          {user?.name}
        </p>

        <p className="text-xs text-gray-500">
          Explorer
        </p>
      </div>

      <ChevronDown size={18} />
    </button>

     {open && (
       <>
        <div className="absolute right-5 top-15 w-64 h-54 mt-2.5 bg-white/65 "></div>

      <div className="absolute right-5 top-15 w-64 shadow-xl mt-2.5  bg-white/75 rounded-lg shadow-lg border border-gray-100 backdrop-blur-3xl">

        
{menuItems.map((item) =>
  item.logout ? (
    <button
      key={item.itemName}
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-5 py-3 text-red-500 hover:bg-red-50"
    >
      {item.icon}
      {item.itemName}
    </button>
  ) : (
    <Link key={item.itemName} to={item.LinkTo}>
      <button
        className="flex items-center gap-3 w-full px-5 py-3 hover:bg-[#FAF5EF]"
        onClick={() => setOpen(false)}
      >
        {item.icon}
        {item.itemName}
      </button>
    </Link>
  )
)}
        

      

        
      </div>
      </>
    )}


</div>
</nav>
    </>
  )
}



