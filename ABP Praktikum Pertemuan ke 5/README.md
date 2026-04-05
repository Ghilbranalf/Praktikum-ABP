# 🎓 SiMAHA - Sistem Manajemen Mahasiswa

## 👤 Identitas

* **Nama:** Ghilbran Alfaries Pryma
* **NIM:** 2311102267
* **Mata Kuliah:** Praktikum ABP Pertemuan ke-5

---

## 📖 Deskripsi

SiMAHA adalah aplikasi web berbasis Node.js yang digunakan untuk mengelola data mahasiswa secara efisien. Aplikasi ini memiliki fitur CRUD (Create, Read, Update, Delete) serta tampilan interaktif menggunakan DataTables.

---

## 🎯 Tujuan

* Membuat sistem manajemen data mahasiswa
* Mengimplementasikan CRUD menggunakan API
* Mengintegrasikan frontend dan backend
* Menampilkan data secara interaktif menggunakan DataTables

---

## 🎯 Fitur Utama

* 📋 Menampilkan data mahasiswa
* ➕ Menambah data mahasiswa
* ✏️ Mengedit data mahasiswa
* 🗑️ Menghapus data mahasiswa
* 🔍 Pencarian & filter data
* 📤 Export Excel & Print
* 📊 Statistik mahasiswa

---

## 🛠️ Teknologi yang Digunakan

* HTML, CSS, JavaScript
* Bootstrap 5
* jQuery & DataTables
* Node.js & Express
* JSON sebagai database sederhana

---

## 📁 Struktur Project

```bash
student-app/
├── data/
│   └── mahasiswa.json
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── data.js
│   │   ├── form.js
│   │   ├── index.js
│   │   ├── main.js
│   │   └── statistik.js
│   ├── data.html
│   ├── form.html
│   ├── index.html
│   └── statistik.html
├── server.js
├── package.json
└── README.md

```

---

# 🔧 PENJELASAN SOURCE CODE

## 🔹 1. CSS (Styling)

CSS digunakan untuk mengatur tampilan dari **Student Management System**, mulai dari layout, warna, hingga komponen UI.
```css
---
/* ============================================
   STUDENT MANAGEMENT SYSTEM - CUSTOM STYLES
   ============================================ */

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --primary: #1a56db;
  --primary-dark: #1239a5;
  --primary-light: #e8eeff;
  --secondary: #0e9f6e;
  --secondary-light: #e8f8f2;
  --danger: #e02424;
  --danger-light: #fde8e8;
  --warning: #d97706;
  --warning-light: #fffbeb;
  --info: #7e3af2;
  --info-light: #f0ebfe;
  --dark: #111827;
  --dark-2: #1f2937;
  --dark-3: #374151;
  --gray: #6b7280;
  --gray-light: #9ca3af;
  --border: #e5e7eb;
  --bg: #f9fafb;
  --white: #ffffff;
  --sidebar-w: 260px;
  --topbar-h: 64px;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg);
  color: var(--dark);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ---- SIDEBAR ---- */
.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  background: var(--dark);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 220px; height: 220px;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
}

.sidebar-logo {
  padding: 24px 20px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo .logo-icon {
  width: 40px; height: 40px;
  background: var(--primary);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;
}

.sidebar-logo h2 {
  font-size: 15px;
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;
}

.sidebar-logo p {
  font-size: 11px;
  color: rgba(255,255,255,0.45);
  margin-top: 2px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
}

.nav-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  padding: 8px 8px 6px;
  margin-top: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255,255,255,0.6);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 2px;
}

.sidebar-link i { font-size: 17px; width: 20px; flex-shrink: 0; }

.sidebar-link:hover {
  background: rgba(255,255,255,0.07);
  color: var(--white);
}

.sidebar-link.active {
  background: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 12px rgba(26,86,219,0.4);
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 12px;
  color: rgba(255,255,255,0.3);
}

/* ---- MAIN LAYOUT ---- */
.main-wrapper {
  margin-left: var(--sidebar-w);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---- TOPBAR ---- */
.topbar {
  height: var(--topbar-h);
  background: var(--white);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}

.topbar-left { display: flex; align-items: center; gap: 16px; }
.topbar-title { font-size: 17px; font-weight: 700; color: var(--dark); }
.topbar-subtitle { font-size: 13px; color: var(--gray); }

.topbar-right { display: flex; align-items: center; gap: 12px; }

.topbar-badge {
  background: var(--primary-light);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.btn-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  color: var(--dark);
  cursor: pointer;
}

/* ---- PAGE CONTENT ---- */
.page-content {
  flex: 1;
  padding: 28px;
}

/* ---- STAT CARDS ---- */
.stat-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 22px 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-card .icon-box {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  margin-bottom: 14px;
}

.stat-card .stat-num {
  font-size: 30px;
  font-weight: 800;
  font-family: 'Space Grotesk', sans-serif;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-card .stat-label {
  font-size: 13px;
  color: var(--gray);
  font-weight: 500;
}

.stat-card .stat-trend {
  font-size: 12px;
  font-weight: 600;
  margin-top: 8px;
}

/* Color variants */
.icon-blue { background: var(--primary-light); color: var(--primary); }
.icon-green { background: var(--secondary-light); color: var(--secondary); }
.icon-red { background: var(--danger-light); color: var(--danger); }
.icon-purple { background: var(--info-light); color: var(--info); }
.icon-yellow { background: var(--warning-light); color: var(--warning); }

/* ---- CARD PANEL ---- */
.panel {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  overflow: hidden;
}

.panel-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.panel-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--dark);
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-body { padding: 24px; }

/* ---- BUTTONS ---- */
.btn {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary-custom {
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(26,86,219,0.3);
}

.btn-primary-custom:hover {
  background: var(--primary-dark);
  color: var(--white);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26,86,219,0.4);
}

.btn-success-custom {
  background: var(--secondary);
  color: var(--white);
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(14,159,110,0.3);
}

.btn-success-custom:hover {
  background: #0b8a5e;
  color: var(--white);
  transform: translateY(-1px);
}

.btn-danger-custom {
  background: var(--danger);
  color: var(--white);
  border: none;
  padding: 6px 14px;
  font-size: 13px;
}

.btn-danger-custom:hover { background: #c81e1e; color: var(--white); }

.btn-warning-custom {
  background: var(--warning);
  color: var(--white);
  border: none;
  padding: 6px 14px;
  font-size: 13px;
}

.btn-warning-custom:hover { background: #b45309; color: var(--white); }

.btn-sm-icon {
  width: 32px; height: 32px;
  padding: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit { background: #eff6ff; color: #2563eb; }
.btn-edit:hover { background: #2563eb; color: white; }
.btn-delete { background: #fef2f2; color: #dc2626; }
.btn-delete:hover { background: #dc2626; color: white; }
.btn-view { background: #f0fdf4; color: #16a34a; }
.btn-view:hover { background: #16a34a; color: white; }

/* ---- FORM STYLES ---- */
.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--dark-3);
  margin-bottom: 6px;
}

.form-control, .form-select {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--dark);
  transition: all 0.2s;
}

.form-control:focus, .form-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(26,86,219,0.12);
  outline: none;
}

.form-control.is-invalid { border-color: var(--danger); }
.invalid-feedback { font-size: 12px; }

.input-group-text {
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: 8px 0 0 8px;
  color: var(--gray);
  font-size: 15px;
}

/* ---- STATUS BADGES ---- */
.badge-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-aktif { background: var(--secondary-light); color: var(--secondary); }
.badge-cuti { background: var(--warning-light); color: var(--warning); }
.badge-lulus { background: var(--info-light); color: var(--info); }

/* ---- TABLE ---- */
.table-custom thead th {
  background: var(--bg);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
  border-bottom: 2px solid var(--border);
  padding: 12px 14px;
}

.table-custom tbody td {
  font-size: 14px;
  padding: 12px 14px;
  vertical-align: middle;
  border-bottom: 1px solid var(--border);
}

.table-custom tbody tr:hover { background: #f8faff; }

.avatar-initials {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* IPK color coding */
.ipk-excellent { color: var(--secondary); font-weight: 700; }
.ipk-good { color: var(--primary); font-weight: 600; }
.ipk-average { color: var(--warning); font-weight: 600; }
.ipk-low { color: var(--danger); font-weight: 600; }

/* ---- DATATABLES OVERRIDE ---- */
.dataTables_wrapper .dataTables_filter input {
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 7px 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
}

.dataTables_wrapper .dataTables_length select {
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 6px 10px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
}

.dataTables_wrapper .dataTables_info {
  font-size: 13px;
  color: var(--gray);
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
  border-radius: 6px !important;
  font-size: 13px !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  background: var(--primary) !important;
  border-color: var(--primary) !important;
  color: white !important;
}

/* ---- MODAL STYLES ---- */
.modal-content {
  border: none;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.modal-header {
  border-bottom: 1px solid var(--border);
  padding: 20px 24px;
}

.modal-title { font-weight: 700; font-size: 16px; }

.modal-footer {
  border-top: 1px solid var(--border);
  padding: 16px 24px;
}

/* ---- TOAST ---- */
.toast-container { z-index: 9999; }
.toast-custom {
  background: var(--white);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  min-width: 300px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon { font-size: 20px; }
.toast-msg { font-size: 14px; font-weight: 600; }
.toast-sub { font-size: 12px; color: var(--gray); }

/* ---- PROGRESS BAR ---- */
.progress { border-radius: 10px; height: 8px; background: var(--bg); }
.progress-bar { border-radius: 10px; }

/* ---- HERO / DASHBOARD BANNER ---- */
.dashboard-hero {
  background: linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%);
  border-radius: var(--radius);
  padding: 32px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
}

.dashboard-hero::before {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 200px; height: 200px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}

.dashboard-hero::after {
  content: '';
  position: absolute;
  bottom: -60px; right: 60px;
  width: 160px; height: 160px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
}

.dashboard-hero h1 { font-size: 24px; font-weight: 800; margin-bottom: 6px; }
.dashboard-hero p { font-size: 14px; opacity: 0.8; margin: 0; }

/* ---- LOADING STATE ---- */
.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  z-index: 10;
}

/* ---- EMPTY STATE ---- */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--gray);
}

.empty-state i { font-size: 48px; opacity: 0.3; margin-bottom: 16px; }
.empty-state h4 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
.empty-state p { font-size: 14px; }

/* ---- ANIMATIONS ---- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-in { animation: fadeIn 0.4s ease forwards; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* ---- DETAIL CARD ---- */
.detail-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.detail-row:last-child { border-bottom: none; }
.detail-label { width: 140px; color: var(--gray); font-weight: 600; flex-shrink: 0; }
.detail-value { color: var(--dark); font-weight: 500; }

/* ---- BREADCRUMB ---- */
.breadcrumb {
  background: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
}

.breadcrumb-item a { color: var(--primary); text-decoration: none; }
.breadcrumb-item.active { color: var(--gray); }
.breadcrumb-item + .breadcrumb-item::before { color: var(--gray-light); }

/* ---- RESPONSIVE ---- */
@media (max-width: 991px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: var(--shadow-lg);
  }

  .main-wrapper {
    margin-left: 0;
  }

  .btn-menu-toggle {
    display: block;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .sidebar-overlay.show { display: block; }
}

/* ---- CHART WRAPPER ---- */
.chart-wrapper { position: relative; height: 280px; }

/* ---- STEP INDICATOR (form) ---- */
.step-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  gap: 0;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.step-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--border);
  color: var(--gray);
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step.active .step-num {
  background: var(--primary);
  color: white;
}

.step.done .step-num {
  background: var(--secondary);
  color: white;
}

.step-label { font-size: 12px; font-weight: 600; color: var(--gray); }
.step.active .step-label, .step.done .step-label { color: var(--dark); }

.step-line {
  flex: 1;
  height: 2px;
  background: var(--border);
  margin: 0 8px;
}

.step-line.done { background: var(--secondary); }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #9ca3af; }

---
```
Penjelasan : 
Kode CSS ini sebenarnya adalah sebuah design system modular yang dirancang untuk membangun antarmuka dashboard mahasiswa yang modern dan profesional dengan menerapkan prinsip clean UI dan best practices. Di bagian awal, penggunaan :root sangat krusial karena kita mendefinisikan variabel warna, shadow, dan radius secara terpusat, sehingga kalau nanti mau ganti tema aplikasi, kita nggak perlu repot mengubah ribuan baris kode satu per satu. Secara struktural, kode ini mengatur tata letak yang kompleks mulai dari sidebar yang fixed, topbar yang sticky, hingga main content yang fleksibel, lengkap dengan komponen UI interaktif seperti stat cards dengan efek hover yang dinamis serta tombol-tombol kustom yang memiliki transisi halus. Selain aspek estetika, kodenya juga sudah memperhatikan sisi user experience dan aksesibilitas melalui pengaturan tipografi dari Google Fonts serta fitur responsif menggunakan @media query yang memastikan tampilan web tetap rapi dan tidak "hancur" saat diakses melalui perangkat mobile atau tablet.

