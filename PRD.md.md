# Product Requirements Document (PRD): Semakna Barbershop

## 1\. Ringkasan Proyek (Project Overview)

**Semakna Barbershop** adalah platform web company profile dan katalog layanan grooming pria bergaya *Classic Vintage \& Dark Luxury*. Website ini dirancang untuk menampilkan identitas visual yang maskulin dan hangat (Warm Amber \& Deep Charcoal), sekaligus menyediakan **Sistem Manajemen Konten (CMS) Internal** bagi Admin yang dapat diakses langsung melalui tombol **Login** di Navigation Bar.

* **Nama Brand**: Semakna Barbershop (diadaptasi dari referensi desain *GoGrin Haircut \& Shaves*)
* **Tech Stack Utama**: Next.js (App Router), Tailwind CSS, SQLite (via Prisma / Drizzle ORM)
* **Target Pengguna**:

  1. **Pelanggan (Public User)**: Pengunjung yang ingin melihat layanan, harga, cerita brand, dan informasi kontak Semakna Barbershop.
  2. **Administrator (Admin)**: Pemilik atau pengelola barbershop yang mengatur konten halaman depan (Hero, Kategori, Cerita/Testimoni, dan Layanan) melalui Dashboard Admin.

\---

## 2\. Identitas Visual \& Design Tokens (Berdasarkan `design.md`)

Seluruh antarmuka wajib mematuhi spesifikasi estetika *Classic Vintage Barbershop* berikut:

### 2.1 Palet Warna

* **Primary Amber**: `#D49A58` (Tombol CTA utama, teks highlight, garis border aktif, badge)
* **Primary Amber Hover**: `#E0A96B` (Hover state tombol dan link)
* **Primary Amber Subtle**: `rgba(212, 154, 88, 0.15)` (Background lingkaran ikon aktif)
* **Background Dark**: `#121315` (Latar belakang utama halaman / Deep Charcoal)\[cite: 1]
* **Background Card**: `rgba(28, 29, 33, 0.75)` dengan `backdrop-blur`\[cite: 1]
* **Card Border**: `rgba(212, 154, 88, 0.35)` (Border tipis emas pada kartu \& tombol outline)\[cite: 1]
* **Surface Translucent**: `rgba(255, 255, 255, 0.08)` (Background lingkaran ikon non-aktif)\[cite: 1]
* **Text Colors**:

  * Primary: `#FFFFFF`\[cite: 1]
  * Secondary: `#B5B5B7`\[cite: 1]
  * Accent: `#D49A58`\[cite: 1]
  * Muted: `#7E8085`\[cite: 1]

### 2.2 Tipografi

* **Display / Heading**: *Oswald* atau *Bebas Neue* (Bold Condensed Vintage Sans-Serif, Uppercase untuk Hero)\[cite: 1]
* **Body Font**: *Inter* atau *Montserrat* (Clean Modern Sans-Serif)\[cite: 1]
* **Badge / Serif Accent**: *Playfair Display* atau *Cinzel* (Khusus emblem vintage `"SEMAKNA BARBERSHOP EST. 2024"`)\[cite: 1]

### 2.3 Karakteristik Komponen

* **Border Radius**: Tegas dan maskulin (`2px - 4px`) untuk tombol dan kartu; `50%` (bulat penuh) untuk kapsul kategori dan avatar\[cite: 1].
* **Shadow**: `0 10px 30px rgba(0, 0, 0, 0.6)`\[cite: 1].

\---

## 3\. Spesifikasi Fitur (Functional Requirements)

### 3.1 Halaman Publik (Landing Page)

Seluruh teks dan gambar pada bagian ini bersifat **dinamis** (diambil dari database SQLite):

1. **Top Navigation Bar (Header)**

   * **Kiri**: Logo ikon gunting/sisir melingkar + teks brand **SEMAKNA**\[cite: 1].
   * **Tengah**: Menu navigasi (`HOME`, `ABOUT US`, `SERVICES`, `NEWS`, `SHOP`, `CONTACTS`) dengan huruf kapital, warna putih, dan jarak `28px`\[cite: 1].
   * **Kanan**: Input pencarian tipis dengan border amber vertikal\[cite: 1], ikon Search\[cite: 1], serta **Tombol `LOGIN` (atau `DASHBOARD` jika sudah login)** dengan gaya outline/solid amber.
