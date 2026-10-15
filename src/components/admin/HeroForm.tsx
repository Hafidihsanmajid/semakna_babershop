"use client";

import { useState } from "react";
import { updateHeroAction } from "@/actions/cms.actions";
import { Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface HeroFormProps {
  initialData?: {
    emblemText: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBgUrl: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  } | null;
}

export default function HeroForm({ initialData }: HeroFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateHeroAction(formData);

    setLoading(false);
    if (res.success) {
      setStatus({ success: true, message: res.message || "Hero section berhasil diperbarui!" });
    } else {
      setStatus({ success: false, message: res.error || "Gagal memperbarui hero section." });
    }
  };

  return (
    <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-xl font-bold tracking-wide uppercase text-white">
          Manajemen Hero Section
        </h2>
        <p className="text-xs text-[#B5B5B7] mt-1">
          Ubah judul utama, subheadline, teks emblem retro, gambar latar, dan teks tombol CTA.
        </p>
      </div>

      {status && (
        <div
          className={`mb-6 p-4 rounded-[2px] flex items-center gap-3 text-xs border ${
            status.success
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
              : "bg-red-950/40 border-red-500/40 text-red-200"
          }`}
        >
          {status.success ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Emblem Retro */}
          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Teks Emblem Retro
            </label>
            <input
              type="text"
              name="emblemText"
              defaultValue={initialData?.emblemText || "HAIR SALON - EST. 1980"}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          {/* Hero Background Image URL */}
          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              URL Foto Background Hero
            </label>
            <input
              type="text"
              name="heroBgUrl"
              defaultValue={initialData?.heroBgUrl || "/images/hero-barber.jpg"}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Hero Title */}
        <div>
          <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
            Headline Utama (Hero Title)
          </label>
          <input
            type="text"
            name="heroTitle"
            defaultValue={initialData?.heroTitle || "SEMAKNA HAIRCUT & SHAVES"}
            required
            className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors font-display text-lg"
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
            Subheadline Deskripsi
          </label>
          <textarea
            name="heroSubtitle"
            rows={2}
            defaultValue={
              initialData?.heroSubtitle ||
              "Humour is powerful. It drives emotion and crafts timeless masculine style."
            }
            required
            className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Teks Tombol CTA Utama
            </label>
            <input
              type="text"
              name="primaryCtaText"
              defaultValue={initialData?.primaryCtaText || "ABOUT US"}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Teks Tombol CTA Sekunder
            </label>
            <input
              type="text"
              name="secondaryCtaText"
              defaultValue={initialData?.secondaryCtaText || "NEWS FEED"}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] disabled:opacity-50 text-[#121315] font-display font-bold text-xs uppercase tracking-widest rounded-[2px] transition-all duration-200 cursor-pointer shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            SIMPAN PERUBAHAN HERO
          </button>
        </div>
      </form>
    </div>
  );
}
