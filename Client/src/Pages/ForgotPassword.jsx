import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setHasError(false);

      const res = await api.post("/api/auth/forgot-password", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/verify-otp/${email}`);
      }
    } catch (error) {
      setHasError(true);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (

  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      {!hasError ? (
        <>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Forgot password
            </h1>
            <p className="text-slate-500 mt-2">
              Enter your email address and we’ll send you a verification code to
              reset your password.
            </p>
          </div>


      {/* Form */}
      <form onSubmit={handleForgotPassword} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending code..." : "Send verification code"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-slate-500 mt-6">
        Remember your password?
        <Link
          to="/login"
          className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </>
  ) : (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-red-500"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-slate-900">
        Something went wrong
      </h2>

      <p className="text-slate-500 mt-3">
        We couldn’t send the verification code. Please check your email
        address and try again.
      </p>

      <button
        onClick={() => setHasError(false)}
        className="mt-8 px-6 h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition"
      >
        Try again
      </button>
    </div>
  )}
</div>


  </div>
);

}

export default ForgotPassword;