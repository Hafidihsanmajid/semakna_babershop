"use client";

import { useState } from "react";
import Image from "next/image";
import { toggleCategoryStatusAction, updateCategoryAction } from "@/actions/cms.actions";
import { CheckCircle, AlertCircle, Edit2, X, Check } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  iconName: string;
  isActive: boolean;
  order: number;
}

interface CategoryPillsManagerProps {
  categories: CategoryItem[];
}

export default function CategoryPillsManager({ categories }: CategoryPillsManagerProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const getIconPath = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "scissors":
        return "/images/scissors.svg";
      case "wash":
        return "/images/wash.svg";
      case "razor":
        return "/images/razor.svg";
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

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    setStatus(null);
    const res = await toggleCategoryStatusAction(id, !currentStatus);
    if (res.success) {
      setStatus({ success: true, message: `Status kategori berhasil diubah!` });
    } else {
      setStatus({ success: false, message: res.error || "Gagal mengubah status kategori." });
    }
  };

  const startEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditIcon(cat.iconName);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: number) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("name", editName);
    formData.append("iconName", editIcon);

    const res = await updateCategoryAction(formData);
    if (res.success) {
      setEditingId(null);
      setStatus({ success: true, message: "Kategori berhasil diperbarui!" });
    } else {
      setStatus({ success: false, message: res.error || "Gagal memperbarui kategori." });
    }
  };

  return (
    <div className="bg-[#1C1D21] border border-[#D49A58]/25 rounded-[4px] p-6 shadow-xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-xl font-bold tracking-wide uppercase text-white">
          Manajemen Kategori Layanan (Circular Pills)
        </h2>
        <p className="text-xs text-[#B5B5B7] mt-1">
          Atur 6 kapsul ikon horizontal pada halaman utama. Tentukan status aktif (amber highlight) dan ubah nama atau jenis ikon.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-4 rounded-[3px] border transition-all ${
              cat.isActive
                ? "bg-[#25262B] border-[#D49A58]"
                : "bg-[#141518] border-white/10"
            }`}
          >
            {editingId === cat.id ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-[#B5B5B7] uppercase font-display">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#121315] border border-[#D49A58] rounded-[2px] px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#B5B5B7] uppercase font-display">
                    Ikon (scissors/wash/razor/massage/spa/color)
                  </label>
                  <select
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    className="w-full bg-[#121315] border border-[#D49A58] rounded-[2px] px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="scissors">Scissors (Gunting)</option>
                    <option value="wash">Wash (Keramas)</option>
                    <option value="razor">Razor (Pisau Lipat)</option>
                    <option value="massage">Massage (Pijat Tubuh)</option>
                    <option value="spa">Spa (Beauty & Spa)</option>
                    <option value="color">Color (Pewarna Rambut)</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={cancelEdit}
                    className="p-1.5 text-[#B5B5B7] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => saveEdit(cat.id)}
                    className="p-1.5 bg-[#D49A58] text-[#121315] rounded-[2px]"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      cat.isActive
                        ? "bg-[#D49A58] border-[#D49A58]"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="relative w-5 h-5">
                      <Image
                        src={getIconPath(cat.iconName)}
                        alt={cat.name}
                        fill
                        className={`object-contain ${
                          cat.isActive ? "brightness-0 invert" : "filter-[sepia(1)]"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-white">
                      {cat.name}
                    </h4>
                    <span className="text-[10px] text-[#7E8085] font-mono">
                      icon: {cat.iconName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-1.5 text-[#7E8085] hover:text-[#D49A58] transition-colors"
                    title="Edit Kategori"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleActive(cat.id, cat.isActive)}
                    className={`px-2.5 py-1 text-[10px] font-display font-bold tracking-wider uppercase rounded-[2px] transition-colors cursor-pointer ${
                      cat.isActive
                        ? "bg-[#D49A58] text-[#121315]"
                        : "bg-white/10 hover:bg-white/20 text-[#B5B5B7]"
                    }`}
                  >
                    {cat.isActive ? "AKTIF" : "NON-AKTIF"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
