import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Clock, MapPin, Info, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact & Support | SkyCast Weather Dashboard',
  description: 'Get in touch with the SkyCast Weather Dashboard support team for technical help, feedback, and privacy inquiries regarding our real-time weather forecasts.',
  keywords: ['SkyCast support', 'contact SkyCast', 'weather app feedback', 'meteorological help'],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
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
                'name': 'Contact & Support',
                'item': 'https://skycast-wd.vercel.app/contact'
              }
            ]
          })
        }}
      />

      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/10 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/05 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
      </div>

      <Header />

      <div className="w-full max-w-4xl px-4 py-8 flex-grow">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 block">
            Platform Support
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Contact & Support
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold mt-3 max-w-2xl">
            Have questions, feedback, or inquiries regarding SkyCast Weather Intelligence? Get in touch with our team directly via email.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {/* Main Contact Card */}
          <div className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Mail size={28} />
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                    Official Support Email
                  </h2>
                </div>
                <p className="text-slate-300 text-sm font-bold">
                  For support, feedback, privacy inquiries, and technical issues:
                </p>
                <a
                  href="mailto:skycast.app@outlook.com"
                  className="inline-block text-xl md:text-2xl font-black text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors break-all mt-1"
                >
                  skycast.app@outlook.com
                </a>
              </div>

              <a
                href="mailto:skycast.app@outlook.com?subject=SkyCast%20Inquiry"
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#020603] font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 transform active:scale-95 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                <Send size={16} />
                Send Email
              </a>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <Clock size={18} />
                  Response Time
                </div>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                  We aim to respond to all user inquiries and feedback within 24–48 business hours.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <ShieldCheck size={18} />
                  Privacy & Safety
                </div>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                  Your communication is treated with privacy. We do not share user emails or personal information.
                </p>
              </div>

              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <MapPin size={18} />
                  Service Coverage
                </div>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">
                  SkyCast Meteorological Intelligence Services<br />
                  Global & Regional Forecast Systems
                </p>
              </div>
            </div>

            {/* Useful Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-bold">
              <Link
                href="/about"
                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-colors flex items-center gap-2"
              >
                <Info size={14} />
                Learn About SkyCast Engine
              </Link>
              <Link
                href="/privacy-policy"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


