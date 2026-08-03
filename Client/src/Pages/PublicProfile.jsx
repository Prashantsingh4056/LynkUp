import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader"; // Adjust relative path to match your Loader component location
import api from "../Configs/api";
import { getUserData } from "../Context/userContext";

import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import PreviewProfile from "../Components/PreviewProfile";
import { themes } from "../assets/themes";

const PublicProfile = () => {
  const { username } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const res = await api.get(`/api/profile/${username}`);

      if (res.data.success) {
        setProfileData(res.data.profile);
      } else {
        setErrorMsg("Profile not found.");
      }
    } catch (error) {
      console.error(error);

      setErrorMsg(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchProfileData();
    }
  }, [username]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-slate-200 text-[#4A772F] flex flex-col justify-center items-center font-sans p-4 select-none">
        <div className="bg-[#D6E752] border border-[#4A772F]/10 max-w-sm w-full rounded-2xl p-6 text-center shadow-xl">
          <span className="text-3xl">🔍</span>
          <h1 className="text-lg font-black mt-3 mb-1 text-[#4A772F]">
            Handle Unmapped
          </h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {errorMsg}
          </p>
          <a
            href="/"
            className="inline-block mt-5 px-5 py-2.5 bg-[#A7095C] text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95"
          >
            Create Your Own Link Node
          </a>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  const selectedTheme =
    themes.find(
      (theme) => theme.id === profileData?.appearance?.theme
    ) || themes[0];


  //  Base Success Layout: Pure, minimalist presentation framework optimized for user links
  return (
    <section className="w-full h-full  bg-slate-100 flex items-center justify-center border-red-800 lg:px-4 lg:py-12">
      {/* 
    <div className="w-full max-w-sm overflow-hidden rounded-[32px] bg-[#D6E752] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">


     
      <div className="h-28 bg-gradient-to-r from-[#FA9E05] via-[#F26D21] to-[#A7095C]" />

    
      <div className="-mt-14 flex justify-center">
        <div className="w-28 h-28 rounded-full bg-white ring-4 ring-white shadow-xl flex items-center justify-center text-4xl font-black text-[#4A772F]">
          {profileData?.username
            ? profileData.username.slice(0, 2).toUpperCase()
            : "LU"}
        </div>
      </div>

      <div className="px-8 pb-8">

        
        <h1 className="mt-4 text-center text-2xl font-bold text-[#35552B]">
          {user?.name || "Your Name"}
        </h1>

        
        <p className="text-center text-sm font-medium text-[#35552B]/70">
          @{profileData?.username}
        </p>

        
        <p className="mt-4 text-center text-sm leading-6 text-[#35552B]/80">
          {profileData?.bio ||
            "Full Stack Developer • Building modern web experiences."}
        </p>
        
        <div className="mt-8 space-y-4">
          {profileData?.links?.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#35552B]/60">
              No links added yet.
            </p>
          ) : (
            profileData?.links?.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="truncate font-semibold text-[#35552B]">
                  {link.title}
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-[#A7095C] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            ))
          )}
        </div>

        
        <div className="mt-10 border-t border-[#35552B]/10 pt-6 text-center">
          <p className="text-xs tracking-wide text-[#35552B]/50">
            Created with{" "}
            <span className="font-semibold text-[#A7095C]">
              LynkUp
            </span>
          </p>
        </div>
      </div>
    </div> */}

      <PreviewProfile 
    profile={profileData}
    theme={selectedTheme}/>
    </section>
  );
};

export default PublicProfile;
