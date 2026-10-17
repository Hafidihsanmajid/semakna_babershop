"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { updateStoryAction } from "@/actions/cms.actions";
import {
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Camera,
} from "lucide-react";

interface StoryFormProps {
  initialData?: {
    storyPreTitle: string;
    storyTitle: string;
    storyHighlightWord: string;
    storyDescription: string;
    videoUrl?: string | null;
    storyImage1?: string;
    storyImage2?: string;
    storyImage3?: string;
    storyImage4?: string;
    testimonialQuote: string;
    testimonialAuthor: string;
    testimonialRole: string;
    testimonialAvatar: string;
  } | null;
}

export default function StoryForm({ initialData }: StoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // States for 4 story images
  const [img1, setImg1] = useState(initialData?.storyImage1 || "/images/story-1.jpg");
  const [img2, setImg2] = useState(initialData?.storyImage2 || "/images/story-2.jpg");
  const [img3, setImg3] = useState(initialData?.storyImage3 || "/images/story-3.jpg");
  const [img4, setImg4] = useState(initialData?.storyImage4 || "/images/story-4.jpg");

  // State for testimonial avatar
  const [avatarUrl, setAvatarUrl] = useState(initialData?.testimonialAvatar || "/images/avatar.jpg");

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const fileInputRef4 = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(idx);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setter(data.url);
      } else {
        alert(data.error || "Gagal mengunggah gambar.");
      }
    } catch {
      alert("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setAvatarUrl(data.url);
      } else {
        alert(data.error || "Gagal mengunggah foto avatar.");
      }
    } catch {
      alert("Terjadi kesalahan saat mengunggah foto avatar.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("storyImage1", img1);
    formData.set("storyImage2", img2);
    formData.set("storyImage3", img3);
    formData.set("storyImage4", img4);
    formData.set("testimonialAvatar", avatarUrl);

    const res = await updateStoryAction(formData);

    setLoading(false);
    if (res.success) {
      setStatus({ success: true, message: res.message || "Story, Foto Kolase & Testimoni berhasil diperbarui!" });
    } else {
      setStatus({ success: false, message: res.error || "Gagal memperbarui data story." });
    }
  };

  const photoSlots = [
    {
      idx: 1,
      title: "Foto 1 (Kiri Atas)",
      value: img1,
      setValue: setImg1,
      defaultVal: "/images/story-1.jpg",
      ref: fileInputRef1,
    },
    {
      idx: 2,
      title: "Foto 2 (Kanan Atas)",
      value: img2,
      setValue: setImg2,
      defaultVal: "/images/story-2.jpg",
      ref: fileInputRef2,
    },
    {
      idx: 3,
      title: "Foto 3 (Kiri Bawah)",
      value: img3,
      setValue: setImg3,
      defaultVal: "/images/story-3.jpg",
      ref: fileInputRef3,
    },
    {
      idx: 4,
      title: "Foto 4 (Kanan Bawah)",
      value: img4,
      setValue: setImg4,
      defaultVal: "/images/story-4.jpg",
      ref: fileInputRef4,
    },
  ];

  return (
    <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-xl font-bold tracking-wide uppercase text-white">
          Manajemen Story, 4 Foto Kolase & Testimoni
        </h2>
        <p className="text-xs text-[#B5B5B7] mt-1">
          Atur teks narasi sejarah barbershop, 4 foto kolase (2x2) di samping story, tautan video, serta testimoni pelanggan.
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Story Section Details */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold tracking-wider text-[#D49A58] uppercase">
            1. Konten Teks Cerita (Story)
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

        {/* 2. 4 Foto Kolase Story (2x2 Grid) */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm font-bold tracking-wider text-[#D49A58] uppercase flex items-center gap-2">
                <Camera className="w-4 h-4" />
                2. Kelola 4 Foto Kolase Story (Grid 2x2)
              </h3>
              <p className="text-xs text-[#B5B5B7] mt-0.5">
                Upload foto baru langsung dari HP/komputer atau ganti URL untuk masing-masing slot 4 foto di samping teks Story.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {photoSlots.map((slot) => (
              <div
                key={slot.idx}
                className="bg-[#121315] border border-white/10 hover:border-[#D49A58]/50 p-4 rounded-[2px] flex flex-col justify-between space-y-3 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-display font-bold text-white uppercase tracking-wider">
                      {slot.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => slot.setValue(slot.defaultVal)}
                      className="text-[10px] text-[#B5B5B7] hover:text-[#D49A58] flex items-center gap-1 cursor-pointer"
                      title="Kembalikan ke gambar default"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Default</span>
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-square w-full rounded-[2px] overflow-hidden border border-white/10 bg-black mb-3">
                    <Image
                      src={slot.value}
                      alt={slot.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-black/75 px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono text-[#D49A58]">
                      Slot #{slot.idx}
                    </div>
                  </div>

                  {/* Upload Button */}
                  <input
                    type="file"
                    ref={slot.ref}
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e, slot.idx, slot.setValue)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => slot.ref.current?.click()}
                    disabled={uploadingIdx === slot.idx}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-[#D49A58]/20 border border-white/15 hover:border-[#D49A58]/50 text-white hover:text-[#D49A58] rounded-[2px] text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {uploadingIdx === slot.idx ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D49A58]" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#D49A58]" />
                    )}
                    <span>{uploadingIdx === slot.idx ? "Mengunggah..." : "Upload Foto Baru"}</span>
                  </button>
                </div>

                {/* Input URL Direct */}
                <div>
                  <label className="block text-[10px] font-display font-semibold tracking-wider text-[#7E8085] uppercase mb-1">
                    Atau Masukkan URL:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#7E8085]">
                      <LinkIcon className="w-3 h-3" />
                    </div>
                    <input
                      type="text"
                      value={slot.value}
                      onChange={(e) => slot.setValue(e.target.value)}
                      placeholder="/images/story-1.jpg atau https://..."
                      className="w-full bg-[#1C1D21] border border-white/10 focus:border-[#D49A58] rounded-[2px] pl-7 pr-2 py-1.5 text-[11px] text-white focus:outline-none transition-colors font-mono truncate"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden inputs to guarantee 4 images submitted in form */}
        <input type="hidden" name="storyImage1" value={img1} />
        <input type="hidden" name="storyImage2" value={img2} />
        <input type="hidden" name="storyImage3" value={img3} />
        <input type="hidden" name="storyImage4" value={img4} />

        {/* 3. Testimonial Details */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <h3 className="font-display text-sm font-bold tracking-wider text-[#D49A58] uppercase">
            3. Testimoni Pelanggan
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
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

            {/* Foto Avatar Pelanggan - Upload Langsung dari Device */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-display font-semibold tracking-wider text-[#D49A58] uppercase">
                  Foto Avatar Pelanggan *
                </label>
                <button
                  type="button"
                  onClick={() => setAvatarUrl("/images/avatar.jpg")}
                  className="text-[10px] text-[#B5B5B7] hover:text-[#D49A58] flex items-center gap-1 cursor-pointer"
                  title="Reset ke avatar default"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Default</span>
                </button>
              </div>

              <div className="flex items-center gap-3 bg-[#121315] border border-white/10 p-2.5 rounded-[2px]">
                {/* Circular Avatar Preview */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D49A58] bg-black flex-shrink-0 shadow-md">
                  <Image
                    src={avatarUrl}
                    alt="Avatar Testimoni"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Upload Button */}
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept="image/*"
                    onChange={handleUploadAvatar}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] rounded-[2px] text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    {uploadingAvatar ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#121315]" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#121315]" />
                    )}
                    <span>{uploadingAvatar ? "Mengunggah..." : "UPLOAD DARI DEVICE"}</span>
                  </button>
                  <p className="text-[10px] text-[#7E8085] truncate font-mono">
                    {avatarUrl}
                  </p>
                </div>
              </div>

              <input type="hidden" name="testimonialAvatar" value={avatarUrl} />
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
            SIMPAN PERUBAHAN STORY, FOTO & TESTIMONI
          </button>
        </div>
      </form>
    </div>
  );
}
