import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { authUser, logout, onlineUsers } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-black/90 h-full !p-5 overflow-y-scroll text-white ${
        selectedUser ? "max-w-hidden" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <img src={assets.chatIcon} alt="logo" className="w-11 object-contain" />

        <div className="relative group px-3">
          <img
            src={authUser?.profilePic || assets.avatar}
            alt="profile"
            className="w-12 h-12 rounded-full cursor-pointer object-cover"
          />
          <div
            className="absolute right-0 top-full mt-2 w-40 rounded-sm bg-black text-white shadow-xl 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 px-2"
          >
            <p
              onClick={() => navigate("/profile")}
              className="!px-2 !py-1 text-sm hover:bg-white hover:text-black cursor-pointer transition-colors"
            >
              Edit Profile
            </p>
            <p
              onClick={() => logout()}
              className="!px-2 !py-1 text-sm hover:bg-white hover:text-black cursor-pointer transition-colors"
            >
              Logout
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="gap-2 !py-3 px-4 flex items-center">
        <Search size={18} />
        <input
          type="text"
          className="bg-transparent flex-1 outline-none border-none text-sm p-2"
          placeholder="Search User"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>

      {/* User List */}
      <div className="flex flex-col gap-4 mt-5">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const unseenCount = unseenMessages[user._id] || 0;

          return (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
              }}
              className={`relative flex items-center gap-3 !px-2 !py-2 rounded-xl cursor-pointer
                transition-all duration-200 hover:bg-white/10
                ${selectedUser?._id === user._id ? "bg-white/15 border border-white/20" : "bg-transparent"}`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user?.profilePic || assets.avatar}
                  className="w-[40px] aspect-square rounded-full border border-gray-700"
                />
                {/* Online dot on avatar */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-black" />
                )}
              </div>

              {/* User Info */}
              <div className="flex flex-col">
                <p className="text-sm font-medium">{user.fullName}</p>
                <span className={`text-xs ${isOnline ? "text-green-400" : "text-gray-400"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Unseen message badge */}
              {unseenMessages[user._id] > 0 && (
                <span className="absolute top-3 right-4 text-[10px] !px-2 !py-1 rounded-full bg-green-500 text-white font-semibold">
                  {unseenMessages[user._id]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;