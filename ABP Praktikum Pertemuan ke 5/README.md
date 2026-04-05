# 🎓 SiMAHA - Sistem Manajemen Mahasiswa

## 👤 Identitas

* Nama: Ghilbran Me
* NIM: (Isi NIM kamu)
* Mata Kuliah: (Isi Mata Kuliah)

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

## 🔹 1. Backend

### 📄 server.js

File utama backend menggunakan Express.js.

#### 🔧 Endpoint GET

```js
app.get('/api/mahasiswa', (req, res) => {
  res.json({ data: mahasiswa });
});
```

Penjelasan:

* Mengambil seluruh data mahasiswa
* Mengirim ke frontend dalam format JSON

---

#### 🔧 Endpoint PUT (Update)

```js
app.put('/api/mahasiswa/:id', (req, res) => {
  // proses update data
});
```

Penjelasan:

* Mengupdate data mahasiswa berdasarkan ID

---

#### 🔧 Endpoint DELETE

```js
app.delete('/api/mahasiswa/:id', (req, res) => {
  // proses hapus data
});
```

Penjelasan:

* Menghapus data mahasiswa

---

### 📄 data/mahasiswa.json

Database sederhana berbentuk JSON.

Fungsi:

* Menyimpan data mahasiswa
* Digunakan sebagai pengganti database

---

## 🔹 2. Frontend (JavaScript)

### 📄 public/js/data.js

Mengatur DataTables dan operasi CRUD.

#### 🔧 Inisialisasi DataTables

```js
function initDataTable() {
  dataTable = $('#mahasiswaTable').DataTable({
    ajax: {
      url: '/api/mahasiswa',
      dataSrc: 'data'
    }
  });
}
```

Penjelasan:

* Mengambil data dari API
* Menampilkan dalam tabel interaktif

---

#### 🔧 Fungsi Edit

```js
function editMahasiswa(id) {
  $.getJSON('/api/mahasiswa/' + id, function (res) {
    const m = res.data;
    $('#editNama').val(m.nama);
  });
}
```

Penjelasan:

* Mengambil data berdasarkan ID
* Mengisi form edit

---

#### 🔧 Fungsi Hapus

```js
function deleteMahasiswa(id, nama) {
  $.ajax({
    url: '/api/mahasiswa/' + id,
    method: 'DELETE'
  });
}
```

Penjelasan:

* Menghapus data dari server

---

#### 🔹 Fungsi Penting

* initDataTable() → load data ke tabel
* viewDetail(id) → tampilkan detail
* editMahasiswa(id) → edit data
* saveEdit() → simpan perubahan
* deleteMahasiswa() → hapus data

---

### 📄 public/js/form.js

Mengatur form tambah mahasiswa.

#### 🔧 Submit Form

```js
$('#formMahasiswa').on('submit', function(e) {
  e.preventDefault();

  const data = {
    nama: $('#nama').val(),
    nim: $('#nim').val()
  };

  $.ajax({
    url: '/api/mahasiswa',
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
  });
});
```

Penjelasan:

* Mengambil input dari form
* Mengirim ke server

---

### 📄 public/js/main.js

Berisi fungsi global.

#### 🔧 Toast Notification

```js
$.fn.showToast = function(options) {
  const opts = $.extend({}, options);
};
```

Penjelasan:

* Menampilkan notifikasi ke user

---

#### 🔧 Format Tanggal

```js
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID');
}
```

Penjelasan:

* Mengubah format tanggal

---

### 📄 public/js/index.js

Mengatur dashboard.

Fungsi:

* Menampilkan ringkasan data mahasiswa

---

### 📄 public/js/statistik.js

Mengatur grafik/statistik.

Fungsi:

* Mengolah data mahasiswa
* Menampilkan chart

---

## 🔹 3. Frontend (HTML)

### 📄 index.html

Halaman dashboard utama.

### 📄 data.html

Halaman tabel data mahasiswa.

### 📄 form.html

Halaman tambah mahasiswa.

### 📄 statistik.html

Halaman grafik/statistik.

---

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