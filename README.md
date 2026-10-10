# Chill App — Backend REST API

Backend REST API untuk aplikasi **Chill App** yang dibangun menggunakan Node.js, Express.js, dan MySQL. Backend ini menyediakan fitur CRUD (*Create, Read, Update, Delete*) untuk mengelola data pengguna.

---

## 🛠️ Teknologi & Dependensi

- **Runtime:** Node.js
- **Package Manager:** npm
- **Framework:** Express.js 5
- **Database:** MySQL
- **Database Driver:** `mysql2` dengan Promise API
- **Password Hashing:** `bcryptjs`
- **Environment Configuration:** `dotenv`
- **Testing:** Node.js Test Runner

### Fungsi Dependensi

| Dependensi | Fungsi |
|---|---|
| `express` | Menangani HTTP request dan routing API |
| `mysql2` | Menghubungkan backend dengan database MySQL |
| `bcryptjs` | Melakukan hashing password pengguna |
| `dotenv` | Membaca konfigurasi dari file `.env` |

---

## 📋 Prasyarat Sistem

Pastikan perangkat sudah memiliki:

1. **Node.js dan npm** untuk menjalankan aplikasi dan mengelola dependensi.
2. **MySQL Server** untuk menyimpan data pengguna.
3. **Git** untuk mengelola kode dan mengambil repository.

---

## 🚀 Langkah Instalasi & Konfigurasi

### 1. Clone Repository

```bash
git clone git@github.com:rajasukmaningrat/ib2-rest-api.git
cd ib2-rest-api/backend
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variable

Buat file `.env` berdasarkan template yang tersedia:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi berikut dengan pengaturan MySQL lokal:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_PORT=3306
DB_NAME=your_database_name
PORT=3000
```

**Catatan penting:**

- Ganti nilai contoh dengan konfigurasi database lokal milikmu.
- Jangan memasukkan password database asli ke README.
- Jangan commit atau mengunggah file `.env` ke GitHub.
- File `.env.example` hanya digunakan sebagai template konfigurasi.

---

## 🗄️ Persiapan Database

Siapkan database MySQL yang namanya sesuai dengan `DB_NAME` pada file `.env`.

Contoh berikut digunakan untuk membuat tabel `users` pada database baru yang belum memiliki tabel tersebut.

```sql
CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    verification_token VARCHAR(255) DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

**Perhatian:** Jangan menjalankan perintah pembuatan tabel ini pada database yang sudah memiliki tabel `users` atau berisi data penting. Periksa struktur database terlebih dahulu agar tidak mengganggu data yang sudah ada.

---

## 🏃 Menjalankan Server

Masuk ke direktori backend:

```bash
cd backend
```

Jika kamu sudah berada di direktori `backend`, langkah ini tidak diperlukan.

Jalankan server:

```bash
npm start
```

Server akan berjalan di:

```text
http://localhost:3000
```

Base URL untuk pengujian API:

```text
http://localhost:3000
```

---

## 📌 Daftar Endpoint API

### 👤 Pengguna (Users)

| Method | Endpoint | Deskripsi | Autentikasi |
|---|---|---|---|
| `GET` | `/users` | Mengambil seluruh data pengguna | Belum diterapkan |
| `GET` | `/users/:id` | Mengambil pengguna berdasarkan ID | Belum diterapkan |
| `POST` | `/users` | Membuat pengguna baru | Belum diterapkan |
| `PATCH` | `/users/:id` | Memperbarui data pengguna | Belum diterapkan |
| `DELETE` | `/users/:id` | Menghapus pengguna berdasarkan ID | Belum diterapkan |

**Catatan:** Endpoint di atas merupakan fitur CRUD pengguna yang tersedia saat ini. Autentikasi JWT dan endpoint login/register belum termasuk dalam implementasi yang didokumentasikan.

### Contoh Request — Membuat Pengguna

- **Method:** `POST`
- **URL:** `http://localhost:3000/users`
- **Content-Type:** `application/json`

Request body:

```json
{
  "fullname": "Nama Pengguna",
  "username": "username",
  "email": "user@example.com",
  "password": "password_yang_kuat"
}
```

### Contoh Request — Memperbarui Pengguna

- **Method:** `PATCH`
- **URL:** `http://localhost:3000/users/1`
- **Content-Type:** `application/json`

Request body:

```json
{
  "fullname": "Nama Baru"
}
```

Gunakan ID pengguna yang tersedia pada database pengujianmu.

---

## 🧪 Testing

Project ini menggunakan Node.js Test Runner untuk menguji validasi input dan perilaku controller.

Jalankan seluruh pengujian dari direktori `backend`:

```bash
npm test
```

Hasil pengujian terakhir yang tercatat selama pengembangan:

- **Tests passed:** 16
- **Tests failed:** 0

Jalankan ulang pengujian setelah melakukan perubahan untuk memastikan tidak ada regresi (*regression*), yaitu fitur yang sebelumnya berjalan menjadi rusak setelah perubahan.

---

## 🔐 Keamanan

- Password pengguna di-hash menggunakan `bcryptjs` sebelum disimpan ke database.
- Password tidak disertakan dalam respons data pengguna.
- Validasi input dilakukan sebelum operasi data diproses.
- File `.env` dan direktori `node_modules` dikecualikan melalui `.gitignore`.
- Jangan menyimpan password database atau kredensial rahasia di repository publik.

**Batasan implementasi saat ini:** Endpoint CRUD pengguna tersedia, tetapi autentikasi JWT dan pembatasan akses berdasarkan peran belum didokumentasikan sebagai fitur aktif.

---

## 📁 Struktur Direktori Project

```text
ib2-rest-api/
├── .gitignore
├── README.md
└── backend/
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── src/
    │   ├── app.js
    │   ├── config/
    │   │   └── database.js
    │   ├── controllers/
    │   │   └── user.controller.js
    │   ├── models/
    │   │   └── user.model.js
    │   ├── routes/
    │   │   └── user.routes.js
    │   ├── server.js
    │   ├── services/
    │   │   └── user.service.js
    │   └── utils/
    │       └── user.validation.js
    └── tests/
        ├── user.controller.test.js
        └── user.validation.test.js
```

---

## 🎯 Pengembangan Selanjutnya

Rencana pengembangan backend Chill App dapat mencakup:

- Implementasi autentikasi dan otorisasi.
- Endpoint register dan login.
- Integrasi backend dengan frontend Chill App.
- Pengembangan endpoint film dan series.
- Dokumentasi API dan pengujian tambahan.

Bagian ini merupakan rencana pengembangan, bukan klaim bahwa fitur tersebut sudah tersedia.

---

**Chill App — Backend REST API**
Backend untuk mendukung pengelolaan data pengguna pada aplikasi Chill App.