### Java script
Server.js
```css
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
```
penjelasan :
File server.js ini adalah backend atau "otak" dari aplikasi SiMAHA pakai framework Express.js. Tugas utamanya ada dua: pertama sebagai Router buat nganterin kita ke halaman HTML yang pas, dan kedua sebagai API Server yang ngurusin proses CRUD (simpan, edit, hapus data). Karena ini buat praktikum, datanya cuma disimpan di file mahasiswa.json (bukan database ribet), tapi logikanya sudah lengkap—mulai dari validasi NIM biar nggak ganda sampai perhitungan statistik otomatis. Tanpa file ini, semua tampilan keren yang kita buat tadi cuma bakal jadi pajangan yang nggak bisa diklik.

Main.js
```css
/* ============================================
   STUDENT MANAGEMENT SYSTEM - MAIN JS
   jQuery + jQuery Plugins + DataTable
   ============================================ */

// ====== GLOBAL UTILITIES ======

// Toast notification plugin (jQuery plugin)
$.fn.showToast = function(options) {
  const defaults = { type: 'success', title: 'Berhasil', message: '', duration: 3500 };
  const opts = $.extend({}, defaults, options);

  const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
  const colors = { success: '#0e9f6e', error: '#e02424', warning: '#d97706', info: '#1a56db' };

  const id = 'toast-' + Date.now();
  const html = `
    <div id="${id}" class="toast-custom mb-2 animate-in" style="border-left: 4px solid ${colors[opts.type]}">
      <span class="toast-icon" style="color:${colors[opts.type]}"><i class="bi ${icons[opts.type]}"></i></span>
      <div>
        <div class="toast-msg">${opts.title}</div>
        ${opts.message ? `<div class="toast-sub">${opts.message}</div>` : ''}
      </div>
      <button onclick="$('#${id}').remove()" class="ms-auto btn-close btn-close-sm" style="font-size:11px"></button>
    </div>`;

  $('#toast-container').prepend(html);
  setTimeout(() => $(`#${id}`).fadeOut(400, function() { $(this).remove(); }), opts.duration);
};

// Number counter animation (jQuery plugin)
$.fn.countUp = function(target, duration) {
  const $el = $(this);
  $({ counter: 0 }).animate({ counter: target }, {
    duration: duration || 1200,
    easing: 'swing',
    step: function() { $el.text(Math.ceil(this.counter)); }
  });
};

// ====== SIDEBAR TOGGLE ======
$(document).ready(function() {
  // Create overlay if not exists
  if (!$('.sidebar-overlay').length) {
    $('body').append('<div class="sidebar-overlay"></div>');
  }

  // Burger menu toggle
  $('#menuToggle').on('click', function() {
    $('.sidebar').toggleClass('open');
    $('.sidebar-overlay').toggleClass('show');
  });

  $('.sidebar-overlay').on('click', function() {
    $('.sidebar').removeClass('open');
    $(this).removeClass('show');
  });

  // Mark active link
  const currentPath = window.location.pathname;
  $('.sidebar-link').each(function() {
    const href = $(this).attr('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      $(this).addClass('active');
    } else if (href !== '/' && currentPath.startsWith(href)) {
      $(this).addClass('active');
    }
  });

  // Smooth transitions on all panels
  $('.panel, .stat-card').each(function(i) {
    $(this).addClass('animate-in').css('animation-delay', (i * 0.06) + 's');
  });
});

// ====== FORMAT UTILITIES ======
function getIPKClass(ipk) {
  if (ipk >= 3.75) return 'ipk-excellent';
  if (ipk >= 3.00) return 'ipk-good';
  if (ipk >= 2.50) return 'ipk-average';
  return 'ipk-low';
}

function getIPKLabel(ipk) {
  if (ipk >= 3.75) return 'Cumlaude';
  if (ipk >= 3.00) return 'Sangat Memuaskan';
  if (ipk >= 2.50) return 'Memuaskan';
  return 'Cukup';
}

function getStatusBadge(status) {
  const badges = {
    'Aktif': 'badge-aktif',
    'Cuti': 'badge-cuti',
    'Lulus': 'badge-lulus'
  };
  return `<span class="badge-status ${badges[status] || 'badge-aktif'}">${status}</span>`;
}

function getInitials(nama) {
  return nama.split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ====== CONFIRM DIALOG (jQuery plugin) ======
$.fn.confirmDelete = function(nama, onConfirm) {
  $('#confirmModal .confirm-name').text(nama);
  $('#confirmModal').modal('show');
  $('#btnConfirmDelete').off('click').on('click', function() {
    $('#confirmModal').modal('hide');
    onConfirm();
  });
};
```
Penjelasan : 
Script JavaScript ini bisa dibilang sebagai "otak" di balik layar yang bertugas menghidupkan elemen visual yang sudah kita buat di CSS, di mana kita belajar cara memanipulasi DOM menggunakan jQuery agar interaksi di aplikasi Student Management System ini terasa lebih smooth dan profesional. Di sini kita menggunakan konsep custom jQuery plugins untuk bikin fitur notifikasi toast dan animasi angka yang bisa dipanggil berulang kali, mengatur logika navigasi sidebar yang responsif (termasuk bikin overlay otomatis), hingga membuat fungsi utilitas pintar yang otomatis mengelompokkan warna IPK atau mengubah status mahasiswa menjadi badge yang rapi. Selain itu, ada juga logika untuk memberikan efek animasi fade-in yang berurutan pada setiap panel agar UI nggak kaku, serta integrasi modal konfirmasi buat fitur hapus data, yang semuanya dirancang supaya alur kerja aplikasi kita nggak cuma fungsional tapi juga punya user experience yang oke ala aplikasi web modern zaman sekarang.

Data.js
```css
/* ============================================
   DATA MAHASISWA - Page Script
   DataTables + CRUD operations
   ============================================ */


let dataTable;
let currentEditId = null;

$(document).ready(function () {
  initDataTable();
  bindEvents();
});

/* ---------- INISIALISASI DATATABLE ---------- */
function initDataTable() {
  dataTable = $('#mahasiswaTable').DataTable({
    ajax: {
      url: '/api/mahasiswa',
      dataSrc: 'data'
    },
    columns: [
      // No
      { data: null, render: (d, t, r, m) => m.row + 1 },
      // Nama & Email
      {
        data: null,
        render: (d, t, r) => `
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-initials" style="flex-shrink:0">${getInitials(r.nama)}</div>
            <div>
              <div style="font-weight:600;font-size:13px;color:var(--dark)">${r.nama}</div>
              <div style="font-size:11px;color:var(--gray)">${r.email}</div>
            </div>
          </div>`
      },
      // NIM
      { data: 'nim', render: d => `<code style="font-size:12px;background:var(--bg);padding:2px 8px;border-radius:6px;font-weight:600">${d}</code>` },
      // Jurusan
      { data: 'jurusan' },
      // Semester
      { data: 'semester', render: d => `<span class="badge" style="background:var(--primary-light);color:var(--primary);font-weight:700">${d}</span>` },
      // IPK
      {
        data: 'ipk',
        render: d => {
          const cls = getIPKClass(d);
          return `<span class="${cls}" style="font-family:'Space Grotesk',sans-serif">${d.toFixed(2)}</span>`;
        }
      },
      // Status
      { data: 'status', render: d => getStatusBadge(d) },
      // Tanggal daftar
      { data: 'createdAt', render: d => formatDate(d) },
      // Aksi
      {
        data: null,
        orderable: false,
        className: 'text-center',
        render: (d, t, r) => `
          <div class="d-flex justify-content-center gap-1">
            <button class="btn-sm-icon btn-view"   onclick="viewDetail('${r.id}')"              title="Lihat Detail"><i class="bi bi-eye"></i></button>
            <button class="btn-sm-icon btn-edit"   onclick="editMahasiswa('${r.id}')"           title="Edit"><i class="bi bi-pencil"></i></button>
            <button class="btn-sm-icon btn-delete" onclick="deleteMahasiswa('${r.id}','${r.nama}')" title="Hapus"><i class="bi bi-trash"></i></button>
          </div>`
      }
    ],
    dom: '<"d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"<"d-flex align-items-center gap-2"lB>f>rtip',
    buttons: [
      { extend: 'excelHtml5', text: '<i class="bi bi-file-earmark-excel me-1"></i>Excel', className: 'btn btn-sm', title: 'Data Mahasiswa SiMAHA' },
      { extend: 'print',      text: '<i class="bi bi-printer me-1"></i>Print',             className: 'btn btn-sm', title: 'Data Mahasiswa SiMAHA' }
    ],
    language: {
      search:      'Cari:',
      lengthMenu:  'Tampil _MENU_ data',
      info:        'Menampilkan _START_ - _END_ dari _TOTAL_ data',
      infoEmpty:   'Tidak ada data',
      paginate:    { previous: '‹', next: '›' },
      emptyTable:  'Belum ada data mahasiswa',
      loadingRecords: 'Memuat data...',
      processing:  'Memproses...',
      zeroRecords: 'Data tidak ditemukan'
    },
    pageLength: 10,
    responsive: true,
    drawCallback: function () {
      const api = this.api();
      const total = api.data().count();
      $('#totalCount').text(total + ' data');
    }
  });

  // Custom filter berdasarkan jurusan, status, semester
  $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
    const jurusan  = $('#filterJurusan').val();
    const status   = $('#filterStatus').val();
    const semester = $('#filterSemester').val();
    const row      = dataTable.row(dataIndex).data();
    if (!row) return true;
    if (jurusan  && row.jurusan  !== jurusan)   return false;
    if (status   && row.status   !== status)    return false;
    if (semester && row.semester != semester)   return false;
    return true;
  });
}

