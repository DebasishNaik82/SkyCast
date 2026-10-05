import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Info, Shield, Zap, Globe, Cpu, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About SkyCast Weather Dashboard | High-Precision Meteorological Intelligence',
  description: 'Learn about SkyCast Weather Dashboard, our mission, advanced meteorological models, and high-precision forecasting engine powered by Open-Meteo.',
  keywords: ['About SkyCast', 'SkyCast weather app', 'meteorological intelligence', 'weather forecast technology', 'Open-Meteo weather data', 'Skycast Weather Dashboard'],
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020603] text-slate-100 font-sans flex flex-col items-center relative isolation-auto">
      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'SkyCast Weather Dashboard',
                'item': 'https://skycast-wd.vercel.app'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'About Us',
                'item': 'https://skycast-wd.vercel.app/about'
              }
            ]
          })
        }}
      />

      {/* Liquid Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/10 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/05 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
      </div>

      <Header />

      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 block">
            About Our Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            SkyCast Weather Intelligence
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold mt-3 max-w-2xl">
            Delivering clean, hyper-local, and real-time meteorological forecasts for thousands of locations across India and worldwide.
          </p>
        </div>

        <div className="space-y-10 mt-8">
          {/* Mission */}
          <section className="liquid-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Info size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 leading-relaxed font-bold text-sm md:text-base mb-4">
              SkyCast was engineered to eliminate clutter and provide accessible, accurate atmospheric insights. Weather forecasts shouldn&apos;t be hidden behind invasive ads, paywalls, or slow-loading interfaces. We leverage modern web technology to bring you instant updates on temperature, relative humidity, wind speed, atmospheric pressure, visibility, and Air Quality Index (AQI) values.
            </p>
            <p className="text-slate-300 leading-relaxed font-bold text-sm md:text-base">
              Whether you are checking daily commute conditions in major metros like Delhi, Mumbai, Bengaluru, and Chennai, or tracking localized weather in tier-2 and tier-3 cities, SkyCast guarantees high-fidelity meteorological intelligence.
            </p>
          </section>

          {/* Technology & Data Sources */}
          <section className="liquid-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Cpu size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Technology & Data Engine</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 font-bold text-sm">
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-black mb-2">
                  <Globe size={18} />
                  Numerical Weather Models
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our core weather calculations process raw data from high-resolution global numerical weather prediction models including GFS, ECMWF, and ICON.
                </p>
              </div>
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 font-black mb-2">
                  <Zap size={18} />
                  High-Speed Architecture
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Built on Next.js 15 and React with server-side optimizations, ensuring fast page load times and minimal layout shifts even on slow 3G/4G connections.
                </p>
              </div>
            </div>
          </section>

          {/* Quality Commitments */}
          <section className="liquid-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 text-emerald-400">
              <Shield size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Our Commitments</h2>
            </div>
            <ul className="space-y-4 text-slate-300 font-bold text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Clean User Experience:</strong> We ensure a safe, unobtrusive browsing experience without intrusive popups or unwanted redirects.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Privacy First:</strong> SkyCast does not collect or sell your personal information or precise location history.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span><strong>Continuous Reliability:</strong> High API availability ensured by global distributed CDN edge caching.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
