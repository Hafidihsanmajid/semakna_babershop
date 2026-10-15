import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0D0E10] border-t border-[#D49A58]/25 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D49A58] p-1 bg-[#1C1D21]">
                <Image
                  src="/images/logo.svg"
                  alt="Semakna Barbershop"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display text-2xl font-bold tracking-[0.18em] text-white">
                SEMAKNA
              </span>
            </div>
            <p className="font-body text-xs text-[#B5B5B7] leading-relaxed">
              Classic Vintage & Dark Luxury Grooming. Menghadirkan pengalaman cukur klasik autentik untuk pria berkarakter.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D49A58]/40 hover:border-[#D49A58] flex items-center justify-center text-[#D49A58] hover:bg-[#D49A58] hover:text-[#121315] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D49A58]/40 hover:border-[#D49A58] flex items-center justify-center text-[#D49A58] hover:bg-[#D49A58] hover:text-[#121315] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-widest text-[#D49A58] uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs font-body text-[#B5B5B7]">
              <li>
                <Link href="#hero" className="hover:text-[#D49A58] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#story" className="hover:text-[#D49A58] transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#D49A58] transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-[#D49A58] transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#D49A58] transition-colors">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Working Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-widest text-[#D49A58] uppercase">
              WORKING HOURS
            </h4>
            <div className="space-y-2 text-xs font-body text-[#B5B5B7]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D49A58] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Senin - Jumat:</p>
                  <p>10:00 WIB - 21:00 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#D49A58] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Sabtu - Minggu:</p>
                  <p>09:00 WIB - 22:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold tracking-widest text-[#D49A58] uppercase">
              LOCATION
            </h4>
            <div className="space-y-2 text-xs font-body text-[#B5B5B7]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D49A58] flex-shrink-0 mt-0.5" />
                <p>Jl. Vintage Heritage No. 88, Jakarta Selatan</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#D49A58] flex-shrink-0" />
                <p>+62 (021) 555-8989</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E8085] gap-4">
          <p>© {new Date().getFullYear()} Semakna Barbershop. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#D49A58] transition-colors">
              Admin Login
            </Link>
            <span>•</span>
            <span className="text-[#D49A58]">EST. 1980</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
