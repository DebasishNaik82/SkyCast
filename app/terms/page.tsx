import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Check, AlertCircle, Scale, Globe2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - SkyCast Weather Intelligence',
  description: 'Terms and Conditions governing the use of SkyCast Weather Intelligence website and meteorological forecasting services.',
  keywords: ['Terms and Conditions', 'SkyCast terms of use', 'weather service terms'],
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020603] text-slate-100 font-sans flex flex-col items-center relative isolation-auto">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/10 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/05 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
      </div>

      <Header />

      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 block">
            User Agreement
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold mt-3 max-w-2xl">
            Welcome to SkyCast. These terms outline the rules and regulations for using SkyCast Weather Intelligence.
          </p>
        </div>

        <div className="space-y-8 mt-8 text-slate-300 font-bold text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <FileText size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and browsing <strong>SkyCast</strong> (located at <code>https://skycast-weather.vercel.app</code>), you accept and agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you must discontinue use of this website immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Globe2 size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">2. Permitted Use & Service Nature</h2>
            </div>
            <p className="mb-3">
              SkyCast provides real-time meteorological information, air quality data, and atmospheric condition reporting for informational and educational purposes.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 text-xs">
              <li>You may use SkyCast for personal, non-commercial weather monitoring.</li>
              <li>You agree not to scrape, reverse engineer, or launch automated requests that degrade platform availability for other users.</li>
              <li>Commercial redistribution or re-selling of weather feeds obtained via SkyCast without permission is strictly prohibited.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <AlertCircle size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">3. Meteorological Disclaimer & Accuracy</h2>
            </div>
            <p>
              Weather predictions are inherently complex scientific approximations based on global mathematical modeling (Open-Meteo). SkyCast does not warrant or guarantee 100% accuracy, uninterrupted uptime, or error-free forecasts. Weather conditions can change rapidly without notice.
            </p>
          </section>

          {/* Section 4 */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Scale size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">4. Limitation of Liability</h2>
            </div>
            <p>
              In no event shall SkyCast, its operators, or data providers be liable for any damages, losses, travel disruptions, or business decisions arising out of the reliance on weather forecasts provided on this website. For emergency weather warnings, always consult official governmental meteorological agencies (e.g., India Meteorological Department - IMD).
            </p>
          </section>

          {/* Section 5 */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">5. Governing Law & Contact</h2>
            </div>
            <p>
              These terms shall be governed and construed in accordance with the laws of India. For any inquiries regarding these terms, email us at <a href="mailto:skycast.app@outlook.com" className="text-emerald-400 underline">skycast.app@outlook.com</a> or visit our <Link href="/contact" className="text-emerald-400 underline">Contact & Support page</Link>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
