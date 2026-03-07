import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const App = () => {
  const { authUser, loading } = useContext(AuthContext);
  const { selectedUser } = useContext(ChatContext);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[url('./src/assets/chat1.png')] bg-center bg-contain bg-no-repeat">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;