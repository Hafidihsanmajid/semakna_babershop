"use client";

import { useState } from "react";
import Image from "next/image";
import { parseMediaUrl } from "@/lib/media";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Video,
  Play,
} from "lucide-react";

export interface GalleryPhotoItem {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  mediaType?: string;
}

interface GallerySectionProps {
  photos?: GalleryPhotoItem[];
}

const DEFAULT_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 1,
    title: "Classic Scissor Haircut",
    category: "haircut",
    categoryLabel: "Haircut",
    imageUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 2,
    title: "Precision Beard Grooming",
    category: "beard",
    categoryLabel: "Beard Trim",
    imageUrl:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 3,
    title: "Vintage Pompadour Style",
    category: "haircut",
    categoryLabel: "Haircut",
    imageUrl:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Traditional Straight Razor & Tools",
    category: "interior",
    categoryLabel: "Barber Tools",
    imageUrl:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 5,
    title: "Clean Skin Fade & Texture",
    category: "haircut",
    categoryLabel: "Haircut",
    imageUrl:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 6,
    title: "Hot Towel Straight Razor Shave",
    category: "beard",
    categoryLabel: "Shaving",
    imageUrl:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 7,
    title: "Executive Modern Cut",
    category: "haircut",
    categoryLabel: "Haircut",
    imageUrl:
      "https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
  {
    id: 8,
    title: "Authentic Vintage Lounge & Chair",
    category: "interior",
    categoryLabel: "Atmosphere",
    imageUrl:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
  },
];

export default function GallerySection({ photos }: GallerySectionProps) {
  const photoList = photos && photos.length > 0 ? photos : DEFAULT_PHOTOS;
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const filteredPhotos =
    activeTab === "all"
      ? photoList
      : photoList.filter((p) => p.category === activeTab);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(
      (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const currentItem =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;
  const currentParsed = currentItem
    ? parseMediaUrl(currentItem.imageUrl, currentItem.mediaType)
    : null;

  return (
    <section id="gallery" className="pt-12 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-[#D49A58]" />
            <span className="text-[#D49A58]">•</span>
            <Video className="w-4 h-4 text-[#D49A58]" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D49A58] uppercase">
              OUR GALLERY
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Photo & Video <span className="text-[#D49A58]">Showcase</span>
          </h2>

          <p className="font-body text-[#B5B5B7] text-xs sm:text-sm mt-3">
            Dokumentasi karya potong rambut klasik, penataan jenggot, video Instagram & tutorial, serta atmosfer vintage di Semakna Barbershop.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
          {[
            { id: "all", label: "ALL WORKS" },
            { id: "haircut", label: "HAIRCUT" },
            { id: "beard", label: "BEARD & SHAVE" },
            { id: "interior", label: "INTERIOR & TOOLS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 text-xs font-display font-bold tracking-widest uppercase transition-all duration-200 rounded-[2px] cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#D49A58] text-[#121315] shadow-[0_0_15px_rgba(212,154,88,0.4)]"
                  : "bg-[#1C1D21]/80 text-[#B5B5B7] hover:text-white border border-white/10 hover:border-[#D49A58]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, idx) => {
            const parsed = parseMediaUrl(photo.imageUrl, photo.mediaType);

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/3] rounded-[2px] overflow-hidden border border-white/15 hover:border-[#D49A58] transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer bg-[#1C1D21]"
              >
                {parsed.sourceType === "instagram" ? (
                  <div className="w-full h-full bg-gradient-to-tr from-[#405DE6] via-[#E1306C] to-[#FFDC80] flex flex-col items-center justify-center p-4 relative group-hover:scale-105 transition-transform duration-700">
                    <InstagramIcon className="w-10 h-10 text-white mb-1 drop-shadow-md" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider text-white drop-shadow">
                      Instagram Reel
                    </span>
                    <span className="text-[10px] text-white/80 font-mono mt-0.5">
                      Klik untuk tonton
                    </span>
                  </div>
                ) : parsed.sourceType === "youtube" ? (
                  <div className="relative w-full h-full bg-neutral-900 group-hover:scale-105 transition-transform duration-700">
                    {parsed.thumbnailUrl && (
                      <Image
                        src={parsed.thumbnailUrl}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                ) : parsed.sourceType === "direct-video" ? (
                  <video
                    src={photo.imageUrl}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Top Badge: Type Indicator */}
                <div className="absolute top-2 right-2 z-10">
                  <span
                    className={`px-2 py-0.5 rounded-[2px] text-[9px] font-display font-bold tracking-wider uppercase backdrop-blur-sm flex items-center gap-1 ${
                      parsed.sourceType === "instagram"
                        ? "bg-pink-600 text-white"
                        : parsed.sourceType === "youtube"
                        ? "bg-red-600 text-white"
                        : parsed.isVideo
                        ? "bg-[#D49A58] text-[#121315]"
                        : "bg-black/60 text-white/90 border border-white/20"
                    }`}
                  >
                    {parsed.sourceType === "instagram" && <InstagramIcon className="w-2.5 h-2.5" />}
                    {parsed.sourceType === "youtube" && <YoutubeIcon className="w-2.5 h-2.5" />}
                    {parsed.isVideo ? "VIDEO" : "FOTO"}
                  </span>
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-display font-bold tracking-widest text-[#D49A58] uppercase">
                    {photo.categoryLabel}
                  </span>
                  <p className="text-xs sm:text-sm font-display font-bold text-white tracking-wide truncate">
                    {photo.title}
                  </p>
                </div>

                {/* Center Hover Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#D49A58]/90 text-[#121315] flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {parsed.isVideo ? (
                      <Play className="w-5 h-5 ml-0.5 fill-[#121315]" />
                    ) : (
                      <ZoomIn className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedPhotoIndex !== null && currentItem && currentParsed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Main Lightbox Content (Instagram / YouTube / Video / Photo) */}
            <div className="relative w-full rounded-[2px] overflow-hidden border border-[#D49A58]/40 shadow-2xl bg-black flex items-center justify-center">
              {currentParsed.sourceType === "instagram" ? (
                <div className="w-full flex justify-center bg-black/80 py-2">
                  <iframe
                    src={currentParsed.embedUrl}
                    className="w-full max-w-[400px] h-[70vh] border-0 rounded shadow-2xl bg-white"
                    allowFullScreen
                    scrolling="no"
                  />
                </div>
              ) : currentParsed.sourceType === "youtube" ? (
                <div className="relative w-full aspect-[16/9] max-h-[70vh]">
                  <iframe
                    src={currentParsed.embedUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : currentParsed.sourceType === "direct-video" ? (
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[70vh] flex items-center justify-center">
                  <video
                    src={currentItem.imageUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full max-h-[70vh] object-contain bg-black"
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[70vh]">
                  <Image
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    fill
                    className="object-contain bg-black"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Bottom Caption & Controls */}
            <div className="w-full flex items-center justify-between mt-4 px-2">
              <div>
                <span className="text-[11px] font-display font-bold tracking-widest text-[#D49A58] uppercase">
                  {currentItem.categoryLabel}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  {currentItem.title}
                </h3>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPhoto}
                  className="p-2 rounded-[2px] bg-[#1C1D21] border border-white/20 hover:border-[#D49A58] text-white hover:text-[#D49A58] transition-colors cursor-pointer"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-[#B5B5B7] px-2 font-display">
                  {selectedPhotoIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  onClick={nextPhoto}
                  className="p-2 rounded-[2px] bg-[#1C1D21] border border-white/20 hover:border-[#D49A58] text-white hover:text-[#D49A58] transition-colors cursor-pointer"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
