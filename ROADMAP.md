# Project Roadmap: Semakna Barbershop

Berikut adalah tahapan pengembangan website **Semakna Barbershop** dari inisialisasi hingga siap rilis (Production).

---

## Fase 1: Inisialisasi Proyek & Design System Setup
**Tujuan**: Menyiapkan fondasi Next.js, Tailwind CSS, dan font sesuai spesifikasi `design.md`.
- [x] Inisialisasi proyek Next.js dengan TypeScript dan Tailwind CSS.
- [x] Konfigurasi Google Fonts di `app/layout.tsx`:
  - *Oswald* (Display/Heading)
  - *Inter* (Body text)
  - *Playfair Display* (Emblem vintage)
- [x] Setup variabel warna dan utility classes di `tailwind.config.ts` (`#D49A58`, `#121315`, border amber, shadow).
- [x] Siapkan aset statis awal (foto hero barbershop, ikon SVG gunting/pisau cukur, emblem retro).

---

## Fase 2: Konfigurasi Database SQLite & Seeding
**Tujuan**: Membangun penyimpanan data lokal yang siap menampung konten dinamis.
- [x] Install Prisma ORM (`prisma` & `@prisma/client`) dengan provider `sqlite`.
- [x] Buat skema tabel `Admin`, `SiteConfig`, `CategoryPill`, dan `ServiceItem` di `schema.prisma`.
- [x] Jalankan migrasi database (`npx prisma migrate dev --name init`).
- [x] Buat script `prisma/seed.ts` untuk mengisi:
  - Akun Admin default (`admin` / `semakna123`).
  - Konten awal Hero & Story *Semakna Barbershop*.
  - 6 item *Circular Category Pills* (*Hair Cutting* s/d *Hair Color*).
  - 4 item *Services Grid* (*Clipper cut, Beard Trim, Face Shaver, Beauty Place*).

---

## Fase 3: Implementasi UI Landing Page (Public View)
**Tujuan**: Membangun antarmuka halaman depan yang presisi dengan `design.md` dan terhubung ke SQLite.
- [x] **Header / Navbar**:
  - Logo Semakna di kiri, link navigasi di tengah, kolom search tipis + **Tombol Login** di kanan.
  - Menu responsif (Hamburger menu) untuk tampilan mobile.
- [x] **Hero Section**:
  - Background gambar dengan overlay gelap transparan.
  - Emblem vintage, tipografi bold uppercase `SEMAKNA HAIRCUT & SHAVES`, tombol CTA Amber & Outline.
- [x] **Circular Category Bar**:
  - Render 6 ikon melingkar dari database dengan efek *active/hover* warna `#D49A58`.
- [x] **Feature / Story Section**:
  - Layout 2 kolom (kolase foto + tombol play video di kiri; teks cerita, highlight warna amber, dan kartu testimoni di kanan).
- [x] **Services Grid Section**:
  - Grid 4 kolom responsif dengan kartu `#1C1D21` backdrop-blur, border tipis emas, ikon line-art, dan link `READ MORE »`.

---

## Fase 4: Sistem Autentikasi & Dashboard Admin (CMS)
**Tujuan**: Memungkinkan pemilik barbershop login dari Navbar dan mengubah seluruh konten website.
- [x] Install `bcryptjs` (untuk password hashing) dan `jose` (untuk JWT session di Edge/Middleware).
- [x] Buat halaman `/login` bergaya dark vintage sesuai tema utama.
- [x] Buat `middleware.ts` untuk memproteksi rute `/admin/*`.
- [x] Bangun **Dashboard Admin (`/admin`)**:
  - **Tab General / Hero**: Form edit judul Hero, subheadline, dan teks emblem.
  - **Tab Story & Testimoni**: Form edit narasi cerita dan testimoni pelanggan.
  - **Tab Kategori**: Toggle status aktif dan ubah nama 6 kapsul kategori.
  - **Tab Layanan (Services CRUD)**: Tabel daftar layanan dengan fitur Tambah Layanan Baru, Edit Layanan, dan Hapus Layanan.
- [x] Hubungkan setiap form dengan Next.js Server Actions + `revalidatePath('/')` agar perubahan langsung terlihat di halaman depan.

---

## Fase 5: Pengujian, Optimasi & Deployment
**Tujuan**: Memastikan aplikasi bebas bug, responsif, dan siap digunakan.
- [x] Uji coba responsivitas di layar Mobile, Tablet, dan Desktop.
- [x] Uji alur Login -> Edit Konten -> Cek Landing Page -> Logout.
- [x] Optimasi gambar menggunakan komponen `<Image />` bawaan Next.js.
- [x] Deployment ke VPS / Railway / Fly.io (yang mendukung persistent volume untuk file SQLite) atau integrasi ke Turso (SQLite Edge).