/* ---------- BINDING EVENTS ---------- */
function bindEvents() {
  // Filter dropdown
  $('#filterJurusan, #filterStatus, #filterSemester').on('change', function () {
    dataTable.draw();
  });

  // Reset filter
  $('#btnResetFilter').on('click', function () {
    $('#filterJurusan, #filterStatus, #filterSemester').val('');
    dataTable.draw();
    $(this).showToast({ type: 'info', title: 'Filter direset' });
  });

  // Tombol simpan edit
  $('#btnSaveEdit').on('click', function () {
    saveEdit();
  });

  // Tekan Enter di modal edit
  $('#editModal input').on('keypress', function (e) {
    if (e.which === 13) saveEdit();
  });
}

/* ---------- LIHAT DETAIL ---------- */
function viewDetail(id) {
  currentEditId = id;
  $('#detailBody').html('<div class="text-center py-3"><div class="spinner-border text-primary"></div></div>');
  $('#detailModal').modal('show');

  $.getJSON('/api/mahasiswa/' + id, function (res) {
    const m = res.data;
    const ipkLabel = getIPKLabel(m.ipk);
    $('#detailBody').html(`
      <div class="text-center mb-4">
        <div class="avatar-initials mx-auto mb-2" style="width:64px;height:64px;font-size:24px;background:linear-gradient(135deg,#1a56db,#4f46e5);color:white">
          ${getInitials(m.nama)}
        </div>
        <h5 style="font-weight:800;margin-bottom:4px">${m.nama}</h5>
        <div>${getStatusBadge(m.status)}</div>
      </div>
      <div class="detail-row"><span class="detail-label">NIM</span>     <span class="detail-value"><code>${m.nim}</code></span></div>
      <div class="detail-row"><span class="detail-label">Email</span>   <span class="detail-value">${m.email}</span></div>
      <div class="detail-row"><span class="detail-label">Jurusan</span> <span class="detail-value">${m.jurusan}</span></div>
      <div class="detail-row"><span class="detail-label">Semester</span><span class="detail-value">Semester ${m.semester}</span></div>
      <div class="detail-row">
        <span class="detail-label">IPK</span>
        <span class="detail-value">
          <span class="${getIPKClass(m.ipk)}" style="font-size:18px;font-family:'Space Grotesk',sans-serif">${m.ipk.toFixed(2)}</span>
          <span class="ms-2 badge" style="background:var(--secondary-light);color:var(--secondary);font-size:11px">${ipkLabel}</span>
        </span>
      </div>
      <div class="detail-row"><span class="detail-label">Terdaftar</span> <span class="detail-value">${formatDate(m.createdAt)}</span></div>
      ${m.updatedAt ? `<div class="detail-row"><span class="detail-label">Diperbarui</span><span class="detail-value">${formatDate(m.updatedAt)}</span></div>` : ''}
    `);
  });

  $('#btnGoEdit').off('click').on('click', function () {
    $('#detailModal').modal('hide');
    setTimeout(() => editMahasiswa(id), 300);
  });
}

/* ---------- EDIT MAHASISWA ---------- */
function editMahasiswa(id) {
  currentEditId = id;
  $.getJSON('/api/mahasiswa/' + id, function (res) {
    const m = res.data;
    $('#editId').val(m.id);
    $('#editNim').val(m.nim);
    $('#editNama').val(m.nama);
    $('#editEmail').val(m.email);
    $('#editJurusan').val(m.jurusan);
    $('#editSemester').val(m.semester);
    $('#editIPK').val(m.ipk);
    $('#editStatus').val(m.status);
    $('#editModal').modal('show');
  }).fail(function () {
    $('body').showToast({ type: 'error', title: 'Error', message: 'Gagal memuat data' });
  });
}

function saveEdit() {
  const id   = $('#editId').val();
  const data = {
    nim:      $('#editNim').val().trim(),
    nama:     $('#editNama').val().trim(),
    email:    $('#editEmail').val().trim(),
    jurusan:  $('#editJurusan').val(),
    semester: $('#editSemester').val(),
    ipk:      $('#editIPK').val(),
    status:   $('#editStatus').val()
  };

  if (!data.nim || !data.nama || !data.email || !data.ipk) {
    $('body').showToast({ type: 'warning', title: 'Validasi', message: 'Semua field wajib diisi!' });
    return;
  }

  $('#btnSaveEdit').prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1"></span>Menyimpan...');

  $.ajax({
    url: '/api/mahasiswa/' + id,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (res) {
      $('#editModal').modal('hide');
      dataTable.ajax.reload(null, false);
      $('body').showToast({ type: 'success', title: 'Berhasil!', message: res.message });
    },
    error: function (xhr) {
      const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Terjadi kesalahan server';
      $('body').showToast({ type: 'error', title: 'Gagal', message: msg });
    },
    complete: function () {
      $('#btnSaveEdit').prop('disabled', false).html('<i class="bi bi-save"></i> Simpan Perubahan');
    }
  });
}

/* ---------- HAPUS MAHASISWA ---------- */
function deleteMahasiswa(id, nama) {
  $('body').confirmDelete(nama, function () {
    $.ajax({
      url: '/api/mahasiswa/' + id,
      method: 'DELETE',
      success: function (res) {
        dataTable.ajax.reload(null, false);
        $('body').showToast({ type: 'success', title: 'Dihapus!', message: res.message });
      },
      error: function () {
        $('body').showToast({ type: 'error', title: 'Error', message: 'Gagal menghapus data' });
      }
    });
  });
}
```
Penjelasan : 
Script ini adalah bagian inti yang menangani manipulasi data secara dinamis menggunakan library DataTables, di mana kita belajar bagaimana mengintegrasikan front-end dengan back-end melalui request AJAX agar proses CRUD (Create, Read, Update, Delete) bisa berjalan lancar tanpa perlu refresh halaman sama sekali. Di sini kita mempraktikkan cara melakukan custom rendering pada kolom tabel untuk menampilkan elemen UI yang cantik seperti avatar inisial dan badge status, menerapkan sistem filter kustom untuk menyaring data mahasiswa berdasarkan kategori tertentu, hingga mengelola interaksi modal untuk fungsi edit dan hapus yang sudah dilengkapi dengan validasi input serta feedback visual berupa loading spinner dan toast notification. Intinya, melalui kode ini kita belajar cara membangun aplikasi web yang reaktif dan efisien dalam mengelola database, sebuah skill fundamental yang sangat krusial buat kita sebagai mahasiswa yang ingin terjun ke dunia pengembangan aplikasi profesional.

form.js
```css
/* ============================================
   TAMBAH MAHASISWA - Page Script
   ============================================ */

let nimTimeout;

$(document).ready(function () {
  updatePreview();
  bindFormEvents();
});

/* ---------- BINDING EVENTS ---------- */
function bindFormEvents() {

  // Navigasi step
  $('#btnStep1Next').on('click', validateStep1);
  $('#btnStep2Back').on('click', goToStep1);
  $('#btnSubmit').on('click', submitForm);

  // Live preview saat input berubah
  $('#nim, #nama, #email, #jurusan, #semester, #status').on('input change', updatePreview);

  // Hitung karakter nama
  $('#nama').on('input', function () {
    $('#namaCount').text($(this).val().length);
    updatePreview();
  });

  // Cek ketersediaan NIM (debounce 600ms)
  $('#nim').on('input', function () {
    clearTimeout(nimTimeout);
    const val = $(this).val().trim();
    if (val.length < 3) { $('#nimCheck').html(''); return; }
    nimTimeout = setTimeout(() => checkNIM(val), 600);
    updatePreview();
  });

  // Slider IPK
  $('#ipkRange').on('input', function () {
    const val = parseFloat($(this).val());
    $('#ipk').val(val);
    updateIPKDisplay(val);
    updatePreview();
  });

  // jQuery UI autocomplete pada field nama
  $('#nama').autocomplete({
    source: function (req, res) {
      const prefixes = ['Muhammad ', 'Ahmad ', 'Nur ', 'Siti ', 'Rizki ', 'Dian '];
      const matches = prefixes.filter(p =>
        p.toLowerCase().startsWith(req.term.toLowerCase())
      );
      res(matches.map(m => ({ label: m + '...', value: m })));
    },
    minLength: 2,
    delay: 300
  });

  // Konfirmasi keluar jika ada data yang belum disimpan
  $(window).on('beforeunload', function () {
    const hasData = $('#nim').val() || $('#nama').val();
    if (hasData && !$('#successModal').hasClass('show')) {
      return 'Data belum disimpan. Yakin ingin keluar?';
    }
  });

  // Tombol "Tambah Lagi" di modal sukses
  $('#btnAddAnother').on('click', function () {
    $('#successModal').modal('hide');
    resetForm();
  });
}

