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
