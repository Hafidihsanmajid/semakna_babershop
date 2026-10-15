import Link from "next/link";

interface HeroSectionProps {
  emblemText?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBgUrl?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export default function HeroSection({
  emblemText = "HAIR SALON - EST. 1980",
  heroTitle = "SEMAKNA HAIRCUT & SHAVES",
  heroSubtitle = "Humour is powerful. It drives emotion. And we tend to remember things that we associate with an emotion better. Always fulfilling your",
  heroBgUrl = "https://as1.ftcdn.net/v2/jpg/18/94/21/54/1000_F_1894215473_iMdnYQS0A1wpKYx4kn5Yel7CB6ebnb01.jpg",
  primaryCtaText = "ABOUT US",
  secondaryCtaText = "NEWS FEED",
}: HeroSectionProps) {
  const bgImage =
    heroBgUrl ||
    "https://as1.ftcdn.net/v2/jpg/18/94/21/54/1000_F_1894215473_iMdnYQS0A1wpKYx4kn5Yel7CB6ebnb01.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* 1. Background image penuh */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* 2. Dark overlay transparan & Efek vignette gradien */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-black/60 pointer-events-none" />

      {/* 3. Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Emblem Vintage */}
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          {/* Ikon dua gunting emas menyilang */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_2px_10px_rgba(212,154,88,0.5)]"
          >
            <circle cx="18" cy="46" r="6" stroke="#D49A58" strokeWidth="2.5" />
            <circle cx="46" cy="46" r="6" stroke="#D49A58" strokeWidth="2.5" />
            <path
              d="M23 42L48 14"
              stroke="#D49A58"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M41 42L16 14"
              stroke="#D49A58"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="32" cy="30" r="2.5" fill="#D49A58" />
          </svg>

          {/* Teks HAIR SALON - EST. 1980 font serif */}
          <div className="flex items-center gap-3">
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D49A58]" />
            <span className="font-serif-accent font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#D49A58] uppercase font-bold drop-shadow-md">
              {emblemText}
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D49A58]" />
          </div>

          {/* Kumis putih di bagian bawah */}
          <svg
            viewBox="0 0 64 20"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-3.5 sm:w-12 sm:h-4 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <path d="M32 7 C25 1 13 -1 3 5 C -2 8 0 13 8 12 C 17 10 24 16 32 13 C 40 16 47 10 56 12 C 64 13 66 8 61 5 C 51 -1 39 1 32 7 Z" />
          </svg>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold uppercase tracking-tight text-white leading-[1.06] drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] max-w-4xl">
          {heroTitle}
        </h1>

        {/* Subheadline */}
        <p className="font-body text-[#B5B5B7] text-xs sm:text-sm max-w-lg mt-4 leading-relaxed font-normal drop-shadow-md">
          {heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="#story"
            className="px-6 sm:px-8 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] shadow-[0_4px_25px_rgba(212,154,88,0.45)] hover:shadow-[0_6px_30px_rgba(224,169,107,0.6)] transition-all duration-200 active:scale-95"
          >
            {primaryCtaText}
          </Link>

          <Link
            href="#services"
            className="px-6 sm:px-8 py-2.5 bg-[#1C1D21]/80 hover:bg-[#1C1D21] border border-white/25 hover:border-[#D49A58] text-white hover:text-[#D49A58] font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] backdrop-blur-sm transition-all duration-200 active:scale-95"
          >
            {secondaryCtaText}
          </Link>
        </div>

        {/* Slider Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="w-6 h-1 bg-[#D49A58] rounded-full shadow-[0_0_8px_rgba(212,154,88,0.8)]" />
          <span className="w-1.5 h-1 bg-white/40 hover:bg-white/80 rounded-full transition-colors cursor-pointer" />
          <span className="w-1.5 h-1 bg-white/40 hover:bg-white/80 rounded-full transition-colors cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
