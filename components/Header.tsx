'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CloudSun, Search, Menu, X, Info, Mail, Shield, FileText, AlertTriangle } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full max-w-6xl mx-auto pt-4 pb-2 px-4 relative z-50">
      <nav className="liquid-glass rounded-2xl px-5 py-3.5 flex items-center justify-between border border-white/10 shadow-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-all border border-emerald-500/20">
            <CloudSun className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            SkyCast
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition-colors py-1">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-400 transition-colors py-1">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors py-1">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors py-1">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-emerald-400 transition-colors py-1">
            Terms
          </Link>
          <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors py-1">
            Disclaimer
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 border border-white/10 shadow-2xl space-y-2 text-sm font-bold text-slate-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <CloudSun size={18} className="text-emerald-400" />
            Home Dashboard
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <Info size={18} className="text-emerald-400" />
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <Mail size={18} className="text-emerald-400" />
            Contact Us
          </Link>
          <Link
            href="/privacy-policy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <Shield size={18} className="text-emerald-400" />
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <FileText size={18} className="text-emerald-400" />
            Terms & Conditions
          </Link>
          <Link
            href="/disclaimer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
          >
            <AlertTriangle size={18} className="text-emerald-400" />
            Disclaimer
          </Link>
        </div>
      )}
    </header>
  );
}
