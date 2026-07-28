import { Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const { user } = useAuth();
  const navigate= useNavigate();

  return (
    <div className="flex items-start justify-between">

      {/* Left */}

      <div>
        <h1 className="text-[42px] leading-none font-cormorant font-semibold text-[#2E221B]">
          Welcome back,
          <span className="text-[#8B5A2B] ml-2">
            {user?.name || "Explorer"}!
          </span>
          <span className="ml-2">👋</span>
        </h1>

        <p className="mt-4 text-[18px] text-[#756658]">
          Explore India's rich heritage with Viraasat.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Notification */}

        <button
          className="
            w-12
            h-12
            rounded-full
            bg-white
            border
            border-[#ECE1D5]
            flex
            items-center
            justify-center
            hover:shadow-md
            transition
          "
        >
          <Bell
            size={20}
            className="text-[#6D5C4D]"
          />
        </button>

        {/* Avatar */}

        <button
        onClick={()=>navigate("/profile")}
          className="
            flex
            items-center
            justify-center
          "
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="
                w-14
                h-14
                rounded-full
                object-cover
                border-[3px]
                border-[#E9D8C5]
                shadow-md
              "
            />
          ) : (
            <div
              className="
                w-14
                h-14
                rounded-full
                bg-[#D8C2A8]
                text-white
                text-xl
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
        </button>

      </div>
    </div>
  );
}