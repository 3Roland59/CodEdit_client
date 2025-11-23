import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import logo from "../assets/code.png";
import ParticlesBackground from "../components/ParticlesBackground";
import { Mail, Lock, User, LockKeyhole, Sparkles, ArrowRight } from "lucide-react";
import { useUser } from "../context/UserContext";
import { BASE_URL } from "@/config/config";
import { toast } from "sonner";
import { XCircle, CheckCircle } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (activeTab === "login") {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <ParticlesBackground />
      
      {/* Animated Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-400 opacity-20 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-[150px] rounded-full"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-2xl"></div>
        
        <div className="relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/50 shadow-2xl">
          {/* Logo and Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 opacity-30 blur-xl rounded-full animate-pulse"></div>
                <img src={logo} alt="CodEdit Logo" className="relative w-14 h-14 object-contain drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                CodEdit
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              {activeTab === "login" ? "Welcome back! Sign in to continue" : "Create your account to get started"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1.5 mb-8 shadow-inner animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                }`}
                onClick={() => setActiveTab(tab as "login" | "signup")}
              >
                {tab === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form - Using onSubmit handler directly */}
          <div className="space-y-5 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            {activeTab === "signup" && (
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-2 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const form = e.currentTarget.closest('div')?.parentElement as HTMLElement;
                        const button = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
                        button?.click();
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-2 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="teacher@school.edu"
                  value={activeTab === "login" ? loginData.email : signupData.email}
                  onChange={(e) =>
                    activeTab === "login"
                      ? setLoginData({ ...loginData, email: e.target.value })
                      : setSignupData({ ...signupData, email: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const form = e.currentTarget.closest('div')?.parentElement as HTMLElement;
                      const button = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
                      button?.click();
                    }
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-2 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300"
                  placeholder="••••••••"
                  value={activeTab === "login" ? loginData.password : signupData.password}
                  onChange={(e) =>
                    activeTab === "login"
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setSignupData({ ...signupData, password: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const form = e.currentTarget.closest('div')?.parentElement as HTMLElement;
                      const button = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
                      button?.click();
                    }
                  }}
                />
              </div>
            </div>

            {activeTab === "signup" && (
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="password"
                    className="w-full pl-12 pr-4 py-2 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({ ...signupData, confirmPassword: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const form = e.currentTarget.closest('div')?.parentElement as HTMLElement;
                        const button = form?.querySelector('button[type="submit"]') as HTMLButtonElement;
                        button?.click();
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={() => {
                const fakeEvent = {
                  preventDefault: () => {},
                } as React.FormEvent<HTMLFormElement>;
                handleSubmit(fakeEvent);
              }}
              className="group w-full py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 font-semibold text-base shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform flex items-center justify-center gap-2 mt-8"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === "login" ? "Sign In" : "Create Account"}</span>
                  {activeTab === "login" ? (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  )}
                </>
              )}
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {activeTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline underline-offset-2 transition-colors"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline underline-offset-2 transition-colors"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-xs text-gray-500 space-y-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <p className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>Secure & Encrypted</span>
          </p>
          <p>Your data is protected with industry-standard security</p>
        </div>
      </div>

      </div>
  );
};

export default AuthPage;
