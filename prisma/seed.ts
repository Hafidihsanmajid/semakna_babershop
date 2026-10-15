import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Akun Admin Default
  const hashedPassword = await bcrypt.hash("semakna123", 10);
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {
      password: hashedPassword,
      name: "Administrator Semakna",
    },
    create: {
      username: "admin",
      password: hashedPassword,
      name: "Administrator Semakna",
    },
  });
  console.log(`Admin created/updated: ${admin.username}`);

  // 2. SiteConfig (Hero, Story, Testimonial)
  const siteConfig = await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      emblemText: "HAIR SALON - EST. 1980",
      heroTitle: "SEMAKNA HAIRCUT & SHAVES",
      heroSubtitle:
        "Humour is powerful. It drives emotion and crafts timeless masculine style.",
      heroBgUrl: "/images/hero-barber.jpg",
      primaryCtaText: "ABOUT US",
      secondaryCtaText: "NEWS FEED",
      storyPreTitle: "SEMAKNA BY THE BEST",
      storyTitle: "You'll be sure to have an old fashioned time.",
      storyHighlightWord: "an old",
      storyDescription:
        "Di Semakna Barbershop, tradisi potong rambut klasik menyatu dengan standar kenyamanan mewah kontemporer. Barber berpengalaman kami menguasai teknik gunting dan pisau cukur presisi untuk menghasilkan tampilan maskulin terbaik.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      testimonialQuote:
        "Layanan potong rambut dan shaving paling memuaskan. Suasana vintage berkelas dan barber benar-benar mengerti gaya rambut yang saya inginkan.",
      testimonialAuthor: "Sakib Hosain",
      testimonialRole: "CEO of Organic",
      testimonialAvatar: "/images/avatar.jpg",
    },
    create: {
      id: 1,
      emblemText: "HAIR SALON - EST. 1980",
      heroTitle: "SEMAKNA HAIRCUT & SHAVES",
      heroSubtitle:
        "Humour is powerful. It drives emotion and crafts timeless masculine style.",
      heroBgUrl: "/images/hero-barber.jpg",
      primaryCtaText: "ABOUT US",
      secondaryCtaText: "NEWS FEED",
      storyPreTitle: "SEMAKNA BY THE BEST",
      storyTitle: "You'll be sure to have an old fashioned time.",
      storyHighlightWord: "an old",
      storyDescription:
        "Di Semakna Barbershop, tradisi potong rambut klasik menyatu dengan standar kenyamanan mewah kontemporer. Barber berpengalaman kami menguasai teknik gunting dan pisau cukur presisi untuk menghasilkan tampilan maskulin terbaik.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      testimonialQuote:
        "Layanan potong rambut dan shaving paling memuaskan. Suasana vintage berkelas dan barber benar-benar mengerti gaya rambut yang saya inginkan.",
      testimonialAuthor: "Sakib Hosain",
      testimonialRole: "CEO of Organic",
      testimonialAvatar: "/images/avatar.jpg",
    },
  });
  console.log(`SiteConfig configured: ID ${siteConfig.id}`);

  // 3. Category Pills (6 item)
  await prisma.categoryPill.deleteMany();
  const categoryData = [
    { name: "Hair Cutting", iconName: "scissors", isActive: false, order: 1 },
    { name: "Hair Washing", iconName: "wash", isActive: true, order: 2 },
    { name: "Shaving Style", iconName: "razor", isActive: false, order: 3 },
    { name: "Body Massage", iconName: "massage", isActive: false, order: 4 },
    { name: "Beauty & Spa", iconName: "spa", isActive: false, order: 5 },
    { name: "Hair Color", iconName: "color", isActive: false, order: 6 },
  ];

  for (const cat of categoryData) {
    await prisma.categoryPill.create({ data: cat });
  }
  console.log(`Created ${categoryData.length} category pills.`);

  // 4. Service Items (4 item)
  await prisma.serviceItem.deleteMany();
  const serviceData = [
    {
      title: "Clipper cut",
      description:
        "Cukur presisi menggunakan mesin clipper profesional untuk gradasi fade rapi dan kontur tegas.",
      iconName: "clipper",
      price: "Rp 65.000",
      isFeatured: true,
      order: 1,
    },
    {
      title: "Beard Trim",
      description:
        "Penataan dan perapian jenggot serta kumis dengan razor tajam, minyak aromatik, dan handuk hangat.",
      iconName: "razor",
      price: "Rp 45.000",
      isFeatured: false,
      order: 2,
    },
    {
      title: "Face Shaver",
      description:
        "Cukur halus seluruh wajah gaya tradisional menggunakan pisau lipat dan busa sabun hangat.",
      iconName: "scissors",
      price: "Rp 50.000",
      isFeatured: false,
      order: 3,
    },
    {
      title: "Beauty Place",
      description:
        "Paket grooming komplit meliputi cuci rambut, pijat kepala relaksasi, dan pembersihan wajah.",
      iconName: "chair",
      price: "Rp 85.000",
      isFeatured: false,
      order: 4,
    },
  ];

  for (const s of serviceData) {
    await prisma.serviceItem.create({ data: s });
  }
  console.log(`Created ${serviceData.length} service items.`);

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
