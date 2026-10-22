import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "1. Overview & Commitment" },
    { id: "information-we-collect", label: "2. Information We Collect" },
    { id: "how-we-use-info", label: "3. How We Use Information" },
    { id: "what-we-dont-do", label: "4. What We Never Do" },
    { id: "third-parties", label: "5. Third Parties & External Links" },
    { id: "cookies-storage", label: "6. Cookies & Local Storage" },
    { id: "data-security", label: "7. Data Security & Retention" },
    { id: "user-rights", label: "8. Your Rights (CCPA/GDPR)" },
    { id: "children", label: "9. Children's Privacy" },
    { id: "contact", label: "10. Contact Us About Privacy" },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Transparent & Driver-First
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Last Updated: <span className="text-white font-medium">October 21, 2026</span> • Effective Immediately
          </p>
        </div>

        {/* Privacy At A Glance Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              No Account Required
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              You can complete our car recommendation quiz and inspect results anonymously without ever providing an email, name, or phone number.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              We Never Sell Personal Data
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              We do not sell, rent, or trade your responses or browsing data to data brokers, advertising networks, or car dealerships.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Local Search On Demand
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              If you enter a ZIP code to check nearby inventory, it is used solely to construct inventory search URLs and is not saved to a user profile.
            </p>
          </div>
        </div>

        {/* Content Layout with Table of Contents on Desktop */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 px-2">
                On This Page
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`block w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                      activeSection === sec.id
                        ? "text-indigo-400 font-semibold bg-indigo-500/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Legal Text */}
          <main className="lg:col-span-3 space-y-10 text-white/80 text-sm leading-relaxed">
            {/* Section 1 */}
            <section id="overview" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                1. Overview & Commitment
              </h2>
              <p className="mb-3">
                At <strong>CarSuggest</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), your privacy is a foundational principle of our product design. We created CarSuggest to deliver unbiased, algorithmic vehicle recommendations without the invasive tracking, phone solicitation, and spam emails typical of traditional auto retail websites.
              </p>
              <p>
                This Privacy Policy outlines how our web application processes information when you visit our website, complete our vehicle matching quiz, or search for regional dealership listings.
              </p>
            </section>

            {/* Section 2 */}
            <section id="information-we-collect" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-1">A. Quiz Preferences (Non-PII)</h3>
                  <p className="text-white/70">
                    When you take the quiz, we collect your answers regarding preferred vehicle body types, driving conditions, passenger count, cargo expectations, powertrain preferences (electric, hybrid, gas), and budget range. These responses are processed in-browser to generate match scores.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">B. Optional Postal Code / ZIP Code</h3>
                  <p className="text-white/70">
                    If you use our local listings tool to discover available inventory near you, you may enter a 5-digit ZIP code. We do not access background GPS hardware. The ZIP code is strictly used client-side to generate outbound deep-links to automotive marketplaces.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">C. Contact Inquiries</h3>
                  <p className="text-white/70">
                    If you voluntarily contact us via our contact form or support email, we collect your name, email address, subject, and message content to respond to your inquiry.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">D. Anonymized Technical Telemetry</h3>
                  <p className="text-white/70">
                    Like standard web services, server logs and privacy-preserving analytics may aggregate browser version, device category (mobile/desktop), referral headers, and page view timestamps to ensure site performance and detect DDoS attacks.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use-info" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                3. How We Use Information
              </h2>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>To calculate match percentages and rank suitable vehicles against your stated criteria.</li>
                <li>To format deep-links to inventory portals (e.g. CarGurus, Autotrader, CarMax, Edmunds).</li>
                <li>To diagnose technical errors, improve load times, and refine our recommendation algorithms.</li>
                <li>To reply to customer support requests and feature suggestions.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="what-we-dont-do" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
              <h2 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                4. What We Never Do
              </h2>
              <div className="space-y-2 text-white/80">
                <p>
                  <strong>We do not sell your personal data.</strong> Many car shopping websites monetize by selling your lead (name, phone, zip code) to 5 to 10 local dealerships who will subsequently call or text you. CarSuggest does not collect or sell sales leads.
                </p>
                <p>
                  <strong>We do not require account registration.</strong> You can access our full database, quiz algorithms, and recommendation engine freely without creating an account or storing a password.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="third-parties" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                5. Third Parties & External Links
              </h2>
              <p className="mb-3 text-white/70">
                Our application includes outbound links to third-party automotive platforms, including CarGurus, Autotrader, CarMax, Edmunds, and Cars.com, as well as educational imagery from Wikimedia Commons and Unsplash.
              </p>
              <p className="text-white/70">
                Once you click an external link leaving CarSuggest, you are subject to the terms and privacy practices of that destination website. We encourage you to review their privacy policies before submitting personal information to external sellers.
              </p>
            </section>

            {/* Section 6 */}
            <section id="cookies-storage" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                6. Cookies & Local Storage
              </h2>
              <p className="text-white/70 mb-3">
                CarSuggest may utilize browser <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-white">localStorage</code> or session storage exclusively for client-side state maintenance (such as remembering your active quiz step or temporary ZIP code preference during your session).
              </p>
              <p className="text-white/70">
                We do not deploy third-party advertising tracking cookies or cross-site tracking pixels (such as Facebook Pixel or cross-domain retargeting beacons). You can clear your browser storage at any time via your browser settings.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-security" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                7. Data Security & Retention
              </h2>
              <p className="text-white/70 mb-3">
                All communications between your browser and CarSuggest are encrypted using modern Transport Layer Security (TLS/HTTPS). Because we do not store sensitive payment cards, social security numbers, or user profiles on central databases, the risk of data compromise is inherently minimized.
              </p>
              <p className="text-white/70">
                Contact messages sent to our support desk are retained only as long as necessary to address your inquiry or bug report.
              </p>
            </section>

            {/* Section 8 */}
            <section id="user-rights" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                8. Your Rights (CCPA / GDPR / Regional Privacy)
              </h2>
              <p className="text-white/70 mb-3">
                Depending on your jurisdiction (such as California or the European Union), you may have specific statutory rights:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-white/70 mb-3">
                <li><strong>Right to Know / Access:</strong> Request details of information we have collected.</li>
                <li><strong>Right to Deletion:</strong> Request deletion of any contact email records.</li>
                <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy exercise.</li>
                <li><strong>Right to Opt-Out of Sale:</strong> As stated, CarSuggest does not sell data.</li>
              </ul>
              <p className="text-white/70">
                To exercise any privacy right, simply submit a request using our contact form or email us at <a href="mailto:privacy@carsuggest.app" className="text-indigo-400 underline">privacy@carsuggest.app</a>.
              </p>
            </section>

            {/* Section 9 */}
            <section id="children" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                9. Children&apos;s Privacy
              </h2>
              <p className="text-white/70">
                CarSuggest is intended for prospective automobile drivers and consumers aged 16 and older. We do not knowingly collect or solicit personal data from children under the age of 13. If you believe a minor has submitted personal information to us, please notify us immediately so we can remove the data.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                10. Contact Us About Privacy
              </h2>
              <p className="text-white/70 mb-4">
                If you have questions, feedback, or compliance requests regarding this Privacy Policy or our data handling practices, please contact our team:
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-sm">
                <div><strong>CarSuggest Privacy Team</strong></div>
                <div className="text-white/60">Email: <a href="mailto:privacy@carsuggest.app" className="text-indigo-400 hover:underline">privacy@carsuggest.app</a></div>
                <div className="text-white/60">Web: <a href="#/contact" className="text-indigo-400 hover:underline">carsuggest.app/#/contact</a></div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
