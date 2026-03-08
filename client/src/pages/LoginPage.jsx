import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { ArrowLeft } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", { fullName, email, password, bio });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center !px-4 bg-black">
      <div
        className="backdrop-blur-xl rounded-sm 
        max-w-7xl w-full max-h-[90vh]
        overflow-hidden h-full grid grid-cols-12 bg-black/90 border border-white/20"
      >
        {/* Left Column */}
        <div className="col-span-7 hidden md:block">
          <img
            src={assets.login1}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-5 flex items-center justify-center !p-10 text-white">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between !mb-8">
              <h2 className="text-2xl font-semibold">{currState}</h2>

              {isDataSubmitted && (
                <ArrowLeft
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-white transition"
                  onClick={() => setIsDataSubmitted(false)}
                />
              )}
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
              {currState === "Sign Up" && !isDataSubmitted && (
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full !px-4 !py-2 rounded-lg bg-black/60 border border-white/50 outline-none text-sm focus:border-white/70 transition"
                />
              )}

              {!isDataSubmitted && (
                <>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full !px-4 !py-2 rounded-lg bg-black/60 border border-white/50 outline-none text-sm focus:border-white/70 transition"
                  />

                  <input
                    type="password"
                    placeholder="**********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full !px-4 !py-2 rounded-lg bg-black/60 border border-white/50 outline-none text-sm focus:border-white/70 transition"
                  />
                </>
              )}

              {currState === "Sign Up" && isDataSubmitted && (
                <textarea
                  rows={4}
                  placeholder="Provide a short bio"
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full !px-4 !py-2 rounded-lg bg-black/60 border border-white/50 outline-none text-sm focus:border-white/70 transition"
                />
              )}

              {/* Submit Button */}
              <button
                className="w-full !py-2 rounded-lg bg-white text-black font-medium 
                hover:bg-gray-200 transition !mt-2 cursor-pointer"
              >
                {currState === "Sign Up" ? "Create Account" : "Login"}
              </button>

              {/* Toggle */}
              <div className="text-sm text-gray-300 text-center !mt-4">
                {currState === "Sign Up" ? (
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        setCurrState("Login");
                        setIsDataSubmitted(false);
                      }}
                      className="text-blue-400 font-semibold cursor-pointer hover:underline"
                    >
                      Login here
                    </span>
                  </p>
                ) : (
                  <p>
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setCurrState("Sign Up")}
                      className="text-blue-500 font-semibold cursor-pointer hover:underline"
                    >
                      Create account
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
