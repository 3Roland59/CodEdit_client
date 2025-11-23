import { ArrowRight, CalendarClock, MonitorSmartphone, Plug, Sparkles, WandSparkles, Code2, Zap, Award, Users } from "lucide-react"
import { Link } from "react-router"
import logo from "../assets/code.png"
import logo1 from "../assets/logo.jpeg"
import hat from "../assets/hat.png"
import cup from "../assets/cup.png"
import solve from "../assets/solve.png"
import add from "../assets/add.png"
import mark from "../assets/mark.png"
import snap from "../assets/snap.jpeg"
import Banner from "../components/home/Banner"
import Support from "../components/home/Support"
import { useUser } from "@/context/UserContext"
import PricingSection from "@/components/home/PricingSection"
import ParticlesBackground from "@/components/ParticlesBackground"

function Homepage() {
  const {user} = useUser()
  

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
        <ParticlesBackground />


      {/* Hero Section */}
      <div className="relative z-10">
        <Banner />
      <section className="relative pt-32 sm:pt-40 overflow-hidden">
  {/* Enhanced Background Glows */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-blue-500 opacity-25 blur-[160px] rounded-full"></div>
    <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-400 opacity-15 blur-[100px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
    <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <p className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 backdrop-blur-sm border border-blue-200/50 mb-6 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
        <WandSparkles size={14} className="animate-pulse" /> 
        <span>Introducing CodEdit v1.0</span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
      </p>
    </div>

    <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
        <img src={logo} alt="CodEdit Logo" className="relative w-16 h-16 object-contain drop-shadow-2xl" />
      </div>
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent tracking-tight">

        CodEdit
      </h1>
    </div>

    <div className="relative inline-block mb-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-3xl animate-pulse"></div>
      <img
        src={mark}
        alt="CodEdit Icon"
        className="relative w-32 h-32 mx-auto object-contain drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
      />
    </div>

    <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up font-medium" style={{animationDelay: '0.4s'}}>
      A comprehensive platform for teachers to create coding challenges and students to solve them with <span className="text-blue-600 font-semibold">AI-powered assistance</span>.

    </p>

    {user ?
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <Link to={"/dashboard/home"} className="w-full sm:w-auto group">
        <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 transform">
          Go To Dashboard
          <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
        </button>
      </Link>
    </div>
     : <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <Link to={"/auth?tab=signup"} className="w-full sm:w-auto group">
        <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 transform">

          Get Started
          <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
        </button>
      </Link>

      <Link to={"/auth?tab=login"} className="w-full sm:w-auto group">
        <button className="w-full sm:w-auto group flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-blue-500 hover:bg-blue-50 font-semibold transition-all duration-300 text-blue-600 shadow-md hover:shadow-lg hover:scale-105 transform backdrop-blur-sm bg-white/50">
          Log In
          <ArrowRight className="ml-2 h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-2" />
        </button>
      </Link>
    </div>}
  </div>

  {/* Enhanced Snap Image with floating effect */}
  <div className="w-full flex justify-center mt-20 relative z-10 animate-fade-in-up" style={{animationDelay: '0.6s', transform: `translateY(${scrollY * 0.1}px)`}}>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
      <img
        src={snap}
        className="relative max-w-[350px] md:max-w-4xl shadow-2xl rounded-t-md md:rounded-t-3xl border-4 border-white/50 transform group-hover:scale-[1.02] transition-transform duration-500"
        alt="CodEdit Screenshot"
      />
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white/50 backdrop-blur-sm text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none"></div>
        
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4 animate-fade-in-up">
            POWERFUL FEATURES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Everything you need to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">teach and learn</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Create comprehensive coding challenges with flexible configurations and get AI-powered insights for both teachers and students.
          </p>
        </div>

        {/* Teacher Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-left">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">For Teachers</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { icon: CalendarClock, title: "Deadline Control", desc: "Set custom deadlines for each challenge to keep students on track and manage submission timelines.", delay: '0.1s' },
              { icon: Zap, title: "Time-Limited Challenges", desc: "Create timed coding challenges to simulate real-world pressure and assess problem-solving speed.", delay: '0.15s' },
              { icon: Code2, title: "Dual Test Cases", desc: "Design both visible and hidden test cases to thoroughly evaluate student solutions and prevent hardcoding.", delay: '0.2s' },
              { icon: Plug, title: "Language Restrictions", desc: "Specify allowed programming languages per challenge to focus learning on specific technologies.", delay: '0.25s' },
              { icon: Users, title: "Secure Access Keys", desc: "Specify challenge keys to control who can access specific assignments and maintain exclusivity.", delay: '0.3s' },
              { icon: ArrowRight, title: "Instant Sharing", desc: "Create shareable challenge and results links for seamless distribution to your students.", delay: '0.35s' }
            ].map((feature, i) => (
              <div key={i} className="group flex items-start gap-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 animate-fade-in-up" style={{animationDelay: feature.delay}}>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-blue-500/50">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Student Features */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-left">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">For Students</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { icon: Sparkles, title: "AI-Powered Hints", desc: "Get three intelligent hints per challenge from our trained AI to guide you when stuck.", delay: '0.1s' },
              { icon: MonitorSmartphone, title: "Personal Result Keys", desc: "Attach a personal key to your submission for secure, anytime access to your results.", delay: '0.15s' },
              { icon: Award, title: "AI Insights & Analysis", desc: "Receive detailed AI-generated feedback on your code quality, efficiency, and improvement areas.", delay: '0.2s' }
            ].map((feature, i) => (
              <div key={i} className="group flex items-start gap-4 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 animate-fade-in-up" style={{animationDelay: feature.delay}}>
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-indigo-500/50">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    <div className="text-center mb-20">
      <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 font-semibold text-sm mb-4 border border-blue-200/50">
        PROCESS
      </span>
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
      </h2>
    </div>

    <div className="grid gap-12 md:grid-cols-3 relative">
      {/* Connection Lines */}
      <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 -z-10"></div>
      
      {[
        { img: add, title: "Create Challenge", desc: "Teachers design coding challenges with custom test cases and specific requirements.", delay: '0.1s' },
        { img: solve, title: "Students Solve", desc: "Students access challenges via secure links and code their solutions directly.", delay: '0.2s' },
        { img: cup, title: "Get Results", desc: "Automatic grading provides feedback with detailed reports and AI-powered suggestions.", delay: '0.3s' }
      ].map((step, i) => (
        <div key={i} className="text-center group animate-fade-in-up" style={{animationDelay: step.delay}}>
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 scale-150"></div>
            <div className="relative bg-gradient-to-br from-white to-blue-50 border-4 border-white shadow-2xl rounded-full w-48 h-48 flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <img src={step.img} alt={step.title} className="w-32 h-32 object-contain drop-shadow-lg" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-125 transition-transform duration-300">
              {i + 1}
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{step.title}</h3>
          <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<PricingSection />

<Support />

{/* CTA Section */}
<section className="p-4 sm:p-10 relative">
  <div className="relative py-24 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>

    <div className="relative z-10 flex flex-col items-center">
      <div className="relative inline-block mb-8 animate-bounce w-fit">
        <div className="absolute inset-0 bg-white opacity-30 blur-2xl rounded-full"></div>
        <img src={hat} alt="Graduation Hat" className="relative w-32 h-32 mx-auto object-contain drop-shadow-2xl" />
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in-up">
          Ready to Transform Your Teaching?
        </h2>
        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          Join thousands of educators who are already using CodEdit to enhance their programming courses

        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <Link to={"/auth?tab=signup"}>
            <button className="group px-8 py-4 bg-white text-blue-600 rounded-full font-bold flex items-center gap-2 transition-all duration-300 shadow-2xl hover:shadow-white/30 hover:scale-110 transform">
              Start for free
              <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </Link>
          
          <button className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-blue-600 hover:scale-105 transform backdrop-blur-sm">
            Watch Demo
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-12 border-t border-white/20">
          {[
            { icon: Users, value: "10K+", label: "Active Users" },
            { icon: Code2, value: "50K+", label: "Challenges Created" },
            { icon: Award, value: "99%", label: "Success Rate" }
          ].map((stat, i) => (
            <div key={i} className="group animate-fade-in-up" style={{animationDelay: `${0.3 + i * 0.1}s`}}>
              <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80 group-hover:scale-125 transition-transform" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 opacity-50 blur-xl rounded-full group-hover:opacity-70 transition-opacity"></div>
              <img src={logo1} alt="CodEdit Logo" className="relative size-10 object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">CodEdit</span>

          </div>
          <p className="text-gray-400 text-lg mb-8">
            Empowering education through interactive coding challenges
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[{name: "Features", to: "#features"}, {name: "Pricing", to: "#pricing"}].map((item, i) => (
              <a key={i} href={item.to} className="hover:text-white transition-colors hover:underline underline-offset-4">
                {item.name}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <p className="text-gray-500 text-sm">© 2025 CodEdit. All rights reserved.</p>
          </div>
        </div>
      </footer>

      </div>

    </div>
  )
}

export default Homepage
