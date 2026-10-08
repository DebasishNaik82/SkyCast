'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Home, MapPin, Compass, ArrowLeft, CloudOff, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/weather/${encodeURIComponent(query.trim().toLowerCase())}`);
    }
  };

  const popularCities = [
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
    <main className="min-h-screen bg-[#020603] text-slate-100 font-sans flex flex-col items-center justify-between relative isolation-auto">
      {/* Background Liquid Glow */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="liquid-glow w-[500px] h-[500px] bg-emerald-600/15 -top-20 -left-20 animate-liquid" />
        <div className="liquid-glow w-[400px] h-[400px] bg-green-600/10 top-1/2 -right-20 animate-liquid [animation-delay:2s]" />
      </div>

      <Header />

      <div className="w-full max-w-3xl px-4 py-12 flex flex-col items-center text-center my-auto">
        {/* Animated Weather Graphic */}
        <div className="relative mb-6">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative shadow-2xl">
            <CloudOff className="w-14 h-14 md:w-18 md:h-18 text-emerald-400 animate-pulse" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 font-black text-xs uppercase tracking-widest rounded-full shadow-lg">
            HTTP 404
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent">
          Forecast Not Found
        </h1>
        <p className="text-slate-400 font-bold text-sm md:text-base max-w-lg mb-8 leading-relaxed">
          The location or page you are searching for seems to have cleared off our radar. Double-check the city spelling or search for a location below.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-md relative mb-10 group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city (e.g. Delhi, London, Tokyo)..."
            className="w-full liquid-glass rounded-2xl py-4 pl-12 pr-28 text-sm font-bold text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all border border-white/10"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#020603] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            Find City
          </button>
        </form>

        {/* Quick Popular Cities */}
        <div className="w-full liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
            <Compass size={16} />
            Try Popular Forecasts
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {popularCities.map((city) => (
              <Link
                key={city.slug}
                href={`/weather/${city.slug}`}
                className="px-4 py-2 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 rounded-xl text-xs font-bold text-slate-300 hover:text-emerald-400 transition-all flex items-center gap-1.5"
              >
                <MapPin size={12} className="text-slate-500" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
          <Link
            href="/"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-[#020603] font-black rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 transform active:scale-95 uppercase tracking-wider"
          >
            <Home size={16} />
            Back to Dashboard
          </Link>
          <Link
            href="/about"
            className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold rounded-2xl transition-all flex items-center gap-2"
          >
            About SkyCast
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
