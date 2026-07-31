import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar"; // Adjust path as needed
import api from "../Configs/api";
import toast from "react-hot-toast";
import PreviewProfile from "../Components/PreviewProfile";
import { themes } from "../assets/themes";
import ThemeCard from "../Components/ThemeCard";
import { XCircle } from "lucide-react";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("minimal");
  const [isLoading, setIsLoading] = useState(true);

  const [removeImage, setRemoveImage] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
    profileImage: {
      url: "",
      fileId: "",
    },
    bio: "",
    links: [],
    appearance: {
      theme: selectedThemeId,
    },
  });
  const accessToken = localStorage.getItem("accessToken");

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newLinkItem = {
      title: newTitle,
      id: Date.now(), // Unique local ID
      url: newUrl.startsWith("http") ? newUrl : `https://${newUrl}`, // basic URL formatting
    };

    setProfileData({
      ...profileData,
      links: [...profileData.links, newLinkItem],
    });
    setNewTitle("");
    setNewUrl("");
  };

  const handleDeleteLink = (id) => {
    // setLinks(links.filter((link) => link.id !== id));

    setProfileData((prevData) => ({
      ...prevData,
      links: profileData.links.filter((link) => link.id !== id),
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const formData = new FormData();

      formData.append("username", profileData.username);
      formData.append("bio", profileData.bio);
      formData.append("links", JSON.stringify(profileData.links));
      formData.append("appearance", JSON.stringify(profileData.appearance));
      formData.append("removeImage", removeImage);

      // Only append if user selected a new image
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      const res = await api.post("/api/profile", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        toast.success("Changes saved successfully");
        setProfileData((prev) => ({
          ...prev,
          profileImage: res.data.profile.profileImage,
        }));

        setProfileImageFile(null);

        setRemoveImage(false);
        await fetchUserProfile();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/api/profile/user-profile-data", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        // Fallback to empty array if profile or links don't exist yet
        const rawLinks = res.data.profile?.links || [];

        setProfileData({
          ...res.data.profile,
          profileImage: res.data.profile.profileImage || {
            url: "",
            fileId: "",
          },
          links: rawLinks.map((link, index) => ({
            ...link,
            id: Date.now() + index,
          })),
        });

        setSelectedThemeId(res.data.profile.appearance.theme);
      }
    } catch (error) {
      // Improved error logging to see actual server responses
      console.error(
        "Profile fetch failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImageFile(file);

    setProfileData((prev) => ({
      ...prev,
      profileImage: {
        ...prev.profileImage,
        url: URL.createObjectURL(file),
      },
    }));
  };

  const removeProfileImage = () => {
    setProfileData((prev) => ({
      ...prev,
      profileImage: {
        url: "",
        fileId: "",
      },
    }));

    setProfileImageFile(null);
    setRemoveImage(true);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Header Component */}
      <Navbar fullname={profileData.fullname} username={profileData.username} />

      {/* Main Workspace Frame */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start grow">
        {/* ================= LEFT CONTROLS CONTAINER (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Profile Picture
            </h2>

            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Profile Image
              </label>

              <div className="flex items-center gap-4">
                {/* Image Preview */}
                <div className="w-20 h-20 rounded-full border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
                  {profileData.profileImage?.url ? (
                    <img
                      src={profileData.profileImage.url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs font-semibold">
                      IMG
                    </span>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                    id="profile-image-upload"
                  />

                  <div className="flex gap-3">
                    <label
                      htmlFor="profile-image-upload"
                      className="cursor-pointer px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 hover:bg-white transition"
                    >
                      Upload Image
                    </label>

                    {profileData.profileImage?.url && (
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-3">
                    JPG, PNG or WebP • Maximum file size 5 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ================= PROFILE CUSTOMIZATION WORKSPACE ================= */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Handle</h2>

            <div className="space-y-4">
              {/* 1. New Handle/Username Form Input Node */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  LynkUp Handle URL
                </label>
                <div className="relative w-full shadow-2xs rounded-lg overflow-hidden border border-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition duration-150">
                  {/* Absolute platform path prefix stamp */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 select-none tracking-tight">
                    lynkup.ee/
                  </span>
                  <input
                    type="text"
                    value={profileData.username} // Tie this to your React username text state hook
                    onChange={(e) =>
                      setProfileData((prevData) => ({
                        ...prevData,
                        username: e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, ""),
                      }))
                    }
                    placeholder="username"
                    className="w-full bg-slate-50 text-slate-700 font-bold pl-[76px] pr-4 py-2.5 text-sm bg-transparent focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Section Box */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Profile Customization
            </h2>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Bio Description
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData((prevData) => ({
                    ...prevData,
                    bio: e.target.value,
                  }))
                }
                rows="3"
                placeholder="Write a short intro about yourself..."
                className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
              />
            </div>
          </div>

          {/* Link Insertion Creator Form */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Add a New Link
            </h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Link Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Personal Website"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    URL Target
                  </label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="e.g., https://mywebsite.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition active:scale-98 shadow-xs cursor-pointer"
              >
                + Add to Page Array
              </button>
            </form>
          </div>

          {/* Active Links Managed Workspace */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Your Links
            </h2>
            {profileData.links.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">
                No links added yet. Build your first record above!
              </p>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {profileData.links.map((link, index) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/50 rounded-lg group hover:border-slate-200 transition"
                  >
                    <div className="truncate pr-4">
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {link.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {link.url}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition cursor-pointer"
                    >
                      <svg
                        xmlns="http://w3.org"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Appearance</h2>

              <p className="text-sm text-slate-500 mt-1">
                Choose a theme for your public profile.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3">
              {themes.map((theme, index) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  selected={selectedThemeId === theme.id}
                  onClick={() => {
                    setSelectedThemeId(theme.id);
                    setProfileData((prev) => ({
                      ...prev,
                      appearance: { ...prev.appearance, theme: theme.id },
                    }));
                  }}
                />
              ))}
            </div>
          </div>

          {/* Master Database Form Sync Trigger */}
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="w-full bg-linear-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50 active:scale-99 cursor-pointer text-center text-sm"
          >
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>

        {/* ================= RIGHT LIVE PREVIEW CARD (5 COLS) ================= */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Live Device Sandbox
          </p>

          {/* Simulated Mobile Framing Container */}
          <div className="w-full max-w-[370px] aspect-[9/18]  border-8 border-slate-800 rounded-[36px] bg-white shadow-2xl overflow-hidden flex flex-col items-center relative">
            {/* Visual Phone Camera Notch Anchor */}
            <div className="absolute top-2 w-24 h-4 bg-slate-800 rounded-full"></div>

            <PreviewProfile profile={profileData} theme={selectedTheme} />

            {/* <div className="w-14 h-14 rounded-full bg-linear-to-tr from-indigo-600 to-pink-500 text-white font-black text-sm tracking-wider flex items-center justify-center shadow-xs mt-4 mb-3 uppercase">
              {username.slice(0, 2)}
            </div>

            <p className="text-sm font-bold text-slate-800 mb-1">@{username}</p>
            <p className="text-center text-xs text-slate-500 px-2 line-clamp-2 min-h-[32px] mb-6">
              {bio || "No bio summary set yet."}
            </p>

            <div className="w-full space-y-2.5 overflow-y-auto grow max-h-[220px] no-scrollbar pr-0.5">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="w-full py-2.5 px-4 text-center border border-slate-200 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-xs truncate select-none"
                >
                  {link.title || "Untitled Link"}
                </div>
              ))}
            </div>

            <div className="mt-auto text-[9px] font-bold text-slate-300 tracking-widest uppercase pt-2">
              Powered by LinkTree
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
