// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import api from '../Configs/api';

// function ChangePassword() {

//     const {email} = useParams();
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("")
//     const [isLoading, setIsLoading] = useState(false);

//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const navigate = useNavigate()

//     const handleChangePassword = async () => {
//         setError("")
//         setSuccess("")

//         if(!newPassword || !confirmPassword){
//             setError("Please fill in all fields")
//             return
//         }

//         if(newPassword !== confirmPassword){
//             setError("Passwords do not match");
//             return
//         }

//         try {

//             setIsLoading(true)
//             const res = await api.post(`/api/auth/change-password/${email}`, {newPassword, confirmPassword})

//             setSuccess(res.data.message)

//             setTimeout(() => {
//                 navigate('/login')
//             }, 2000)
            
//         } catch (error) {
//             setError(error.response?.data?.message || "something went wrong")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//   return (
//     <div></div>
//   )
// }

// export default ChangePassword


import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Configs/api";
import toast from "react-hot-toast";

function ChangePassword() {
    const { email } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            setHasError(false);

            const res = await api.post(
                `/api/auth/change-password/${email}`,
                {
                    newPassword,
                    confirmPassword,
                }
            );

            if (res.data.success) {
                setSuccess(true);
                toast.success(res.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
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
      {/* Success */}
      {success ? (
        <div className="text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-green-600"
              viewBox="0 0 24 24"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>


      <h2 className="mt-6 text-3xl font-bold text-slate-900">
        Password updated
      </h2>

      <p className="mt-3 text-slate-500 leading-relaxed">
        Your password has been changed successfully. You’ll be redirected to
        sign in shortly.
      </p>
    </div>
  ) : hasError ? (
    /* Error */
    <div className="text-center py-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-red-600"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      </div>

      <h2 className="mt-6 text-3xl font-bold text-slate-900">
        Something went wrong
      </h2>

      <p className="mt-3 text-slate-500 leading-relaxed">
        We couldn’t update your password. Please try again.
      </p>

      <button
        onClick={() => setHasError(false)}
        className="mt-8 w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition"
      >
        Try again
      </button>
    </div>
  ) : (
    <>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create a new password
        </h1>
        <p className="text-slate-500 mt-2">
          Choose a strong password to secure your LynkUp account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleChangePassword} className="space-y-5">
        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating password..." : "Update password"}
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
  )}
</div>


  </div>
);

}

export default ChangePassword;