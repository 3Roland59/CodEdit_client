import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import logo from "../assets/code.png";
import ParticlesBackground from "../components/ParticlesBackground";
import { Mail, Lock, User, LockKeyhole } from "lucide-react";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "@/config/config";
import { toast } from "sonner";
import { XCircle, CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login } = useUser();

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    login(data);

    toast.success("Login successful", {
      description: (
        <p className="text-gray-700">Welcome back to CodEdit!</p>
      ),
      icon: <CheckCircle className="text-green-500" />,
      duration: 3000,
    });

    navigate("/dashboard/home");
  } catch (err) {
    toast.error("Login failed", {
      description: (
        <p className="text-gray-700">Invalid email or password. Please try again.</p>
      ),
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};


 const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (signupData.password !== signupData.confirmPassword) {
    return toast.error("Passwords do not match", {
      description: <p className="text-gray-700">Please confirm your password correctly.</p>,
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  }

  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signupData.name,
        email: signupData.email,
        password: signupData.password,
      }),
    });

    if (!res.ok) throw new Error("Signup failed");

    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupData.email,
        password: signupData.password,
      }),
    });

    if (!loginRes.ok) throw new Error("Auto-login failed");

    const data = await loginRes.json();
    login(data);

    toast.success("Account created", {
      description: (
        <p className="text-gray-700">Welcome to CodEdit! You're now logged in.</p>
      ),
      icon: <CheckCircle className="text-green-500" />,
      duration: 3000,
    });

    navigate("/dashboard/home");
  } catch (err) {
    toast.error("Signup failed", {
      description: (
        <p className="text-gray-700">Something went wrong. Please try again later.</p>
      ),
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-3xl">
        {/* Logo and Header */}
        <div className="flex flex-row items-center justify-center gap-4 mb-6">
          <img src={logo} alt="CodEdit Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-4xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 tracking-tight animate-fade-in">
            CodEdit
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              className={`w-1/2 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === tab
                  ? "bg-white shadow text-indigo-700"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab(tab as "login" | "signup")}
            >
              {tab === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={activeTab === "login" ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {activeTab === "signup" && (
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <User className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-3xl border"
                placeholder="John Doe"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <Mail className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 rounded-3xl border"
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

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <Lock className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="••••••"
              className="w-full pl-10 pr-4 py-2 rounded-3xl border"
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
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <LockKeyhole className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
              placeholder="••••••"
                className="w-full pl-10 pr-4 py-2 rounded-3xl border"
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({ ...signupData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          )}

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
            <Checkbox />
            <label className="block text-sm text-gray-800">Remember me</label>
            </div>
            {activeTab !== "signup" && (<p className="block text-sm text-blue-600 cursor-pointer">Forgot password?</p>)}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 transition-all font-semibold"
          >
            {loading
              ? "Please wait..."
              : activeTab === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
