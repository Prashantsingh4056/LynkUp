import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeOff } from 'lucide-react';
import api from '../Configs/api';
import { getUserData } from '../Context/userContext';
import toast from 'react-hot-toast';


function Login() {

    const {setUser} = getUserData()
    const navigate = useNavigate();
    const [showPassword , setShowPassword] = useState(false);
    const [isLoading , setIsLoading] = useState(false);

    const [formData , setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const {name , value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        
        try {

            setIsLoading(true);

            const res = await api.post('/api/auth/login' , formData , {headers: {
                "Content-Type":"application/json"
            }})



            if(res.data.success){
                localStorage.setItem("accessToken", res.data.accessToken)
                setUser(res.data.user)
                navigate('/dashboard')
                toast.success(res.data.message)
            }
            


        } catch (error) {
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
    }


  return (

  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8"
    >
      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back
        </h1>
        <p className="text-slate-500 mt-2">
          Sign in to your LynkUp account
        </p>
      </div>


  {/* Email */}
  <div className="mb-5">
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
    <div className="flex items-center justify-between mb-2">
      <label className="text-sm font-medium text-slate-700">
        Password
      </label>

      <Link
        to="/forgot-password"
        className="text-sm text-indigo-600 hover:text-indigo-500 hover:underline"
      >
        Forgot password?
      </Link>
    </div>

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
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
    {isLoading ? "Signing in..." : "Sign in"}
  </button>

  {/* Footer */}
  <p className="text-center text-slate-500 mt-6">
    Don’t have an account?
    <Link
      to="/signup"
      className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
    >
      Create account
    </Link>
  </p>
</form>


  </div>
);

}

export default Login