/* ---------- CEK NIM ---------- */
function checkNIM(nim) {
  $.getJSON('/api/mahasiswa', function (res) {
    const exists = res.data.some(m => m.nim === nim);
    if (exists) {
      $('#nimCheck')
        .html('<i class="bi bi-x-circle-fill me-1"></i>NIM sudah terdaftar!')
        .addClass('nim-taken').removeClass('nim-available');
    } else {
      $('#nimCheck')
        .html('<i class="bi bi-check-circle-fill me-1"></i>NIM tersedia')
        .addClass('nim-available').removeClass('nim-taken');
    }
  });
}

/* ---------- UPDATE TAMPILAN IPK ---------- */
function updateIPKDisplay(val) {
  const cls   = getIPKClass(val);
  const label = getIPKLabel(val);
  $('#ipkDisplay').attr('class', cls).text(val.toFixed(2));
  $('#ipkLabel').text(label);
}

/* ---------- UPDATE PREVIEW KARTU ---------- */
function updatePreview() {
  const nama     = $('#nama').val().trim()      || 'Nama Mahasiswa';
  const nim      = $('#nim').val().trim()       || '——';
  const email    = $('#email').val().trim()     || '——';
  const jurusan  = $('#jurusan').val()          || '——';
  const semester = $('#semester').val()         || '—';
  const ipk      = parseFloat($('#ipkRange').val()).toFixed(2);
  const status   = $('#status').val()           || 'Aktif';

  $('#previewInitials').text(nama !== 'Nama Mahasiswa' ? getInitials(nama) : '?');
  $('#previewNama').text(nama);
  $('#previewNim').text('NIM: ' + nim);
  $('#previewEmail').text(email);
  $('#previewJurusan').text(jurusan);
  $('#previewSemester').text(semester);
  $('#previewIPK').text(ipk);
  $('#previewStatus').text(status);
}

/* ---------- VALIDASI STEP 1 ---------- */
function validateStep1() {
  const nim  = $('#nim').val().trim();
  const nama = $('#nama').val().trim();
  const email = $('#email').val().trim();

  let isValid = true;
  $('.form-control').removeClass('is-invalid');

  if (!nim  || nim.length  < 5) { $('#nim').addClass('is-invalid');   isValid = false; }
  if (!nama || nama.length < 3) { $('#nama').addClass('is-invalid');  isValid = false; }
  if (!email || !email.includes('@')) { $('#email').addClass('is-invalid'); isValid = false; }

  if (!isValid) {
    $('body').showToast({ type: 'warning', title: 'Form Belum Lengkap', message: 'Periksa kembali field yang ditandai merah' });
    $('#formStep1').effect && $('#formStep1').effect('shake', { times: 2, distance: 5 }, 300);
    return;
  }

  if ($('#nimCheck').hasClass('nim-taken')) {
    $('body').showToast({ type: 'error', title: 'NIM Sudah Dipakai', message: 'Gunakan NIM yang berbeda' });
    return;
  }

  goToStep2();
}

/* ---------- NAVIGASI STEP ---------- */
function goToStep2() {
  $('#formStep1').hide();
  $('#formStep2').addClass('active').show();
  $('#step2Indicator').addClass('active');
  $('#stepLine1').addClass('done');
  $('#stepLabel').text('Langkah 2 / 2');
  updateIPKDisplay(parseFloat($('#ipkRange').val()));
}

function goToStep1() {
  $('#formStep2').hide();
  $('#formStep1').show();
  $('#step2Indicator').removeClass('done');
  $('#stepLabel').text('Langkah 1 / 2');
}

/* ---------- SUBMIT FORM ---------- */
function submitForm() {
  const jurusan  = $('#jurusan').val();
  const semester = $('#semester').val();

  if (!jurusan || !semester) {
    $('body').showToast({ type: 'warning', title: 'Form Belum Lengkap', message: 'Pilih jurusan dan semester' });
    if (!jurusan)  $('#jurusan').addClass('is-invalid');
    if (!semester) $('#semester').addClass('is-invalid');
    return;
  }

  const data = {
    nim:      $('#nim').val().trim(),
    nama:     $('#nama').val().trim(),
    email:    $('#email').val().trim(),
    jurusan,
    semester,
    ipk:      parseFloat($('#ipkRange').val()),
    status:   $('#status').val()
  };

  $('#btnSubmit').prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...');

  $.ajax({
    url: '/api/mahasiswa',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (res) {
      $(window).off('beforeunload');
      $('#successMsg').text(`Data ${res.data.nama} (${res.data.nim}) berhasil disimpan.`);
      $('#successModal').modal('show');
    },
    error: function (xhr) {
      const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Terjadi kesalahan server';
      $('body').showToast({ type: 'error', title: 'Gagal Menyimpan', message: msg });
    },
    complete: function () {
      $('#btnSubmit').prop('disabled', false).html('<i class="bi bi-check-circle me-1"></i>Simpan Data Mahasiswa');
    }
  });
}

/* ---------- RESET FORM ---------- */
function resetForm() {
  $('#nim, #nama, #email').val('');
  $('#jurusan, #semester').val('');
  $('#status').val('Aktif');
  $('#ipkRange').val(3.00);
  $('#ipk').val(3.00);
  $('#namaCount').text(0);
  $('#nimCheck').html('');
  $('.form-control, .form-select').removeClass('is-invalid');
  goToStep1();
  updatePreview();
  updateIPKDisplay(3.00);
}
```
penjelasan : 
Script ini fokus pada pembuatan form tambah mahasiswa yang lebih interaktif dengan konsep multi-step form, di mana kita belajar mengelola alur pengisian data agar tidak membosankan bagi user dengan membaginya ke dalam beberapa langkah navigasi. Di sini kita menerapkan teknik live preview yang sangat keren karena data yang diketik langsung muncul di kartu pratinjau secara real-time, serta menggunakan teknik debounce pada fitur cek ketersediaan NIM supaya aplikasi tidak boros melakukan request ke server setiap kali satu huruf diketik. Selain itu, kita juga belajar hal-hal detail untuk meningkatkan User Experience (UX) seperti autocomplete untuk saran nama, penggunaan slider untuk input IPK yang interaktif, hingga proteksi data menggunakan event beforeunload supaya data yang sudah capek-capek diisi tidak hilang jika kita tidak sengaja menutup tab. Secara keseluruhan, logika di script ini mengajarkan kita cara menangani validasi input di tiap tahapan sebelum akhirnya semua data dikumpulkan, dibungkus dalam format JSON, dan ditembak ke API melalui metode POST, lengkap dengan penanganan respon sukses berupa modal konfirmasi yang membuat aplikasi kita terasa sangat profesional.

index.js
```css
/* ============================================
   DASHBOARD - Page Script
   ============================================ */

$(document).ready(function () {

  // Set tanggal hari ini di hero
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $('#heroDate').text('Universitas Nusantara — ' + now.toLocaleDateString('id-ID', opts));

  // Load statistik
  $.getJSON('/api/statistik', function (stats) {

    // Animate counters
    $('#statTotal').countUp(stats.total);
    $('#statAktif').countUp(stats.aktif);
    $('#statCuti').countUp(stats.cuti);
    $('#totalBadge').html(`<i class="bi bi-people-fill"></i> ${stats.total} mahasiswa`);

    // Animasi IPK
    let ipkVal = parseFloat(stats.avgIPK);
    $({ n: 0 }).animate({ n: ipkVal }, {
      duration: 1200,
      step: function () {
        $('#statAvgIPK').text(this.n.toFixed(2));
      }
    });
    $('#statIPKLabel').html(
      '<i class="bi bi-award-fill"></i> ' + (ipkVal >= 3.5 ? 'Sangat Baik' : 'Baik')
    );

    // Distribusi jurusan (progress bar)
    const colors = ['#1a56db', '#0e9f6e', '#7e3af2', '#d97706', '#e02424'];
    const jurusanEntries = Object.entries(stats.byJurusan);
    let jurusanHtml = '';
    jurusanEntries.forEach(([jurusan, count], i) => {
      const pct = Math.round((count / stats.total) * 100);
      jurusanHtml += `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span style="font-size:13px;font-weight:600;color:var(--dark)">${jurusan}</span>
            <span style="font-size:13px;font-weight:700;color:${colors[i % colors.length]}">${count} (${pct}%)</span>
          </div>
          <div class="progress">
            <div class="progress-bar" style="width:${pct}%;background:${colors[i % colors.length]};transition:width 1s ease ${i * 0.15}s"></div>
          </div>
        </div>`;
    });
    $('#jurusanList').html(jurusanHtml);
  });

  // Load 6 mahasiswa terbaru
  $.getJSON('/api/mahasiswa', function (res) {
    const recent = res.data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    let html = '';
    recent.forEach(m => {
      html += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="avatar-initials">${getInitials(m.nama)}</div>
              <div>
                <div style="font-weight:600;font-size:13px">${m.nama}</div>
                <div style="font-size:11px;color:var(--gray)">${m.nim}</div>
              </div>
            </div>
          </td>
          <td style="font-size:13px">${m.jurusan.replace('Teknik ', 'T. ').replace('Sistem ', 'Sis. ')}</td>
          <td><span class="${getIPKClass(m.ipk)}">${m.ipk.toFixed(2)}</span></td>
          <td>${getStatusBadge(m.status)}</td>
        </tr>`;
    });

    $('#recentBody').html(
      html || '<tr><td colspan="4" class="text-center py-4 text-muted">Belum ada data</td></tr>'
    );
  });

});
```
penjelasan : 
Script dashboard ini adalah implementasi nyata dari konsep visualisasi data sederhana di sisi front-end, di mana kita belajar bagaimana mengolah raw data dari API menjadi informasi yang intuitif dan menarik bagi user melalui teknik manipulasi DOM yang dinamis. Di sini kita mempraktikkan cara melakukan asynchronous request untuk menarik statistik mahasiswa, lalu menyajikannya lewat komponen interaktif seperti animasi counter yang bergerak naik, progress bar yang menunjukkan distribusi jurusan secara otomatis, hingga penyaringan data terbaru menggunakan fungsi sort dan slice pada array JavaScript. Selain memperdalam pemahaman soal integrasi data, kode ini juga mengajarkan kita pentingnya menjaga estetika UX dengan memberikan sentuhan loading transition dan pembersihan teks (seperti menyingkat nama jurusan) agar informasi yang ditampilkan di dashboard tetap padat, jelas, dan terlihat profesional layaknya aplikasi sistem informasi kampus yang sesungguhnya.

Statistik.js
```css
/* ============================================
   STATISTIK (statistik.html) - Page Script
   Chart.js — doughnut, bar, pie, histogram
   ============================================ */

let charts = {};

const COLORS = {
  blue:   '#1a56db',
  green:  '#0e9f6e',
  purple: '#7e3af2',
  yellow: '#d97706',
  red:    '#e02424',
  cyan:   '#0891b2'
};

$(document).ready(function () {
  loadStats();

  // Tombol refresh
  $('#btnRefresh').on('click', function () {
    Object.values(charts).forEach(c => c.destroy());
    charts = {};
    loadStats();
    $('body').showToast({ type: 'info', title: 'Data diperbarui' });
  });
});

/* ---------- LOAD SEMUA DATA STATISTIK ---------- */
function loadStats() {
  $.when(
    $.getJSON('/api/statistik'),
    $.getJSON('/api/mahasiswa')
  ).done(function (statsRes, mahasiswaRes) {
    const stats   = statsRes[0];
    const allData = mahasiswaRes[0].data;

    renderSummary(stats);
    renderChartJurusan(stats);
    renderChartSemester(stats);
    renderChartStatus(stats);
    renderChartIPK(allData);

  }).fail(function () {
    $('body').showToast({ type: 'error', title: 'Error', message: 'Gagal memuat data statistik' });
  });
}

/* ---------- SUMMARY COUNTER ---------- */
function renderSummary(stats) {
  $('#sTotal').countUp(stats.total);
  $('#sAktif').countUp(stats.aktif);
  $('#sCuti').countUp(stats.cuti);
  $({ n: 0 }).animate({ n: parseFloat(stats.avgIPK) }, {
    duration: 1200,
    step: function () { $('#sIPK').text(this.n.toFixed(2)); }
  });
}

/* ---------- CHART 1: DOUGHNUT JURUSAN ---------- */
function renderChartJurusan(stats) {
  const labels = Object.keys(stats.byJurusan);
  const data   = Object.values(stats.byJurusan);

  charts.jurusan = new Chart($('#chartJurusan')[0], {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [COLORS.blue, COLORS.green, COLORS.purple, COLORS.yellow],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 12 }, padding: 16 } },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} mahasiswa` } }
      },
      animation: { animateRotate: true, duration: 1000 }
    }
  });
}

