import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import api from "../Configs/api";
import { Link, useNavigate, useParams } from "react-router-dom";

function VerifyOTP() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post(`/api/auth/verify-otp/${email}`, {
        otp: finalOtp,
      });

      setSuccessMessage(res.data.message);

      setTimeout(() => {
        navigate(`/change-password/${email}`);
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    console.log("clicked");

    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/api/auth/forgot-password", { email });

      clearOtp();

      setCanResend(false);
      setTimer(30);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

return (

  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Verify OTP
        </h1>
        <p className="text-slate-500 mt-2">
          Enter the 6-digit verification code sent to
        </p>
        <p className="text-indigo-600 font-medium mt-1">
          {email}
        </p>
      </div>


  {error && (
    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

  {successMessage && (
    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
      {successMessage}
    </div>
  )}

  {isVerified ? (
    <div className="py-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="text-green-600" size={34} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        Verification successful
      </h2>

      <p className="mt-3 text-slate-500 leading-relaxed">
        Your verification code has been confirmed successfully. You’ll be
        redirected shortly.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 text-indigo-600">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">Redirecting...</span>
      </div>
    </div>
  ) : (
    <>
      {/* OTP Input */}
      <div className="flex justify-center gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-14 rounded-xl border border-slate-200 bg-white text-center text-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.some((digit) => digit === "")}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </div>
          ) : (
            "Verify code"
          )}
        </button>

        <button
          onClick={clearOtp}
          disabled={isLoading || isVerified}
          className="w-full h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Clear code
        </button>
      </div>

      {/* Resend */}
      <div className="text-center mt-6">
        <p className="text-sm text-slate-500">
          Didn’t receive the code?
        </p>

        {canResend ? (
          <button
            onClick={handleResendOtp}
            className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Resend OTP
          </button>
        ) : (
          <p className="mt-2 text-sm text-slate-400">
            Resend in {timer}s
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-500">
          Wrong email?
          <Link
            to="/forgot-password"
            className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
          >
            Go back
          </Link>
        </p>
      </div>
    </>
  )}
</div>


</div>
);

}

export default VerifyOTP;
