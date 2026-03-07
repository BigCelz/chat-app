import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { messages, selectedUser } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return selectedUser ? (
    <div
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      className="bg-black/90 text-white border-l border-white/10 overflow-hidden"
    >
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }} className="!p-6 flex flex-col items-center text-center gap-4">
        
        {/* Avatar */}
        <img
          src={selectedUser?.profilePic || assets.avatar}
          alt={selectedUser?.fullName}
          className="w-28 h-28 rounded-full object-cover border-2 border-white/20 shadow-lg mt-2"
        />

        {/* Name & Email */}
        <div>
          <h2 className="text-lg font-semibold">{selectedUser?.fullName}</h2>
          <p className="text-xs text-gray-400 mt-1">{selectedUser?.email}</p>
        </div>

        {/* Bio */}
        {selectedUser?.bio && (
          <p className="text-sm text-gray-300 leading-relaxed !px-2">
            {selectedUser.bio}
          </p>
        )}

        {/* Online Status */}
        <div className="flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-500"}`} />
          <span className={isOnline ? "text-green-400" : "text-gray-400"}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <hr className="w-full border border-white/10" />

        {/* Shared Media */}
        <div className="w-full">
          <p className="text-sm font-medium text-white/80 !mb-3 text-left">
            Shared Media
          </p>

          {msgImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-white/10 group cursor-pointer"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-left">No media shared yet</p>
          )}
        </div>
      </div>

      {/* Logout — pinned at bottom */}
      <div className="!p-6" style={{ flexShrink: 0 }}>
        <button
          onClick={logout}
          className="w-full !py-2 rounded-lg 
            bg-gradient-to-l from-red-600/80 via-red-500/60 to-red-400/40
            text-white hover:from-red-700 hover:via-red-600 hover:to-red-500
            transition-all duration-300 text-sm font-medium
            border border-red-500/30 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-black/90 h-full flex items-center justify-center text-gray-500 p-6 text-sm border-l border-white/10">
      Select a user to view profile
    </div>
  );
};

export default RightSidebar;
