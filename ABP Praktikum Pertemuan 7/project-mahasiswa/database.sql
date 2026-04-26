-- ============================================
-- SETUP DATABASE POSTGRESQL - db_mahasiswa
-- ============================================
-- Jalankan file ini di psql atau pgAdmin:
--   psql -U postgres -f database.sql

-- 1. Buat database (jalankan terpisah sebagai superuser)
-- CREATE DATABASE db_mahasiswa;

-- 2. Sambungkan ke database
\c db_mahasiswa;

-- =============================================
-- TABEL MAHASISWA
-- =============================================
CREATE TABLE IF NOT EXISTS mahasiswa (
    id          SERIAL PRIMARY KEY,
    nim         VARCHAR(12)  UNIQUE NOT NULL,
    nama        VARCHAR(100) NOT NULL,
    jurusan     VARCHAR(50)  NOT NULL
                    CHECK (jurusan IN ('Teknik Informatika', 'Sistem Informasi', 'Ilmu Komputer')),
    angkatan    INTEGER      NOT NULL CHECK (angkatan BETWEEN 2000 AND 2099),
    ipk         DECIMAL(3,2) NOT NULL DEFAULT 0.00 CHECK (ipk BETWEEN 0 AND 4),
    email       VARCHAR(100),
    no_hp       VARCHAR(20),
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk mempercepat pencarian
CREATE INDEX IF NOT EXISTS idx_mahasiswa_nim      ON mahasiswa(nim);
CREATE INDEX IF NOT EXISTS idx_mahasiswa_nama     ON mahasiswa USING gin(to_tsvector('simple', nama));
CREATE INDEX IF NOT EXISTS idx_mahasiswa_jurusan  ON mahasiswa(jurusan);
CREATE INDEX IF NOT EXISTS idx_mahasiswa_angkatan ON mahasiswa(angkatan);
CREATE INDEX IF NOT EXISTS idx_mahasiswa_ipk      ON mahasiswa(ipk DESC);

-- =============================================
-- TABEL MATA KULIAH
-- =============================================
CREATE TABLE IF NOT EXISTS mata_kuliah (
    id          SERIAL PRIMARY KEY,
    kode_mk     VARCHAR(10)  UNIQUE NOT NULL,
    nama_mk     VARCHAR(100) NOT NULL,
    sks         INTEGER      NOT NULL CHECK (sks BETWEEN 1 AND 6),
    semester    INTEGER      NOT NULL CHECK (semester BETWEEN 1 AND 8)
);

-- =============================================
-- TABEL NILAI (relasi mahasiswa & mata_kuliah)
-- =============================================
CREATE TABLE IF NOT EXISTS nilai (
    id              SERIAL PRIMARY KEY,
    mahasiswa_id    INTEGER NOT NULL REFERENCES mahasiswa(id)   ON DELETE CASCADE,
    matakuliah_id   INTEGER NOT NULL REFERENCES mata_kuliah(id) ON DELETE CASCADE,
    nilai           DECIMAL(5,2) CHECK (nilai BETWEEN 0 AND 100),
    grade           CHAR(2),
    semester        VARCHAR(10) NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mahasiswa_id, matakuliah_id, semester)
);

CREATE INDEX IF NOT EXISTS idx_nilai_mahasiswa ON nilai(mahasiswa_id);

-- =============================================
-- TRIGGER: otomatis update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_mahasiswa_updated_at ON mahasiswa;
CREATE TRIGGER trg_mahasiswa_updated_at
    BEFORE UPDATE ON mahasiswa
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================
-- DATA CONTOH
-- =============================================
INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email, no_hp) VALUES
    ('2021001001', 'Budi Santoso',    'Teknik Informatika', 2021, 3.75, 'budi@kampus.ac.id',   '08123456789'),
    ('2021001002', 'Siti Rahayu',     'Sistem Informasi',   2021, 3.50, 'siti@kampus.ac.id',   '08234567890'),
    ('2022001003', 'Ahmad Fauzi',     'Teknik Informatika', 2022, 3.80, 'ahmad@kampus.ac.id',  '08345678901'),
    ('2022001004', 'Dewi Lestari',    'Ilmu Komputer',      2022, 3.20, 'dewi@kampus.ac.id',   '08456789012'),
    ('2023001005', 'Rizky Pratama',   'Teknik Informatika', 2023, 3.65, 'rizky@kampus.ac.id',  '08567890123'),
    ('2023001006', 'Maya Indah',      'Sistem Informasi',   2023, 2.85, 'maya@kampus.ac.id',   '08678901234'),
    ('2024001007', 'Fajar Nugroho',   'Ilmu Komputer',      2024, 3.40, 'fajar@kampus.ac.id',  '08789012345')
ON CONFLICT (nim) DO NOTHING;

INSERT INTO mata_kuliah (kode_mk, nama_mk, sks, semester) VALUES
    ('TI101', 'Algoritma & Pemrograman', 4, 1),
    ('TI102', 'Basis Data',              3, 2),
    ('TI103', 'Jaringan Komputer',       3, 3),
    ('TI104', 'Pemrograman Web',         3, 4),
    ('TI105', 'Kecerdasan Buatan',       3, 5)
ON CONFLICT (kode_mk) DO NOTHING;

-- =============================================
-- VERIFIKASI
-- =============================================
SELECT '✅ Database berhasil dibuat!' AS status;
SELECT COUNT(*) AS total_mahasiswa FROM mahasiswa;
SELECT COUNT(*) AS total_mata_kuliah FROM mata_kuliah;
