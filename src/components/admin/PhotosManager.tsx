"use client";

import { useState } from "react";
import Image from "next/image";
import {
  createGalleryPhotoAction,
  updateGalleryPhotoAction,
  deleteGalleryPhotoAction,
} from "@/actions/cms.actions";
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
  ExternalLink,
} from "lucide-react";

export interface GalleryPhotoData {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  order: number;
}

interface PhotosManagerProps {
  initialPhotos: GalleryPhotoData[];
}

export default function PhotosManager({ initialPhotos }: PhotosManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryPhotoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setPreviewUrl("");
    setModalOpen(true);
    setStatus(null);
  };

  const handleOpenEditModal = (photo: GalleryPhotoData) => {
    setEditingItem(photo);
    setPreviewUrl(photo.imageUrl);
    setModalOpen(true);
    setStatus(null);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Yakin ingin menghapus foto "${title}"?`)) return;

    setLoading(true);
    setStatus(null);
    const res = await deleteGalleryPhotoAction(id);
    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: `Foto "${title}" berhasil dihapus!` });
    } else {
      setStatus({ success: false, message: res.error || "Gagal menghapus foto." });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    let res;
    if (editingItem) {
      formData.append("id", editingItem.id.toString());
      res = await updateGalleryPhotoAction(formData);
    } else {
      res = await createGalleryPhotoAction(formData);
    }

    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: res.message || "Berhasil menyimpan foto!" });
      setModalOpen(false);
    } else {
      setStatus({ success: false, message: res.error || "Gagal menyimpan foto." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-5 h-5 text-[#D49A58]" />
            <h1 className="font-display text-2xl font-bold tracking-wide uppercase text-white">
              Kelola Galeri Foto
            </h1>
          </div>
          <p className="text-xs text-[#B5B5B7]">
            Tambah, perbarui URL gambar, ubah kategori, atau hapus foto di section Galeri Website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-[0_4px_15px_rgba(212,154,88,0.3)] cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH FOTO BARU</span>
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

      {/* Photos Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-[#1C1D21] border border-[#D49A58]/25 hover:border-[#D49A58] rounded-[2px] overflow-hidden flex flex-col justify-between shadow-lg transition-all"
          >
            {/* Photo Preview */}
            <div className="relative aspect-[4/3] bg-black">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#121315]/80 backdrop-blur-sm border border-[#D49A58]/40 px-2 py-0.5 rounded-[2px]">
                <span className="text-[10px] font-display font-bold text-[#D49A58] tracking-wider uppercase">
                  {photo.categoryLabel}
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded-[2px] text-[10px] font-mono text-[#B5B5B7]">
                Urutan #{photo.order}
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
                  title="Buka gambar di tab baru"
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
        ))}
      </div>

      {/* Modal Add / Edit Photo */}
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
                <Camera className="w-5 h-5 text-[#D49A58]" />
                <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                  {editingItem ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#B5B5B7] hover:text-white transition-colors"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {/* Judul Foto */}
              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                  Judul Foto / Gaya Rambut *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="e.g. Classic Scissor Haircut"
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
                    placeholder="e.g. Haircut / Beard Trim / Shaving"
                    className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* URL Gambar */}
              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#D49A58] mb-1.5">
                  URL Gambar Foto *
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#121315] border border-white/15 focus:border-[#D49A58] rounded-[2px] px-3.5 py-2 text-xs text-white placeholder-[#7E8085] focus:outline-none transition-colors"
                />
              </div>

              {/* Live Preview Box */}
              {previewUrl && (
                <div className="p-3 bg-[#121315] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] font-display font-bold text-[#B5B5B7] uppercase tracking-wider block mb-2">
                    Live Preview Gambar:
                  </span>
                  <div className="relative aspect-[16/9] w-full max-h-40 rounded-[2px] overflow-hidden bg-black/40">
                    <Image
                      src={previewUrl}
                      alt="Preview Foto"
                      fill
                      className="object-cover"
                      unoptimized
                    />
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
                  disabled={loading}
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
