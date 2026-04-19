<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Data Mahasiswa — Sistem Informasi Akademik</title>

    {{-- Google Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

    <style>
        :root {
            --bg:       #0a0a0f;
            --surface:  #13131a;
            --card:     #1a1a24;
            --border:   #2a2a3a;
            --accent:   #6c63ff;
            --accent2:  #ff6584;
            --accent3:  #43e97b;
            --text:     #e8e8f0;
            --muted:    #7a7a9a;
            --radius:   14px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* ── BACKGROUND NOISE + GRID ── */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image:
                radial-gradient(ellipse 80% 50% at 20% -10%, rgba(108,99,255,.18) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255,101,132,.12) 0%, transparent 60%),
                repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,.02) 39px, rgba(255,255,255,.02) 40px),
                repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,.02) 39px, rgba(255,255,255,.02) 40px);
            pointer-events: none;
            z-index: 0;
        }

        /* ── WRAPPER ── */
        .wrapper {
            position: relative;
            z-index: 1;
            max-width: 1100px;
            margin: 0 auto;
            padding: 60px 24px 80px;
        }

        /* ── HEADER ── */
        header {
            margin-bottom: 56px;
            animation: fadeDown .6s ease both;
        }

        .header-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(108,99,255,.15);
            border: 1px solid rgba(108,99,255,.35);
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 12px;
            font-weight: 500;
            color: #a59fff;
            letter-spacing: .06em;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        .header-badge span {
            width: 6px; height: 6px;
            background: var(--accent);
            border-radius: 50%;
            display: block;
            animation: pulse 2s ease infinite;
        }

        h1 {
            font-family: 'Syne', sans-serif;
            font-size: clamp(2rem, 5vw, 3.4rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -.03em;
            background: linear-gradient(135deg, #fff 30%, #a59fff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
        }

        .subtitle {
            font-size: 1rem;
            color: var(--muted);
            max-width: 480px;
            line-height: 1.7;
        }

        /* ── STATS ROW ── */
        .stats-row {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 40px;
            animation: fadeUp .6s .1s ease both;
        }

        .stat-chip {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 100px;
            padding: 8px 20px;
            font-size: 13px;
            color: var(--muted);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .stat-chip strong { color: var(--text); }

        /* ── BUTTON ── */
        .btn-fetch {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: var(--accent);
            color: #fff;
            font-family: 'Syne', sans-serif;
            font-size: .95rem;
            font-weight: 700;
            letter-spacing: .02em;
            border: none;
            border-radius: var(--radius);
            padding: 14px 32px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: transform .2s, box-shadow .2s;
            box-shadow: 0 0 0 0 rgba(108,99,255,.5);
            animation: fadeUp .6s .2s ease both;
        }

        .btn-fetch::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,.15), transparent);
            opacity: 0;
            transition: opacity .2s;
        }

        .btn-fetch:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(108,99,255,.45); }
        .btn-fetch:hover::before { opacity: 1; }
        .btn-fetch:active { transform: translateY(0); }

        .btn-fetch .icon {
            width: 20px; height: 20px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            transition: transform .3s;
        }

        .btn-fetch.loading .icon { animation: spin .8s linear infinite; }

        .btn-fetch .btn-text { transition: opacity .2s; }

        /* ── RESULT AREA ── */
        #result-area {
            margin-top: 48px;
            animation: none;
        }

        /* ── EMPTY STATE ── */
        .empty-state {
            text-align: center;
            padding: 64px 24px;
            background: var(--card);
            border: 1px dashed var(--border);
            border-radius: var(--radius);
        }

        .empty-icon {
            width: 56px; height: 56px;
            margin: 0 auto 20px;
            background: rgba(108,99,255,.1);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
        }

        .empty-icon svg { width: 24px; height: 24px; stroke: var(--accent); stroke-width: 1.5; fill: none; }

        .empty-state h3 { font-family: 'Syne', sans-serif; font-size: 1.1rem; margin-bottom: 8px; }
        .empty-state p  { color: var(--muted); font-size: .9rem; }

        /* ── SECTION TITLE ── */
        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 12px;
        }

        .section-title {
            font-family: 'Syne', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
        }

        .count-badge {
            background: rgba(67,233,123,.12);
            border: 1px solid rgba(67,233,123,.3);
            color: #43e97b;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 100px;
        }

        /* ── TABLE ── */
        .table-wrapper {
            border-radius: var(--radius);
            border: 1px solid var(--border);
            overflow: hidden;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background: rgba(108,99,255,.12);
        }

        thead th {
            font-family: 'Syne', sans-serif;
            font-size: .75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--accent);
            padding: 14px 20px;
            text-align: left;
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
        }

        tbody tr {
            border-bottom: 1px solid rgba(42,42,58,.6);
            transition: background .2s;
        }

        tbody tr:last-child { border-bottom: none; }

        tbody tr:hover { background: rgba(108,99,255,.06); }

        tbody td {
            padding: 16px 20px;
            font-size: .9rem;
            vertical-align: middle;
        }

        /* Avatar cell */
        .cell-name {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .avatar {
            width: 36px; height: 36px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: .8rem;
            flex-shrink: 0;
        }

        .name-text { font-weight: 500; }

        .nim-text {
            font-family: 'DM Mono', monospace;
            font-size: .8rem;
            color: var(--muted);
        }

        .badge-kelas {
            background: rgba(255,101,132,.1);
            border: 1px solid rgba(255,101,132,.25);
            color: #ff9fb1;
            font-size: .75rem;
            font-weight: 600;
            padding: 3px 10px;
            border-radius: 6px;
            display: inline-block;
        }

        .badge-prodi {
            background: rgba(67,233,123,.08);
            border: 1px solid rgba(67,233,123,.2);
            color: #43e97b;
            font-size: .75rem;
            font-weight: 500;
            padding: 3px 10px;
            border-radius: 6px;
            display: inline-block;
        }

        .ipk-bar {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .ipk-track {
            height: 4px;
            background: var(--border);
            border-radius: 100px;
            width: 60px;
            overflow: hidden;
        }

        .ipk-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent), var(--accent3));
            border-radius: 100px;
            transition: width .6s ease;
        }

        /* ── ERROR STATE ── */
        .error-state {
            background: rgba(255,101,132,.08);
            border: 1px solid rgba(255,101,132,.25);
            border-radius: var(--radius);
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 14px;
            color: #ff9fb1;
            font-size: .9rem;
        }

        .error-state svg { flex-shrink: 0; width: 20px; height: 20px; stroke: currentColor; fill: none; }

        /* ── ANIMATIONS ── */
        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: .4; }
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
        }

        @keyframes rowIn {
            from { opacity: 0; transform: translateX(-10px); }
            to   { opacity: 1; transform: translateX(0); }
        }

        .row-animated {
            animation: rowIn .35s ease both;
        }

        /* ── FOOTER ── */
        footer {
            margin-top: 60px;
            padding-top: 24px;
            border-top: 1px solid var(--border);
            font-size: .8rem;
            color: var(--muted);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            animation: fadeUp .6s .3s ease both;
        }

        footer span { display: flex; align-items: center; gap: 6px; }
        footer .dot { width: 4px; height: 4px; background: var(--muted); border-radius: 50%; }
    </style>
