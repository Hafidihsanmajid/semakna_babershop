import prisma from "@/lib/prisma";
import HeroForm from "@/components/admin/HeroForm";
import StoryForm from "@/components/admin/StoryForm";
import CategoryPillsManager from "@/components/admin/CategoryPillsManager";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [siteConfig, categories] = await Promise.all([
    prisma.siteConfig.findFirst({ where: { id: 1 } }),
    prisma.categoryPill.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="bg-[#1C1D21] border-l-4 border-l-[#D49A58] border-y border-r border-[#D49A58]/20 p-6 rounded-[2px] shadow-lg">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          Selamat Datang di Panel Manajemen Konten Semakna
        </h1>
        <p className="text-xs text-[#B5B5B7] mt-1 max-w-2xl leading-relaxed">
          Semua perubahan teks, gambar latar, sorotan amber, dan status kategori di halaman ini akan langsung diperbarui di halaman beranda melalui teknologi Next.js Server Actions dan ISR caching.
        </p>
      </div>

      {/* 1. Hero Section Form */}
      <section>
        <HeroForm initialData={siteConfig} />
      </section>

      {/* 2. Category Pills Manager */}
      <section>
        <CategoryPillsManager categories={categories} />
      </section>

      {/* 3. Story & Testimonial Form */}
      <section>
        <StoryForm initialData={siteConfig} />
      </section>
    </div>
  );
}
