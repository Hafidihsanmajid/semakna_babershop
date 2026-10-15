"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

// 1. Update Hero Section
export async function updateHeroAction(formData: FormData): Promise<ActionResult> {
  try {
    const emblemText = formData.get("emblemText")?.toString().trim() || "HAIR SALON - EST. 1980";
    const heroTitle = formData.get("heroTitle")?.toString().trim() || "SEMAKNA HAIRCUT & SHAVES";
    const heroSubtitle = formData.get("heroSubtitle")?.toString().trim() || "";
    const heroBgUrl = formData.get("heroBgUrl")?.toString().trim() || "/images/hero-barber.jpg";
    const primaryCtaText = formData.get("primaryCtaText")?.toString().trim() || "ABOUT US";
    const secondaryCtaText = formData.get("secondaryCtaText")?.toString().trim() || "NEWS FEED";

    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        emblemText,
        heroTitle,
        heroSubtitle,
        heroBgUrl,
        primaryCtaText,
        secondaryCtaText,
      },
      create: {
        id: 1,
        emblemText,
        heroTitle,
        heroSubtitle,
        heroBgUrl,
        primaryCtaText,
        secondaryCtaText,
        storyDescription: "Tradisi potong rambut klasik.",
        testimonialQuote: "Layanan sangat memuaskan.",
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Hero section berhasil diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui Hero.";
    return { success: false, error: message };
  }
}

// 2. Update Story & Testimonial Section
export async function updateStoryAction(formData: FormData): Promise<ActionResult> {
  try {
    const storyPreTitle = formData.get("storyPreTitle")?.toString().trim() || "SEMAKNA BY THE BEST";
    const storyTitle = formData.get("storyTitle")?.toString().trim() || "You'll be sure to have an old fashioned time.";
    const storyHighlightWord = formData.get("storyHighlightWord")?.toString().trim() || "an old";
    const storyDescription = formData.get("storyDescription")?.toString().trim() || "";
    const videoUrl = formData.get("videoUrl")?.toString().trim() || null;

    const testimonialQuote = formData.get("testimonialQuote")?.toString().trim() || "";
    const testimonialAuthor = formData.get("testimonialAuthor")?.toString().trim() || "Sakib Hosain";
    const testimonialRole = formData.get("testimonialRole")?.toString().trim() || "CEO of Organic";
    const testimonialAvatar = formData.get("testimonialAvatar")?.toString().trim() || "/images/avatar.jpg";

    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        storyPreTitle,
        storyTitle,
        storyHighlightWord,
        storyDescription,
        videoUrl,
        testimonialQuote,
        testimonialAuthor,
        testimonialRole,
        testimonialAvatar,
      },
      create: {
        id: 1,
        storyPreTitle,
        storyTitle,
        storyHighlightWord,
        storyDescription,
        videoUrl,
        testimonialQuote,
        testimonialAuthor,
        testimonialRole,
        testimonialAvatar,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Story & Testimoni berhasil diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui Story.";
    return { success: false, error: message };
  }
}

// 3. Category Pills Actions
export async function toggleCategoryStatusAction(id: number, isActive: boolean): Promise<ActionResult> {
  try {
    await prisma.categoryPill.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Status kategori diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui status kategori.";
    return { success: false, error: message };
  }
}

export async function updateCategoryAction(formData: FormData): Promise<ActionResult> {
  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name")?.toString().trim() || "";
    const iconName = formData.get("iconName")?.toString().trim() || "scissors";

    await prisma.categoryPill.update({
      where: { id },
      data: { name, iconName },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Kategori berhasil diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui kategori.";
    return { success: false, error: message };
  }
}

// 4. Services CRUD Actions
export async function createServiceAction(formData: FormData): Promise<ActionResult> {
  try {
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const iconName = formData.get("iconName")?.toString().trim() || "clipper";
    const price = formData.get("price")?.toString().trim() || null;
    const isFeatured = formData.get("isFeatured") === "true";
    const order = Number(formData.get("order")) || 0;

    if (!title || !description) {
      return { success: false, error: "Judul dan deskripsi layanan wajib diisi." };
    }

    await prisma.serviceItem.create({
      data: {
        title,
        description,
        iconName,
        price,
        isFeatured,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/services");
    return { success: true, message: "Layanan baru berhasil ditambahkan!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan layanan.";
    return { success: false, error: message };
  }
}

export async function updateServiceAction(formData: FormData): Promise<ActionResult> {
  try {
    const id = Number(formData.get("id"));
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const iconName = formData.get("iconName")?.toString().trim() || "clipper";
    const price = formData.get("price")?.toString().trim() || null;
    const isFeatured = formData.get("isFeatured") === "true";
    const order = Number(formData.get("order")) || 0;

    if (!id || !title || !description) {
      return { success: false, error: "Data layanan tidak lengkap." };
    }

    await prisma.serviceItem.update({
      where: { id },
      data: {
        title,
        description,
        iconName,
        price,
        isFeatured,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/services");
    return { success: true, message: "Layanan berhasil diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui layanan.";
    return { success: false, error: message };
  }
}

export async function deleteServiceAction(id: number): Promise<ActionResult> {
  try {
    await prisma.serviceItem.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/services");
    return { success: true, message: "Layanan berhasil dihapus!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus layanan.";
    return { success: false, error: message };
  }
}

// 5. Gallery Photos Actions
export async function createGalleryPhotoAction(formData: FormData): Promise<ActionResult> {
  try {
    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString().trim() || "haircut";
    const categoryLabel = formData.get("categoryLabel")?.toString().trim() || "Haircut";
    const imageUrl = formData.get("imageUrl")?.toString().trim();
    const order = Number(formData.get("order")) || 0;

    if (!title || !imageUrl) {
      return { success: false, error: "Judul dan URL foto wajib diisi." };
    }

    await prisma.galleryPhoto.create({
      data: {
        title,
        category,
        categoryLabel,
        imageUrl,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/photos");
    return { success: true, message: "Foto galeri baru berhasil ditambahkan!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan foto.";
    return { success: false, error: message };
  }
}

export async function updateGalleryPhotoAction(formData: FormData): Promise<ActionResult> {
  try {
    const id = Number(formData.get("id"));
    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString().trim() || "haircut";
    const categoryLabel = formData.get("categoryLabel")?.toString().trim() || "Haircut";
    const imageUrl = formData.get("imageUrl")?.toString().trim();
    const order = Number(formData.get("order")) || 0;

    if (!id || !title || !imageUrl) {
      return { success: false, error: "Data foto tidak lengkap." };
    }

    await prisma.galleryPhoto.update({
      where: { id },
      data: {
        title,
        category,
        categoryLabel,
        imageUrl,
        order,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/photos");
    return { success: true, message: "Foto galeri berhasil diperbarui!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui foto.";
    return { success: false, error: message };
  }
}

export async function deleteGalleryPhotoAction(id: number): Promise<ActionResult> {
  try {
    await prisma.galleryPhoto.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/photos");
    return { success: true, message: "Foto galeri berhasil dihapus!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus foto.";
    return { success: false, error: message };
  }
}
