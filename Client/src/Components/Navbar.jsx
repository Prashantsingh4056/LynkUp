import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../Context/userContext";
import api from "../Configs/api";
import toast from "react-hot-toast";

const Navbar = ({fullname, username}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const {user, setUser} = getUserData();
  const accessToken = localStorage.getItem("accessToken");

  // Helper function to extract initials (e.g., "Prashant Singh" -> "PS")
  
  const getInitials = (name) => {
  if (!name) return "LU";

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

  const handleLogout = async () => {
    // Add your token cleanup logic here (e.g., localStorage.clear())

    try {

        const res = await api.post('/api/auth/logout', {} , {headers: 
            {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if(res.data.success){
            setUser(null);
            toast.success(res.data.message);
            localStorage.clear()
        }
        
    } catch (error) {
        console.log(error);
    }
  };

  console.log(user);
  

  return (
    <nav className="w-full bg-white border-b border-slate-200 px-4 md:px-16 py-3.5 flex items-center justify-between relative z-50">
      
      {/* 1. Left Section: Logo */}
      {/* <Link to="/" className="text-xl font-black tracking-tight text-indigo-600">
        LynkUp<span className="text-pink-500">.</span>
      </Link> */}

      {/* 2. Middle Section: View Live Page Shortcut */}
      <Link to={`/u/${username}`} 
        target="_blank" 
        rel="noreferrer"
        className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full shadow-xs transition active:scale-95"
      >
        <svg xmlns="http://w3.org" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        <span className="hidden sm:inline">View Live Page</span>
      </Link>

      {/* 3. Right Section: Avatar with Hover Dropdown */}
      <div 
        className="relative py-1"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        {/* The Initial-based Avatar Orb */}

        <div className="flex items-center gap-5">

        <p>Hi, {fullname}</p>
        <button className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-600 to-pink-500 text-white font-bold text-sm tracking-wider flex items-center justify-center shadow-md focus:outline-hidden cursor-pointer select-none">
          {getInitials(fullname)}
        </button>

        </div>


        {/* Dropdown Menu Container */}
        <div className={`absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl p-1.5 transition-all duration-200 origin-top-right ${
          dropdownOpen 
            ? 'opacity-100 scale-100 translate-y-0 visible' 
            : 'opacity-0 scale-95 -translate-y-2 invisible'
        }`}>
          {/* Header Info */}
          <div className="px-3 py-2 border-b border-slate-50">
            <p className="text-xs text-slate-400 font-medium">Signed in as</p>
            <p className="text-sm font-semibold text-slate-700 truncate">{fullname}</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;