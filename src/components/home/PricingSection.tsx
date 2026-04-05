import { Check, Sparkles, Zap, Crown, Users, Code2, ArrowRight } from "lucide-react";

export default function PricingSection() {

  const plans = [
    {
      name: "Free",
      icon: Sparkles,
      color: "from-gray-500 to-gray-600",
      borderColor: "border-gray-200",
      hoverBorder: "hover:border-gray-300",
      glowColor: "gray-400",
      price: 0,
      challenges: 1,
      students: 50,
      features: [
        "1 Active Challenge",
        "Up to 50 Students per challenge",
        "Basic Test Cases",
        "3 AI Hints per Challenge",
        "Standard Support",
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Starter",
      icon: Zap,
      color: "from-blue-500 to-indigo-500",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      glowColor: "blue-400",
      price: 120,
      challenges: 10,
      students: 200,
      features: [
        "10 Active Challenges",
        "Up to 200 Students per challenge",
        "Visible & Hidden Test Cases",
        "Time-Limited Challenges",
        "Deadline Management",
        "Priority Support",
        "Custom Challenge Keys",
        "Export Results"
      ],
      cta: "Get Starter",
      popular: false
    },
    {
      name: "Professional",
      icon: Crown,
      color: "from-indigo-500 to-purple-500",
      borderColor: "border-indigo-300",
      hoverBorder: "hover:border-indigo-500",
      glowColor: "indigo-400",
      price: 300,
      challenges: 50,
      students: 1000,
      features: [
        "50 Active Challenges",
        "Up to 1,000 Students per challenge",
        "Advanced Test Cases",
        "AI-Powered Insights",
        "Multi-Language Support",
        "Bulk Student Management",
        "Dedicated Support",
        "Advanced Analytics",
      ],
      cta: "Go Professional",
      popular: true
    },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-xs tracking-widest uppercase mb-4 animate-fade-in-up">
            Pricing Plans
          </span>
          <h2 className="text-4xl sm:text-5xl font-[900] text-slate-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Choose Your <span className="text-gradient-primary">Perfect Plan.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Scale your coding education with flexible pricing that grows with your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative group animate-fade-in-up ${plan.popular ? 'lg:-mt-4' : ''}`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2">
                      <Crown className="w-3 h-3 text-yellow-400" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`relative h-full glass-card rounded-[2.5rem] border border-slate-200 p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'shadow-2xl ring-2 ring-blue-500/10' : 'shadow-xl'}`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">GHS</span>
                      <span className={`text-5xl font-black text-slate-900`}>
                        {plan.price}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4 mb-8 pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400`}>
                        <Code2 size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{plan.challenges} Challenges</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400`}>
                        <Users size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{plan.students} Students</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors`}>
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`btn-premium w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${plan.popular ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100'}`}>
                    {plan.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-block p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Need a custom plan?</h4>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">We offer tailored solutions for institutions and large organizations with specific needs.</p>
            <a href="#contact-us">
              <button className="btn-premium px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold inline-flex items-center gap-3">
                Contact Enterprise Sales
                <ArrowRight size={18} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