/* ---------- CHART 2: BAR SEMESTER ---------- */
function renderChartSemester(stats) {
  const semLabels = Object.keys(stats.bySemester).sort();
  const semData   = semLabels.map(k => stats.bySemester[k]);

  charts.semester = new Chart($('#chartSemester')[0], {
    type: 'bar',
    data: {
      labels: semLabels,
      datasets: [{
        label: 'Jumlah Mahasiswa',
        data: semData,
        backgroundColor: semLabels.map((_, i) => i % 2 === 0 ? COLORS.blue : '#4f46e5'),
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.raw} mahasiswa` } }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Plus Jakarta Sans' } }, grid: { color: '#f3f4f6' } },
        x: { ticks: { font: { family: 'Plus Jakarta Sans', size: 12 } }, grid: { display: false } }
      },
      animation: { duration: 1000, easing: 'easeOutBounce' }
    }
  });
}

/* ---------- CHART 3: PIE STATUS ---------- */
function renderChartStatus(stats) {
  charts.status = new Chart($('#chartStatus')[0], {
    type: 'pie',
    data: {
      labels: ['Aktif', 'Cuti', 'Lulus'],
      datasets: [{
        data: [stats.aktif, stats.cuti, stats.lulus || 0],
        backgroundColor: [COLORS.green, COLORS.yellow, COLORS.purple],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 12 }, padding: 16 } }
      },
      animation: { duration: 1000 }
    }
  });
}

/* ---------- CHART 4: BAR DISTRIBUSI IPK ---------- */
function renderChartIPK(allData) {
  const ipkRanges = ['< 2.00', '2.00 - 2.49', '2.50 - 2.99', '3.00 - 3.49', '3.50 - 3.74', '≥ 3.75'];
  const ipkCounts = [0, 0, 0, 0, 0, 0];

  allData.forEach(m => {
    const ipk = m.ipk;
    if      (ipk < 2.00) ipkCounts[0]++;
    else if (ipk < 2.50) ipkCounts[1]++;
    else if (ipk < 3.00) ipkCounts[2]++;
    else if (ipk < 3.50) ipkCounts[3]++;
    else if (ipk < 3.75) ipkCounts[4]++;
    else                 ipkCounts[5]++;
  });

  charts.ipk = new Chart($('#chartIPK')[0], {
    type: 'bar',
    data: {
      labels: ipkRanges,
      datasets: [{
        label: 'Jumlah Mahasiswa',
        data: ipkCounts,
        backgroundColor: [COLORS.red, COLORS.yellow, '#f59e0b', COLORS.blue, COLORS.cyan, COLORS.green],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.raw} mahasiswa` } }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1, font: { family: 'Plus Jakarta Sans' } }, grid: { color: '#f3f4f6' } },
        x: { ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }, grid: { display: false } }
      },
      animation: { duration: 1200 }
    }
  });
}
```
Penjelasan :
Script statistik ini mengajarkan kita cara mengimplementasikan data visualization yang kompleks menggunakan library Chart.js, di mana kita belajar menangani beberapa request API sekaligus secara asynchronous menggunakan fungsi $.when agar semua data dari server siap sebelum grafik dirender ke layar. Di sini kita tidak hanya menampilkan data mentah, tapi juga melakukan pemrosesan data (seperti pengelompokan rentang IPK menggunakan logika looping dan if-else) untuk diubah menjadi berbagai jenis grafik mulai dari doughnut, bar, hingga pie chart yang interaktif dan enak dipandang. Selain itu, kita juga belajar teknik manajemen memori sederhana melalui fungsi destroy() pada objek grafik saat melakukan refresh data agar tidak terjadi penumpukan (glitch) pada elemen canvas, sehingga aplikasi tetap ringan dan memberikan pengalaman visual yang sangat informatif serta profesional bagi pengguna.

### 3. HTML (Struktur Halaman)
Data.html
```css
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Mahasiswa | SiMAHA</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">🎓</div>
    <h2>SiMAHA</h2>
    <p>Sistem Manajemen Mahasiswa</p>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">Menu Utama</div>
    <a href="/" class="sidebar-link"><i class="bi bi-grid-1x2-fill"></i> Dashboard</a>
    <a href="/data" class="sidebar-link"><i class="bi bi-table"></i> Data Mahasiswa</a>
    <a href="/tambah" class="sidebar-link"><i class="bi bi-person-plus-fill"></i> Tambah Mahasiswa</a>
    <div class="nav-section-label mt-2">Laporan</div>
    <a href="/statistik" class="sidebar-link"><i class="bi bi-bar-chart-fill"></i> Statistik & Grafik</a>
  </nav>
  <div class="sidebar-footer">
    <div>© 2024 SiMAHA v1.0</div>
    <div>Tugas Praktikum Web</div>
  </div>
</aside>
<div class="sidebar-overlay"></div>

<!-- MAIN -->
<div class="main-wrapper">
  <header class="topbar">
    <div class="topbar-left">
      <button class="btn-menu-toggle" id="menuToggle"><i class="bi bi-list"></i></button>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
            <li class="breadcrumb-item active">Data Mahasiswa</li>
          </ol>
        </nav>
        <div class="topbar-title">Data Mahasiswa</div>
      </div>
    </div>
    <div class="topbar-right">
      <a href="/tambah" class="btn btn-primary-custom btn-sm d-none d-md-flex">
        <i class="bi bi-plus-lg"></i> Tambah Baru
      </a>
    </div>
  </header>

  <main class="page-content">
    <!-- FILTER BAR -->
    <div class="panel mb-4 animate-in">
      <div class="panel-body py-3">
        <div class="row g-2 align-items-center">
          <div class="col-12 col-sm-6 col-md-3">
            <select class="form-select form-select-sm" id="filterJurusan">
              <option value="">Semua Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Manajemen Informatika">Manajemen Informatika</option>
            </select>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <select class="form-select form-select-sm" id="filterStatus">
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Lulus">Lulus</option>
            </select>
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <select class="form-select form-select-sm" id="filterSemester">
              <option value="">Semua Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
          <div class="col-12 col-sm-6 col-md-3 text-end">
            <button id="btnResetFilter" class="btn btn-sm" style="background:var(--bg);border:1.5px solid var(--border);font-size:13px;font-weight:600;border-radius:8px">
              <i class="bi bi-x-circle"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DATA TABLE PANEL -->
    <div class="panel animate-in delay-1">
      <div class="panel-header">
        <span class="panel-title"><i class="bi bi-people-fill text-primary"></i> Daftar Mahasiswa</span>
        <div class="d-flex gap-2 align-items-center">
          <span class="badge bg-primary rounded-pill" id="totalCount" style="font-size:12px">0 data</span>
          <a href="/tambah" class="btn btn-primary-custom btn-sm d-md-none">
            <i class="bi bi-plus-lg"></i>
          </a>
        </div>
      </div>
      <div class="table-responsive">
        <table id="mahasiswaTable" class="table table-custom w-100">
          <thead>
            <tr>
              <th>No</th>
              <th>Mahasiswa</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Sem</th>
              <th>IPK</th>
              <th>Status</th>
              <th>Terdaftar</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </main>
</div>

<!-- MODAL: DETAIL VIEW -->
<div class="modal fade" id="detailModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header" style="background:linear-gradient(135deg,#1a56db,#4f46e5);color:white">
        <h5 class="modal-title text-white"><i class="bi bi-person-circle me-2"></i>Detail Mahasiswa</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4" id="detailBody">
        <div class="text-center py-3"><div class="spinner-border text-primary"></div></div>
      </div>
      <div class="modal-footer">
        <button class="btn" data-bs-dismiss="modal" style="background:var(--bg);border:1.5px solid var(--border);font-weight:600">Tutup</button>
        <button class="btn btn-primary-custom" id="btnGoEdit"><i class="bi bi-pencil"></i> Edit Data</button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL: EDIT -->
