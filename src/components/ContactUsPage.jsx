import { useState } from "react";

export default function ContactUsPage({ onStartQuiz }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Is CarSuggest 100% free for car shoppers?",
      a: "Yes, completely free. There are no paywalls, hidden fees, or subscription tiers. We believe everyone deserves access to unbiased automotive guidance.",
    },
    {
      q: "Can automakers or dealerships pay to rank their cars higher?",
      a: "No. Our ranking matrix is strictly objective and based on lifestyle fit, reliability indices, safety ratings, fuel economy, and user constraints. We do not sell sponsored recommendation spots.",
    },
    {
      q: "How does the local inventory lookup work?",
      a: "When you view a recommended car and click 'Find Local Listings', we format targeted search queries directly into leading auto marketplaces (CarGurus, Autotrader, CarMax, Edmunds). You view actual dealer or private seller inventory directly on their platforms.",
    },
    {
      q: "Can I request that a specific car or trim be added to your database?",
      a: "Absolutely! We expand our vehicle catalog frequently. Please select 'Suggest a Car Model' in the contact form below and let us know which make, model, or year you'd like to see included.",
    },
    {
      q: "Do you share or sell my contact details to dealerships?",
      a: "Never. We do not sell user leads or contact info to third parties. If you send us a message here, it is only read by our internal team to assist you.",
    },
  ];

  const handleCopyEmail = (email) => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setStatus("sending");
    // Simulate network submission
    setTimeout(() => {
      setStatus("sent");
    }, 900);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "general", message: "" });
    setStatus("idle");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Direct Support & Feedback
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            We&apos;d love to{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent)] bg-clip-text text-transparent">
              hear from you
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            Have feedback on a recommendation, want to suggest a new vehicle model, or explore a partnership? Send us a note.
          </p>
        </div>

        {/* Top Direct Contact Channels */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-indigo-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-base mb-1">Customer & User Support</h3>
              <p className="text-xs text-white/50 mb-3">Questions about recommendations or report an issue.</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs font-mono text-indigo-300 truncate">support@carsuggest.app</span>
              <button
                type="button"
                onClick={() => handleCopyEmail("support@carsuggest.app")}
                className="text-xs text-white/60 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-purple-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-base mb-1">Partnerships & Dealers</h3>
              <p className="text-xs text-white/50 mb-3">Automotive API integrations, research, and collaboration.</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs font-mono text-purple-300 truncate">partners@carsuggest.app</span>
              <button
                type="button"
                onClick={() => handleCopyEmail("partners@carsuggest.app")}
                className="text-xs text-white/60 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-amber-500/30 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-base mb-1">Response Guarantee</h3>
              <p className="text-xs text-white/50 mb-3">Our team reviews all inquiries within 24 business hours.</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Desk active & online</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + FAQ */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
            <p className="text-sm text-white/60 mb-6">
              Fill out the form below and we&apos;ll get back to you directly via email.
            </p>

            {status === "sent" ? (
              <div className="text-center py-12 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. We received your note and will reply to <span className="text-white font-semibold">{formData.email}</span> within 24 hours.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                  {onStartQuiz && (
                    <button
                      type="button"
                      onClick={onStartQuiz}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all cursor-pointer"
                    >
                      Take the Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Subject / Topic
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                  >
                    <option value="general" className="bg-slate-900">General Inquiry</option>
                    <option value="feedback" className="bg-slate-900">Feedback on a Car Recommendation</option>
                    <option value="model-request" className="bg-slate-900">Suggest a Car Model to Add</option>
                    <option value="bug" className="bg-slate-900">Report an Issue / Bug</option>
                    <option value="partner" className="bg-slate-900">Partnership or Dealership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind, how we can help, or your thoughts on our recommendation quiz..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-white/40">
                    🔒 We respect your privacy. No marketing spam.
                  </div>
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* FAQ Accordion (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white mb-1">Frequently Asked</h2>
              <p className="text-sm text-white/60">Quick answers to common questions about CarSuggest.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-white/90">{faq.q}</span>
                      <svg
                        className={`w-4 h-4 text-white/50 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-indigo-400" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Support info card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/20 text-xs text-white/70 leading-relaxed">
              <span className="text-white font-semibold block mb-1">Looking for immediate recommendations?</span>
              You can jump straight into the matching quiz without waiting for email replies.
              <div className="mt-3">
                <button
                  type="button"
                  onClick={onStartQuiz}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-semibold underline cursor-pointer"
                >
                  Start Car Matching Quiz →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
