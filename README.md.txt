# 💈 Semakna Barbershop — Official Website & CMS

Website company profile dan katalog layanan bergaya **Classic Vintage & Dark Luxury** untuk **Semakna Barbershop**. Dibangun menggunakan **Next.js (App Router)**, **Tailwind CSS**, dan **SQLite**, lengkap dengan panel **Admin CMS** internal yang dapat diakses langsung melalui tombol Login di Navigation Bar.

---

## ✨ Fitur Utama

- **Vintage Masculine Aesthetic**: Mengusung palet warna *Deep Charcoal* (`#121315`) dan *Warm Amber Gold* (`#D49A58`) dengan tipografi *Bold Condensed* (Oswald, Inter, Playfair Display).
- **Dynamic Content Management (CMS)**: Seluruh teks Hero, kapsul kategori, cerita barbershop, testimoni, hingga daftar layanan dikelola langsung dari database SQLite.
- **Navbar Admin Login**: Akses cepat bagi administrator melalui tombol Login di pojok kanan atas navigasi.
- **Responsive Services Grid**: Tampilan kartu layanan dengan efek *backdrop-blur* dan *golden line-art icons* yang adaptif di layar Mobile, Tablet, dan Desktop.
- **Zero-Config Database**: Menggunakan SQLite lokal dengan Prisma ORM—cepat, ringan, dan tidak memerlukan setup server database eksternal.
- **Production Ready**: Dilengkapi dengan konfigurasi Docker multi-stage dan Docker Compose untuk persistensi data SQLite.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite lokal (`prisma/dev.db`)
- **ORM**: Prisma ORM
- **Authentication**: Custom JWT Session (`jose` + `HttpOnly Cookies` + `bcryptjs`)
- **Icons**: Lucide React & Custom Vintage Barber SVGs
- **Fonts**: Google Fonts (*Oswald*, *Inter*, *Playfair Display*)

---

## 🚀 Panduan Menjalankan Proyek Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Setup Database & Seeding
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🔐 Kredensial Administrator Default

- **URL Login**: `/login` (atau klik tombol **LOGIN** di Navbar kanan atas)
- **Username**: `admin`
- **Password**: `semakna123`

---

## 🐳 Panduan Deployment (Docker / VPS)

```bash
docker compose up -d --build
```
Aplikasi akan aktif di port `3000`.
