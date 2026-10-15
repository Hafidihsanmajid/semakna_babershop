"use client";

import { useState } from "react";
import { updateStoryAction } from "@/actions/cms.actions";
import { Save, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface StoryFormProps {
  initialData?: {
    storyPreTitle: string;
    storyTitle: string;
    storyHighlightWord: string;
    storyDescription: string;
    videoUrl?: string | null;
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
    testimonialAvatar: string;
  } | null;
}

export default function StoryForm({ initialData }: StoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await updateStoryAction(formData);

    setLoading(false);
    if (res.success) {
      setStatus({ success: true, message: res.message || "Story & Testimoni berhasil diperbarui!" });
    } else {
      setStatus({ success: false, message: res.error || "Gagal memperbarui data story." });
    }
  };

  return (
    <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-xl font-bold tracking-wide uppercase text-white">
          Manajemen Story & Testimoni Pelanggan
        </h2>
        <p className="text-xs text-[#B5B5B7] mt-1">
          Atur teks narasi sejarah barbershop, tautan video YouTube, serta testimoni kepuasan pelanggan.
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Story Section Details */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold tracking-wider text-[#D49A58] uppercase">
            1. Konten Cerita Barbershop (Story)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                Pre-Title
              </label>
              <input
                type="text"
                name="storyPreTitle"
                defaultValue={initialData?.storyPreTitle || "SEMAKNA BY THE BEST"}
                required
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                Kata Sorotan Amber (Highlight)
              </label>
              <input
                type="text"
                name="storyHighlightWord"
                defaultValue={initialData?.storyHighlightWord || "an old"}
                required
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                Tautan Video YouTube
              </label>
              <input
                type="text"
                name="videoUrl"
                defaultValue={initialData?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Judul Lengkap Story
            </label>
            <input
              type="text"
              name="storyTitle"
              defaultValue={initialData?.storyTitle || "You'll be sure to have an old fashioned time."}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors font-display text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Paragraf Deskripsi Cerita
            </label>
            <textarea
              name="storyDescription"
              rows={3}
              defaultValue={initialData?.storyDescription || ""}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Testimonial Details */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="font-display text-sm font-bold tracking-wider text-[#D49A58] uppercase">
            2. Testimoni Pelanggan
          </h3>

          <div>
            <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
              Kutipan Testimoni
            </label>
            <textarea
              name="testimonialQuote"
              rows={2}
              defaultValue={initialData?.testimonialQuote || ""}
              required
              className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors italic"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                Nama Pelanggan
              </label>
              <input
                type="text"
                name="testimonialAuthor"
                defaultValue={initialData?.testimonialAuthor || "Sakib Hosain"}
                required
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                Jabatan / Titel
              </label>
              <input
                type="text"
                name="testimonialRole"
                defaultValue={initialData?.testimonialRole || "CEO of Organic"}
                required
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1.5">
                URL Avatar Pelanggan
              </label>
              <input
                type="text"
                name="testimonialAvatar"
                defaultValue={initialData?.testimonialAvatar || "/images/avatar.jpg"}
                required
                className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] disabled:opacity-50 text-[#121315] font-display font-bold text-xs uppercase tracking-widest rounded-[2px] transition-all duration-200 cursor-pointer shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            SIMPAN PERUBAHAN STORY & TESTIMONI
          </button>
        </div>
      </form>
    </div>
  );
}
