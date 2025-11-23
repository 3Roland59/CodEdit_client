import { Ghost, Home, LifeBuoy, Sparkles, ArrowRight } from "lucide-react";

export default function Notfound() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-400 opacity-20 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-[150px] rounded-full"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl animate-fade-in-up">
        {/* Ghost Icon with Glow */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500 opacity-30 blur-3xl rounded-full animate-pulse scale-150"></div>
            <div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-full p-8 shadow-2xl border-4 border-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Ghost className="w-20 h-20 text-indigo-600 animate-float" />
            </div>
          </div>
        </div>

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-200/50 shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ERROR 404
          </span>
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" style={{animationDelay: '0.5s'}} />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
            Page Not Found
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto font-medium animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          Oops! The page you're looking for seems to have vanished into the digital void. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <a
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 transition-all duration-300 hover:scale-105 transform"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Go Back Home</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/contact-us"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-300 text-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform hover:bg-white"
          >
            <LifeBuoy className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Contact Support</span>
          </a>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-gray-200/50 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <p className="text-sm text-gray-500 mb-4">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Dashboard', href: '/dashboard/home' },
              { name: 'Challenges', href: '/dashboard/my-challenges' },
              { name: 'Documentation', href: '/docs' },
              { name: 'Community', href: '/community' }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 text-sm text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 transform"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="pt-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">Did you know?</span> The first 404 error appeared at CERN in 1992! 🚀
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
