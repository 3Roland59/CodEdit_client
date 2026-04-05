import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import logo from "../assets/code.png";
import { Mail, Lock, User, LockKeyhole, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Auth Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
              <img src={logo} alt="CodEdit Logo" className="relative w-12 h-12 object-contain" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">CodEdit</h1>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-slate-500 font-medium">
              {activeTab === "login" ? "Enter your credentials to access your account" : "Join our community of teachers and students"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100/50 p-1 rounded-2xl mb-8">
            {["login", "signup"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setActiveTab(tab as "login" | "signup")}
              >
                {tab === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === "signup" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="name@example.com"
                  value={activeTab === "login" ? loginData.email : signupData.email}
                  onChange={(e) =>
                    activeTab === "login"
                      ? setLoginData({ ...loginData, email: e.target.value })
                      : setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                {activeTab === "login" && (
                  <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={activeTab === "login" ? loginData.password : signupData.password}
                  onChange={(e) =>
                    activeTab === "login"
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setSignupData({ ...signupData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {activeTab === "signup" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({ ...signupData, confirmPassword: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 mt-8 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{activeTab === "login" ? "Sign In" : "Create Account"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            {activeTab === "login" ? (
              <>
                Don't have an account?{" "}
                <button type="button" onClick={() => setActiveTab("signup")} className="text-blue-600 font-bold hover:underline transition-all">Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setActiveTab("login")} className="text-blue-600 font-bold hover:underline transition-all">Log in</button>
              </>
            )}
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-400 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Secure AES-256 Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
