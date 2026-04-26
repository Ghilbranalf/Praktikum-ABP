# 🎓 Sistem Informasi Mahasiswa — v2.0

Aplikasi manajemen data mahasiswa berbasis **Node.js + Express + PostgreSQL**.

---

## 📁 Struktur Proyek

```
project-mahasiswa/
├── config/
│   └── database.js       # Konfigurasi pool PostgreSQL
├── public/
│   └── index.html        # Frontend (HTML/CSS/JS)
├── .env                  # Variabel environment (jangan di-commit!)
├── database.sql          # Script setup database
├── package.json
├── server.js             # Entry point & semua route API
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Setup Database

```bash
# Buat database (di psql sebagai superuser)
psql -U postgres -c "CREATE DATABASE db_mahasiswa;"

# Jalankan script SQL
psql -U postgres -d db_mahasiswa -f database.sql
```

### 2. Konfigurasi Environment

Edit file `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_mahasiswa
DB_USER=postgres
DB_PASSWORD=password_anda
PORT=3000
```

### 3. Install Dependency & Jalankan

```bash
npm install
npm run dev      # mode development (nodemon)
# atau
npm start        # mode production
```

Buka browser: **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/health` | Cek status server & database |
| `GET` | `/api/mahasiswa` | Ambil semua mahasiswa |
| `GET` | `/api/mahasiswa?search=budi&jurusan=TI&angkatan=2023&sort=ipk&order=DESC` | Filter & cari |
| `GET` | `/api/mahasiswa/:id` | Ambil mahasiswa by ID |
| `POST` | `/api/mahasiswa` | Tambah mahasiswa baru |
| `PUT` | `/api/mahasiswa/:id` | Update data mahasiswa |
| `DELETE` | `/api/mahasiswa/:id` | Hapus mahasiswa |
| `GET` | `/api/statistik` | Statistik lengkap |

### Contoh Body POST/PUT

```json
{
  "nim":      "2024001001",
  "nama":     "Budi Santoso",
  "jurusan":  "Teknik Informatika",
  "angkatan": 2024,
  "ipk":      3.75,
  "email":    "budi@kampus.ac.id",
  "no_hp":    "08123456789"
}
```

---

## ✅ Perbaikan di v2.0

- **Validasi input** yang ketat di server: format NIM, range IPK, format email, format HP
- **Fitur Edit** mahasiswa via modal (sebelumnya tidak ada)
- **Filter & Sort** tabel: cari nama/NIM, filter jurusan & angkatan, sort kolom
- **Health check** endpoint `/api/health`
- **Graceful shutdown** — menutup pool DB saat server berhenti
- **Statistik lebih lengkap**: IPK tertinggi/terendah, breakdown per jurusan & angkatan
- **XSS protection** pada output HTML
- **updated_at** di tabel + trigger otomatis
- **Index PostgreSQL** untuk performa query
- **Constraint CHECK** di database (jurusan, angkatan, IPK range)
- **Debounced search** agar tidak spam request ke server

---

## 🗄️ Skema Database

```sql
mahasiswa (
  id          SERIAL PRIMARY KEY,
  nim         VARCHAR(12) UNIQUE NOT NULL,
  nama        VARCHAR(100) NOT NULL,
  jurusan     VARCHAR(50) CHECK (...),
  angkatan    INTEGER CHECK (2000-2099),
  ipk         DECIMAL(3,2) CHECK (0-4),
  email       VARCHAR(100),
  no_hp       VARCHAR(20),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()   ← BARU
)
```
