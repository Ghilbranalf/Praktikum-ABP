const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'mahasiswa.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data directory and file if not exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    { id: uuidv4(), nim: '2021001', nama: 'Andi Pratama', jurusan: 'Teknik Informatika', semester: 6, ipk: 3.75, status: 'Aktif', email: 'andi.pratama@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2021002', nama: 'Budi Santoso', jurusan: 'Sistem Informasi', semester: 4, ipk: 3.50, status: 'Aktif', email: 'budi.santoso@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2021003', nama: 'Citra Dewi', jurusan: 'Teknik Informatika', semester: 6, ipk: 3.90, status: 'Aktif', email: 'citra.dewi@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2020001', nama: 'Dian Rahayu', jurusan: 'Manajemen Informatika', semester: 8, ipk: 3.60, status: 'Aktif', email: 'dian.rahayu@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2022001', nama: 'Eko Saputra', jurusan: 'Sistem Informasi', semester: 2, ipk: 3.20, status: 'Aktif', email: 'eko.saputra@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2021004', nama: 'Fitri Handayani', jurusan: 'Teknik Informatika', semester: 6, ipk: 3.85, status: 'Cuti', email: 'fitri.handayani@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2020002', nama: 'Guntur Wibowo', jurusan: 'Manajemen Informatika', semester: 8, ipk: 2.90, status: 'Aktif', email: 'guntur.wibowo@student.ac.id', createdAt: new Date().toISOString() },
    { id: uuidv4(), nim: '2022002', nama: 'Hana Sari', jurusan: 'Teknik Informatika', semester: 2, ipk: 3.70, status: 'Aktif', email: 'hana.sari@student.ac.id', createdAt: new Date().toISOString() },
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Helper functions
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// ====== PAGE ROUTES ======
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/data', (req, res) => res.sendFile(path.join(__dirname, 'public', 'data.html')));
app.get('/tambah', (req, res) => res.sendFile(path.join(__dirname, 'public', 'form.html')));
app.get('/statistik', (req, res) => res.sendFile(path.join(__dirname, 'public', 'statistik.html')));

// ====== API ROUTES ======

// GET all mahasiswa (JSON for DataTable)
app.get('/api/mahasiswa', (req, res) => {
  const data = readData();
  res.json({ data });
});

// GET single mahasiswa
app.get('/api/mahasiswa/:id', (req, res) => {
  const data = readData();
  const mahasiswa = data.find(m => m.id === req.params.id);
  if (!mahasiswa) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
  res.json({ success: true, data: mahasiswa });
});

// POST create mahasiswa
app.post('/api/mahasiswa', (req, res) => {
  const data = readData();
  const { nim, nama, jurusan, semester, ipk, status, email } = req.body;

  // Validasi NIM unik
  if (data.find(m => m.nim === nim)) {
    return res.status(400).json({ success: false, message: 'NIM sudah terdaftar!' });
  }

  const newMahasiswa = {
    id: uuidv4(),
    nim, nama, jurusan,
    semester: parseInt(semester),
    ipk: parseFloat(ipk),
    status, email,
    createdAt: new Date().toISOString()
  };

  data.push(newMahasiswa);
  writeData(data);
  res.status(201).json({ success: true, message: 'Data mahasiswa berhasil ditambahkan!', data: newMahasiswa });
});

// PUT update mahasiswa
app.put('/api/mahasiswa/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });

  const { nim, nama, jurusan, semester, ipk, status, email } = req.body;

  // Validasi NIM unik (kecuali milik sendiri)
  const nimDuplicate = data.find(m => m.nim === nim && m.id !== req.params.id);
  if (nimDuplicate) {
    return res.status(400).json({ success: false, message: 'NIM sudah digunakan mahasiswa lain!' });
  }

  data[index] = {
    ...data[index],
    nim, nama, jurusan,
    semester: parseInt(semester),
    ipk: parseFloat(ipk),
    status, email,
    updatedAt: new Date().toISOString()
  };

  writeData(data);
  res.json({ success: true, message: 'Data mahasiswa berhasil diperbarui!', data: data[index] });
});

// DELETE mahasiswa
app.delete('/api/mahasiswa/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });

  const deleted = data.splice(index, 1)[0];
  writeData(data);
  res.json({ success: true, message: `Data ${deleted.nama} berhasil dihapus!` });
});

// GET statistik
app.get('/api/statistik', (req, res) => {
  const data = readData();
  const stats = {
    total: data.length,
    aktif: data.filter(m => m.status === 'Aktif').length,
    cuti: data.filter(m => m.status === 'Cuti').length,
    lulus: data.filter(m => m.status === 'Lulus').length,
    avgIPK: data.length ? (data.reduce((sum, m) => sum + m.ipk, 0) / data.length).toFixed(2) : 0,
    byJurusan: data.reduce((acc, m) => {
      acc[m.jurusan] = (acc[m.jurusan] || 0) + 1;
      return acc;
    }, {}),
    bySemester: data.reduce((acc, m) => {
      acc[`Sem ${m.semester}`] = (acc[`Sem ${m.semester}`] || 0) + 1;
      return acc;
    }, {})
  };
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📊 Buka browser dan akses http://localhost:${PORT}\n`);
});
