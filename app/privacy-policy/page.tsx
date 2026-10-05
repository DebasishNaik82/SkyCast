import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Database, Lock, Cookie, UserCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | SkyCast Weather Dashboard',
  description: 'SkyCast Weather Dashboard Privacy Policy detailing cookie usage, local storage, analytics, log files, GDPR/CCPA data rights, and user privacy safety.',
  keywords: ['Privacy Policy', 'SkyCast privacy policy', 'weather app privacy', 'GDPR weather app', 'Skycast Weather Dashboard'],
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
                'name': 'Privacy Policy',
                'item': 'https://skycast-wd.vercel.app/privacy-policy'
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
            Legal Transparency
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold mt-3 max-w-2xl">
            Last updated: July 2026. At SkyCast Weather Intelligence, protecting visitor privacy is one of our main priorities.
          </p>
        </div>

        <div className="space-y-8 mt-8 text-slate-300 font-bold text-sm leading-relaxed">
          {/* General Statement */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Shield size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">1. Introduction</h2>
            </div>
            <p>
              This Privacy Policy document contains types of information that is collected and recorded by <strong>SkyCast</strong> (accessible from <span className="text-emerald-400">https://skycast-wd.vercel.app</span>) and how we use it. If you have additional questions or require more information about our Privacy Policy, contact us at <a href="mailto:skycast.app@outlook.com" className="text-emerald-400 underline">skycast.app@outlook.com</a> or visit our <Link href="/contact" className="text-emerald-400 underline">Contact & Support page</Link>.
            </p>
          </section>

          {/* Cookies & Local Storage */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Cookie size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">2. Cookies & Local Storage</h2>
            </div>
            <p className="mb-4">
              Like any other website, SkyCast uses standard browser cookies and local storage to store information including visitors&apos; preferences and recent location searches to optimize user experience and provide personalized meteorological forecasts.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
            </p>
          </section>

          {/* Log Files */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Database size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">3. Log Files</h2>
            </div>
            <p>
              SkyCast follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* GDPR Data Protection Rights */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <UserCheck size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">4. GDPR & CCPA Privacy Rights</h2>
            </div>
            <p className="mb-4">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 text-xs">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict processing of your personal data.</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="liquid-glass p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <Mail size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">5. Consent & Contact</h2>
            </div>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you wish to submit a privacy inquiry or data request, email us at <a href="mailto:skycast.app@outlook.com" className="text-emerald-400 underline">skycast.app@outlook.com</a> or refer to our <Link href="/contact" className="text-emerald-400 underline">Contact & Support page</Link>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