<div class="modal fade" id="editModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-pencil-square me-2 text-primary"></i>Edit Data Mahasiswa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4">
        <input type="hidden" id="editId">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">NIM <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="editNim" placeholder="Contoh: 2021001">
          </div>
          <div class="col-md-6">
            <label class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="editNama" placeholder="Nama lengkap mahasiswa">
          </div>
          <div class="col-md-6">
            <label class="form-label">Email <span class="text-danger">*</span></label>
            <input type="email" class="form-control" id="editEmail" placeholder="email@student.ac.id">
          </div>
          <div class="col-md-6">
            <label class="form-label">Jurusan <span class="text-danger">*</span></label>
            <select class="form-select" id="editJurusan">
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Manajemen Informatika">Manajemen Informatika</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Semester <span class="text-danger">*</span></label>
            <select class="form-select" id="editSemester">
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">IPK <span class="text-danger">*</span></label>
            <input type="number" class="form-control" id="editIPK" min="0" max="4" step="0.01" placeholder="0.00 - 4.00">
          </div>
          <div class="col-md-4">
            <label class="form-label">Status <span class="text-danger">*</span></label>
            <select class="form-select" id="editStatus">
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Lulus">Lulus</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn" data-bs-dismiss="modal" style="background:var(--bg);border:1.5px solid var(--border);font-weight:600">Batal</button>
        <button class="btn btn-primary-custom" id="btnSaveEdit"><i class="bi bi-save"></i> Simpan Perubahan</button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL: CONFIRM DELETE -->
<div class="modal fade" id="confirmModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-body text-center p-4">
        <div style="font-size:52px;margin-bottom:12px">🗑️</div>
        <h5 style="font-weight:700;margin-bottom:8px">Hapus Data?</h5>
        <p style="font-size:14px;color:var(--gray);margin-bottom:0">
          Data mahasiswa <strong class="confirm-name text-dark"></strong> akan dihapus secara permanen.
        </p>
      </div>
      <div class="modal-footer border-0 justify-content-center gap-2 pt-0">
        <button class="btn" data-bs-dismiss="modal" style="background:var(--bg);border:1.5px solid var(--border);font-weight:600;min-width:90px">Batal</button>
        <button class="btn btn-danger-custom" id="btnConfirmDelete" style="min-width:90px"><i class="bi bi-trash"></i> Hapus</button>
      </div>
    </div>
  </div>
</div>

