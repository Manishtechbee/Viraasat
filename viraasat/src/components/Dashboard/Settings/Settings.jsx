import React, { useState } from "react";
import {
  LayoutDashboard,
  Compass,
  Map,
  Heart,
  Route,
  CalendarDays,
  Trophy,
  MessageSquare,
  Bot,
  Settings as SettingsIcon,
  LogOut,
  User,
  SlidersHorizontal,
  Bell,
  Palette,
  ShieldCheck,
  LockKeyhole,
  Link2,
  Trash2,
  Camera,
  ChevronDown,
  Calendar,
  Check,
  User2Icon,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import Navlogo from "../../../assets/Navlogo.png";
import DashboardSidebar from "../DashboardSidebar";
import useAuth from "../../../hooks/useAuth";

// Replace this with your actual profile image
// import profileImage from "../../assets/profile.jpg";

const inputClass = `
  w-full
  h-[54px]
  border
  border-[#E5D9CC]
  rounded-[10px]
  bg-[#FFFDFC]
  px-4
  outline-none
  text-[14px]
  text-[#44382F]
  focus:border-[#C88A4B]
  focus:ring-1
  focus:ring-[#E8C49E]
  transition
`;



// --------------------------------------------------
// SETTINGS MENU
// --------------------------------------------------

const settingsItems = [
  {
    id: "profile",
    name: "Profile Information",
    icon: User,
  },
  {
    id: "preferences",
    name: "Preferences",
    icon: SlidersHorizontal,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
  },
  // {
  //   id: "appearance",
  //   name: "Appearance",
  //   icon: Palette,
  // },
  // {
  //   id: "security",
  //   name: "Security",
  //   icon: ShieldCheck,
  // },
  // {
  //   id: "privacy",
  //   name: "Privacy",
  //   icon: LockKeyhole,
  // },
  // {
  //   id: "accounts",
  //   name: "Connected Accounts",
  //   icon: Link2,
  // },
  {
    id: "danger",
    name: "Danger Zone",
    icon: Trash2,
  },
];


// --------------------------------------------------
// SETTINGS PAGE
// --------------------------------------------------

export default function Settings() {

  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    fullName: user?.name || "Manish Kumar",
    username: user?.username || "manish_explorer",
    email: user?.email || "manish.kumar@gmail.com",
    phone: user?.phone || "+91 98765 43210",
    country: user?.country || "India",
    dob: user?.dob || "06 Dec 2004",
    gender: user?.gender || "Male",
    bio:
      user?.bio ||
      "Heritage enthusiast | Explorer | Photographer.\nExploring India's rich culture and heritage.",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSave = (e) => {
    e.preventDefault();

    console.log("Saving:", formData);

    // Connect your API here
  };


  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2F241D]">

      <div className="flex min-h-screen">


        



        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="flex-1 min-w-0">


          {/* TOP HEADER */}

          <header
            className="
              h-[125px]
              px-[60px]
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h1
                className="
                  font-cormorant
                  text-[43px]
                  leading-none
                  font-semibold
                  text-[#2D2119]
                "
              >
                Settings
              </h1>

              <p
                className="
                  mt-3
                  text-[16px]
                  text-[#76685D]
                "
              >
                Manage your account and personalize your Viraasat experience.
              </p>

            </div>


            {/* RIGHT HEADER */}

            <div className="flex items-center gap-6">

              {/* Notification */}

              <button className="relative">

                <Bell
                  size={23}
                  strokeWidth={1.8}
                  className="text-[#4D4036]"
                />

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-[19px]
                    h-[19px]
                    rounded-full
                    bg-[#B86D20]
                    text-white
                    text-[10px]
                    flex
                    items-center
                    justify-center
                    font-semibold
                  "
                >
                  3
                </span>

              </button>


              {/* Avatar */}
{/* {user.avatar?<img
                src={user?.avatar}
                alt="Profile"
                className="
                  w-[50px]
                  h-[50px]
                  rounded-full
                  object-cover
                  border-2
                  border-[#E6D5C0]
                "
              />:<User2Icon/>} */}
              

            </div>

          </header>



          {/* CONTENT */}

          <div className="px-[60px] pb-[55px]">

            <div className="grid grid-cols-[270px_minmax(0,1fr)] gap-[30px]">


              {/* =====================================================
                  SETTINGS TABS
              ===================================================== */}

              <aside
                className="
                  bg-white
                  border
                  border-[#EEE2D6]
                  rounded-[17px]
                  p-3
                  h-fit
                  shadow-[0_3px_20px_rgba(92,64,42,0.025)]
                "
              >

                <div className="space-y-1">

                  {settingsItems.map((item) => {

                    const Icon = item.icon;

                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`
                          w-full
                          h-[54px]
                          flex
                          items-center
                          gap-4
                          px-4
                          rounded-[12px]
                          text-left
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? "bg-[#FCEEDB] text-[#8D4E16]"
                              : item.id === "danger"
                              ? "text-red-500 hover:bg-red-50"
                              : "text-[#40352D] hover:bg-[#FAF5EF]"
                          }
                        `}
                      >

                        <Icon
                          size={21}
                          strokeWidth={1.7}
                        />

                        <span className="text-[15px]">
                          {item.name}
                        </span>

                      </button>
                    );

                  })}

                </div>

              </aside>



              {/* =====================================================
                  RIGHT SETTINGS PANEL
              ===================================================== */}

              <div>

                {activeTab === "profile" && (
                  <ProfileInformation
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    user={user}
                  />
                )}

                {activeTab === "preferences" && (
                  <Preferences />
                )}

                {activeTab === "notifications" && (
                  <Notifications />
                )}

                {activeTab === "appearance" && (
                  <Appearance />
                )}

                {activeTab === "security" && (
                  <Security />
                )}

                {activeTab === "privacy" && (
                  <Privacy />
                )}

                {activeTab === "accounts" && (
                  <ConnectedAccounts />
                )}

                {activeTab === "danger" && (
                  <DangerZone />
                )}

              </div>

            </div>

          </div>

        </main>

        

      </div>

    </div>
  );
}

function ProfileInformation({
  formData,
  handleChange,
  handleSave,
  user,
}) {
  return (
    <section
      className="
        bg-white
        rounded-[18px]
        border
        border-[#EDE1D4]
        shadow-[0_5px_30px_rgba(93,62,38,0.035)]
        px-[34px]
        py-[30px]
      "
    >

      {/* HEADER */}

      <div>

        <h2
          className="
            font-cormorant
            text-[30px]
            font-semibold
            text-[#2D2119]
          "
        >
          Profile Information
        </h2>

        <p className="mt-1 text-[14px] text-[#76685D]">
          Update your personal details and how others see you on Viraasat.
        </p>

      </div>


      {/* BODY */}

      <div className="grid grid-cols-[205px_1fr] gap-[35px] mt-[25px]">


        {/* =================================================
            PROFILE IMAGE
        ================================================= */}

        <div
          className="
            border-r
            border-[#E9DED3]
            pr-[35px]
            flex
            flex-col
            items-center
          "
        >

          <div className="relative">
{/* {user.avatar?<img
              src={user?.avatar}
              alt="Profile"
              className="
                w-[145px]
                h-[145px]
                rounded-full
                object-cover
                border-[4px]
                border-[#F1DFC8]
              "
            />:<User2Icon/>} */}
            


            {/* CAMERA BUTTON */}

            <button
              className="
                absolute
                right-[-2px]
                bottom-[5px]
                w-[38px]
                h-[38px]
                rounded-full
                bg-[#B96D20]
                text-white
                flex
                items-center
                justify-center
                border-[3px]
                border-white
                hover:bg-[#9F5916]
                transition
              "
            >

              <Camera size={17} />

            </button>

          </div>


          <p
            className="
              text-[13px]
              text-[#8D8176]
              text-center
              mt-6
              leading-5
            "
          >
            JPG, PNG or WEBP.
            <br />
            Max size of 2MB.
          </p>


          <button
            className="
              mt-3
              text-[#A85A16]
              text-[14px]
              underline
              underline-offset-4
              font-medium
            "
          >
            Change Photo
          </button>

        </div>



        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSave}>

          <div className="grid grid-cols-2 gap-x-[30px] gap-y-[19px]">


            {/* FULL NAME */}

            <FormField label="Full Name">

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
              />

            </FormField>


            {/* USERNAME */}

            <FormField label="Username">

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={inputClass}
              />

            </FormField>


            {/* EMAIL */}

            <FormField label="Email Address">

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />

            </FormField>


            {/* PHONE */}

            <FormField label="Phone Number">

              <div
                className="
                  h-[54px]
                  border
                  border-[#E5D9CC]
                  rounded-[10px]
                  flex
                  items-center
                  overflow-hidden
                  bg-[#FFFDFC]
                "
              >

                <div
                  className="
                    h-full
                    px-4
                    flex
                    items-center
                    gap-3
                    border-r
                    border-[#E5D9CC]
                  "
                >

                  <span className="text-[20px]">
                    🇮🇳
                  </span>

                  <span className="text-[#6D6055]">
                    +91
                  </span>

                  <Check
                    size={15}
                    className="text-[#8B5A2B]"
                  />

                </div>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone.replace("+91 ", "")}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "phone",
                        value: `+91 ${e.target.value}`,
                      },
                    })
                  }
                  className="
                    flex-1
                    h-full
                    px-4
                    outline-none
                    bg-transparent
                    text-[#44382F]
                    text-[14px]
                  "
                />

              </div>

            </FormField>


            {/* COUNTRY */}

            <FormField label="Country">

              <div className="relative">

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`
                    ${inputClass}
                    appearance-none
                    pr-10
                  `}
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>

                <ChevronDown
                  size={17}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-[#876F5B]
                  "
                />

              </div>

            </FormField>


            {/* DOB */}

            <FormField label="Date of Birth">

              <div className="relative">

                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`${inputClass} pr-11`}
                />

                <Calendar
                  size={18}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#876F5B]
                  "
                />

              </div>

            </FormField>


            {/* GENDER */}

            <div className="col-span-2">

              <label className="block text-[14px] font-medium text-[#3E332B] mb-3">
                Gender
              </label>

              <div className="flex items-center gap-8">

                {["Male", "Female", "Other"].map((gender) => (

                  <label
                    key={gender}
                    className="
                      flex
                      items-center
                      gap-3
                      cursor-pointer
                      text-[14px]
                      text-[#55483E]
                    "
                  >

                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="accent-[#B86A1D] w-[19px] h-[19px]"
                    />

                    {gender}

                  </label>

                ))}

              </div>

            </div>


            {/* BIO */}

            <div className="col-span-2">

              <label className="block text-[14px] font-medium text-[#3E332B] mb-3">
                Bio
              </label>

              <div className="relative">

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={200}
                  rows={3}
                  className="
                    w-full
                    resize-none
                    border
                    border-[#E5D9CC]
                    rounded-[10px]
                    bg-[#FFFDFC]
                    px-4
                    py-3
                    outline-none
                    focus:border-[#C88A4B]
                    transition
                    text-[14px]
                    leading-6
                    text-[#44382F]
                  "
                />

                <span
                  className="
                    absolute
                    right-4
                    bottom-3
                    text-[12px]
                    text-[#85786E]
                  "
                >
                  {formData.bio.length}/200
                </span>

              </div>

            </div>

          </div>


          {/* SAVE BUTTON */}

          <div className="flex justify-end mt-6">

            <button
              type="submit"
              className="
                h-[51px]
                px-7
                rounded-[10px]
                bg-[#B97025]
                hover:bg-[#A35F1A]
                text-white
                font-medium
                text-[15px]
                shadow-sm
                transition
              "
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}
function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[14px] font-medium text-[#3E332B] mb-2.5">
        {label}
      </label>

      {children}
    </div>
  );
}

function Preferences() {
  const [language, setLanguage] = useState("English");
  const [state, setState] = useState("Punjab");

  return (
    <SettingsCard
      title="Preferences"
      description="Customize how Viraasat works for you."
    >

      <div className="grid grid-cols-2 gap-7">

        <SelectSetting
          label="Preferred Language"
          value={language}
          onChange={setLanguage}
          options={[
            "English",
            "Hindi",
            "Punjabi",
            "French",
            "Spanish",
          ]}
        />

        {/* <SelectSetting
          label="Preferred State"
          value={state}
          onChange={setState}
          options={[
            "Punjab",
            "Rajasthan",
            "Maharashtra",
            "Tamil Nadu",
            "Karnataka",
          ]}
        /> */}

      </div>


      {/* <div className="mt-9">

        <h3 className="font-cormorant text-[23px] font-semibold">
          Travel Interests
        </h3>

        <div className="flex flex-wrap gap-3 mt-4">

          {[
            "Forts",
            "Temples",
            "Museums",
            "Palaces",
            "Heritage Walks",
            "UNESCO Sites",
          ].map((item, index) => (

            <button
              key={item}
              className={`
                px-5
                py-2.5
                rounded-full
                border
                text-[13px]
                transition
                ${
                  index < 3
                    ? "bg-[#FBECD9] border-[#EBC99F] text-[#8B501B]"
                    : "border-[#E5D9CC] text-[#67594E] hover:bg-[#FAF4EC]"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div> */}

    </SettingsCard>
  );
}


function Notifications() {

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    journeys: true,
    recommendations: true,
    festivals: false,
    achievements: true,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    ["email", "Email Notifications", "Receive important updates by email."],
    ["push", "Push Notifications", "Get notifications directly on your device."],
    ["journeys", "Journey Reminders", "Reminders about your ongoing journeys."],
    ["recommendations", "Recommendations", "Personalized heritage recommendations."],
    ["festivals", "Festival Alerts", "Know about upcoming cultural festivals."],
    ["achievements", "Achievement Updates", "Get notified when you unlock badges."],
  ];

  return (
    <SettingsCard
      title="Notifications"
      description="Choose what you want Viraasat to notify you about."
    >

      <div className="divide-y divide-[#EFE5DA]">

        {items.map(([key, title, description]) => (

          <div
            key={key}
            className="flex items-center justify-between py-5"
          >

            <div>

              <h3 className="text-[15px] font-medium">
                {title}
              </h3>

              <p className="text-[13px] text-[#8A7B6C] mt-1">
                {description}
              </p>

            </div>

            <Toggle
              enabled={notifications[key]}
              onClick={() => toggle(key)}
            />

          </div>

        ))}

      </div>

    </SettingsCard>
  );
}

function Appearance() {

  const [theme, setTheme] = useState("Light");

  return (
    <SettingsCard
      title="Appearance"
      description="Personalize the look and feel of Viraasat."
    >

      <h3 className="font-cormorant text-[23px] font-semibold">
        Theme
      </h3>

      <div className="grid grid-cols-3 gap-5 mt-5">

        {["Light", "Dark", "System"].map((item) => (

          <button
            key={item}
            onClick={() => setTheme(item)}
            className={`
              h-[120px]
              rounded-[15px]
              border
              flex
              flex-col
              items-center
              justify-center
              gap-3
              transition
              ${
                theme === item
                  ? "border-[#B97025] bg-[#FFF3E3] text-[#8B501B]"
                  : "border-[#E5D9CC] hover:bg-[#FAF5EF]"
              }
            `}
          >

            <div
              className={`
                w-10
                h-10
                rounded-full
                ${
                  item === "Light"
                    ? "bg-[#FFF]"
                    : item === "Dark"
                    ? "bg-[#29231F]"
                    : "bg-[#E8DED2]"
                }
              `}
            />

            <span className="text-[14px]">
              {item}
            </span>

          </button>

        ))}

      </div>

    </SettingsCard>
  );
}

function Security() {
  return (
    <SettingsCard
      title="Security"
      description="Protect your Viraasat account."
    >

      <SettingRow
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
        action={
          <Toggle enabled={false} />
        }
      />

      <SettingRow
        title="Login Alerts"
        description="Get notified whenever your account is accessed."
        action={
          <Toggle enabled={true} />
        }
      />

      <div className="pt-7">

        <h3 className="font-cormorant text-[23px] font-semibold">
          Change Password
        </h3>

        <div className="grid grid-cols-2 gap-5 mt-5">

          <input
            type="password"
            placeholder="Current password"
            className={inputClass}
          />

          <input
            type="password"
            placeholder="New password"
            className={inputClass}
          />

        </div>

        <button
          className="
            mt-5
            px-6
            h-[48px]
            rounded-[10px]
            bg-[#B97025]
            text-white
            text-[14px]
          "
        >
          Update Password
        </button>

      </div>

    </SettingsCard>
  );
}

function Privacy() {

  return (
    <SettingsCard
      title="Privacy"
      description="Control what information is visible to other explorers."
    >

      <SettingRow
        title="Public Profile"
        description="Allow other explorers to view your profile."
        action={<Toggle enabled={true} />}
      />

      <SettingRow
        title="Show Saved Places"
        description="Allow others to see your saved heritage places."
        action={<Toggle enabled={false} />}
      />

      <SettingRow
        title="Show Reviews"
        description="Display your reviews publicly."
        action={<Toggle enabled={true} />}
      />

      <SettingRow
        title="Location Sharing"
        description="Use your location to provide nearby heritage recommendations."
        action={<Toggle enabled={false} />}
      />

    </SettingsCard>
  );
}

function ConnectedAccounts() {

  const accounts = [
    {
      name: "Google",
      letter: "G",
      connected: true,
    },
    {
      name: "GitHub",
      letter: "⌘",
      connected: false,
    },
    {
      name: "Facebook",
      letter: "f",
      connected: false,
    },
  ];

  return (
    <SettingsCard
      title="Connected Accounts"
      description="Connect external accounts to make signing in easier."
    >

      <div className="space-y-4">

        {accounts.map((account) => (

          <div
            key={account.name}
            className="
              flex
              items-center
              justify-between
              border
              border-[#EDE2D6]
              rounded-[14px]
              px-5
              py-4
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#F8F1E8]
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-[#8B501B]
                "
              >
                {account.letter}
              </div>

              <span className="font-medium">
                {account.name}
              </span>

            </div>

            <button
              className={`
                px-5
                h-9
                rounded-lg
                text-[13px]
                ${
                  account.connected
                    ? "border border-[#D9C9B9] text-[#75675B]"
                    : "bg-[#B97025] text-white"
                }
              `}
            >
              {account.connected ? "Disconnect" : "Connect"}
            </button>

          </div>

        ))}

      </div>

    </SettingsCard>
  );
}

function DangerZone() {

  return (
    <section
      className="
        bg-white
        rounded-[18px]
        border
        border-red-200
        p-8
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            w-12
            h-12
            rounded-full
            bg-red-50
            text-red-500
            flex
            items-center
            justify-center
          "
        >
          <Trash2 size={22} />
        </div>

        <div>

          <h2 className="font-cormorant text-[30px] font-semibold text-red-600">
            Danger Zone
          </h2>

          <p className="text-[14px] text-[#806F63] mt-1">
            These actions are permanent and cannot be undone.
          </p>

        </div>

      </div>

      <div className="mt-8 border-t border-red-100 pt-7">

        <h3 className="font-medium text-[#3B2D26]">
          Delete Account
        </h3>

        <p className="text-[14px] text-[#87786D] mt-2 max-w-[650px]">
          Permanently delete your Viraasat account, saved places,
          journeys, reviews and all associated data.
        </p>

        <button
          className="
            mt-5
            px-6
            h-[46px]
            rounded-[10px]
            bg-red-500
            hover:bg-red-600
            text-white
            text-[14px]
            transition
          "
        >
          Delete My Account
        </button>

      </div>

    </section>
  );
}

function SettingsCard({
  title,
  description,
  children,
}) {
  return (
    <section
      className="
        bg-white
        rounded-[18px]
        border
        border-[#EDE1D4]
        shadow-[0_5px_30px_rgba(93,62,38,0.035)]
        px-8
        py-7
      "
    >

      <h2
        className="
          font-cormorant
          text-[30px]
          font-semibold
          text-[#2D2119]
        "
      >
        {title}
      </h2>

      <p className="text-[14px] text-[#76685D] mt-1">
        {description}
      </p>

      <div className="mt-7">
        {children}
      </div>

    </section>
  );
}


function SettingRow({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-5
        border-b
        border-[#EFE5DA]
        last:border-0
      "
    >

      <div>

        <h3 className="text-[15px] font-medium text-[#3E332B]">
          {title}
        </h3>

        <p className="text-[13px] text-[#8A7B6C] mt-1">
          {description}
        </p>

      </div>

      {action}

    </div>
  );
}


function Toggle({
  enabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        w-[48px]
        h-[27px]
        rounded-full
        transition
        ${
          enabled
            ? "bg-[#B97025]"
            : "bg-[#D9CEC2]"
        }
      `}
    >

      <span
        className={`
          absolute
          top-[3px]
          w-[21px]
          h-[21px]
          rounded-full
          bg-white
          shadow
          transition
          ${
            enabled
              ? "left-[24px]"
              : "left-[3px]"
          }
        `}
      />

    </button>
  );
}


function SelectSetting({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="block text-[14px] font-medium mb-2.5">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            ${inputClass}
            appearance-none
            pr-10
          `}
        >

          {options.map((option) => (
            <option key={option}>
              {option}
            </option>
          ))}

        </select>

        <ChevronDown
          size={17}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            pointer-events-none
            text-[#876F5B]
          "
        />

      </div>

    </div>
  );
}