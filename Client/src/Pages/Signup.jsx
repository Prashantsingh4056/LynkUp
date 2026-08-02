import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";
import { EyeIcon, EyeOff } from "lucide-react";
import { getUserData } from "../Context/userContext";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      setIsLoading(true);

      const res = await api.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };


return (

  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8"
    >
      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create your account
        </h1>
        <p className="text-slate-500 mt-2">
          Join LynkUp and build your personalized link-in-bio page.
        </p>
      </div>


  {/* Username */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Username
    </label>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="johndoe123"
      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
    />
  </div>

  {/* Full name */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Full name
    </label>
    <input
      type="text"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      placeholder="John Doe"
      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
    />
  </div>

  {/* Email */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Email
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="you@example.com"
      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
    />
  </div>

  {/* Password */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-slate-700 mb-2">
      Password
    </label>

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-4 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
      >
        {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
      </button>
    </div>
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={isLoading}
    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {isLoading ? "Creating account..." : "Create account"}
  </button>

  {/* Footer */}
  <p className="text-center text-slate-500 mt-6">
    Already have an account?
    <Link
      to="/login"
      className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
    >
      Sign in
    </Link>
  </p>
</form>


  </div>
);

}

export default Signup;
