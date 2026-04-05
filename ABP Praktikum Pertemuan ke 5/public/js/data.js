/* ============================================
   DATA MAHASISWA (data.html) - Page Script
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
