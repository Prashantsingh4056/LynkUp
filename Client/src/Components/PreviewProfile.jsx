import {
  ArrowUpRight,
} from "lucide-react";

// const iconMap = {
//   github: Github,
//   linkedin: Linkedin,
//   instagram: Instagram,
//   twitter: Twitter,
//   website: Globe,
// };

import { getUserData } from "../Context/userContext";

export default function PreviewProfile({ profile, theme }) {
  const { user } = getUserData();
  return (
    <div
      className="w-full md:w-95 min-h-screen md:h-full overflow-hidden shadow-lg pb-7 md:rounded-[32px]"
      style={{
        background: theme.background,
        borderRadius: theme.borderRadius,
        fontFamily: theme.font,
      }}
    >
      {/* Banner */}

      <div
        className="h-28"
        style={{
          backgroundImage: theme.banner,
          backgroundSize: theme.bannerSize || "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Avatar */}

      {profile.profileImage?.url ? (
        <div className="flex justify-center -mt-14">
        <img 
        src={profile.profileImage?.url} 
        alt="profile" 
        className={`h-28 w-28 rounded-full object-cover border-4`}
        style={{borderColor: theme.background}}
        />
        </div>
      ) : (
        <div className="-mt-14 flex justify-center">
        <div
          className="h-28 w-28 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold"
          style={{
            color: theme.accent,
          }}
        >
          {profile.fullname ? profile?.username.slice(0, 2).toUpperCase() : ""}
        </div>
      </div>
      )
      }

      {/* Body */}

      <div className="px-8 pb-8">
        <h1
          className="mt-5 text-center text-2xl font-bold"
          style={{
            color: theme.text,
          }}
        >
          {profile.fullname}
        </h1>

        <p
          className="text-center"
          style={{
            color: theme.secondaryText,
          }}
        >
          @{profile?.username}
        </p>

        <p
          className="mt-4 text-center text-sm leading-6"
          style={{
            color: theme.secondaryText,
          }}
        >
          {profile?.bio || "No bio summary set yet."}
        </p>

        {/* Social icons */}

        {/* <div className="mt-6 flex justify-center gap-5">
          {profile.socials?.map((social) => {
            const Icon = iconMap[social.type];

            return (
              <a
                key={social.type}
                href={social.url}
                style={{
                  color: theme.secondaryText,
                }}
              >
                <Icon size={20} className="transition hover:scale-110" />
              </a>
            );
          })}
        </div> */}

        {/* Links */}

        <div className="mt-8 space-y-4">
          {profile?.links.length === 0 ? (<h1 className="text-center text-sm" style={{color: theme.secondaryText,}}>No Links added yet</h1>) :

          <>{profile?.links?.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              className="group font-bold flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:-translate-y-1"
              style={{
                background: theme.buttonBackground,

                color: theme.buttonText,

                boxShadow: theme.buttonShadow
                  ? "0 8px 24px rgba(0,0,0,.08)"
                  : "none",
              }}
            >
              <span>{link?.title}</span>

              <ArrowUpRight
                size={18}
                style={{
                  color: theme.accent,
                }}
                className="transition group-hover:translate-x-1"
              />
            </a>
          ))}</>

          }
        </div>
      </div>

      <div className="mt-10 border-t border-[#35552B]/10 pt-3 text-center mx-5">
        <p className="text-xs tracking-wide text-[#35552B]/50" style={{color: theme.secondaryText}}>
          Created with{" "}
          <span className="font-semibold text-[#A7095C]" style={{color: theme.accent}}>LynkUp</span>
        </p>
      </div>
    </div>
  );
}
