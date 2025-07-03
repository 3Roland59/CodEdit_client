import { ArrowRight, CalendarClock, MonitorSmartphone, Plug, Sparkles, WandSparkles } from "lucide-react"
import { Link } from "react-router"
import logo from "../assets/code.png"
import hat from "../assets/hat.png"
import cup from "../assets/cup.png"
import solve from "../assets/solve.png"
import add from "../assets/add.png"
import mark from "../assets/mark.png"
import snap from "../assets/snap.jpeg"
import ParticlesBackground from "../components/ParticlesBackground"
import Banner from "../components/home/Banner"
import Support from "../components/home/Support"
import { useUser } from "@/context/UserContext"

function Homepage() {

  const {user} = useUser()
  return (
    <div className="relative min-h-dvh overflow-hidden bg-transparent">
        <ParticlesBackground />

      {/* Hero Section */}
      <div className="relative z-10">
        <Banner />
      <section className="relative pt-32 sm:pt-40 overflow-hidden">
  {/* Background Glows */}
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
  <div className="w-[700px] h-[700px] hidden md:block bg-blue-500 opacity-25 blur-[160px] rounded-full"></div>
</div>


  {/* Content */}
  <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
    <p className="p-2 text-xs font-semibold px-4 mx-auto rounded-full bg-blue-100 text-blue-600 mb-1 w-fit flex items-center justify-center gap-2">
      <WandSparkles size={14} /> Introducing CodEdit v1.0
    </p>

    <div className="flex items-center justify-center gap-4 mb-6">
      <img src={logo} alt="CodEdit Logo" className="w-16 h-16 object-contain" />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight animate-fade-in">
        CodEdit
      </h1>
    </div>

    <img
      src={mark}
      alt="Graduation Hat Icon representing CodEdit"
      className="w-40 h-40 mx-auto mb-4 object-contain"
    />

    <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in">
      A comprehensive platform for teachers to create coding challenges and students to solve them with AI-powered assistance.
    </p>

    {user ?
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
      <Link to={"/dashboard/home"} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-3xl border border-blue-600 font-semibold flex items-center justify-center gap-2 transition hover:bg-blue-700">
          Go To Dashboard
          <Sparkles size={16} />
        </button>
      </Link>
    </div>
     : <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
      <Link to={"/auth?tab=signup"} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-3xl border border-blue-600 font-semibold flex items-center justify-center gap-2 transition hover:bg-blue-700">
          Get Started
          <Sparkles size={16} />
        </button>
      </Link>

      <Link to={"/auth?tab=login"} className="w-full sm:w-auto">
        <button className="w-full cursor-pointer sm:w-auto group flex items-center justify-center px-4 py-2 rounded-3xl border hover:bg-blue-100 font-semibold transition border-blue-500 text-blue-600">
          Log In
          <ArrowRight className="ml-2 h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
        </button>
      </Link>
    </div>}
  </div>

  {/* Snap Image */}
  <div className="w-full flex justify-center mt-16 relative z-10 translate-y-3">
    <img
      src={snap}
      className="max-w-[350px] md:max-w-4xl shadow-xl rounded-t-md md:rounded-t-3xl"
      alt="CodEdit Screenshot"
    />
  </div>
</section>


      <section className="py-16 bg-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h4 className="text-blue-600 font-semibold uppercase tracking-wide mb-2">
          Code easily
        </h4>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Solve coding questions in minutes!
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          With CodEdit, you can instantly create coding challenges, share them, and solve easily with ai assisted hints and results analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No-Hassle Sign-Up</h3>
              <p className="text-gray-600">
                Join in seconds. No setup, no credit card—just start coding with your CodEdit account.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Access</h3>
              <p className="text-gray-600">
                Quickly access yourr coding sessions. Save time and skip the back-and-forth.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Plug className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Integrates Seamlessly</h3>
              <p className="text-gray-600">
                Syncs with your academic activities. Works smoothly with your existing CodEdit academic workflow.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <MonitorSmartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Device Friendly</h3>
              <p className="text-gray-600">
                Code from your laptop or mobile. CodEdit Scheduler works across all your devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="py-20 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800">
      How It Works
    </h2>
    <div className="grid gap-12 md:grid-cols-3">
      {/* Step 1 */}
      <div className="text-center">
        <div className="bg-blue-100 border border-gray-200 rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-6">
          <img
      src={add}
      alt="Graduation Hat Icon representing CodEdit"
      className="w-40 h-40 mx-auto mb-4 object-contain"
    />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">1. Create Challenge</h3>
        <p className="text-gray-600 text-sm">
          Teachers design coding challenges with custom test cases and specific requirements.
        </p>
      </div>

      {/* Step 2 */}
      <div className="text-center">
        <div className="bg-blue-100 border border-gray-200 rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-6">
          <img
      src={solve}
      alt="Graduation Hat Icon representing CodEdit"
      className="w-40 h-40 mx-auto mb-4 object-contain"
    />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">2. Students Solve</h3>
        <p className="text-gray-600 text-sm">
          Students access challenges via secure links and code their solutions directly.
        </p>
      </div>

      {/* Step 3 */}
      <div className="text-center">
        <div className="bg-blue-100 border border-gray-200 rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-6">
          <img
      src={cup}
      alt="Graduation Hat Icon representing CodEdit"
      className="w-40 h-40 mx-auto mb-4 object-contain"
    />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">3. Get Results</h3>
        <p className="text-gray-600 text-sm">
          Automatic grading provides feedback with detailed reports and AI-powered suggestions.
        </p>
      </div>
    </div>
  </div>
</section>

<Support />

{/* CTA Section */}
      <section className="p-4 sm:p-10">
        <div className="py-20 rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-100 to-blue-600 text-white">
        <img
      src={hat}
      alt="Graduation Hat Icon representing CodEdit"
      className="w-40 h-40 mx-auto mb-4 object-contain"
    />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Teaching?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators who are already using CodeChallenger to enhance their programming courses
          </p>
          <div className="flex justify-center gap-4">
            <Link to={"/auth?tab=signup"}>
              <button className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-3xl border border-blue-600 font-semibold flex items-center gap-2 transition hover:bg-blue-700">
                Start for free
                <Sparkles size={16} />
              </button>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
            <img
              src={logo}
              alt="CodEdit Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="text-lg font-semibold">CodEdit</span>
          </div>
          <p className="text-gray-400 animate-fade-in">
            Empowering education through interactive coding challenges
          </p>
        </div>
      </footer>

      </div>
    </div>
  )
}

export default Homepage