<!-- TOAST -->
<div id="toast-container" class="toast-container position-fixed top-0 end-0 p-3"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
<script src="/js/main.js"></script>
<script src="/js/data.js"></script>
</body>
</html>
```
penjelasan :
Jadi, kalau kita bedah kode HTML ini, intinya ini adalah kerangka dashboard admin buat proyek SiMAHA (Sistem Manajemen Mahasiswa) kita. Strukturnya udah pakai standar industri karena kita manfaatin Bootstrap 5 biar tampilannya langsung rapi, clean, dan pastinya mobile-friendly tanpa harus ribet ngoding CSS dari nol. Fokus utamanya ada di bagian tengah, yaitu tabel data mahasiswa yang dibungkus sama library DataTables. Ini ngebantu banget karena dengan library itu, tabel kita otomatis punya fitur pencarian, sortir, sampai fitur ekspor data ke Excel atau PDF secara instan.

Di sisi kiri, kita punya Sidebar yang berfungsi sebagai navigasi utama buat pindah-pindah menu, sementara di bagian atas ada Topbar yang ngasih tahu posisi kita lewat breadcrumb. Menariknya, di atas tabel ada Filter Bar yang isinya dropdown jurusan, status, dan semester. Ini penting banget dari sisi User Experience (UX) supaya kalau datanya sudah ribuan, kita bisa nyaring informasi dengan cepat tanpa perlu scroll manual. Jadi, tampilannya nggak cuma sekadar 'nampilin data', tapi beneran dirancang fungsional buat admin.

Terakhir, buat urusan interaksi data atau operasi CRUD (Create, Read, Update, Delete), kodenya sudah nyiapin tiga Modal atau jendela pop-up. Ada modal buat liat detail profil, modal buat edit data yang isinya form lengkap, sampai modal konfirmasi hapus biar nggak kejadian salah klik data. Di bagian paling bawah, semua 'mesin' utamanya kayak jQuery, Bootstrap JS, dan plugin DataTables sudah dipanggil, jadi kita tinggal fokus ngurusin logika di file data.js buat narik data aslinya. Secara keseluruhan, ini sudah jadi pondasi atau boilerplate yang mantap banget buat level tugas praktikum web.

Form.html
```css
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tambah Mahasiswa | SiMAHA</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui/1.13.2/themes/base/jquery-ui.min.css">
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .char-count  { font-size: 11px; color: var(--gray); }
    .field-hint  { font-size: 11px; color: var(--gray-light); margin-top: 4px; }
    .ipk-preview {
      padding: 16px;
      border-radius: 10px;
      background: var(--bg);
      border: 1.5px solid var(--border);
      text-align: center;
      transition: all 0.3s;
    }
    .preview-card {
      background: linear-gradient(135deg, #1a56db, #4f46e5);
      border-radius: 16px;
      padding: 24px;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .preview-card::before {
      content: '';
      position: absolute;
      top: -30px; right: -30px;
      width: 100px; height: 100px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
    .form-step         { display: none; }
    .form-step.active  { display: block; }
    .nim-check         { font-size: 12px; margin-top: 4px; }
    .nim-available     { color: var(--secondary); }
    .nim-taken         { color: var(--danger); }
  </style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">🎓</div>
    <h2>SiMAHA</h2>
    <p>Sistem Manajemen Mahasiswa</p>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">Menu Utama</div>
    <a href="/" class="sidebar-link"><i class="bi bi-grid-1x2-fill"></i> Dashboard</a>
    <a href="/data" class="sidebar-link"><i class="bi bi-table"></i> Data Mahasiswa</a>
    <a href="/tambah" class="sidebar-link"><i class="bi bi-person-plus-fill"></i> Tambah Mahasiswa</a>
    <div class="nav-section-label mt-2">Laporan</div>
    <a href="/statistik" class="sidebar-link"><i class="bi bi-bar-chart-fill"></i> Statistik &amp; Grafik</a>
  </nav>
  <div class="sidebar-footer">
    <div>© 2024 SiMAHA v1.0</div>
    <div>Tugas Praktikum Web</div>
  </div>
</aside>
<div class="sidebar-overlay"></div>

<!-- MAIN -->
<div class="main-wrapper">
  <header class="topbar">
    <div class="topbar-left">
      <button class="btn-menu-toggle" id="menuToggle"><i class="bi bi-list"></i></button>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="/data">Data Mahasiswa</a></li>
            <li class="breadcrumb-item active">Tambah Baru</li>
          </ol>
        </nav>
        <div class="topbar-title">Tambah Mahasiswa</div>
      </div>
    </div>
  </header>

  <main class="page-content">
    <div class="row g-4">

      <!-- FORM -->
      <div class="col-lg-7">
        <div class="panel animate-in">
          <div class="panel-header">
            <span class="panel-title"><i class="bi bi-person-plus-fill text-primary"></i> Form Pendaftaran Mahasiswa</span>
            <span class="badge" style="background:var(--primary-light);color:var(--primary);font-size:12px" id="stepLabel">Langkah 1 / 2</span>
          </div>
          <div class="panel-body">
            <!-- Step Indicator -->
            <div class="step-indicator mb-4">
              <div class="step active" id="step1Indicator">
                <div class="step-num">1</div>
                <div class="step-label">Data Pribadi</div>
              </div>
              <div class="step-line" id="stepLine1"></div>
              <div class="step active" id="step2Indicator">
                <div class="step-num">2</div>
                <div class="step-label">Data Akademik</div>
              </div>
            </div>

            <!-- STEP 1: Data Pribadi -->
            <div class="form-step active" id="formStep1">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">NIM (Nomor Induk Mahasiswa) <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-card-text"></i></span>
                    <input type="text" class="form-control" id="nim" placeholder="Contoh: 2024001" maxlength="10">
                  </div>
                  <div class="nim-check" id="nimCheck"></div>
                  <div class="field-hint">NIM harus unik, 6-10 karakter angka</div>
                </div>
                <div class="col-12">
                  <label class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input type="text" class="form-control" id="nama" placeholder="Nama lengkap sesuai KTP" maxlength="100">
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="field-hint">Gunakan nama lengkap, tidak perlu gelar</div>
                    <div class="char-count"><span id="namaCount">0</span>/100</div>
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label">Email <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                    <input type="email" class="form-control" id="email" placeholder="nama@student.ac.id">
                  </div>
                  <div class="field-hint">Gunakan email universitas jika ada</div>
                </div>
                <div class="col-12 mt-2">
                  <button class="btn btn-primary-custom w-100" id="btnStep1Next" type="button">
                    Lanjut ke Data Akademik <i class="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- STEP 2: Data Akademik -->
            <div class="form-step" id="formStep2">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Jurusan / Program Studi <span class="text-danger">*</span></label>
                  <select class="form-select" id="jurusan">
                    <option value="">-- Pilih Jurusan --</option>
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Manajemen Informatika">Manajemen Informatika</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Semester Aktif <span class="text-danger">*</span></label>
                  <select class="form-select" id="semester">
                    <option value="">-- Pilih --</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status <span class="text-danger">*</span></label>
                  <select class="form-select" id="status">
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Lulus">Lulus</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">IPK (Indeks Prestasi Kumulatif) <span class="text-danger">*</span></label>
                  <input type="range" class="form-range" id="ipkRange" min="0" max="4" step="0.01" value="3.00">
                  <div class="ipk-preview mt-2">
                    <div style="font-size:32px;font-weight:800;font-family:'Space Grotesk',sans-serif" id="ipkDisplay" class="ipk-good">3.00</div>
                    <div style="font-size:13px;font-weight:600;margin-top:4px" id="ipkLabel">Sangat Memuaskan</div>
                    <input type="hidden" id="ipk" value="3.00">
                  </div>
                </div>
                <div class="col-12 mt-2 d-flex gap-2">
                  <button class="btn flex-shrink-0" id="btnStep2Back" type="button" style="background:var(--bg);border:1.5px solid var(--border);font-weight:600">
                    <i class="bi bi-arrow-left me-1"></i> Kembali
                  </button>
                  <button class="btn btn-success-custom flex-grow-1" id="btnSubmit" type="button">
                    <i class="bi bi-check-circle me-1"></i> Simpan Data Mahasiswa
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- PREVIEW -->
      <div class="col-lg-5">
        <div class="animate-in delay-1">
          <!-- Preview Kartu Mahasiswa -->
          <div class="preview-card mb-4">
            <div style="position:relative;z-index:1">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;opacity:0.7;margin-bottom:12px">KARTU MAHASISWA PREVIEW</div>
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="avatar-initials" style="width:52px;height:52px;font-size:20px;background:rgba(255,255,255,0.2);color:white" id="previewInitials">?</div>
                <div>
                  <div style="font-size:17px;font-weight:800" id="previewNama">Nama Mahasiswa</div>
                  <div style="font-size:13px;opacity:0.75" id="previewNim">NIM: ——</div>
                </div>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.2);margin-bottom:14px"></div>
              <div class="row g-2" style="font-size:13px">
                <div class="col-6">
                  <div style="opacity:0.65">Email</div>
                  <div style="font-weight:600;word-break:break-all" id="previewEmail">——</div>
                </div>
                <div class="col-6">
                  <div style="opacity:0.65">Jurusan</div>
                  <div style="font-weight:600" id="previewJurusan">——</div>
                </div>
                <div class="col-4">
                  <div style="opacity:0.65">Semester</div>
                  <div style="font-weight:700;font-size:20px;font-family:'Space Grotesk',sans-serif" id="previewSemester">—</div>
                </div>
                <div class="col-4">
                  <div style="opacity:0.65">IPK</div>
                  <div style="font-weight:700;font-size:20px;font-family:'Space Grotesk',sans-serif" id="previewIPK">—</div>
                </div>
                <div class="col-4">
                  <div style="opacity:0.65">Status</div>
                  <div style="font-weight:700" id="previewStatus">Aktif</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panduan -->
          <div class="panel">
            <div class="panel-header">
              <span class="panel-title"><i class="bi bi-lightbulb-fill text-warning"></i> Panduan Pengisian</span>
            </div>
            <div class="panel-body">
              <div style="font-size:13px;color:var(--gray)">
                <div class="d-flex gap-2 mb-2"><i class="bi bi-1-circle text-primary mt-1 flex-shrink-0"></i><span>NIM harus unik dan belum terdaftar di sistem</span></div>
                <div class="d-flex gap-2 mb-2"><i class="bi bi-2-circle text-primary mt-1 flex-shrink-0"></i><span>Nama lengkap sesuai dokumen resmi kampus</span></div>
                <div class="d-flex gap-2 mb-2"><i class="bi bi-3-circle text-primary mt-1 flex-shrink-0"></i><span>IPK diisi berdasarkan transkrip akademik terkini</span></div>
                <div class="d-flex gap-2"><i class="bi bi-4-circle text-primary mt-1 flex-shrink-0"></i><span>Semua field bertanda <span class="text-danger">*</span> wajib diisi</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>

<!-- TOAST -->
<div id="toast-container" class="toast-container position-fixed top-0 end-0 p-3"></div>

<!-- MODAL SUKSES -->
<div class="modal fade" id="successModal" tabindex="-1" data-bs-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-body text-center p-4">
        <div style="font-size:56px;margin-bottom:12px">🎉</div>
        <h5 style="font-weight:800;margin-bottom:8px">Berhasil Ditambahkan!</h5>
        <p style="font-size:14px;color:var(--gray);margin-bottom:20px" id="successMsg">Data mahasiswa berhasil disimpan.</p>
        <div class="d-grid gap-2">
          <a href="/data" class="btn btn-primary-custom"><i class="bi bi-table me-1"></i>Lihat Data</a>
          <button class="btn" id="btnAddAnother" style="background:var(--bg);border:1.5px solid var(--border);font-weight:600">
            <i class="bi bi-plus-circle me-1"></i>Tambah Lagi
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- SCRIPTS -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui/1.13.2/jquery-ui.min.js"></script>
<script src="/js/main.js"></script>
<script src="/js/form.js"></script>
</body>
</html>
```
Penjelasan :
Halaman Tambah Mahasiswa ini intinya adalah Multi-step Form yang interaktif. Jadi, pengisian data dibagi jadi dua tahap (Data Pribadi & Akademik) biar form-nya nggak kelihatan numpuk dan pusing. Fitur paling keren di sini adalah Live Preview di sisi kanan; setiap kita ngetik nama atau NIM, tampilan "Kartu Mahasiswa" bayangannya langsung berubah otomatis. Selain itu, ada slider buat milih IPK dan Modal Sukses yang muncul kalau data sudah berhasil disimpan. Singkatnya, ini form yang fokus banget ke User Experience (UX) biar admin nggak bosen dan minim salah input.

Index.html
```css
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | SiMAHA - Sistem Manajemen Mahasiswa</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">🎓</div>
    <h2>SiMAHA</h2>
    <p>Sistem Manajemen Mahasiswa</p>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">Menu Utama</div>
    <a href="/" class="sidebar-link"><i class="bi bi-grid-1x2-fill"></i> Dashboard</a>
    <a href="/data" class="sidebar-link"><i class="bi bi-table"></i> Data Mahasiswa</a>
    <a href="/tambah" class="sidebar-link"><i class="bi bi-person-plus-fill"></i> Tambah Mahasiswa</a>
    <div class="nav-section-label mt-2">Laporan</div>
    <a href="/statistik" class="sidebar-link"><i class="bi bi-bar-chart-fill"></i> Statistik &amp; Grafik</a>
  </nav>
  <div class="sidebar-footer">
    <div>© 2024 SiMAHA v1.0</div>
    <div>Tugas Praktikum Web</div>
  </div>
</aside>
<div class="sidebar-overlay"></div>

<!-- MAIN -->
<div class="main-wrapper">
  <header class="topbar">
    <div class="topbar-left">
      <button class="btn-menu-toggle" id="menuToggle"><i class="bi bi-list"></i></button>
      <div>
        <div class="topbar-title">Dashboard</div>
        <div class="topbar-subtitle">Selamat datang kembali 👋</div>
      </div>
    </div>
    <div class="topbar-right">
      <span class="topbar-badge" id="totalBadge"><i class="bi bi-people-fill"></i> — mahasiswa</span>
      <div class="d-flex align-items-center gap-2 ms-2">
        <div class="avatar-initials" style="background:#1a56db;color:#fff;width:36px;height:36px">A</div>
        <div class="d-none d-md-block">
          <div style="font-size:13px;font-weight:600">Admin</div>
          <div style="font-size:11px;color:#6b7280">Administrator</div>
        </div>
      </div>
    </div>
  </header>

  <main class="page-content">
    <!-- HERO -->
    <div class="dashboard-hero animate-in">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div style="position:relative;z-index:1">
          <h1>📊 Dashboard Akademik</h1>
          <p id="heroDate">Universitas Nusantara — Loading...</p>
        </div>
        <div style="position:relative;z-index:1">
          <a href="/tambah" class="btn btn-light fw-bold" style="border-radius:10px;font-size:14px">
            <i class="bi bi-plus-circle me-1"></i> Tambah Mahasiswa
          </a>
        </div>
      </div>
    </div>

    <!-- STAT CARDS -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-lg-3">
        <div class="stat-card animate-in delay-1">
          <div class="icon-box icon-blue"><i class="bi bi-people-fill"></i></div>
          <div class="stat-num text-primary" id="statTotal">—</div>
          <div class="stat-label">Total Mahasiswa</div>
          <div class="stat-trend text-muted"><i class="bi bi-calendar3"></i> Semester ini</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card animate-in delay-2">
          <div class="icon-box icon-green"><i class="bi bi-person-check-fill"></i></div>
          <div class="stat-num text-success" id="statAktif">—</div>
          <div class="stat-label">Mahasiswa Aktif</div>
          <div class="stat-trend text-success"><i class="bi bi-circle-fill" style="font-size:8px"></i> Sedang aktif</div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card animate-in delay-3">
          <div class="icon-box icon-purple"><i class="bi bi-star-fill"></i></div>
          <div class="stat-num text-purple" id="statAvgIPK" style="color:#7e3af2">—</div>
          <div class="stat-label">Rata-rata IPK</div>
          <div class="stat-trend" id="statIPKLabel" style="color:#7e3af2"></div>
        </div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card animate-in delay-4">
          <div class="icon-box icon-yellow"><i class="bi bi-pause-circle-fill"></i></div>
          <div class="stat-num text-warning" id="statCuti">—</div>
          <div class="stat-label">Sedang Cuti</div>
          <div class="stat-trend text-muted"><i class="bi bi-clock"></i> Menunggu aktif</div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- RECENT TABLE -->
      <div class="col-lg-7">
        <div class="panel animate-in">
          <div class="panel-header">
            <span class="panel-title"><i class="bi bi-clock-history text-primary"></i> Mahasiswa Terbaru</span>
            <a href="/data" class="btn btn-sm" style="background:var(--primary-light);color:var(--primary);font-size:13px;font-weight:600;border-radius:8px">
              Lihat Semua <i class="bi bi-arrow-right"></i>
            </a>
          </div>
          <div class="table-responsive">
            <table class="table table-custom mb-0" id="recentTable">
              <thead>
                <tr>
                  <th>Mahasiswa</th>
                  <th>Jurusan</th>
                  <th>IPK</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="recentBody">
                <tr><td colspan="4" class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary"></div></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- JURUSAN DISTRIBUTION -->
      <div class="col-lg-5">
        <div class="panel animate-in h-100">
          <div class="panel-header">
            <span class="panel-title"><i class="bi bi-pie-chart-fill text-primary"></i> Distribusi Jurusan</span>
          </div>
          <div class="panel-body" id="jurusanList">
            <div class="text-center py-4"><div class="spinner-border spinner-border-sm text-primary"></div></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- TOAST CONTAINER -->
<div id="toast-container" class="toast-container position-fixed top-0 end-0 p-3"></div>

<!-- SCRIPTS -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="/js/main.js"></script>
<script src="/js/index.js"></script>
</body>
</html>
```
Penjelasan :
Gemini berkata
Halaman Dashboard ini bisa dibilang sebagai "pusat kendali" atau home base dari aplikasi SiMAHA kita. Intinya, halaman ini dirancang buat ngasih ringkasan data secara instan tanpa admin harus buka menu satu-satu. Di bagian atas, ada Stat Cards yang nampilin angka-angka penting kayak total mahasiswa, jumlah yang aktif, sampai rata-rata IPK dengan tampilan yang eye-catching.

Turun ke bawah, kita disuguhin tabel Mahasiswa Terbaru buat mantau aktivitas input terakhir dan panel Distribusi Jurusan buat liat sebaran mahasiswa di tiap prodi. Karena sudah pakai Bootstrap 5 dan custom CSS yang rapi, tampilannya kerasa modern banget dengan efek loading spinner dan animasi fade-in. Jadi, secara fungsional, halaman ini tuh cara paling "sat-set" buat dapet gambaran umum kondisi akademik kampus dalam sekali lihat

Statistik.html
```css
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Statistik | SiMAHA</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .chart-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow); padding: 24px; }
    .chart-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
  </style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">🎓</div>
    <h2>SiMAHA</h2>
    <p>Sistem Manajemen Mahasiswa</p>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section-label">Menu Utama</div>
    <a href="/" class="sidebar-link"><i class="bi bi-grid-1x2-fill"></i> Dashboard</a>
    <a href="/data" class="sidebar-link"><i class="bi bi-table"></i> Data Mahasiswa</a>
    <a href="/tambah" class="sidebar-link"><i class="bi bi-person-plus-fill"></i> Tambah Mahasiswa</a>
    <div class="nav-section-label mt-2">Laporan</div>
    <a href="/statistik" class="sidebar-link"><i class="bi bi-bar-chart-fill"></i> Statistik & Grafik</a>
  </nav>
  <div class="sidebar-footer">
    <div>© 2024 SiMAHA v1.0</div>
    <div>Tugas Praktikum Web</div>
  </div>