</head>
<body>

<div class="wrapper">

    {{-- ── HEADER ── --}}
    <header>
        <div class="header-badge">
            <span></span>
            Sistem Informasi Akademik
        </div>
        <h1>Data Mahasiswa</h1>
        <p class="subtitle">
            Tampilkan informasi lengkap seluruh mahasiswa terdaftar menggunakan
            teknologi AJAX — tanpa reload halaman.
        </p>
    </header>

    {{-- ── STATS + BUTTON ── --}}
    <div class="stats-row">
        <div class="stat-chip">Sumber <strong>File JSON Lokal</strong></div>
        <div class="stat-chip">Metode <strong>AJAX / Fetch API</strong></div>
        <div class="stat-chip">Framework <strong>Laravel + Blade</strong></div>
    </div>

    <button class="btn-fetch" id="btnTampilkan" onclick="tampilkanData()">
        <svg class="icon" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span class="btn-text">Tampilkan Data</span>
    </button>

    {{-- ── RESULT AREA ── --}}
    <div id="result-area">
        <div class="empty-state">
            <div class="empty-icon">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3>Belum ada data</h3>
            <p>Klik tombol <strong>Tampilkan Data</strong> untuk memuat daftar mahasiswa.</p>
        </div>
    </div>

    {{-- ── FOOTER ── --}}
    <footer>
        <span>Praktikum Laravel &amp; AJAX</span>
        <span>
            Data dibaca dari
            <code style="background:var(--card);padding:2px 8px;border-radius:6px;font-size:.78rem;">public/data/mahasiswa.json</code>
            <span class="dot"></span>
            Tanpa database
        </span>
    </footer>

