import { ArrowRight, CalendarClock, MonitorSmartphone, Plug, Sparkles, Code2, Zap, Award, Users } from "lucide-react"
import { Link } from "react-router"
import logo from "../assets/code.png"
import logo1 from "../assets/logo.jpeg"
import hat from "../assets/hat.png"
import cup from "../assets/cup.png"
import solve from "../assets/solve.png"
import add from "../assets/add.png"
import snap from "../assets/snap.jpeg"
import Banner from "../components/home/Banner"
import Support from "../components/home/Support"
import { useUser } from "@/context/UserContext"
import PricingSection from "@/components/home/PricingSection"
// import ParticlesBackground from "@/components/ParticlesBackground"
import ContactSection from "@/components/home/ContactSection"

function Homepage() {
  const { user } = useUser()


  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* <ParticlesBackground /> */}


      {/* Hero Section */}
      <div className="relative z-10">
        <Banner />
        <section className="relative pt-32 sm:pt-48 pb-20 overflow-hidden">
          {/* Content */}
          <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
            {/* <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <p className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-blue-700 mb-8 shadow-sm hover:shadow-md transition-all duration-300">
        <Sparkles size={14} className="text-blue-500" /> 
        <span className="tracking-wider uppercase">Introducing CodEdit v1.0</span>
      </p>
    </div> */}

            <div className="flex flex-col items-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <img src={logo} alt="CodEdit Logo" className="relative w-20 h-20 object-contain drop-shadow-2xl animate-float" />
              </div>
              <h1 className="text-6xl sm:text-7xl font-[900] tracking-tight mb-6">
                <span className="block text-slate-900 mb-2">Code, Edit &</span>
                <span className="text-gradient-primary">Learn Better.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
                The ultimate platform for educators to create <span className="text-slate-900 font-bold border-b-2 border-blue-500/30">intelligent coding challenges</span> and for students to master programming with AI guidance.
              </p>
            </div>

            {user ? (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link to={"/dashboard/home"} className="w-full sm:w-auto">
                  <button className="btn-premium w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3">
                    Go To Dashboard
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link to={"/auth?tab=signup"} className="w-full sm:w-auto">
                  <button className="btn-premium w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3">
                    Get Started
                    <Sparkles size={18} />
                  </button>
                </Link>

                <Link to={"/auth?tab=login"} className="w-full sm:w-auto">
                  <button className="btn-premium w-full sm:w-auto px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50">
                    Sign In
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Hero Image / Screenshot */}
          <div className="w-full flex justify-center mt-24 relative z-10 animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
            <div className="relative max-w-5xl group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-white p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200">
                <img
                  src={snap}
                  className="rounded-[1.5rem] w-full h-auto object-cover"
                  alt="CodEdit Dashboard Preview"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4 animate-fade-in-up">
                Powering Education
              </span>
              <h2 className="text-4xl sm:text-5xl font-[900] text-slate-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Everything you need to <span className="text-gradient-primary">teach and learn.</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                A comprehensive suite of tools designed to make coding education interactive, insightful, and accessible.
              </p>
            </div>

            {/* Teacher Features */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-slate-200"></div>
                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">For Teachers</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: CalendarClock, title: "Deadline Control", desc: "Set custom deadlines for each challenge to keep students on track.", delay: '0.1s' },
                  { icon: Zap, title: "Time-Limited Challenges", desc: "Simulate real-world pressure with timed coding assessments.", delay: '0.15s' },
                  { icon: Code2, title: "Dual Test Cases", desc: "Evaluate solutions thoroughly with visible and hidden test cases.", delay: '0.2s' },
                  { icon: Plug, title: "Language Restrictions", desc: "Specify allowed programming languages to focus learning goals.", delay: '0.25s' },
                  { icon: Users, title: "Secure Access Keys", desc: "Control challenge access with unique keys for different classes.", delay: '0.3s' },
                  { icon: ArrowRight, title: "Instant Sharing", desc: "Generate shareable links for seamless challenge distribution.", delay: '0.35s' }
                ].map((feature, i) => (
                  <div key={i} className="glass-card group p-8 rounded-[2rem] hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: feature.delay }}>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Features */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-slate-200"></div>
                <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">For Students</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: Sparkles, title: "AI-Powered Hints", desc: "Get intelligent, contextual hints when you're stuck on a problem.", delay: '0.1s' },
                  { icon: MonitorSmartphone, title: "Personal Result Keys", desc: "Securely access your results anytime with personal identification keys.", delay: '0.15s' },
                  { icon: Award, title: "AI Insights & Analysis", desc: "Receive deep feedback on code quality, efficiency, and logic.", delay: '0.2s' }
                ].map((feature, i) => (
                  <div key={i} className="glass-card group p-8 rounded-[2rem] hover:border-indigo-400/50 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: feature.delay }}>
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{feature.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-xs tracking-widest uppercase mb-4">
                The Process
              </span>
              <h2 className="text-4xl sm:text-5xl font-[900] text-slate-900">
                How It <span className="text-gradient-primary">Works.</span>
              </h2>
            </div>

            <div className="grid gap-16 md:grid-cols-3 relative">
              {[
                { img: add, title: "Create Challenge", desc: "Design challenges with custom test cases and specific requirements.", delay: '0.1s' },
                { img: solve, title: "Students Solve", desc: "Students code their solutions directly in our integrated environment.", delay: '0.2s' },
                { img: cup, title: "Get Results", desc: "Automatic grading provided with detailed AI-generated reports.", delay: '0.3s' }
              ].map((step, i) => (
                <div key={i} className="text-center group animate-fade-in-up" style={{ animationDelay: step.delay }}>
                  <div className="relative mb-10">
                    <div className="relative w-56 h-56 mx-auto bg-slate-50 border border-slate-100 shadow-2xl rounded-[3rem] flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-700">
                      <img src={step.img} alt={step.title} className="w-36 h-36 object-contain" />
                      <div className="absolute -top-4 -right-4 w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl group-hover:bg-blue-600 transition-colors duration-300">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />

        <Support />

        {/* CTA Section */}
        <section className="section-padding px-4 sm:px-10 relative">
          <div className="relative py-24 rounded-[3rem] overflow-hidden bg-slate-900 text-white shadow-2xl">
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative inline-block mb-10 animate-float">
                <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"></div>
                <img src={hat} alt="Graduation Hat" className="relative w-28 h-28 mx-auto object-contain drop-shadow-2xl" />
              </div>

              <div className="container mx-auto px-4 text-center max-w-4xl">
                <h2 className="text-4xl sm:text-6xl font-[900] mb-8 animate-fade-in-up">
                  Ready to transform your <span className="text-blue-400">teaching experience?</span>
                </h2>
                <p className="text-xl mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  Join a growing community of educators and students who are redefining the way programming is taught and learned.
                </p>

                <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <Link to={"/auth?tab=signup"}>
                    <button className="btn-premium px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-600/30">
                      Get Started for Free
                      <Sparkles size={20} className="text-blue-200" />
                    </button>
                  </Link>

                  <button className="btn-premium px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold flex items-center gap-3 backdrop-blur-md">
                    Watch Demo
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-3xl mx-auto mt-20 pt-16 border-t border-white/10">
                  {[
                    { icon: Users, value: "10K+", label: "Active Users" },
                    { icon: Code2, value: "50K+", label: "Challenges Created" },
                    { icon: Award, value: "99%", label: "Satisfaction Rate" }
                  ].map((stat, i) => (
                    <div key={i} className="group animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                        <stat.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="text-3xl font-black mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />

        {/* Footer */}
        <footer className="bg-white border-t border-slate-100 py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8 group">
              <div className="relative">
                <img src={logo1} alt="CodEdit Logo" className="relative size-12 object-contain rounded-xl" />
              </div>
              <span className="text-3xl font-black tracking-tight text-slate-900">CodEdit</span>
            </div>

            <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto font-medium">
              Empowering the next generation of developers through interactive learning.
            </p>

            <div className="flex flex-wrap justify-center gap-10 mb-16">
              {[{ name: "Features", to: "#features" }, { name: "Pricing", to: "#pricing" }, { name: "Support", to: "#support" }].map((item, i) => (
                <a key={i} href={item.to} className="text-slate-600 font-bold hover:text-blue-600 transition-colors uppercase tracking-widest text-xs">
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100">
              <p className="text-slate-400 text-sm font-medium">
                © 2025 CodEdit. Built with passion for excellence.
              </p>
            </div>
          </div>
        </footer>

      </div>

    </div>
  )
}

export default Homepage