</aside>
<div class="sidebar-overlay"></div>

<!-- MAIN -->
<div class="main-wrapper">
  <header class="topbar">
    <div class="topbar-left">
      <button class="btn-menu-toggle" id="menuToggle"><i class="bi bi-list"></i></button>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
            <li class="breadcrumb-item active">Statistik</li>
          </ol>
        </nav>
        <div class="topbar-title">Statistik & Analisis</div>
      </div>
    </div>
    <div class="topbar-right">
      <button class="btn btn-sm" id="btnRefresh" style="background:var(--bg);border:1.5px solid var(--border);font-size:13px;font-weight:600;border-radius:8px">
        <i class="bi bi-arrow-clockwise"></i> Refresh
      </button>
    </div>
  </header>

  <main class="page-content">
    <!-- SUMMARY STATS -->
    <div class="row g-3 mb-4" id="summaryCards">
      <div class="col-6 col-md-3">
        <div class="stat-card animate-in">
          <div class="icon-box icon-blue"><i class="bi bi-people-fill"></i></div>
          <div class="stat-num text-primary" id="sTotal">—</div>
          <div class="stat-label">Total</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card animate-in delay-1">
          <div class="icon-box icon-green"><i class="bi bi-person-check"></i></div>
          <div class="stat-num text-success" id="sAktif">—</div>
          <div class="stat-label">Aktif</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card animate-in delay-2">
          <div class="icon-box icon-yellow"><i class="bi bi-pause-circle"></i></div>
          <div class="stat-num text-warning" id="sCuti">—</div>
          <div class="stat-label">Cuti</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card animate-in delay-3">
          <div class="icon-box icon-purple"><i class="bi bi-mortarboard"></i></div>
          <div class="stat-num" id="sIPK" style="color:#7e3af2">—</div>
          <div class="stat-label">Avg IPK</div>
        </div>
      </div>
    </div>

    <!-- CHARTS ROW 1 -->
    <div class="row g-4 mb-4">
      <div class="col-lg-6">
        <div class="chart-card animate-in">
          <div class="chart-title"><i class="bi bi-pie-chart-fill text-primary"></i>Distribusi per Jurusan</div>
          <div class="chart-wrapper"><canvas id="chartJurusan"></canvas></div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="chart-card animate-in delay-1">
          <div class="chart-title"><i class="bi bi-bar-chart-fill text-success"></i>Distribusi per Semester</div>
          <div class="chart-wrapper"><canvas id="chartSemester"></canvas></div>
        </div>
      </div>
    </div>

    <!-- CHARTS ROW 2 -->
    <div class="row g-4">
      <div class="col-lg-5">
        <div class="chart-card animate-in">
          <div class="chart-title"><i class="bi bi-donut text-warning" style="font-size:17px">◉</i>Status Mahasiswa</div>
          <div class="chart-wrapper"><canvas id="chartStatus"></canvas></div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="chart-card animate-in delay-1">
          <div class="chart-title"><i class="bi bi-graph-up text-purple" style="color:#7e3af2"></i>Distribusi Rentang IPK</div>
          <div class="chart-wrapper"><canvas id="chartIPK"></canvas></div>
        </div>
      </div>
    </div>
  </main>
</div>

<div id="toast-container" class="toast-container position-fixed top-0 end-0 p-3"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="/js/main.js"></script>
<script src="/js/statistik.js"></script>
</body>
</html>
```
penjelasan : 
Halaman Statistik ini adalah "ruang monitor" tempat kita mengubah tumpukan data mentah menjadi informasi visual yang bermakna. Intinya, kode ini berfungsi untuk melakukan Data Visualization agar admin nggak perlu pusing baca ribuan baris tabel buat tahu kondisi kampus.

Di bagian atas, ada Summary Stats yang ngasih angka-angka kunci secara to-the-point (Total, Aktif, Cuti, dan Rata-rata IPK). Tapi bintang utamanya ada di bagian bawah, yaitu barisan Chart Cards yang disiapkan buat nampilin grafik distribusi jurusan, semester, status, sampai rentang IPK. Secara teknis, halaman ini mengandalkan library Chart.js yang bakal nge-render grafik-grafik keren tersebut di dalam elemen <canvas>.

### JSON
Mahasiswa.json
```css
[
  {
    "id": "9da299f2-965f-4f37-9146-7cb738fa7993",
    "nim": "2021001",
    "nama": "Andi Pratama",
    "jurusan": "Teknik Informatika",
    "semester": 6,
    "ipk": 3.75,
    "status": "Aktif",
    "email": "andi.pratama@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.300Z"
  },
  {
    "id": "95f0004a-7848-4362-8825-d051b6dedd59",
    "nim": "2021002",
    "nama": "Budi Santoso",
    "jurusan": "Sistem Informasi",
    "semester": 4,
    "ipk": 3.5,
    "status": "Aktif",
    "email": "budi.santoso@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "e6786210-acda-4ca3-885d-42b138ffc9f7",
    "nim": "2021003",
    "nama": "Citra Dewi",
    "jurusan": "Teknik Informatika",
    "semester": 6,
    "ipk": 3.9,
    "status": "Aktif",
    "email": "citra.dewi@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "2a8d892f-a646-46b6-a26b-6422e852ecac",
    "nim": "2020001",
    "nama": "Dian Rahayu",
    "jurusan": "Manajemen Informatika",
    "semester": 8,
    "ipk": 3.6,
    "status": "Aktif",
    "email": "dian.rahayu@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "5e3ea206-1e53-4f69-ab80-13cf0c5cb559",
    "nim": "2022001",
    "nama": "Eko Saputra",
    "jurusan": "Sistem Informasi",
    "semester": 2,
    "ipk": 3.2,
    "status": "Aktif",
    "email": "eko.saputra@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "b243583a-7797-41a6-ab10-fcad2d4976f2",
    "nim": "2021004",
    "nama": "Fitri Handayani",
    "jurusan": "Teknik Informatika",
    "semester": 6,
    "ipk": 3.85,
    "status": "Cuti",
    "email": "fitri.handayani@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "96600ca1-c5a1-45c3-80fd-8378ace9b13b",
    "nim": "2020002",
    "nama": "Guntur Wibowo",
    "jurusan": "Manajemen Informatika",
    "semester": 8,
    "ipk": 2.9,
    "status": "Aktif",
    "email": "guntur.wibowo@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  },
  {
    "id": "621c4548-92c2-4d99-9353-ef817d07f949",
    "nim": "2022002",
    "nama": "Hana Sari",
    "jurusan": "Teknik Informatika",
    "semester": 2,
    "ipk": 3.7,
    "status": "Aktif",
    "email": "hana.sari@student.ac.id",
    "createdAt": "2026-04-05T18:22:34.301Z"
  }
]
```
penjelasan
Data di atas merupakan data mahasiswa yang disimpan dalam bentuk JSON dan digunakan sebagai database sederhana pada aplikasi SiMAHA. Setiap objek di dalamnya mewakili satu mahasiswa yang memiliki beberapa atribut seperti id sebagai identitas unik, nim sebagai nomor induk mahasiswa, nama, jurusan, semester, ipk, status, email, serta createdAt yang menunjukkan waktu data tersebut dibuat. Data ini digunakan oleh sistem untuk menampilkan daftar mahasiswa pada tabel, serta mendukung fitur CRUD seperti tambah, edit, dan hapus data. Karena masih dalam tahap pembelajaran, penggunaan JSON dipilih karena lebih sederhana dan mudah dipahami dibandingkan menggunakan database seperti MySQL atau MongoDB.

## 🔧 CARA MENJALANKAN PROJECT

1. Install dependency:

```bash
npm install
```

2. Jalankan server:

```bash
node server.js
```

3. Buka browser:

```
http://localhost:3000
```

---

## 📸 Screenshot
### Dashboard
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f61271f8-28ea-4b36-b91c-a527e2b22421" />

### Data Mahasiswa
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3f6f90a7-e1b1-47cf-9715-ce07dad2a318" />

### Tambah Mahasiswa
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3c23666d-b4b4-493f-80bd-f083e7f81776" />

### Statistik Dan Grafik
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/24074af2-1b88-4119-b5fe-0d542a78fda7" />

---

## 🎥 Video Presentasi

👉 https://drive.google.com/drive/folders/1i35TwcJ8RjIBGcURWtnYWZNBZ188tNKD?usp=sharing

---

## 📊 PPT Presentasi

👉 https://drive.google.com/drive/folders/1i35TwcJ8RjIBGcURWtnYWZNBZ188tNKD?usp=sharing


## ✅ Kesimpulan

Aplikasi SiMAHA berhasil dibuat dengan fitur CRUD lengkap dan tampilan interaktif menggunakan DataTables sehingga memudahkan pengelolaan data mahasiswa.

---

## 💡 Catatan

Aplikasi ini dikembangkan dengan pendekatan modular dimana setiap file memiliki tanggung jawab spesifik sehingga kode lebih terstruktur dan mudah dikembangkan.
