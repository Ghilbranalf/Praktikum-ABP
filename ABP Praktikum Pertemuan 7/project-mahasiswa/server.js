// server.js - Entry point aplikasi
const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const pool = require('./config/database');

const app  = express();
const PORT = process.env.PORT || 3000;

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// =====================
// Helper: Validasi Input Mahasiswa
// =====================
function validateMahasiswa(body, isUpdate = false) {
    const errors = [];
    const { nim, nama, jurusan, angkatan, ipk, email, no_hp } = body;

    if (!isUpdate || nim !== undefined) {
        if (!nim) errors.push('NIM wajib diisi');
        else if (!/^\d{10,12}$/.test(nim)) errors.push('NIM harus berupa 10-12 digit angka');
    }

    if (!isUpdate || nama !== undefined) {
        if (!nama || nama.trim().length < 3) errors.push('Nama wajib diisi minimal 3 karakter');
    }

    if (!isUpdate || jurusan !== undefined) {
        const jurusanValid = ['Teknik Informatika', 'Sistem Informasi', 'Ilmu Komputer'];
        if (!jurusan || !jurusanValid.includes(jurusan)) errors.push(`Jurusan tidak valid. Pilih: ${jurusanValid.join(', ')}`);
    }

    if (!isUpdate || angkatan !== undefined) {
        const tahun = parseInt(angkatan);
        if (!angkatan || isNaN(tahun) || tahun < 2000 || tahun > new Date().getFullYear()) {
            errors.push(`Angkatan tidak valid (2000 - ${new Date().getFullYear()})`);
        }
    }

    if (ipk !== undefined && ipk !== '' && ipk !== null) {
        const ipkNum = parseFloat(ipk);
        if (isNaN(ipkNum) || ipkNum < 0 || ipkNum > 4) errors.push('IPK harus antara 0.00 - 4.00');
    }

    if (email && email.trim() !== '') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Format email tidak valid');
    }

    if (no_hp && no_hp.trim() !== '') {
        if (!/^(08|\+62)\d{8,11}$/.test(no_hp.replace(/[\s-]/g, ''))) {
            errors.push('Format no HP tidak valid (contoh: 08123456789 atau +6212345678)');
        }
    }

    return errors;
}

// =====================
// HEALTH CHECK
// =====================
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            success: true,
            status: 'OK',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(503).json({
            success: false,
            status: 'ERROR',
            database: 'disconnected',
            message: err.message
        });
    }
});

// =====================
// ROUTES - MAHASISWA
// =====================

