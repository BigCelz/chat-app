import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const Homepage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center md:px-4">
      <div
        className={`backdrop-blur-xl md:rounded-sm border-2 border-black/20 
          w-full h-full md:max-w-7xl md:max-h-[90vh] overflow-hidden
          grid grid-rows-1 relative
          ${selectedUser && showProfile ? "lg:grid-cols-12" : "lg:grid-cols-9"}`}
      >
        {/* Sidebar */}
        <div
          className={`h-full overflow-hidden
            ${selectedUser ? "hidden lg:block lg:col-span-3" : "block col-span-full lg:col-span-3"}`}
        >
          <Sidebar />
        </div>

        {/* Chat */}
        {selectedUser && (
          <div className="col-span-full lg:col-span-6 h-full overflow-hidden">
            <ChatContainer showProfile={showProfile} setShowProfile={setShowProfile} />
          </div>
        )}

        {/* No user selected placeholder — desktop only */}
        {!selectedUser && (
          <div className="hidden lg:block lg:col-span-6 h-full overflow-hidden">
            <ChatContainer showProfile={showProfile} setShowProfile={setShowProfile} />
          </div>
        )}

        {/* Right Sidebar — desktop grid column */}
        {selectedUser && showProfile && (
          <div className="hidden lg:block lg:col-span-3 h-full overflow-hidden">
            <RightSidebar />
          </div>
        )}

        {/* Right Sidebar — mobile/tablet slide-in overlay */}
        {selectedUser && showProfile && (
          <>
            {/* Backdrop */}
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowProfile(false)}
            />
            {/* Slide-in panel */}
            <div className="lg:hidden fixed right-0 top-0 h-full w-[80%] max-w-sm z-50 overflow-y-auto shadow-2xl">
              <RightSidebar />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;