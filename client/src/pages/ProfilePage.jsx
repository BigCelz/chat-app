import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "Hi there! I'm using ChatApp.");
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Img = reader.result;
      await updateProfile({ fullName: name, bio, profilePic: base64Img });
      navigate("/");
    };
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="backdrop-blur-xl rounded-lg border-2 border-black/20 max-w-7xl w-full max-h-[90vh] overflow-hidden h-full flex relative">
        {/* Left */}
        <div className="w-full lg:max-w-2xl backdrop-blur-2xl bg-black/90 text-white/80 flex items-center justify-center !p-10">
          <form onSubmit={handleSubmit} className="flex flex-col !p-10 gap-5 flex-1">
            <h3 className="font-semibold text-2xl">Profile Details</h3>

            {/* Avatar */}
            <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer group">
              <input
                type="file"
                id="avatar"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={(e) => setSelectedImg(e.target.files[0])}
              />
              <img
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-blue-500 transition"
              />
              <span className="text-sm text-white/50 group-hover:text-white transition">
                Upload Profile Image
              </span>
            </label>

            {/* Name */}
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="bg-transparent border border-gray-600 rounded-md !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Bio */}
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Profile Bio"
              className="bg-transparent border border-gray-600 rounded-md !px-3 !py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />

            {/* Button */}
            <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold !py-2 !px-4 rounded-md transition cursor-pointer">
              Save Changes
            </button>
          </form>
        </div>

        {/* Right */}
        <img
          src={assets.login2}
          alt=""
          className="hidden lg:block flex-1 object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default ProfilePage;