"use client";

import { useState } from "react";
import Image from "next/image";
import {
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
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
} from "lucide-react";

interface ServiceItemData {
  id: number;
  title: string;
  description: string;
  iconName: string;
  price?: string | null;
  isFeatured: boolean;
  order: number;
}

interface ServicesManagerProps {
  initialServices: ServiceItemData[];
}

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItemData | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const getIconPath = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "clipper":
        return "/images/clipper.svg";
      case "razor":
        return "/images/razor.svg";
      case "scissors":
        return "/images/scissors.svg";
      case "chair":
        return "/images/chair.svg";
      case "wash":
        return "/images/wash.svg";
      case "massage":
        return "/images/massage.svg";
      case "spa":
        return "/images/spa.svg";
      case "color":
        return "/images/color.svg";
      default:
        return "/images/scissors.svg";
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
    setStatus(null);
  };

  const handleOpenEditModal = (service: ServiceItemData) => {
    setEditingItem(service);
    setModalOpen(true);
    setStatus(null);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Yakin ingin menghapus layanan "${title}"?`)) return;

    setLoading(true);
    setStatus(null);
    const res = await deleteServiceAction(id);
    setLoading(false);

    if (res.success) {
      setStatus({ success: true, message: `Layanan "${title}" berhasil dihapus!` });
    } else {
      setStatus({ success: false, message: res.error || "Gagal menghapus layanan." });
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
      res = await updateServiceAction(formData);
    } else {
      res = await createServiceAction(formData);
    }

    setLoading(false);
    if (res.success) {
      setModalOpen(false);
      setStatus({ success: true, message: res.message || "Data layanan berhasil disimpan!" });
    } else {
      setStatus({ success: false, message: res.error || "Gagal menyimpan layanan." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-wide uppercase text-white">
            Kelola Layanan (Services Grid)
          </h2>
          <p className="text-xs text-[#B5B5B7] mt-1">
            Tambah, sunting, dan hapus kartu layanan grooming pada bagian &quot;Service We Provide&quot;.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D49A58] hover:bg-[#E0A96B] text-[#121315] font-display font-bold text-xs uppercase tracking-widest rounded-[2px] transition-colors shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          TAMBAH LAYANAN BARU
        </button>
      </div>

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

      {/* Services Table/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialServices.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col justify-between p-6 rounded-[4px] backdrop-blur-md transition-all ${
              service.isFeatured
                ? "bg-[#212328] border-2 border-[#D49A58] shadow-[0_4px_20px_rgba(212,154,88,0.2)]"
                : "bg-[#1C1D21] border border-[#D49A58]/30"
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-[2px] bg-[#121315] border border-[#D49A58]/40 p-2 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={getIconPath(service.iconName)}
                      alt={service.title}
                      fill
                      className="object-contain filter-[sepia(1)]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {service.isFeatured && (
                    <span className="px-2 py-0.5 bg-[#D49A58] text-[#121315] text-[10px] font-display font-bold uppercase rounded-[2px]">
                      FEATURED
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#7E8085]">
                    Order: {service.order}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-lg font-bold uppercase text-white mb-1">
                {service.title}
              </h3>

              {service.price && (
                <p className="font-serif-accent text-sm font-semibold text-[#D49A58] mb-2">
                  {service.price}
                </p>
              )}

              <p className="font-body text-xs text-[#B5B5B7] leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7E8085]">
                icon: {service.iconName}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(service)}
                  className="p-1.5 border border-[#D49A58]/40 hover:border-[#D49A58] text-[#D49A58] rounded-[2px] hover:bg-[#D49A58]/10 transition-colors"
                  title="Edit Layanan"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-1.5 border border-red-500/40 hover:border-red-500 text-red-400 rounded-[2px] hover:bg-red-950/20 transition-colors"
                  title="Hapus Layanan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#1C1D21] border border-[#D49A58] rounded-[4px] p-6 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#B5B5B7] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3">
              {editingItem ? "Edit Layanan" : "Tambah Layanan Baru"}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                  placeholder="Contoh: Beard Trim"
                  className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1">
                  Harga (Opsional)
                </label>
                <input
                  type="text"
                  name="price"
                  defaultValue={editingItem?.price || ""}
                  placeholder="Contoh: Rp 65.000"
                  className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1">
                    Ikon Layanan
                  </label>
                  <select
                    name="iconName"
                    defaultValue={editingItem?.iconName || "clipper"}
                    className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="clipper">Clipper (Mesin Cukur)</option>
                    <option value="razor">Razor (Pisau Cukur)</option>
                    <option value="scissors">Scissors (Gunting)</option>
                    <option value="chair">Chair (Kursi Barber)</option>
                    <option value="wash">Wash (Keramas)</option>
                    <option value="massage">Massage (Pijat)</option>
                    <option value="spa">Spa (Perawatan Wajah)</option>
                    <option value="color">Color (Pewarna Rambut)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1">
                    Urutan Tampil (Order)
                  </label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={editingItem?.order ?? 0}
                    className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-semibold tracking-wider text-[#B5B5B7] uppercase mb-1">
                  Deskripsi Singkat Layanan
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingItem?.description || ""}
                  required
                  placeholder="Deskripsi mengenai perawatan dan teknik yang digunakan..."
                  className="w-full bg-[#121315] border border-white/10 focus:border-[#D49A58] rounded-[2px] px-3 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  value="true"
                  defaultChecked={editingItem?.isFeatured || false}
                  className="w-4 h-4 accent-[#D49A58] rounded cursor-pointer"
                />
                <label
                  htmlFor="isFeatured"
                  className="text-xs text-[#B5B5B7] cursor-pointer"
                >
                  Tandai sebagai Layanan Unggulan (Featured - Border Emas Aktif)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-[#B5B5B7] font-display text-xs uppercase tracking-wider rounded-[2px]"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#D49A58] hover:bg-[#E0A96B] disabled:opacity-50 text-[#121315] font-display font-bold text-xs uppercase tracking-wider rounded-[2px]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingItem ? "SIMPAN PERUBAHAN" : "TAMBAH LAYANAN"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
