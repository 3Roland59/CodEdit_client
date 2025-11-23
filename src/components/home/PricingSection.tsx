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
    <section id="pricing" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400 opacity-15 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-400 opacity-15 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 font-semibold text-sm mb-4 border border-blue-200/50 animate-fade-in-up">
            PRICING PLANS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Perfect Plan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Scale your coding education with flexible pricing that grows with your needs
          </p>

        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative group animate-fade-in-up ${
                  plan.popular ? 'lg:-mt-4' : ''
                }`}
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-4 py-1.5 w-[150px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-1">
                      <Crown className="w-3 h-3" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>

                {/* Card */}
                <div className={`relative h-full bg-white/90 backdrop-blur-sm rounded-3xl border-2 ${plan.borderColor} ${plan.hoverBorder} transition-all duration-300 overflow-hidden ${
                  plan.popular ? 'shadow-2xl shadow-indigo-500/20 lg:py-8' : 'shadow-lg hover:shadow-xl'
                } group-hover:-translate-y-1`}>
                  {/* Gradient Top Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`}></div>

                  <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-gray-500">GHS</span>
                        <span className={`text-5xl font-extrabold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                          {plan.price}
                        </span>
                      </div>
                      
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.color} bg-opacity-10`}>
                          <Code2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{plan.challenges}</span>
                          <span className="text-gray-600"> Challenge{typeof plan.challenges === 'number' && plan.challenges !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.color} bg-opacity-10`}>
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{plan.students}</span>
                          <span className="text-gray-600"> Student{typeof plan.students === 'number' && plan.students !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className={`mt-0.5 p-1 rounded-full bg-gradient-to-br ${plan.color} flex-shrink-0`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`group/btn w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl hover:scale-105`
                          : `border-2 ${plan.borderColor} ${plan.hoverBorder} text-gray-900 hover:bg-gradient-to-r hover:${plan.color} hover:text-white hover:border-transparent`
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold text-indigo-600">Need a custom plan?</span> We offer tailored solutions for institutions and large organizations.
            </p>
            <a href="#contact-us" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform">
              Contact Us for Enterprise Pricing
            </a>
          </div>
        </div>
      </div>

      </section>
  );
}
