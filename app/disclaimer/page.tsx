import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle, Database, Info, ShieldAlert, LifeBuoy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | SkyCast Weather Dashboard',
  description: 'SkyCast Weather Dashboard Meteorological Disclaimer detailing weather forecast accuracy limits, Open-Meteo data source attribution, and severe weather safety advice.',
  keywords: ['Weather Disclaimer', 'SkyCast disclaimer', 'meteorological data accuracy', 'Open-Meteo attribution', 'Skycast Weather Dashboard'],
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
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
                'name': 'Disclaimer',
                'item': 'https://skycast-wd.vercel.app/disclaimer'
              }
            ]
          })
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/10 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/05 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
      </div>

      <Header />

      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 block">
            Important Notice
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Data & Accuracy Disclaimer
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold mt-3 max-w-2xl">
            Please read this meteorological disclaimer regarding the use of weather forecasts and atmospheric insights on SkyCast.
          </p>
        </div>

        <div className="space-y-8 mt-8 text-slate-300 font-bold text-sm leading-relaxed">
          {/* General Disclaimer */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <AlertTriangle size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">General Weather Information</h2>
            </div>
            <p className="mb-3">
              All information provided on <strong>SkyCast</strong> is published in good faith and for general information purposes only. SkyCast does not make any warranties about the completeness, reliability, or 100% precision of weather predictions, AQI readings, or satellite estimations.
            </p>
            <p>
              Atmospheric conditions are volatile and subject to swift local variation. Any action you take upon the information you find on this website is strictly at your own risk.
            </p>
          </section>

          {/* Emergency Safety Notice */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <ShieldAlert size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Not for Emergency Weather Safety</h2>
            </div>
            <p className="mb-3">
              SkyCast is NOT an official government weather agency and should NEVER be relied upon as the sole source of safety information during severe weather emergencies, natural disasters, cyclones, severe monsoon flooding, or extreme heatwaves.
            </p>
            <p className="text-xs text-slate-400">
              In severe weather situations, please consult official governmental emergency meteorological broadcasts such as the <strong>India Meteorological Department (IMD)</strong>, national disaster management authorities, or local civic bodies.
            </p>
          </section>

          {/* External API Data Sources */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Database size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Third-Party Data Attribution</h2>
            </div>
            <p className="mb-3">
              SkyCast utilizes open numerical weather prediction datasets provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Open-Meteo.com</a> under open-data terms. Geocoding and place name search services are supported by OpenStreetMap data.
            </p>
            <p className="text-xs text-slate-400">
              We do not control raw observational sensor data or satellite feeds provided by these third-party APIs and are not responsible for temporary API service outages or latency.
            </p>
          </section>

          {/* Contact */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <LifeBuoy size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Data Concerns or Corrections</h2>
            </div>
            <p>
              If you notice inaccurate location geocoding or erroneous climate readings for a specific city, please email our support desk at <a href="mailto:skycast.app@outlook.com" className="text-emerald-400 underline">skycast.app@outlook.com</a> or refer to our <Link href="/contact" className="text-emerald-400 underline">Contact & Support page</Link>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
