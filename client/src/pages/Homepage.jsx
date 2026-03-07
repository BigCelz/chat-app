import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const Homepage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div
        className={`backdrop-blur-xl rounded-sm border-2 border-black/20 
          max-w-7xl w-full max-h-[90vh] h-full overflow-hidden grid grid-rows-1 relative
          ${selectedUser && showProfile ? "grid-cols-12" : "grid-cols-9"}`}
      >
        {/* Sidebar */}
        <div className="col-span-3 h-full overflow-hidden">
          <Sidebar />
        </div>

        {/* Chat */}
        <div className="col-span-6 h-full overflow-hidden">
          <ChatContainer showProfile={showProfile} setShowProfile={setShowProfile} />
        </div>

        {/* Right Sidebar — only when toggled */}
        {selectedUser && showProfile && (
          <div className="col-span-3 h-full overflow-hidden">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;