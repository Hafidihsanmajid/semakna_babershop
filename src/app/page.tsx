import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CategoryPills from "@/components/sections/CategoryPills";
import StorySection from "@/components/sections/StorySection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import GallerySection from "@/components/sections/GallerySection";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("semakna_token")?.value;
  const isLoggedIn = !!token;

  // 1. Fetch Dynamic Data from SQLite
  const [siteConfig, categories, services, galleryPhotos] = await Promise.all([
    prisma.siteConfig.findFirst({ where: { id: 1 } }),
    prisma.categoryPill.findMany({ orderBy: { order: "asc" } }),
    prisma.serviceItem.findMany({ orderBy: { order: "asc" } }),
    prisma.galleryPhoto.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="min-h-screen bg-[#121315] text-white flex flex-col selection:bg-[#D49A58] selection:text-[#121315]">
      {/* 1. Header & Navigation */}
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          emblemText={siteConfig?.emblemText}
          heroTitle={siteConfig?.heroTitle}
          heroSubtitle={siteConfig?.heroSubtitle}
          heroBgUrl={siteConfig?.heroBgUrl}
          primaryCtaText={siteConfig?.primaryCtaText}
          secondaryCtaText={siteConfig?.secondaryCtaText}
        />

        {/* Section Area Below Hero (Category Pills, Story Section, Services Grid) */}
        <div className="relative overflow-hidden">
          {/* 1. Background image penuh */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `url('https://lh5.googleusercontent.com/h3z6pSMdQwcE6qcmNXGQwbH6SQVVUhbsaTdRP2jDni6zSZGO-UeZmY3UQpEygFxcFWug69tURs0EHCDcZYTH1I-fUnvFozIhvxt1jdYO7tQTz7kuNF0bFO67Zf1Zpi3gabXxen1HTmd1IiS89g')`,
            }}
          />

          {/* 2. Layer dark overlay transparan & efek vignette gradien */}
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-black/60 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            {/* 3. Circular Category Bar (Service Pills) */}
            <CategoryPills categories={categories} />

            {/* 4. Feature / Story Section ("Old Fashioned Time") */}
            <StorySection
              preTitle={siteConfig?.storyPreTitle}
              title={siteConfig?.storyTitle}
              highlightWord={siteConfig?.storyHighlightWord}
              description={siteConfig?.storyDescription}
              videoUrl={siteConfig?.videoUrl}
              testimonialQuote={siteConfig?.testimonialQuote}
              testimonialAuthor={siteConfig?.testimonialAuthor}
              testimonialRole={siteConfig?.testimonialRole}
              testimonialAvatar={siteConfig?.testimonialAvatar}
            />

            {/* 5. Services Grid ("Service We Provide") */}
            <ServicesGrid services={services} />

            {/* 6. Photo Gallery Showcase */}
            <GallerySection photos={galleryPhotos} />
          </div>
        </div>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
