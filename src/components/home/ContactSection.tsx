import { Mail, MessageSquare, Send, Phone, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ email: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@codedit.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+233 53 140 0882",
      description: "Mon-Fri from 8am to 5pm"
    },
  ];

  return (
    <section id="contact-us" className="relative py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-bold text-xs tracking-widest uppercase mb-4 animate-fade-in-up">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-[900] text-slate-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            We'd Love to <span className="text-gradient-primary">Hear From You.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Have questions or feedback? Our team is here to help you succeed with CodEdit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card rounded-[2.5rem] border border-slate-200 p-8 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Send a Message</h3>
              </div>

              {/* Success Message */}
              {isSuccess && (
                <div className="mb-8 p-5 rounded-2xl bg-green-50 border border-green-100 flex items-start gap-3 animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-900 text-sm">Message Sent Successfully</p>
                    <p className="text-xs text-green-700 mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="teacher@school.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-5 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                    <textarea
                      required
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.email || !formData.message}
                  className="btn-premium w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mt-6">
                  Protected by standard encryption
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="group glass-card p-6 rounded-[2rem] border border-slate-200 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 mb-0.5">{info.title}</h4>
                        <p className="text-blue-600 font-bold mb-1">{info.content}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{info.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response Time Card */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles size={20} className="text-blue-400" />
                </div>
                <h4 className="text-xl font-black mb-2">24h Response Guarantee</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed mb-6">
                  Our dedicated support team is available during business days to ensure you get the help you need, when you need it.
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[
                    { label: "Response", value: "< 24h" },
                    { label: "Rate", value: "98%" },
                    { label: "Support", value: "24/5" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-black text-blue-400">{stat.value}</div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
