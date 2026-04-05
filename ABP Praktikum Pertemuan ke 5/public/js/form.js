/* ============================================
   TAMBAH MAHASISWA (form.html) - Page Script
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
