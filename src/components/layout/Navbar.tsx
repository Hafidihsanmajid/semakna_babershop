"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, Shield } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "ABOUT US", href: "#story" },
    { label: "SERVICES", href: "#services" },
    { label: "PHOTO", href: "#gallery" },
    { label: "CONTACTS", href: "#footer" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-black/85 via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        {/* Left: Brand Logo (GoGrin style circle + text) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#D49A58] p-1.5 flex items-center justify-center bg-[#1C1D21]/80 backdrop-blur-sm group-hover:border-[#E0A96B] transition-colors">
            <Image
              src="/images/logo.svg"
              alt="Semakna Barbershop"
              width={26}
              height={26}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-baseline">
            <span className="font-display text-2xl font-bold tracking-[0.08em] text-white group-hover:text-[#D49A58] transition-colors">
              SEMAKNA
            </span>
            <span className="text-[#D49A58] text-2xl font-bold leading-none">.</span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-display font-bold tracking-[0.18em] text-white/90 hover:text-[#D49A58] transition-colors py-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search, Cart, Hamburger & Admin Login */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Thin Search Input with Vertical Amber Line */}
          <div className="hidden sm:flex items-center bg-[#1C1D21]/60 border-l-2 border-l-[#D49A58] border border-white/10 rounded-[2px] px-2.5 py-1 focus-within:border-[#D49A58] backdrop-blur-sm transition-colors">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-20 md:w-28 focus:w-36 transition-all duration-200 bg-transparent text-xs text-white placeholder-[#7E8085] focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#D49A58] flex-shrink-0 cursor-pointer hover:text-white transition-colors" />
          </div>

          {/* Cart Icon */}
          <button
            className="hidden sm:flex p-1.5 text-white/80 hover:text-[#D49A58] transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          {/* Admin / Login Button */}
          {isLoggedIn ? (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-[0_4px_12px_rgba(212,154,88,0.3)]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center px-3 py-1 border border-[#D49A58]/70 hover:border-[#D49A58] text-[#D49A58] hover:bg-[#D49A58] hover:text-[#121315] font-display font-bold text-[11px] uppercase tracking-wider rounded-[2px] transition-all backdrop-blur-sm"
            >
              LOGIN
            </Link>
          )}

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-[#D49A58] transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C1D21]/95 backdrop-blur-xl border-b border-[#D49A58]/30 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-display tracking-widest text-white hover:text-[#D49A58] py-1 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex items-center bg-[#121315] border-l-2 border-l-[#D49A58] border border-white/10 px-3 py-2 rounded-[2px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-[#7E8085] focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#D49A58]" />
          </div>
        </div>
      )}
    </header>
  );
}
