/* ============================================
   DASHBOARD (index.html) - Page Script
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
