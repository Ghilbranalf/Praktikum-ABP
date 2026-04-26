// config/database.js
const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi ke PostgreSQL lokal
const pool = new Pool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME     || 'db_mahasiswa',
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || 'password_anda',

    // Pool settings
    max:                    10,
    min:                    2,
    idleTimeoutMillis:      30000,
    connectionTimeoutMillis: 3000,
    allowExitOnIdle:        true,
});

// Test koneksi saat startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Gagal terhubung ke PostgreSQL:', err.message);
        console.error('   Pastikan PostgreSQL sudah berjalan dan konfigurasi .env sudah benar');
    } else {
        client.query('SELECT current_database(), version()', (err2, result) => {
            release();
            if (!err2) {
                const db = result.rows[0].current_database;
                console.log(`✅ PostgreSQL terhubung — database: "${db}"`);
            }
        });
    }
});

// Log error pool
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = pool;
