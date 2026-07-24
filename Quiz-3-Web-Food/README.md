# Quiz 3 — Zenith Bites (Web Food, Fullstack)

Lanjutan dari Quiz 1 (Web Food "Zenith Bites") dan Quiz 2 (Dark Mode), dikembangkan menjadi
aplikasi fullstack dengan **MySQL + Sequelize**, Express, React, dan Node.js.

## Struktur Folder

```
Quiz-3-Web-Food/
├── backend/          # Express + Mongoose (routes/, controllers/, models/)
└── frontend/          # React (Vite)
```

## Fitur yang sudah dikerjakan

- **Menu** diambil dari database (bukan hardcoded lagi), bisa CRUD penuh lewat Admin Panel.
- **Fitur pemesanan sederhana**: user pilih menu → keranjang → buat order → tersimpan di
  database dengan status `Pending` → `Diproses` → `Selesai`.
- **Admin Panel** dengan login sederhana (JWT), untuk kelola Menu (CRUD) dan kelola Order
  (update status / hapus).
- **Dark Mode** (toggle, ganti background & warna teks, status mode ditampilkan) — persis
  requirement Quiz 2, ditaruh di Navbar dan Admin Dashboard.
- Backend REST API lengkap (lebih dari 4 endpoint: GET, POST, PUT, DELETE untuk Menu maupun
  Order, plus endpoint login).
- Struktur backend rapi: `routes/`, `controllers/`, `models/`, `middleware/`, `config/`.
- Frontend modular: `Navbar`, `Hero`, `Features`, `MenuList`, `OrderCart`, `Footer`,
  `ThemeToggle`, plus komponen Admin: `AdminLogin`, `AdminDashboard`, `MenuManager`,
  `OrderManager`, `ProtectedRoute`.

## Cara Menjalankan

### 1. Backend

```bash
cd backend
cp .env.example .env
# edit .env: isi DB_USER, DB_PASSWORD, DB_NAME sesuai MySQL kamu (XAMPP/Laragon/lokal)
npm install
npm run seed     # otomatis bikin tabel (via sync) + akun admin default + 4 menu contoh
npm run dev      # jalan di http://localhost:5000
```

> Pastikan database dengan nama sesuai `DB_NAME` (default: `zenith_bites`) sudah dibuat dulu
> di MySQL (lewat phpMyAdmin/HeidiSQL/CLI: `CREATE DATABASE zenith_bites;`). Tabel-tabelnya
> (`Admins`, `Menus`, `Orders`, `OrderItems`) akan dibuat otomatis oleh Sequelize saat
> `npm run seed` atau `npm run dev` pertama kali dijalankan.

Kredensial admin default (ada di `.env`, boleh diganti):
- Username: `admin`
- Password: `admin123`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev      # jalan di http://localhost:5173
```

Buka `http://localhost:5173` untuk tampilan customer, dan `http://localhost:5173/admin`
untuk login Admin Panel.

## Daftar Endpoint API

| Method | Endpoint            | Akses  | Keterangan                      |
|--------|----------------------|--------|----------------------------------|
| POST   | /api/auth/login       | Public | Login admin, dapat JWT token     |
| GET    | /api/menu             | Public | Ambil semua menu                 |
| GET    | /api/menu/:id         | Public | Ambil satu menu                  |
| POST   | /api/menu             | Admin  | Tambah menu                      |
| PUT    | /api/menu/:id         | Admin  | Update menu                      |
| DELETE | /api/menu/:id         | Admin  | Hapus menu                       |
| POST   | /api/orders            | Public | Buat order baru                  |
| GET    | /api/orders            | Admin  | Lihat semua order                |
| PUT    | /api/orders/:id       | Admin  | Update status order              |
| DELETE | /api/orders/:id       | Admin  | Hapus order                      |

## Yang masih perlu kamu lakukan sendiri (khusus di komputer/akun kamu)

1. **Jalankan MongoDB** — pakai MongoDB lokal (`mongod`) atau MongoDB Atlas (cloud, gratis),
   lalu sesuaikan `MONGO_URI` di file `.env`.
2. **Push ke GitHub** sesuai ketentuan:
   - Buat folder `Quiz-3-Web-Food` di repo GitHub penugasan kamu.
   - Commit dengan pesan **"Kuis-3"**.
   - Jangan private, dan sudah collab dengan `@itgithubrismahandd`.
3. **Ambil semua screenshot** yang diminta (kode backend, kode frontend, tampilan Light/Dark
   Mode, data tersimpan di MongoDB) lalu susun ke dalam **PDF** laporan.
4. Ganti isi menu/teks sesuai selera kamu kalau mau lebih personal (biar tidak identik persis
   dengan orang lain).

## Catatan database

Project ini menggunakan **MySQL + Sequelize** (bukan Mongoose/MongoDB), sesuai konfirmasi
terbaru. Struktur tabelnya:

- `Admins` — akun login admin
- `Menus` — data menu makanan/minuman
- `Orders` — data pesanan (nama pemesan, total harga, status)
- `OrderItems` — detail item per pesanan (relasi ke `Orders` dan `Menus`)

Sudah ditest end-to-end (login, create/read/update/delete menu, buat order, update status
order, proteksi endpoint admin) jalan normal di MariaDB/MySQL.
