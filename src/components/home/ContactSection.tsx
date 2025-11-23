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
    <section id="contact-us" className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400 opacity-15 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-400 opacity-15 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 opacity-10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 font-semibold text-sm mb-4 border border-blue-200/50 animate-fade-in-up">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            We'd Love to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Hear From You</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Have questions or feedback? Our team is here to help you succeed with CodEdit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                </div>

                {/* Success Message */}
                {isSuccess && (
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 flex items-start gap-3 animate-fade-in-up">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Message sent successfully!</p>
                      <p className="text-xs text-green-700 mt-1">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Email Input */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
                      <textarea
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={6}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white/50 backdrop-blur-sm hover:border-gray-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.email || !formData.message}
                    className="group/btn w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-base shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will never be shared.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-indigo-600 font-semibold mb-1">{info.content}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Response Badge */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Quick Response Guarantee</h4>
                <p className="text-sm text-gray-600">
                  We aim to respond to all inquiries within <span className="font-semibold text-green-600">24 hours</span> during business days
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { label: "Response Time", value: "< 24h" },
                { label: "Satisfaction", value: "98%" },
                { label: "Support Tickets", value: "5K+" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 transition-all hover:shadow-md">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      </section>
  );
}
