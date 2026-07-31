import React from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

function VerifyEmail() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      {" "}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        {/* Icon */}{" "}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
          {" "}
          <Mail className="h-8 w-8 text-indigo-600" />{" "}
        </div>
        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Check your email
        </h1>
        {/* Description */}
        <p className="mt-3 text-slate-500 leading-relaxed">
          We’ve sent a verification link to your email address. Please check
          your inbox and click the link to activate your LynkUp account.
        </p>
        {/* Info Box */}
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm text-indigo-700">
            The verification link is valid for 30 minutes. Once verified, you’ll
            be able to sign in and start customizing your profile page.
          </p>
        </div>
        {/* Footer */}
        <p className="mt-6 text-sm text-slate-500">
          Didn’t receive the email? Check your spam folder or request a new
          verification email from the sign in page.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
