# System Architecture: Semakna Barbershop

## 1. Gambaran Arsitektur (High-Level Architecture)
Aplikasi ini menggunakan arsitektur **Monolith Full-Stack** berbasis **Next.js App Router**. Database **SQLite** berjalan secara lokal di dalam lingkungan server sebagai file tunggal (`sqlite.db`), diakses menggunakan **Prisma ORM** melalui *Server Components*, *Server Actions*, atau *Route Handlers*.

```text
+-----------------------------------------------------------------------+
|                        CLIENT BROWSER (UI)                            |
|  - Landing Page (Public)          - Admin Dashboard (/admin)          |
|  - Tailwind CSS (Custom Tokens)   - Login Page (/login)               |
+-----------------------------------+-----------------------------------+
                                    | HTTP / HTTPS
                                    v
+-----------------------------------------------------------------------+
|                    NEXT.JS SERVER (APP ROUTER)                        |
|                                                                       |
|  +-----------------------------+   +-------------------------------+  |
|  | Middleware (middleware.ts)  |   | React Server Components (RSC) |  |
|  | - Cek JWT Cookie di /admin  |   | - Fetch data langsung ke DB   |  |
|  +-----------------------------+   +-------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | Server Actions / API Routes (/api/auth, /actions/content.ts)    |  |
|  | - Validasi Input (Zod) & Mutasi Data (CRUD Konten)              |  |
|  +-----------------------------------------------------------------+  |
|                                    |                                  |
|                                    v                                  |
|  +-----------------------------------------------------------------+  |
|  | Prisma ORM Client                                               |  |
|  +-----------------------------------------------------------------+  |
+------------------------------------+----------------------------------+
                                     | File I/O
                                     v
+-----------------------------------------------------------------------+
|                   SQLITE DATABASE (prisma/dev.db)                     |
+-----------------------------------------------------------------------+

semakna-barbershop/
├── prisma/
│   ├── schema.prisma          # Skema database SQLite
│   ├── seed.ts                # Data awal (Default Admin & Konten Semakna)
│   └── dev.db                 # File database SQLite lokal
├── public/
│   └── images/                # Aset foto barbershop, ikon SVG, emblem
├── src/
│   ├── app/
│   │   ├── (public)/          # Route group halaman publik
│   │   │   └── page.tsx       # Landing Page utama Semakna Barbershop
│   │   ├── login/
│   │   │   └── page.tsx       # Halaman Login Admin
│   │   ├── admin/             # Route terproteksi untuk CMS Admin
│   │   │   ├── layout.tsx     # Sidebar/Navbar khusus Admin
│   │   │   ├── page.tsx       # Ringkasan & Edit Hero/Story
│   │   │   └── services/
│   │   │       └── page.tsx   # CRUD Layanan (Service We Provide)
│   │   ├── api/
│   │   │   └── auth/          # Endpoint login/logout (jika via API)
│   │   ├── globals.css        # Konfigurasi CSS Variables & Tailwind
│   │   └── layout.tsx         # Root layout (Font Oswald, Inter, Playfair)
│   ├── actions/               # Next.js Server Actions
│   │   ├── auth.actions.ts    # Logika Login & Logout
│   │   └── cms.actions.ts     # Logika Update Hero, Story, CRUD Services
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Header + Search + Tombol Login/Admin
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryPills.tsx
│   │   │   ├── StorySection.tsx
│   │   │   └── ServicesGrid.tsx
│   │   └── admin/             # Form komponen untuk Dashboard Admin
│   ├── lib/
│   │   ├── prisma.ts          # Singleton koneksi Prisma
│   │   └── auth.ts            # Utilitas JWT (jose) & Cookie management
│   └── middleware.ts          # Proteksi rute /admin/*
├── tailwind.config.ts         # Custom theme sesuai design.md
└── package.json

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL") // "file:./dev.db"
}

// 1. Tabel Admin untuk Login
model Admin {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String   // Hashed dengan bcrypt
  name      String
  createdAt DateTime @default(now())
}

// 2. Pengaturan Konten Statis/Single-Row (Hero & Story Section)
model SiteConfig {
  id                  Int      @id @default(1)
  // Hero Section
  emblemText          String   @default("HAIR SALON - EST. 1980")
  heroTitle           String   @default("SEMAKNA HAIRCUT & SHAVES")
  heroSubtitle        String   @default("Humour is powerful. It drives emotion and crafts timeless masculine style.")
  heroBgUrl           String   @default("/images/hero-barber.jpg")
  primaryCtaText      String   @default("ABOUT US")
  secondaryCtaText    String   @default("NEWS FEED")
  
  // Story / Feature Section
  storyPreTitle       String   @default("SEMAKNA BY THE BEST")
  storyTitle          String   @default("You'll be sure to have an old fashioned time.")
  storyHighlightWord  String   @default("an old")
  storyDescription    String
  videoUrl            String?
  
  // Testimonial di dalam Story Section
  testimonialQuote    String
  testimonialAuthor   String   @default("Sakib Hosain")
  testimonialRole     String   @default("CEO of Organic")
  testimonialAvatar   String   @default("/images/avatar.jpg")
  
  updatedAt           DateTime @updatedAt
}

// 3. Circular Category Bar (6 Ikon Lingkaran)
model CategoryPill {
  id        Int     @id @default(autoincrement())
  name      String  // e.g., "Hair Cutting", "Hair Washing"
  iconName  String  // Nama ikon SVG / Lucide
  isActive  Boolean @default(false)
  order     Int     @default(0)
}

// 4. Kartu Layanan ("Service We Provide")
model ServiceItem {
  id          Int      @id @default(autoincrement())
  title       String   // e.g., "Clipper cut", "Beard Trim"
  description String   // Deskripsi singkat layanan
  iconName    String   // Referensi ikon line-art emas
  price       String?  // Opsional: e.g., "Rp 75.000"
  isFeatured  Boolean  @default(false) // Menentukan border tegas aktif
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}