</div>

{{-- ── SCRIPT ── --}}
<script>
    // Warna avatar acak konsisten
    const COLORS = [
        ['#6c63ff','#1a1a35'],
        ['#ff6584','#35141c'],
        ['#43e97b','#0d2e1a'],
        ['#f7b731','#2e2100'],
        ['#45aaf2','#0d1f2e'],
        ['#fd9644','#2e1600'],
    ];

    function getColor(name) {
        const idx = name.charCodeAt(0) % COLORS.length;
        return COLORS[idx];
    }

    function getInitials(name) {
        return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
    }

    function tampilkanData() {
        const btn  = document.getElementById('btnTampilkan');
        const area = document.getElementById('result-area');

        // Loading state
        btn.classList.add('loading');
        btn.querySelector('.btn-text').textContent = 'Memuat...';
        btn.disabled = true;

        // ← URL route AJAX
        fetch("{{ route('mahasiswa.data') }}", {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(json => {
            if (!json.success) throw new Error(json.message || 'Gagal memuat data.');
            renderTable(json.data, json.total);
        })
        .catch(err => {
            area.innerHTML = `
                <div class="error-state">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <div><strong>Gagal memuat data:</strong> ${err.message}</div>
                </div>`;
        })
        .finally(() => {
            btn.classList.remove('loading');
            btn.querySelector('.btn-text').textContent = 'Perbarui Data';
            btn.disabled = false;
        });
    }

    function renderTable(data, total) {
        const area = document.getElementById('result-area');

        let rows = '';
        data.forEach((m, i) => {
            const [bg, fg] = getColor(m.nama);
            const ipkNum   = parseFloat(m.ipk || 0);
            const ipkPct   = ((ipkNum / 4) * 100).toFixed(1);

            rows += `
            <tr class="row-animated" style="animation-delay:${i * 0.05}s">
                <td>
                    <div class="cell-name">
                        <div class="avatar" style="background:${bg};color:${fg}">
                            ${getInitials(m.nama)}
                        </div>
                        <div>
                            <div class="name-text">${m.nama}</div>
                            <div class="nim-text">${m.nim}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge-kelas">${m.kelas}</span></td>
                <td><span class="badge-prodi">${m.prodi}</span></td>
                <td>${m.angkatan || '-'}</td>
                <td>
                    <div class="ipk-bar">
                        <span style="font-family:'DM Mono',monospace;font-size:.85rem">${m.ipk || '-'}</span>
                        <div class="ipk-track">
                            <div class="ipk-fill" style="width:${ipkPct}%"></div>
                        </div>
                    </div>
                </td>
            </tr>`;
        });

        area.innerHTML = `
            <div class="section-header">
                <span class="section-title">Daftar Mahasiswa Terdaftar</span>
                <span class="count-badge">${total} mahasiswa</span>
            </div>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Nama / NIM</th>
                            <th>Kelas</th>
                            <th>Program Studi</th>
                            <th>Angkatan</th>
                            <th>IPK</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;
    }
</script>
</body>
</html>