// GET semua mahasiswa (dengan pencarian & filter)
app.get('/api/mahasiswa', async (req, res) => {
    try {
        const { search, jurusan, angkatan, sort = 'created_at', order = 'DESC' } = req.query;

        const sortAllowed = ['created_at', 'nama', 'nim', 'angkatan', 'ipk'];
        const orderAllowed = ['ASC', 'DESC'];
        const safeSort  = sortAllowed.includes(sort) ? sort : 'created_at';
        const safeOrder = orderAllowed.includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';

        let conditions = [];
        let values = [];
        let idx = 1;

        if (search) {
            conditions.push(`(nama ILIKE $${idx} OR nim ILIKE $${idx})`);
            values.push(`%${search}%`);
            idx++;
        }
        if (jurusan) {
            conditions.push(`jurusan = $${idx}`);
            values.push(jurusan);
            idx++;
        }
        if (angkatan) {
            conditions.push(`angkatan = $${idx}`);
            values.push(parseInt(angkatan));
            idx++;
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `SELECT * FROM mahasiswa ${where} ORDER BY ${safeSort} ${safeOrder}`;
        const result = await pool.query(query, values);

        res.json({ success: true, data: result.rows, total: result.rowCount });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET mahasiswa berdasarkan ID
app.get('/api/mahasiswa/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ success: false, message: 'ID tidak valid' });
        }
        const result = await pool.query('SELECT * FROM mahasiswa WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST - Tambah mahasiswa baru
app.post('/api/mahasiswa', async (req, res) => {
    try {
        const errors = validateMahasiswa(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors.join('; '), errors });
        }

        const { nim, nama, jurusan, angkatan, ipk, email, no_hp } = req.body;

        const result = await pool.query(
            `INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk, email, no_hp)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [
                nim.trim(),
                nama.trim(),
                jurusan,
                parseInt(angkatan),
                ipk ? parseFloat(ipk) : 0.00,
                email ? email.trim().toLowerCase() : null,
                no_hp ? no_hp.trim() : null
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Mahasiswa berhasil ditambahkan',
            data: result.rows[0]
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ success: false, message: 'NIM sudah terdaftar di sistem' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT - Update data mahasiswa (full update)
app.put('/api/mahasiswa/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ success: false, message: 'ID tidak valid' });
        }

        // Cek apakah mahasiswa ada
        const existing = await pool.query('SELECT * FROM mahasiswa WHERE id = $1', [id]);
        if (existing.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
        }

        const errors = validateMahasiswa(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors.join('; '), errors });
        }

        const { nim, nama, jurusan, angkatan, ipk, email, no_hp } = req.body;

        const result = await pool.query(
            `UPDATE mahasiswa
             SET nim=$1, nama=$2, jurusan=$3, angkatan=$4, ipk=$5, email=$6, no_hp=$7, updated_at=NOW()
             WHERE id=$8
             RETURNING *`,
            [
                nim.trim(),
                nama.trim(),
                jurusan,
                parseInt(angkatan),
                ipk !== undefined ? parseFloat(ipk) : existing.rows[0].ipk,
                email ? email.trim().toLowerCase() : null,
                no_hp ? no_hp.trim() : null,
                id
            ]
        );

        res.json({
            success: true,
            message: 'Data mahasiswa berhasil diupdate',
            data: result.rows[0]
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ success: false, message: 'NIM sudah digunakan mahasiswa lain' });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE - Hapus mahasiswa
app.delete('/api/mahasiswa/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ success: false, message: 'ID tidak valid' });
        }

        const result = await pool.query(
            'DELETE FROM mahasiswa WHERE id=$1 RETURNING id, nim, nama', [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Mahasiswa tidak ditemukan' });
        }

        res.json({
            success: true,
            message: `Data ${result.rows[0].nama} (${result.rows[0].nim}) berhasil dihapus`
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// =====================
// ROUTES - STATISTIK
// =====================
app.get('/api/statistik', async (req, res) => {
    try {
        const [statsResult, jurusanResult, angkatanResult] = await Promise.all([
            pool.query(`
                SELECT
                    COUNT(*)::int                                AS total_mahasiswa,
                    COUNT(DISTINCT jurusan)::int                 AS total_jurusan,
                    ROUND(AVG(ipk)::numeric, 2)                 AS rata_ipk,
                    COUNT(*) FILTER (WHERE ipk >= 3.5)::int     AS mahasiswa_cumlaude,
                    MAX(ipk)                                     AS ipk_tertinggi,
                    MIN(NULLIF(ipk, 0))                         AS ipk_terendah
                FROM mahasiswa
            `),
            pool.query(`
                SELECT jurusan, COUNT(*)::int AS total
                FROM mahasiswa
                GROUP BY jurusan
                ORDER BY total DESC
            `),
            pool.query(`
                SELECT angkatan, COUNT(*)::int AS total
                FROM mahasiswa
                GROUP BY angkatan
                ORDER BY angkatan DESC
            `)
        ]);

        res.json({
            success: true,
            data: {
                ...statsResult.rows[0],
                per_jurusan: jurusanResult.rows,
                per_angkatan: angkatanResult.rows
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server internal' });
});

// 404 handler untuk route yang tidak ada
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} tidak ditemukan` });
});

// =====================
// Start Server
// =====================
const server = app.listen(PORT, () => {
    console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📋 API Endpoints:`);
    console.log(`   GET    /api/health                - Cek status server & database`);
    console.log(`   GET    /api/mahasiswa             - Ambil semua mahasiswa`);
    console.log(`   GET    /api/mahasiswa?search=&jurusan=&angkatan= - Filter & cari`);
    console.log(`   GET    /api/mahasiswa/:id         - Ambil mahasiswa by ID`);
    console.log(`   POST   /api/mahasiswa             - Tambah mahasiswa baru`);
    console.log(`   PUT    /api/mahasiswa/:id         - Update data mahasiswa`);
    console.log(`   DELETE /api/mahasiswa/:id         - Hapus mahasiswa`);
    console.log(`   GET    /api/statistik             - Lihat statistik lengkap\n`);
});

// =====================
// Graceful Shutdown
// =====================
const shutdown = async (signal) => {
    console.log(`\n${signal} diterima. Menutup server...`);
    server.close(async () => {
        console.log('HTTP server ditutup.');
        await pool.end();
        console.log('Pool database ditutup. Sampai jumpa!');
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
