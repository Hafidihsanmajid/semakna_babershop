"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  createGalleryPhotoAction,
  updateGalleryPhotoAction,
  deleteGalleryPhotoAction,
} from "@/actions/cms.actions";
import { parseMediaUrl } from "@/lib/media";
import { InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  Loader2,
  Camera,
  Video,
  UploadCloud,
  Link as LinkIcon,
  Play,
  ExternalLink,
} from "lucide-react";

export interface GalleryPhotoData {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  mediaType?: string;
  order: number;
}

interface PhotosManagerProps {
  initialPhotos: GalleryPhotoData[];
}

export default function PhotosManager({ initialPhotos }: PhotosManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryPhotoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [inputMode, setInputMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsedPreview = parseMediaUrl(previewUrl, mediaType);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setPreviewUrl("");
    setMediaType("image");
    setInputMode("upload");
    setModalOpen(true);
    setStatus(null);
  };

  const handleOpenEditModal = (photo: GalleryPhotoData) => {
    setEditingItem(photo);
    setPreviewUrl(photo.imageUrl);
    const parsed = parseMediaUrl(photo.imageUrl, photo.mediaType);
    setMediaType(parsed.isVideo ? "video" : "image");
    setInputMode("url");
    setModalOpen(true);
    setStatus(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setPreviewUrl(data.url);
        setMediaType(data.mediaType === "video" ? "video" : "image");
      } else {
        alert(data.error || "Gagal mengunggah file.");
      }
    } catch {
      alert("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Yakin ingin menghapus media "${title}"?`)) return;

    setLoading(true);
    setStatus(null);
    const res = await deleteGalleryPhotoAction(id);
    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: `Media "${title}" berhasil dihapus!` });
    } else {
      setStatus({ success: false, message: res.error || "Gagal menghapus media." });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("imageUrl", previewUrl);
    formData.set("mediaType", mediaType);

    let res;
    if (editingItem) {
      formData.append("id", editingItem.id.toString());
      res = await updateGalleryPhotoAction(formData);
    } else {
      res = await createGalleryPhotoAction(formData);
    }

    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: res.message || "Berhasil menyimpan media!" });
      setModalOpen(false);
    } else {
      setStatus({ success: false, message: res.error || "Gagal menyimpan media." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-5 h-5 text-[#D49A58]" />
            <Video className="w-5 h-5 text-[#D49A58]" />
            <h1 className="font-display text-2xl font-bold tracking-wide uppercase text-white">
              Kelola Galeri Foto & Video
            </h1>
          </div>
          <p className="text-xs text-[#B5B5B7]">
            Upload file lokal atau input link Instagram Reel/Post, YouTube, serta file MP4 & Foto.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-[0_4px_15px_rgba(212,154,88,0.3)] cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH FOTO / VIDEO</span>
        </button>
      </div>

      {/* Global Status Alert */}
      {status && (
        <div
          className={`p-4 rounded-[2px] flex items-center gap-3 text-xs border ${
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

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialPhotos.map((photo) => {
          const parsed = parseMediaUrl(photo.imageUrl, photo.mediaType);

          return (
            <div
              key={photo.id}
              className="bg-[#1C1D21] border border-[#D49A58]/25 hover:border-[#D49A58] rounded-[2px] overflow-hidden flex flex-col justify-between shadow-lg transition-all"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
                {parsed.sourceType === "instagram" ? (
                  <div className="w-full h-full bg-gradient-to-tr from-[#405DE6] via-[#E1306C] to-[#FFDC80] flex flex-col items-center justify-center p-4 relative">
                    <InstagramIcon className="w-10 h-10 text-white mb-1 drop-shadow-md" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider text-white drop-shadow">
                      Instagram Reel / Video
                    </span>
                    <span className="text-[10px] text-white/90 font-mono mt-1">
                      Code: {parsed.code}
                    </span>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 ml-0.5 fill-black" />
                      </div>
                    </div>
                  </div>
                ) : parsed.sourceType === "youtube" ? (
                  <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center">
                    {parsed.thumbnailUrl && (
                      <Image
                        src={parsed.thumbnailUrl}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                  </div>
                ) : parsed.sourceType === "direct-video" ? (
                  <>
                    <video
                      src={photo.imageUrl}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-[#D49A58]/90 text-[#121315] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-[#121315]" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                )}

                {/* Badge Kategori */}
                <div className="absolute top-2 left-2 bg-[#121315]/80 backdrop-blur-sm border border-[#D49A58]/40 px-2 py-0.5 rounded-[2px] flex items-center gap-1.5 z-10">
                  {parsed.isVideo ? (
                    <Video className="w-3 h-3 text-[#D49A58]" />
                  ) : (
                    <Camera className="w-3 h-3 text-[#D49A58]" />
                  )}
                  <span className="text-[10px] font-display font-bold text-[#D49A58] tracking-wider uppercase">
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Badge Media Type & Order */}
                <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                  <span
                    className={`px-1.5 py-0.5 rounded-[2px] text-[9px] font-display font-bold uppercase tracking-wider flex items-center gap-1 ${
                      parsed.sourceType === "instagram"
                        ? "bg-pink-600 text-white"
                        : parsed.sourceType === "youtube"
                        ? "bg-red-600 text-white"
                        : parsed.isVideo
                        ? "bg-amber-500/90 text-black"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {parsed.sourceType === "instagram" && <InstagramIcon className="w-2.5 h-2.5" />}
                    {parsed.sourceType === "youtube" && <YoutubeIcon className="w-2.5 h-2.5" />}
                    {parsed.isVideo ? "VIDEO" : "FOTO"}
                  </span>
                  <span className="bg-black/70 px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono text-[#B5B5B7]">
                    #{photo.order}
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-white tracking-wide mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-[#7E8085] truncate font-mono">
                    {photo.imageUrl}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-3">
                  <a
                    href={photo.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-[#B5B5B7] hover:text-white transition-colors"
                    title="Buka sumber media di tab baru"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(photo)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-[#D49A58]/20 border border-white/10 hover:border-[#D49A58]/60 text-white hover:text-[#D49A58] text-[11px] font-display font-semibold tracking-wider rounded-[2px] transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>EDIT</span>
                    </button>

                    <button
                      onClick={() => handleDelete(photo.id, photo.title)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-950/20 hover:bg-red-950/50 border border-red-500/20 hover:border-red-500/60 text-red-300 text-[11px] font-display font-semibold tracking-wider rounded-[2px] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>HAPUS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add / Edit Media */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#1C1D21] border border-[#D49A58]/40 rounded-[4px] max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                {mediaType === "video" ? (
                  <Video className="w-5 h-5 text-[#D49A58]" />
                ) : (
                  <Camera className="w-5 h-5 text-[#D49A58]" />
                )}
                <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                  {editingItem ? "Edit Media Galeri" : "Tambah Media Galeri"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#B5B5B7] hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Pilihan Jenis Media */}
              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                  Tipe Media *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMediaType("image")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-[2px] border text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      mediaType === "image"
                        ? "bg-[#D49A58]/20 border-[#D49A58] text-[#D49A58]"
                        : "bg-[#121315] border-white/15 text-[#B5B5B7] hover:text-white"
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>FOTO (GAMBAR)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMediaType("video")}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-[2px] border text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      mediaType === "video"
                        ? "bg-[#D49A58]/20 border-[#D49A58] text-[#D49A58]"
                        : "bg-[#121315] border-white/15 text-[#B5B5B7] hover:text-white"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>VIDEO</span>
                  </button>
                </div>
              </div>

              {/* Judul Media */}
              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                  Judul Foto / Video *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="e.g. Vintage Pompadour & Beard Shave"
                  className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                />
              </div>

              {/* Kategori Filter & Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                    Kategori Filter *
                  </label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || "haircut"}
                    className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="haircut">HAIRCUT</option>
                    <option value="beard">BEARD & SHAVE</option>
                    <option value="interior">INTERIOR & TOOLS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                    Label Kategori Tampilan *
                  </label>
                  <input
                    type="text"
                    name="categoryLabel"
                    defaultValue={editingItem?.categoryLabel || "Haircut"}
                    required
                    placeholder="e.g. Haircut / Beard Trim / Instagram Reel"
                    className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Mode Input Media: Upload File atau Masukkan URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58]">
                    Sumber File / URL *
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInputMode("upload")}
                      className={`text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-[2px] cursor-pointer transition-colors ${
                        inputMode === "upload"
                          ? "bg-[#D49A58] text-[#121315]"
                          : "text-[#B5B5B7] hover:text-white"
                      }`}
                    >
                      Upload File
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                      type="button"
                      onClick={() => setInputMode("url")}
                      className={`text-[10px] font-display font-semibold uppercase px-2 py-0.5 rounded-[2px] cursor-pointer transition-colors ${
                        inputMode === "url"
                          ? "bg-[#D49A58] text-[#121315]"
                          : "text-[#B5B5B7] hover:text-white"
                      }`}
                    >
                      Input URL
                    </button>
                  </div>
                </div>

                {inputMode === "upload" ? (
                  <div className="space-y-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#D49A58]/40 hover:border-[#D49A58] bg-[#121315] p-6 rounded-[2px] text-center cursor-pointer transition-colors group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept={
                          mediaType === "video"
                            ? "video/*,video/mp4,video/webm,video/ogg,video/quicktime"
                            : "image/*"
                        }
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        {uploading ? (
                          <Loader2 className="w-8 h-8 text-[#D49A58] animate-spin" />
                        ) : (
                          <UploadCloud className="w-8 h-8 text-[#D49A58] group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                          {uploading
                            ? "Mengunggah file..."
                            : `Klik untuk Upload ${mediaType === "video" ? "Video (MP4/WebM/MOV)" : "Foto (JPG/PNG/WebP)"}`}
                        </span>
                        <span className="text-[11px] text-[#7E8085]">
                          File otomatis tersimpan di server lokal dan langsung diputar di player website tanpa pihak ketiga.
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7E8085]">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="url"
                        name="imageUrlField"
                        value={previewUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPreviewUrl(val);
                          const parsed = parseMediaUrl(val);
                          if (parsed.isVideo) {
                            setMediaType("video");
                          }
                        }}
                        placeholder="https://www.instagram.com/reel/... atau https://youtube.com/... atau URL MP4"
                        className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] pl-9 pr-3.5 py-2 text-xs text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                      />
                    </div>
                    <p className="text-[10px] text-[#B5B5B7]">
                      Mendukung: Link Instagram Reel/Post, YouTube Video/Shorts, atau direct URL MP4. Tips: Agar video langsung berputar di player website tanpa dialihkan ke Instagram, gunakan tab &quot;Upload File&quot; (.mp4) atau link YouTube.
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden input to guarantee URL submitted */}
              <input type="hidden" name="imageUrl" value={previewUrl} />
              <input type="hidden" name="mediaType" value={mediaType} />

              {/* Live Preview Box */}
              {previewUrl && (
                <div className="p-3 bg-[#121315] border border-white/10 rounded-[2px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-display font-bold text-[#B5B5B7] uppercase tracking-wider flex items-center gap-1.5">
                      {parsedPreview.sourceType === "instagram" && (
                        <InstagramIcon className="w-3 h-3 text-pink-400" />
                      )}
                      {parsedPreview.sourceType === "youtube" && (
                        <YoutubeIcon className="w-3 h-3 text-red-500" />
                      )}
                      Live Preview ({parsedPreview.sourceType.toUpperCase()}):
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewUrl("")}
                      className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider cursor-pointer"
                    >
                      Hapus Media
                    </button>
                  </div>

                  <div className="relative w-full rounded-[2px] overflow-hidden bg-black/60 flex items-center justify-center">
                    {parsedPreview.sourceType === "instagram" ? (
                      <div className="w-full flex justify-center bg-black/30 p-2">
                        <iframe
                          src={parsedPreview.embedUrl}
                          className="w-full max-w-[340px] h-[440px] border-0 rounded"
                          allowFullScreen
                          scrolling="no"
                        />
                      </div>
                    ) : parsedPreview.sourceType === "youtube" ? (
                      <div className="relative aspect-[16/9] w-full">
                        <iframe
                          src={parsedPreview.embedUrl}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : parsedPreview.sourceType === "direct-video" ? (
                      <div className="relative aspect-[16/9] w-full">
                        <video
                          src={previewUrl}
                          controls
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={previewUrl}
                          alt="Preview Foto"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Urutan */}
              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                  Nomor Urutan Tampilan
                </label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingItem?.order ?? 1}
                  min={0}
                  className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/15 text-[#B5B5B7] hover:text-white hover:border-white/30 text-xs font-display font-semibold tracking-wider rounded-[2px] transition-colors cursor-pointer"
                >
                  BATAL
                </button>

                <button
                  type="submit"
                  disabled={loading || uploading || !previewUrl}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all disabled:opacity-50 cursor-pointer shadow-[0_4px_15px_rgba(212,154,88,0.3)]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{editingItem ? "SIMPAN PERUBAHAN" : "TAMBAHKAN"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