2. **Hero Section (Slider/Banner)**

   * Background foto barbershop bernuansa hangat dengan *dark vignette overlay*\[cite: 1].
   * Emblem retro `"HAIR SALON - EST. \\\[TAHUN]"`\[cite: 1].
   * Headline utama: `"SEMAKNA HAIRCUT \\\& SHAVES"` (`48px - 56px`, Bold Uppercase)\[cite: 1].
   * Subheadline 2 baris yang dapat diubah melalui panel admin\[cite: 1].
   * Grup CTA: Tombol utama solid amber (`ABOUT US`) \& tombol sekunder outline (`NEWS FEED`)\[cite: 1].
   * Indikator 3 titik slide di bagian bawah\[cite: 1].
3. **Circular Category Bar (Service Pills)**

   * Deretan 6 ikon melingkar horizontal (*Hair Cutting, Hair Washing, Shaving Style, Body Massage, Beauty \& Spa, Hair Color*)\[cite: 1].
   * Mendukung *active/hover state* berwarna solid amber `#D49A58`\[cite: 1].
4. **Feature / Story Section ("Old Fashioned Time")**

   * **Layout Grid 50/50** (2 Kolom)\[cite: 1].
   * **Kolom Kiri**: Kolase 4 foto dengan elemen dial/kompas vintage dan tombol *Play Video* (segitiga amber di tengah)\[cite: 1].
   * **Kolom Kanan**: Pre-title `SEMAKNA BY THE BEST`\[cite: 1], Headline dengan kata kunci beraksen amber\[cite: 1], paragraf deskripsi\[cite: 1], *Testimonial Card* (Avatar bulat, kutipan, nama \& jabatan)\[cite: 1], serta tombol `READ MORE`\[cite: 1].
5. **Services Grid ("Service We Provide")**

   * Header rata tengah dengan pre-title `OUR SERVICE` dan judul `Service We Provide`\[cite: 1].
   * Grid responsif (4 kolom di desktop, 2 di tablet, 1 di mobile)\[cite: 1].
   * Setiap kartu menampilkan ikon *line-art* emas, judul layanan (misal: *Clipper Cut*, *Beard Trim*, *Face Shaver*, *Beauty Place*), deskripsi singkat, harga (opsional), dan link `READ MORE »`\[cite: 1].
   * Tombol bawah: `ALL SERVICES`\[cite: 1].

### 3.2 Autentikasi \& Panel Admin (CMS)

1. **Halaman / Modal Login Admin (`/login`)**

   * Diakses dari tombol **Login** di Navbar.
   * Form input `Username/Email` dan `Password`.
   * Menggunakan autentikasi berbasis sesi JWT (`HttpOnly Cookie`).
2. **Dashboard Admin (`/admin`)**

   * Hanya dapat diakses oleh pengguna yang terautentikasi (dilindungi oleh Next.js Middleware).
   * **Manajemen Hero \& Profil Brand**: Edit judul Hero, subheadline, teks emblem, link video, dan gambar background.
   * **Manajemen Kategori (Service Pills)**: Edit nama kategori, ikon, dan status aktif.
   * **Manajemen Story \& Testimoni**: Edit teks cerita barbershop, foto kolase, serta kutipan testimoni pelanggan/tokoh.
   * **Manajemen Layanan (CRUD Services)**: Tambah, lihat, edit, dan hapus daftar layanan di *Services Grid*.
   * **Tombol Logout**: Menghapus sesi dan mengembalikan admin ke halaman utama.

\---

## 4\. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Performa**: Menggunakan *Server Components* Next.js untuk me-render data dari SQLite secara instan tanpa membebani *client bundle*.
* **Responsivitas**: Tampilan wajib rapi di layar Mobile (`< 640px`), Tablet (`768px`), hingga Desktop (`1280px+`)\[cite: 1].
* **Keamanan**: Password admin wajib di-*hash* menggunakan `bcryptjs`, dan semua mutasi data wajib memvalidasi sesi token admin.

