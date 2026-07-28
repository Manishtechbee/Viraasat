import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import loginback from "../../assets/hero.png"; // Change path
import Navlogo from "../../assets/Navlogo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import * as authService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate= useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowPassword] = useState(false);

  const handleChange = (e)=>{

    setFormData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }))

}

const handleLogin= async (e)=>{
  e.preventDefault();
  try{
    setLoading(true);
    const { data } = await authService.login(formData);
    setUser(data.user);
    localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);
    toast.success("Login successful");
    navigate("/");
  }catch (err){
    console.error(err?.response?.data?.message || err?.message || "Login failed");
    toast.error(err?.response?.data?.message || "Login failed");
  }finally{
    setLoading(false);
  }
}
    
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F3EC] flex items-center justify-center">
      {/* ================= Background ================= */}

      <div className="absolute inset-0 bg-[#F8F3EC]" />

      {/* Heritage Pattern */}

      <div className="absolute inset-0 opacity-[0.04] pattern" />

      {/* Decorative circles */}

      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#E7D9C6] blur-3xl opacity-60" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#EFE3D5] blur-3xl opacity-60" />

      {/* ================= Card ================= */}

      <div className="relative w-[980px] h-[750px] rounded-[22px] border border-[#D9C9B7] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] flex p-4">
        {/* LEFT */}

        <div className="relative w-[47%] rounded-[18px] overflow-hidden">
          <img
            src={loginback}
            className="w-full h-full object-cover"
            alt="Login"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-12 right-19 text-white p-5 bg-gradient-to-t from-white/22 via-white/7 to-transparent">
            <h2 className="leading-none font-semibold text-[46px] font-cormorant">
              The heritage
              <br />
              of a nation
              <br />
              is the memory
              <br />
              of its people.
            </h2>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-1 flex items-center justify-center px-12">
          <div className="w-full max-w-[380px]">
            {/* Logo */}
            <div className="flex flex-col items-center text-center mb-8">
              <img
                src={Navlogo}
                alt="Viraasat Logo"
                className="w-12 h-12 object-contain"
              />

              <p className="mt-2 text-[#8F6B2F] text-lg font-cormorant font-extrabold tracking-[4px] uppercase">
                VIRAASAT
              </p>

              <h1 className="mt-4 text-[36px] font-bold text-[#222]">
                Welcome Back!
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login to continue your journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  {/* <button
            type="button"
            className="text-xs text-[#312783] hover:underline"
          >
            Forgot Password?
          </button> */}
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    type={showpassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-11 text-sm outline-none transition-all focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
                  />

                  {showpassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(!showpassword)}
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#312783]"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowPassword(!showpassword)}
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#312783]"
                    />
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#2f2492] to-[#251c64] text-white font-medium shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 h-px bg-[#E7E2DA]" />

                <span className="text-xs text-gray-400">or continue with</span>

                <div className="flex-1 h-px bg-[#E7E2DA]" />
              </div>

              {/* Google */}
              <button
                onClick={authService.googleLogin}
                type="button"
                className="w-full h-12 rounded-xl border border-[#E6E2DD] bg-white flex items-center justify-center gap-3 hover:bg-[#FAF8F5] transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />

                <span className="text-sm font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              {/* Signup */}
              <p className="text-center text-sm text-gray-500 pt-2">
                Don't have an account?
                <button
                  onClick={() => navigate("/signup")}
                  type="button"
                  className="ml-1 font-semibold text-[#312783] hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}