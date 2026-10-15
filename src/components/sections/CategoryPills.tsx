"use client";

import { useState } from "react";
import Image from "next/image";

interface CategoryItem {
  id: number;
  name: string;
  iconName: string;
  isActive: boolean;
  order: number;
}

interface CategoryPillsProps {
  categories: CategoryItem[];
}

export default function CategoryPills({ categories }: CategoryPillsProps) {
  // Allow user to click to switch active state smoothly
  const [activeId, setActiveId] = useState<number>(() => {
    const activeItem = categories.find((c) => c.isActive);
    return activeItem ? activeItem.id : categories[1]?.id ?? 2; // Default to Hair Washing (2nd) as in Image 2
  });

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

  return (
    <section className="relative z-20 mt-4 sm:mt-6 pt-6 sm:pt-8 pb-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between sm:justify-center overflow-x-auto gap-4 sm:gap-10 pt-8 pb-4 px-4 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className="flex flex-col items-center gap-3 min-w-[76px] sm:min-w-[96px] group cursor-pointer focus:outline-none transition-all duration-200"
            >
              {/* Circular Icon Capsule (Image 2 style) */}
              <div
                className={`w-16 h-16 sm:w-[84px] sm:h-[84px] rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-[#D49A58] shadow-[0_0_28px_rgba(212,154,88,0.55)] scale-105"
                    : "bg-white/[0.07] hover:bg-[#D49A58]/20 border border-white/15 hover:border-[#D49A58]/50"
                }`}
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src={getIconPath(cat.iconName)}
                    alt={cat.name}
                    fill
                    className={`object-contain transition-all duration-200 ${
                      isActive
                        ? "brightness-0 invert"
                        : "opacity-80 group-hover:opacity-100 filter-[sepia(0.8)] group-hover:filter-none"
                    }`}
                  />
                </div>
              </div>

              {/* Category Title */}
              <span
                className={`text-[11px] sm:text-xs font-display font-semibold tracking-wider text-center transition-colors ${
                  isActive
                    ? "text-[#D49A58] font-bold"
                    : "text-[#B5B5B7] group-hover:text-white"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
