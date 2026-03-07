import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Image, Send, X, MoreHorizontal } from "lucide-react";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = ({ showProfile, setShowProfile }) => {
  const messagesContainerRef = useRef();
  const textareaRef = useRef(null);
  const [input, setInput] = useState("");

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(selectedUser._id, input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage(selectedUser._id, "", reader.result);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return selectedUser ? (
    <div
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      className="bg-black/80 text-white overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 !p-4 border-b border-white/10"
        style={{ flexShrink: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser?.profilePic || assets.avatar}
              alt={selectedUser?.fullName}
              className="w-10 h-10 rounded-full border border-gray-700 object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black
                ${isOnline ? "bg-green-400" : "bg-gray-500"}`}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{selectedUser?.fullName}</p>
            <span className={`text-xs ${isOnline ? "text-green-400" : "text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className={`text-xs !px-3 !py-1 rounded-md border transition-all duration-200 cursor-pointer
              ${showProfile
                ? "text-gray-400 border-white/20 hover:border-white/50 hover:text-white"
                : "text-gray-400 border-white/20 hover:border-white/50 hover:text-white"
              }`}
          >
            {showProfile ? "Hide Profile" : "View Profile"}
          </button>

          <X
            size={18}
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={() => {
              setSelectedUser(null);
              setShowProfile(false);
            }}
          />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        style={{ flex: 1, overflowY: "auto", minHeight: 0 }}
        className="!p-4 !space-y-3"
      >
        {messages.filter(Boolean).map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end gap-2 ${
              msg.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] !px-4 !py-2 text-sm rounded-2xl break-words ${
                msg.senderId === authUser._id
                  ? "bg-white text-black rounded-br-none"
                  : "bg-white/10 border border-white/10 text-white rounded-bl-none"
              }`}
            >
              {msg.image && (
                <img src={msg.image} alt="" className="mt-2 rounded-lg max-w-[200px]" />
              )}
              {msg.text && <p>{msg.text}</p>}
              <p className="text-[10px] text-gray-400 mt-1">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="!p-4 border-t border-white/20 bg-black/80"
        style={{ flexShrink: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center flex-1 gap-3 !px-4 !py-2 rounded-lg bg-black/60 border border-white/50 focus-within:border-white/30 transition">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              placeholder="Send a message..."
              rows={1}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 resize-none overflow-hidden"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSendMessage(e);
              }}
            />
            <input
              type="file"
              id="image"
              accept="image/png, image/jpg, image/jpeg"
              hidden
              onChange={handleSendImage}
            />
            <label
              htmlFor="image"
              className="cursor-pointer text-gray-400 hover:text-white transition"
            >
              <Image size={20} />
            </label>
          </div>
          <button
            onClick={handleSendMessage}
            className="!p-2 rounded-full text-gray-200 hover:text-white cursor-pointer transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col items-center bg-black/70 justify-center text-white/70 gap-4 p-6 text-center">
      <img src={assets.chatIcon} alt="chat" className="w-32 opacity-70 object-contain" />
      <h2 className="text-xl font-semibold text-white">No Conversation Selected</h2>
      <p className="text-sm max-w-sm text-gray-400">
        Select a user from the sidebar to start chatting in real time.
      </p>
    </div>
  );
};

export default ChatContainer;