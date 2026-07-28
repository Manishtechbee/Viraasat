import React, { useEffect, useMemo, useState } from "react";
import {
  UserRound,
  CalendarDays,
  Bookmark,
  Landmark,
  Star,
  MapPin,
  Camera,
  Pencil,
  Mail,
  Phone,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronDown,
  TrendingUp,
  Footprints,
  Image as ImageIcon,
  Award,
  Compass,
  RefreshCcw,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeritageNav from "../components/Heritage/HeritageNav";
import * as authService from "../services/auth.service";
import useAuth from "../hooks/useAuth";


/* =========================================================
   SIDEBAR
========================================================= */

const sidebarItems = [
  {
    label: "Overview",
    icon: UserRound,
    route: "/profile",
  },
  {
    label: "My Bookings",
    icon: CalendarDays,
    route: "/bookings",
  },
  {
    label: "Saved Places",
    icon: Bookmark,
    route: "/saved-places",
  },
  {
    label: "Settings",
    icon: Settings,
    route: "/settings",
  },
  {
    label: "Notifications",
    icon: Bell,
    route: "/settings",
  },
  {
    label: "Privacy",
    icon: Shield,
    route: "/settings",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    route: "/settings",
  },
];


/* =========================================================
   BADGE ICONS
========================================================= */

const badgeIcons = {
  explorer: Landmark,
  heritage: Landmark,
  wanderer: MapPin,
  photographer: Camera,
  traveler: Compass,
  reviewer: Pencil,
  default: Award,
};


/* =========================================================
   MAIN
========================================================= */

export default function Profile() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeSidebar, setActiveSidebar] =
    useState("Overview");

  const [period, setPeriod] = useState("This Year");


  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await authService.getMe();

      const userData =
        response?.data?.profile ||
        response?.data?.user ||
        response?.profile ||
        response?.user ||
        response?.data ||
        response;

      if (!userData) {
        throw new Error("Profile data not found.");
      }

      setProfile(userData);
    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      await authService.logout();

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);

      toast.success("Logged out successfully!");

      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);

      toast.error("Unable to logout.");
    }
  };


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNavigation = (item) => {
    setActiveSidebar(item.label);
    navigate(item.route);
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <>
        <div className="sticky left-0 top-0 z-[999] w-full border border-white/40 bg-white/30 shadow-md backdrop-blur-[40px]">
          <HeritageNav />
        </div>

        <ProfileSkeleton />
      </>
    );
  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !profile) {
    return (
      <>
        <div className="sticky left-0 top-0 z-[999] w-full border border-white/40 bg-white/30 shadow-md backdrop-blur-[40px]">
          <HeritageNav />
        </div>

        <ProfileError
          message={error || "Profile could not be loaded."}
          onRetry={fetchProfile}
        />
      </>
    );
  }


  /* =========================================================
     NORMALIZE DATA
  ========================================================= */

  const stats = profile.stats || {};
  const journey = profile.journey || {};

  const badges = Array.isArray(profile.badges)
    ? profile.badges
    : [];

  const name =
    profile.name ||
    profile.fullName ||
    profile.username ||
    "Heritage Explorer";

  const email = profile.email || "Email not added";

  const avatar =
    profile.avatar ||
    profile.profileImage ||
    profile.image ||
    "";

  const location =
    typeof profile.location === "object"
      ? [
          profile.location?.city,
          profile.location?.state,
        ]
          .filter(Boolean)
          .join(", ") || "Location not added"
      : profile.location || "Location not added";

  const bio =
    profile.bio ||
    "Your heritage journey begins here. Explore India's incredible culture, history and hidden stories.";

  const role =
    profile.role ||
    profile.accountType ||
    "Heritage Explorer";

  const phone =
    profile.phone ||
    profile.phoneNumber ||
    "Not added";

  const joinedDate =
    profile.joinedAt ||
    profile.createdAt ||
    null;

  const formattedJoinedDate = joinedDate
    ? new Date(joinedDate).toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "—";


  /* =========================================================
     STATS
  ========================================================= */

  const placesSaved =
    stats.placesSaved ??
    stats.savedPlaces ??
    profile.savedPlacesCount ??
    0;

  const placesVisited =
    stats.placesVisited ??
    stats.visitedPlaces ??
    profile.visitedPlacesCount ??
    0;

  const averageRating =
    stats.averageRating ??
    stats.avgRating ??
    profile.averageRating ??
    0;

  const statesExplored =
    stats.statesExplored ??
    profile.statesExplored ??
    0;


  const journeySaved =
    journey.placesSaved ??
    journey.savedPlaces ??
    placesSaved;

  const journeyVisited =
    journey.placesVisited ??
    journey.visitedPlaces ??
    placesVisited;

  const photosShared =
    journey.photosShared ??
    profile.photosShared ??
    0;

  const reviewsWritten =
    journey.reviewsWritten ??
    profile.reviewsWritten ??
    0;


  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#30251E]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div className="sticky left-0 top-0 z-[999] w-full border border-white/40 bg-white/30 shadow-md backdrop-blur-[40px]">
        <HeritageNav />
      </div>


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="relative overflow-hidden">

        {/* Soft background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6EBDD] via-[#F9F4EB] to-[#F8F3EA]" />

        {/* Heritage decorative shape */}
        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[500px] w-[650px] rounded-full bg-[#E8D3B5]/25 blur-3xl" />

        <div className="relative mx-auto max-w-[1450px] px-6 pb-24 pt-14 lg:px-10 xl:px-16">

          <div className="flex items-start justify-between">

            <div>

              {/* Ornament */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#B66C25]" />

                <span className="font-serif text-[18px] text-[#B66C25]">
                  ✦
                </span>

                <span className="h-px w-10 bg-[#B66C25]" />
              </div>

              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-[#A06A39]">
                Your Heritage Journey
              </p>

              <h1 className="font-cormorant text-[48px] font-semibold leading-[0.95] tracking-[-0.02em] text-[#2E2119] sm:text-[58px] lg:text-[68px]">
                My Profile
              </h1>

              <p className="mt-5 max-w-[500px] font-sans text-[16px] leading-7 text-[#746456]">
                Manage your account, discover your journey,
                and keep track of the places that tell
                India's story.
              </p>

            </div>


            {/* SETTINGS */}
            <button
              onClick={() => navigate("/settings")}
              className="
                group
                hidden
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#DCCDBB]
                bg-white/80
                text-[#55473C]
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-[#B87836]
                hover:bg-white
                hover:text-[#A66020]
                sm:flex
              "
              aria-label="Settings"
            >
              <Settings
                size={20}
                strokeWidth={1.7}
                className="transition group-hover:rotate-45"
              />
            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-20 mx-auto max-w-[1450px] px-5 pb-20 lg:px-10 xl:px-16">

        <div className="-mt-14 grid grid-cols-1 gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="space-y-5">


            {/* PROFILE CARD */}

            <div className="
              overflow-hidden
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              shadow-[0_18px_50px_rgba(80,55,30,0.09)]
            ">

              {/* Card top */}
              <div className="h-20 bg-gradient-to-r from-[#EEDBC1] via-[#F8ECDD] to-[#E8D2B5]" />

              <div className="-mt-14 px-6 pb-7">

                {/* Avatar */}

                <div className="relative mx-auto h-[120px] w-[120px]">

                  <div className="
                    h-full
                    w-full
                    overflow-hidden
                    rounded-full
                    border-[6px]
                    border-[#FFFDF9]
                    bg-[#EBDCC8]
                    shadow-[0_8px_25px_rgba(67,46,27,0.15)]
                  ">

                    {avatar ? (
                      <img
                        src={avatar}
                        alt={name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#EBDCC8]">
                        <UserRound
                          size={46}
                          strokeWidth={1.2}
                          className="text-[#9A7048]"
                        />
                      </div>
                    )}

                  </div>


                  {/* Camera */}

                  <button
                    onClick={() => navigate("/settings")}
                    className="
                      absolute
                      bottom-1
                      right-0
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-[#FFFDF9]
                      bg-[#B86B25]
                      text-white
                      shadow-md
                      transition
                      hover:scale-105
                    "
                  >
                    <Camera size={15} />
                  </button>

                </div>


                {/* Name */}

                <div className="mt-5 text-center">

                  <h2 className="font-cormorant text-[30px] font-semibold leading-tight text-[#322219]">
                    {name}
                  </h2>

                  <p className="mt-1 truncate text-[13px] text-[#88796C]">
                    {email}
                  </p>

                </div>


                {/* Location */}

                <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-[#77685B]">

                  <MapPin
                    size={15}
                    strokeWidth={1.7}
                  />

                  <span>{location}</span>

                </div>


                {/* Role */}

                <div className="mx-auto mt-5 flex w-fit items-center gap-2 border border-[#E8D4B8] bg-[#FCF3E5] px-4 py-2 text-[12px] font-medium text-[#8C5725]">

                  <span className="text-[#B8752D]">
                    ✦
                  </span>

                  {role}

                </div>

              </div>

            </div>


            {/* ACCOUNT NAVIGATION */}

            <div className="
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              p-3
              shadow-[0_12px_35px_rgba(80,55,30,0.06)]
            ">

              <p className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A18D7A]">
                Account
              </p>

              <nav className="space-y-1">

                {sidebarItems.map((item) => {

                  const Icon = item.icon;

                  const active =
                    activeSidebar === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() =>
                        handleNavigation(item)
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-left
                        transition-all
                        duration-200

                        ${
                          active
                            ? "bg-[#F7EBDD] text-[#A85F20]"
                            : "text-[#5C4D41] hover:bg-[#FAF5EE]"
                        }
                      `}
                    >

                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className={
                          active
                            ? "text-[#B56B28]"
                            : "text-[#817366]"
                        }
                      />

                      <span className="text-[13px] font-medium">
                        {item.label}
                      </span>

                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#B66B28]" />
                      )}

                    </button>
                  );

                })}

              </nav>


              <div className="my-3 h-px bg-[#EDE3D8]" />


              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-left
                  text-[#B84E40]
                  transition
                  hover:bg-[#FFF1EE]
                "
              >
                <LogOut
                  size={18}
                  strokeWidth={1.7}
                />

                <span className="text-[13px] font-medium">
                  Logout
                </span>
              </button>

            </div>

          </aside>


          {/* =================================================
              CONTENT
          ================================================= */}

          <section className="min-w-0 space-y-5">


            {/* =================================================
                STAT STRIP
            ================================================= */}

            <div className="
              overflow-hidden
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              shadow-[0_12px_40px_rgba(80,55,30,0.06)]
            ">

              <div className="grid grid-cols-2 md:grid-cols-4">

                <ProfileStat
                  icon={Bookmark}
                  value={placesSaved}
                  label="Places Saved"
                />

                <ProfileStat
                  icon={Landmark}
                  value={placesVisited}
                  label="Places Visited"
                />

                <ProfileStat
                  icon={Star}
                  value={averageRating}
                  label="Average Rating"
                />

                <ProfileStat
                  icon={MapPin}
                  value={statesExplored}
                  label="States Explored"
                  last
                />

              </div>

            </div>


            {/* =================================================
                ABOUT
            ================================================= */}

            <section className="
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              p-6
              shadow-[0_12px_40px_rgba(80,55,30,0.05)]
              md:p-8
            ">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AA7650]">
                    Personal Details
                  </p>

                  <h2 className="font-cormorant text-[29px] font-semibold text-[#38271D]">
                    About Me
                  </h2>

                </div>


                <button
                  onClick={() => navigate("/settings")}
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    border
                    border-[#E3D5C5]
                    bg-[#FFFDF9]
                    px-4
                    py-2
                    text-[12px]
                    font-medium
                    text-[#625246]
                    transition
                    hover:border-[#CFA06F]
                    hover:bg-[#FCF4E9]
                    hover:text-[#A55F22]
                  "
                >
                  <Pencil size={14} />
                  Edit Profile
                </button>

              </div>


              <p className="
                mt-6
                max-w-[850px]
                text-[15px]
                leading-7
                text-[#75665A]
              ">
                {bio}
              </p>


              {/* Details */}

              <div className="
                mt-7
                grid
                grid-cols-1
                border-t
                border-[#EDE4DA]
                pt-6
                md:grid-cols-3
              ">

                <InfoItem
                  icon={CalendarDays}
                  label="Member Since"
                  value={formattedJoinedDate}
                />

                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value={phone}
                  last
                />

              </div>

            </section>


            {/* =================================================
                JOURNEY
            ================================================= */}

            <section className="
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              p-6
              shadow-[0_12px_40px_rgba(80,55,30,0.05)]
              md:p-8
            ">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AA7650]">
                    Your Activity
                  </p>

                  <div className="flex items-center gap-3">

                    <TrendingUp
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#A96934]"
                    />

                    <h2 className="font-cormorant text-[29px] font-semibold text-[#38271D]">
                      My Journey
                    </h2>

                  </div>

                </div>


                <div className="relative">

                  <select
                    value={period}
                    onChange={(e) =>
                      setPeriod(e.target.value)
                    }
                    className="
                      appearance-none
                      border
                      border-[#E3D5C5]
                      bg-[#FFFDF9]
                      py-2
                      pl-4
                      pr-9
                      text-[12px]
                      font-medium
                      text-[#5C4D41]
                      outline-none
                      focus:border-[#B87A3C]
                    "
                  >
                    <option>This Year</option>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8D7B6B]"
                  />

                </div>

              </div>


              {/* JOURNEY STATS */}

              <div className="mt-8 grid grid-cols-2 border-t border-[#EDE4DA] pt-7 md:grid-cols-4">

                <JourneyStat
                  icon={Landmark}
                  value={journeySaved}
                  label="Places Saved"
                />

                <JourneyStat
                  icon={Footprints}
                  value={journeyVisited}
                  label="Places Visited"
                />

                <JourneyStat
                  icon={ImageIcon}
                  value={photosShared}
                  label="Photos Shared"
                />

                <JourneyStat
                  icon={Pencil}
                  value={reviewsWritten}
                  label="Reviews Written"
                  last
                />

              </div>

            </section>


            {/* =================================================
                BADGES
            ================================================= */}

            <section className="
              rounded-[24px]
              border
              border-[#E5D8C9]
              bg-[#FFFDF9]
              p-6
              shadow-[0_12px_40px_rgba(80,55,30,0.05)]
              md:p-8
            ">

              <div className="flex items-center justify-between">

                <div>

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#AA7650]">
                    Achievements
                  </p>

                  <h2 className="font-cormorant text-[29px] font-semibold text-[#38271D]">
                    Recent Badges
                  </h2>

                </div>

                {badges.length > 4 && (
                  <button
                    onClick={() =>
                      navigate("/achievements")
                    }
                    className="
                      flex
                      items-center
                      gap-1
                      text-[12px]
                      font-medium
                      text-[#785E4A]
                      transition
                      hover:text-[#A75E20]
                    "
                  >
                    View all
                    <ArrowUpRight size={14} />
                  </button>
                )}

              </div>


              {badges.length === 0 ? (

                <div className="
                  mt-7
                  border
                  border-dashed
                  border-[#DDCFBF]
                  bg-[#FCF8F2]
                  px-6
                  py-10
                  text-center
                ">

                  <Award
                    size={30}
                    className="mx-auto text-[#C4A27D]"
                  />

                  <p className="mt-3 text-[14px] font-medium text-[#67564A]">
                    Your first achievement awaits.
                  </p>

                  <p className="mt-1 text-[12px] text-[#998879]">
                    Continue exploring India's heritage.
                  </p>

                </div>

              ) : (

                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#EDE4DA] pt-7 md:grid-cols-4">

                  {badges
                    .slice(0, 4)
                    .map((badge, index) => (
                      <BadgeCard
                        key={
                          badge._id ||
                          badge.id ||
                          `${badge.title}-${index}`
                        }
                        badge={badge}
                      />
                    ))}

                </div>

              )}

            </section>


            {/* =================================================
                QUOTE
            ================================================= */}

            <section className="
              relative
              overflow-hidden
              border
              border-[#E4D1B5]
              bg-[#F5E8D4]
              px-7
              py-8
              text-center
              md:px-14
            ">

              <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#E8D2B3]/40 to-transparent" />

              <div className="absolute bottom-0 right-0 h-full w-24 bg-gradient-to-l from-[#E8D2B3]/40 to-transparent" />

              <span className="relative font-serif text-[42px] leading-none text-[#C4893D]">
                “
              </span>

              <p className="
                relative
                mx-auto
                max-w-[720px]
                font-cormorant
                text-[22px]
                italic
                leading-8
                text-[#473326]
              ">
                {profile.quote ||
                  "The more you explore, the more you connect with the roots of your incredible heritage."}
              </p>

              <span className="relative font-serif text-[42px] leading-none text-[#C4893D]">
                ”
              </span>

            </section>

          </section>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PROFILE STAT
========================================================= */

function ProfileStat({
  icon: Icon,
  value,
  label,
  last,
}) {
  return (
    <div
      className={`
        group
        min-h-[145px]
        border-b
        border-[#EDE4DA]
        p-6
        transition
        hover:bg-[#FFFCF7]
        md:border-b-0
        md:border-r
        ${last ? "md:border-r-0" : ""}
      `}
    >

      <div className="flex h-full flex-col items-center justify-center text-center">

        <div className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#E8D7C2]
          bg-[#FAF1E5]
          text-[#A9682A]
          transition
          group-hover:bg-[#F5E4CC]
        ">
          <Icon
            size={20}
            strokeWidth={1.5}
          />
        </div>

        <p className="
          mt-4
          font-cormorant
          text-[29px]
          font-semibold
          leading-none
          text-[#36251B]
        ">
          {value}
        </p>

        <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-[#88796B]">
          {label}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
  last,
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        border-b
        border-[#EDE4DA]
        py-4
        md:border-b-0
        md:border-r
        md:px-5
        md:py-0
        ${last ? "md:border-r-0" : ""}
        md:first:pl-0
      `}
    >

      <Icon
        size={19}
        strokeWidth={1.5}
        className="shrink-0 text-[#92765C]"
      />

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-[0.08em] text-[#9A8878]">
          {label}
        </p>

        <p
          className="mt-1 truncate text-[13px] font-medium text-[#4A392E]"
          title={value}
        >
          {value}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   JOURNEY STAT
========================================================= */

function JourneyStat({
  icon: Icon,
  value,
  label,
  last,
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        border-b
        border-[#EDE4DA]
        px-3
        py-4
        text-center
        md:border-b-0
        md:border-r
        ${last ? "md:border-r-0" : ""}
      `}
    >

      <Icon
        size={21}
        strokeWidth={1.5}
        className="text-[#A46B37]"
      />

      <p className="
        mt-3
        font-cormorant
        text-[29px]
        font-semibold
        leading-none
        text-[#36251B]
      ">
        {value}
      </p>

      <p className="mt-2 text-[11px] text-[#857467]">
        {label}
      </p>

    </div>
  );
}


/* =========================================================
   BADGE
========================================================= */

function BadgeCard({ badge }) {

  const iconKey = String(
    badge.icon ||
      badge.type ||
      badge.name ||
      ""
  ).toLowerCase();

  const Icon =
    Object.entries(badgeIcons).find(
      ([key]) => iconKey.includes(key)
    )?.[1] || badgeIcons.default;

  return (
    <div className="group text-center">

      <div className="
        mx-auto
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-full
        border
        border-[#E4D2BB]
        bg-[#FAF1E5]
        text-[#A76B31]
        transition
        duration-300
        group-hover:-translate-y-1
        group-hover:border-[#C99A68]
        group-hover:bg-[#F5E4CD]
      ">

        <Icon
          size={26}
          strokeWidth={1.4}
        />

      </div>

      <h3 className="
        mt-4
        font-cormorant
        text-[17px]
        font-semibold
        text-[#443328]
      ">
        {badge.title ||
          badge.name ||
          "Achievement"}
      </h3>

      <p className="mt-1 text-[11px] leading-5 text-[#968578]">
        {badge.description ||
          badge.requirement ||
          ""}
      </p>

    </div>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F3EA]">

      {/* Header */}

      <div className="mx-auto max-w-[1450px] px-6 pb-24 pt-14 lg:px-10 xl:px-16">

        <Skeleton className="h-3 w-36" />

        <Skeleton className="mt-5 h-16 w-72" />

        <Skeleton className="mt-5 h-5 w-[480px] max-w-full" />

      </div>


      <main className="mx-auto max-w-[1450px] px-5 pb-20 lg:px-10 xl:px-16">

        <div className="-mt-14 grid grid-cols-1 gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">

          {/* Sidebar */}

          <aside className="space-y-5">

            <div className="overflow-hidden rounded-[24px] border border-[#E5D8C9] bg-[#FFFDF9]">

              <Skeleton className="h-20 rounded-none" />

              <div className="-mt-14 px-6 pb-7">

                <Skeleton className="mx-auto h-[120px] w-[120px] rounded-full border-[6px] border-[#FFFDF9]" />

                <Skeleton className="mx-auto mt-5 h-8 w-40" />

                <Skeleton className="mx-auto mt-3 h-4 w-44" />

                <Skeleton className="mx-auto mt-5 h-4 w-32" />

                <Skeleton className="mx-auto mt-5 h-8 w-36 rounded-full" />

              </div>

            </div>


            <div className="rounded-[24px] border border-[#E5D8C9] bg-[#FFFDF9] p-4">

              {Array.from({ length: 7 }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3.5"
                  >
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                )
              )}

            </div>

          </aside>


          {/* Content */}

          <section className="space-y-5">

            <Skeleton className="h-[145px] rounded-[24px]" />

            <SkeletonCard />

            <SkeletonCard />

            <SkeletonCard />

            <Skeleton className="h-32 rounded-[24px]" />

          </section>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   SKELETON CARD
========================================================= */

function SkeletonCard() {
  return (
    <div className="rounded-[24px] border border-[#E5D8C9] bg-[#FFFDF9] p-8">

      <Skeleton className="h-3 w-28" />

      <Skeleton className="mt-3 h-8 w-40" />

      <Skeleton className="mt-6 h-4 w-[85%]" />

      <Skeleton className="mt-3 h-4 w-[70%]" />

      <Skeleton className="mt-8 h-px w-full" />

      <div className="mt-6 grid grid-cols-3 gap-5">

        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />

      </div>

    </div>
  );
}


/* =========================================================
   SKELETON ELEMENT
========================================================= */

function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse
        bg-gradient-to-r
        from-[#EDE3D8]
        via-[#F8F3EB]
        to-[#EDE3D8]
        bg-[length:200%_100%]
        ${className}
      `}
      style={{
        animationDuration: "1.8s",
      }}
    />
  );
}


/* =========================================================
   ERROR
========================================================= */

function ProfileError({
  message,
  onRetry,
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#F8F3EA] px-6">

      <div className="
        w-full
        max-w-[430px]
        border
        border-[#E4D6C6]
        bg-[#FFFDF9]
        p-10
        text-center
        shadow-[0_18px_50px_rgba(80,55,30,0.08)]
      ">

        <div className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#F9EAE4]
          text-[#B85D49]
        ">
          <RefreshCcw size={23} />
        </div>

        <h2 className="mt-5 font-cormorant text-[29px] font-semibold text-[#38271D]">
          Unable to load your profile
        </h2>

        <p className="mt-3 text-[13px] leading-6 text-[#817164]">
          {message}
        </p>

        <button
          onClick={onRetry}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            bg-[#A96124]
            px-5
            py-2.5
            text-[12px]
            font-medium
            text-white
            transition
            hover:bg-[#8F511D]
          "
        >
          <RefreshCcw size={14} />
          Try Again
        </button>

      </div>

    </div>
  );
}