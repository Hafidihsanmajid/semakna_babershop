"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface StorySectionProps {
  preTitle?: string;
  title?: string;
  highlightWord?: string;
  description?: string;
  videoUrl?: string | null;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  testimonialAvatar?: string;
}

export default function StorySection({
  preTitle = "SEMAKNA BY THE BEST",
  title = "You'll be sure to have an old fashioned time.",
  highlightWord = "an old",
  description = "There's things people say in the barbershop they won't even say in their own living room, because it's just one of those zones where there's things people say in the barbershop they won't even say in their own living room, because it's just one of these zones where nobody's going. Come to the corner for a great cut.",
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  testimonialQuote = "Barbershop. It's in their interests to find alternate vehicles to promote the shows.",
  testimonialAuthor = "Sakib Hosain",
  testimonialRole = "CEO of Organic",
  testimonialAvatar = "/images/avatar.jpg",
}: StorySectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Highlight specific keyword in title with amber accent
  const renderHighlightedTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#D49A58]">{highlightWord}</span>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <section id="story" className="pt-6 sm:pt-8 pb-12 sm:pb-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Image 2 style: 4 Photos Collage with Compass Dial & Center Play Button) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Concentric Compass Dial Lines (Image 2) */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#D49A58]/20 pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#D49A58]/15 border-dashed pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-white/5 pointer-events-none" />

            {/* 2x2 Photo Collage Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg relative z-10">
              <div className="relative aspect-square rounded-[2px] overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/images/story-1.jpg"
                  alt="Barber Shaving Beard"
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="relative aspect-square rounded-[2px] overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/images/story-2.jpg"
                  alt="Barber Styling Hair"
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="relative aspect-square rounded-[2px] overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/images/story-3.jpg"
                  alt="Classic Haircut"
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="relative aspect-square rounded-[2px] overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/images/story-4.jpg"
                  alt="Hot Towel Lather"
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Center Amber Video Play Button (Image 2) */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="absolute z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] flex items-center justify-center shadow-[0_0_30px_rgba(212,154,88,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
              aria-label="Play Story Video"
            >
              <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-30" />
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#121315] ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Right Column (Image 2 style: Story Texts & Testimonial Box) */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Pre-title */}
            <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D49A58] uppercase">
              {preTitle}
            </span>

            {/* Headline with amber keyword */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
              {renderHighlightedTitle()}
            </h2>

            {/* Description Body */}
            <p className="font-body text-[#B5B5B7] text-xs sm:text-sm leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Testimonial Box (Image 2 style: Avatar + Quote + Author) */}
            <div className="flex items-start gap-4 p-4 rounded-[2px] bg-white/[0.03] border border-white/5 max-w-xl">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D49A58]/50 flex-shrink-0">
                <Image
                  src={testimonialAvatar}
                  alt={testimonialAuthor}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-body text-xs text-[#B5B5B7] leading-relaxed mb-2">
                  {testimonialQuote}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xs font-bold text-white tracking-wider">
                    {testimonialAuthor}
                  </span>
                  <span className="text-[11px] text-[#7E8085]">
                    , {testimonialRole}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons: Read More & Reservasi WhatsApp */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center px-6 py-2.5 bg-[#1C1D21] hover:bg-[#D49A58] border border-white/20 hover:border-[#D49A58] text-white hover:text-[#121315] font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-200"
              >
                READ MORE
              </a>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Semakna%20Barbershop,%20saya%20ingin%20melakukan%20reservasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-display font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all duration-200 shadow-[0_4px_15px_rgba(37,211,102,0.35)]"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.151-.176.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.151-.677-1.632-.928-2.234-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.527.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.909 1.229 3.11c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.126-.275-.201-.576-.351zM12.04 21.75c-1.75 0-3.46-.46-4.97-1.33l-.36-.21-3.69.97.99-3.6-.23-.37a9.7 9.7 0 0 1-1.49-5.18c0-5.38 4.38-9.76 9.77-9.76 2.61 0 5.06 1.02 6.91 2.87a9.71 9.71 0 0 1 2.85 6.9c0 5.39-4.38 9.77-9.78 9.77zm8.33-16.68C18.15 2.86 15.21 1.75 12.04 1.75 6.38 1.75 1.77 6.36 1.77 12.02c0 1.81.47 3.58 1.37 5.14L1.75 22.25l5.24-1.37c1.5 1.04 3.28 1.59 5.05 1.59 5.66 0 10.27-4.61 10.27-10.27 0-2.74-1.07-5.32-2.94-7.12z" />
                </svg>
                <span>RESERVASI</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl bg-[#1C1D21] border border-[#D49A58] rounded-[4px] p-2 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#D49A58] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video w-full bg-black rounded overflow-hidden">
              <iframe
                src={
                  videoUrl?.includes("watch?v=")
                    ? videoUrl.replace("watch?v=", "embed/")
                    : videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"
                }
                title="Semakna Barbershop Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
