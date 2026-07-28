import { Eye, EyeOff,Mail, Lock, User } from "lucide-react";

import loginback from "../../assets/hero.png"; // Change path
import Navlogo from "../../assets/Navlogo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import * as authService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";



export default function SignUp() {
  const navigate= useNavigate();
  const { setUser } = useAuth();
    const [formData, setFormData] = useState({
      name:"",
      email: "",
      password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  
    const handleChange = (e)=>{
  
      setFormData(prev=>({
          ...prev,
          [e.target.name]:e.target.value
      }))
  
  }
  
  const handleSignUp= async (e)=>{
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setFormError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    setFormError("");

    try{
      setLoading(true);
      const { data } = await authService.signup(formData);
      setUser(data.user);
      localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);
      toast.success("Account created successfully");
      navigate("/login");
    }catch (err){
      console.error(err?.response?.data?.message || err?.message || "Signup failed");
      setFormError(err?.response?.data?.message || "Signup failed");
      toast.error(err?.response?.data?.message || "Signup failed");
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
    
          <div className="relative w-[980px] h-[800px] rounded-[22px] border border-[#D9C9B7] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] flex p-4">
            {/* LEFT */}
    
            <div className="relative w-[47%] rounded-[18px] overflow-hidden">
    
              <img
                src={loginback}
                className="w-full h-full object-cover"
                alt="Login"
              />
    
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    
              <div className="absolute bottom-12 right-19 text-white p-5 bg-gradient-to-t from-white/22 via-white/7 to-transparent">
    
                <h2
                  className="leading-none font-semibold text-[46px] font-cormorant"
                >
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
    <div className="flex flex-col items-center text-center mb-7">

      <img
        src={Navlogo}
        alt="Viraasat Logo"
        className="w-12 h-12 object-contain"
      />

      <p className="mt-2 text-[#8F6B2F] text-lg font-cormorant font-extrabold tracking-[4px] uppercase">
        VIRAASAT
      </p>

      <h1 className="mt-4 text-[34px] font-bold text-[#222]">
        Create Account
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Start your heritage journey with Viraasat
      </p>

    </div>

    {/* Form */}
    <form onSubmit={handleSignUp} className="space-y-4">

      {/* Full Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Full Name
        </label>

        <div className="relative">

          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Enter your name"
            className="w-full h-11 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
          />

        </div>
      </div>

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
            className="w-full h-11 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
          />

        </div>
      </div>

      {/* Password */}
      <div>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>

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
            placeholder="Create a password"
            className="w-full h-11 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-11 text-sm outline-none focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
          />

          {showpassword ? (
            <EyeOff
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}

        </div>

      </div>

      {/* Confirm Password */}
      <div>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Confirm Password
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showconfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full h-11 rounded-xl border border-[#E6E2DD] bg-white pl-11 pr-11 text-sm outline-none focus:border-[#312783] focus:ring-4 focus:ring-[#312783]/10"
          />

          {showconfirmPassword ? (
            <EyeOff
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(false)}
            />
          ) : (
            <Eye
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(true)}
            />
          )}

        </div>

        {formError && (
          <p className="mt-2 text-xs text-red-500">{formError}</p>
        )}

      </div>

      {/* Terms */}
      <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">

        <input
          type="checkbox"
          className="accent-[#312783] w-4 h-4"
        />

        I agree to the
        <span className="text-[#312783] font-medium">
          Terms & Conditions
        </span>

      </label>

      {/* Signup Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 rounded-xl bg-gradient-to-r from-[#2f2492] to-[#251c64] text-white font-medium shadow-md hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">

        <div className="flex-1 h-px bg-[#E7E2DA]" />

        <span className="text-xs text-gray-400">
          or continue with
        </span>

        <div className="flex-1 h-px bg-[#E7E2DA]" />

      </div>

      {/* Google */}
      <button
        onClick={authService.googleLogin}
        type="button"
        className="w-full h-11 rounded-xl border border-[#E6E2DD] flex items-center justify-center gap-3 hover:bg-[#FAF8F5] transition"
      >

        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        Continue with Google

      </button>

      {/* Login */}
      <p className="text-center text-sm text-gray-500">

        Already have an account?

        <button
          onClick={()=> navigate("/login")}
          type="button"
          className="ml-1 text-[#312783] font-semibold hover:underline"
        >
          Login
        </button>

      </p>

    </form>

  </div>

</div>
</div>
</div>
  )
}
