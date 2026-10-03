'use client';

import React from 'react';
import Link from 'next/link';
import { CloudSun, Mail, Shield, FileText, Info, AlertTriangle, MapPin } from 'lucide-react';

export default function Footer() {
  const topCities = [
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Bengaluru', slug: 'bengaluru' },
    { name: 'Chennai', slug: 'chennai' },
    { name: 'Kolkata', slug: 'kolkata' },
    { name: 'Hyderabad', slug: 'hyderabad' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Jaipur', slug: 'jaipur' },
  ];

  return (
    <footer className="w-full max-w-6xl mx-auto mt-16 pb-12 px-4">
      <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 flex items-center justify-center transition-all group-hover:scale-110">
                <img src="/logo.svg" alt="SkyCast Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">
                SkyCast
              </span>
            </Link>
            <p className="text-xs font-bold text-slate-400 leading-relaxed">
              High-precision, real-time meteorological intelligence and atmospheric condition forecasting delivering global weather analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <img src="/logo.svg" alt="SkyCast" className="w-4 h-4" referrerPolicy="no-referrer" /> Home Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Info size={14} className="text-slate-500" /> About SkyCast
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Mail size={14} className="text-slate-500" /> Contact Support
                </Link>
              </li>
              <li>
                <a href="mailto:skycast.app@outlook.com" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-[11px] font-bold">
                  skycast.app@outlook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
              Legal & Policies
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-slate-300">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Shield size={14} className="text-slate-500" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-500" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <AlertTriangle size={14} className="text-slate-500" /> Data Disclaimer
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-500" /> XML Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Forecasts */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
              Popular Locations
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-400">
              {topCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin size={12} className="text-slate-500" /> {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500">
          <p>&copy; {new Date().getFullYear()} SkyCast Weather Intelligence. All rights reserved.</p>
          <p className="text-[11px]">
            Meteorological Data by{' '}
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              Open-Meteo API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
