import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  Route,
  CalendarDays,
  Settings,
  LogOut,
  Menu,
  User,
} from "lucide-react";

import Navlogo from "../../assets/Navlogo.png";
import * as authService from "../../services/auth.service";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    title: "Saved Places",
    icon: Heart,
    link: "/saved-places",
  },
  {
    title: "My Journeys",
    icon: Route,
    link: "/my-journeys",
  },
  {
    title: "Bookings",
    icon: CalendarDays,
    link: "/bookings",
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/settings",
  },
];

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { user,setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);

      toast.success("User Logged out successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Error while logging out!");
      console.error("Error while logging out!", err);
    }
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-15
        z-50

        w-[285px]
        h-[calc(100vh-60px)]

        bg-[#FCFAF6]/80
        backdrop-blur-xl

        border-r
        border-[#E9DED0]

        flex
        flex-col

        shadow-[4px_0_10px_rgba(92,62,35,0.30)]

        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${isOpen
          ? "translate-x-0"
          : "-translate-x-[229px]"
        }
      `}
    >

      {/* ================= MENU TOGGLE ================= */}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Collapse sidebar" : "Open sidebar"}
        className="
          absolute
          top-10
          right-4
          z-20

          w-8
          h-8

          flex
          items-center
          justify-center

          text-[#7B4B1A]

          transition-all
          duration-300

          hover:text-[#5F3814]
          hover:scale-110

          active:scale-90
        "
      >
        <Menu
          size={21}
          strokeWidth={2}
          className={`
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isOpen ? "rotate-0" : "rotate-180"}
          `}
        />
      </button>
      

      {/* ================= SIDEBAR CONTENT ================= */}

      <div
        className={`
          flex
          flex-col
          h-full

          transition-opacity
          duration-300

          ${
            isOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}
      >

{/* ================= PROFILE ================= */}
<div className="px-5 pt-10 pb-3">
  <div className="flex items-center gap-3">
    <div
      className="
        flex h-10 w-10 shrink-0
        items-center justify-center
        rounded-full
        bg-[#F1DFCC]
        text-[#8B5A2B]
      "
    >
      <User size={19} strokeWidth={1.8} />
    </div>

    <div className="min-w-0">
      <p className="text-[10px] text-[#9A8978]">
        Welcome back
      </p>

      <p className="truncate font-cormorant text-[20px] font-bold leading-tight text-[#3D2B20]">
        {user?.name || "Heritage Explorer"}
      </p>
    </div>
  </div>
</div>
        {/* ================= MENU ================= */}

        <div className="flex-1 px-4 py-6 overflow-hidden">

          <div className="space-y-2">

            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.link}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-4

                      h-13
                      px-5

                      rounded-2xl

                      transition-all
                      duration-300

                      group

                      ${
                        isActive
                          ? "bg-[#F6E9D9] text-[#7B4B1A] shadow-sm"
                          : "text-[#6E6155] hover:bg-[#F9F2EA]"
                      }
                    `
                  }
                >

                  <Icon
                    size={19}
                    strokeWidth={2}
                    className="
                      shrink-0

                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  />

                  <span
                    className="
                      text-[15px]
                      font-medium
                      whitespace-nowrap
                    "
                  >
                    {item.title}
                  </span>

                </NavLink>
              );
            })}

          </div>
        </div>


        {/* ================= LOGOUT ================= */}

        <div
          className="
            px-5
            py-6

            border-t
            border-[#EFE6DA]

            shrink-0
          "
        >

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-4

              w-full
              h-12.5
              px-4

              rounded-2xl

              text-[#C95B43]

              hover:bg-[#FBE9E3]
              hover:text-[#B5442D]

              transition-all
              duration-300

              hover:translate-x-1
            "
          >

            <LogOut
              size={20}
              strokeWidth={2}
            />

            <span className="font-medium">
              Logout
            </span>

          </button>

        </div>

      </div>
    </aside>
  );
}