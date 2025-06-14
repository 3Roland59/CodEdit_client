import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import logo from "../assets/code.png"
import ParticlesBackground from "../components/ParticlesBackground";

const Authpage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("teacherAuth", "true");
    localStorage.setItem(
      "teacherData",
      JSON.stringify({ name: "Demo Teacher", email: loginData.email })
    );
    alert("Login Successful");
    navigate("/teacher/dashboard");
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    localStorage.setItem("teacherAuth", "true");
    localStorage.setItem(
      "teacherData",
      JSON.stringify({ name: signupData.name, email: signupData.email })
    );
    alert("Account Created");
    navigate("/teacher/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4">
        
        <ParticlesBackground />
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200">
        <div className="flex flex-row items-center justify-center gap-4 mb-6">
            <img
              src={logo}
              alt="CodEdit Logo"
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight animate-fade-in">
              CodEdit
            </h1>
          </div>

        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === "login"
                ? "bg-white shadow text-indigo-700"
                : "text-gray-500 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === "signup"
                ? "bg-white shadow text-indigo-700"
                : "text-gray-500 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <form
          onSubmit={activeTab === "login" ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {activeTab === "signup" && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="teacher@school.edu"
              value={activeTab === "login" ? loginData.email : signupData.email}
              onChange={(e) =>
                activeTab === "login"
                  ? setLoginData({ ...loginData, email: e.target.value })
                  : setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={activeTab === "login" ? loginData.password : signupData.password}
              onChange={(e) =>
                activeTab === "login"
                  ? setLoginData({ ...loginData, password: e.target.value })
                  : setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
          </div>
          {activeTab === "signup" && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({ ...signupData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold"
          >
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authpage;
