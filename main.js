<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FB Bookmarklet Installer</title>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
:root{--bg:#08090d;--bg2:#0e1118;--card:#13171f;--card2:#181d28;--border:#222a3a;--border2:#2e3a50;--fg:#e4e8f0;--fg2:#cbd5e1;--muted:#5e6b82;--accent:#f59e0b;--accent2:#fbbf24;--accent-dim:rgba(245,158,11,.1);--accent-glow:rgba(245,158,11,.25);--success:#10b981;--success-dim:rgba(16,185,129,.1);--danger:#ef4444;--danger-dim:rgba(239,68,68,.1);--info:#3b82f6;--info-dim:rgba(59,130,246,.1)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--fg);min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg2)}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
.bg-fx{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 500px 350px at 5% 10%,rgba(245,158,11,.04),transparent),radial-gradient(ellipse 400px 400px at 95% 85%,rgba(59,130,246,.03),transparent)}
.wrap{position:relative;z-index:1;max-width:800px;margin:0 auto;padding:32px 16px 100px}

/* Hero */
.hero{text-align:center;padding:48px 0 36px}
.hero-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:var(--accent-dim);border:1px solid rgba(245,158,11,.2);border-radius:20px;font-size:12px;font-weight:600;color:var(--accent);margin-bottom:18px}
.hero-icon{width:60px;height:60px;border-radius:16px;background:linear-gradient(135deg,var(--accent),#d97706);display:inline-flex;align-items:center;justify-content:center;font-size:26px;color:#0a0c10;box-shadow:0 4px 24px var(--accent-glow);margin-bottom:18px;animation:glow 3s ease-in-out infinite}
@keyframes glow{0%,100%{box-shadow:0 4px 24px var(--accent-glow)}50%{box-shadow:0 4px 44px rgba(245,158,11,.4)}}
.hero h1{font-size:30px;font-weight:700;letter-spacing:-.5px;margin-bottom:10px;line-height:1.2}
.hero p{font-size:14.5px;color:var(--muted);max-width:520px;margin:0 auto;line-height:1.6}

/* Steps */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:32px}
.step{padding:18px;background:var(--card);border:1px solid var(--border);border-radius:14px;text-align:center;transition:border .2s}
.step:hover{border-color:var(--accent)}
.step-n{width:30px;height:30px;border-radius:50%;background:var(--accent-dim);color:var(--accent);font-weight:700;font-size:13px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px}
.step h3{font-size:13.5px;font-weight:600;margin-bottom:4px}
.step p{font-size:11.5px;color:var(--muted);line-height:1.4}

/* Alert */
.alert{padding:14px 18px;border-radius:12px;margin-bottom:24px;display:flex;gap:12px;align-items:flex-start;font-size:13px;line-height:1.6}
.alert-warn{background:var(--danger-dim);border:1px solid rgba(239,68,68,.2)}
.alert-warn i{color:var(--danger);font-size:17px;margin-top:2px;flex-shrink:0}
.alert-info{background:var(--info-dim);border:1px solid rgba(59,130,246,.2)}
.alert-info i{color:var(--info);font-size:17px;margin-top:2px;flex-shrink:0}

/* Bookmarklet Card */
.bm{background:var(--card);border:1px solid var(--border);border-radius:16px;margin-bottom:20px;overflow:hidden;transition:border .2s}
.bm:hover{border-color:var(--border2)}
.bm-head{display:flex;align-items:center;gap:14px;padding:22px 24px;border-bottom:1px solid var(--border)}
.bm-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.bm-ico.g{background:var(--info-dim);color:var(--info)}
.bm-ico.a{background:var(--success-dim);color:var(--success)}
.bm-head h2{font-size:17px;font-weight:700;line-height:1.2}
.bm-head p{font-size:12.5px;color:var(--muted)}
.bm-body{padding:22px 24px}

/* Drag Zone */
.drag{display:flex;align-items:center;gap:14px;padding:16px 20px;background:var(--accent-dim);border:2px dashed rgba(245,158,11,.3);border-radius:12px;margin-bottom:16px;cursor:grab;transition:all .2s;user-select:none}
.drag:hover{border-color:var(--accent);background:rgba(245,158,11,.15);transform:translateY(-1px)}
.drag:active{cursor:grabbing;transform:scale(.98)}
.drag i.grip{font-size:20px;color:var(--accent);opacity:.6}
.drag .label{flex:1;font-size:14px;font-weight:600;color:var(--accent)}
.drag .hint{font-size:11px;color:var(--muted);white-space:nowrap;display:flex;align-items:center;gap:4px}

/* Code Block */
.code-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.code-head span{font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.code-wrap{position:relative;border-radius:10px;overflow:hidden;margin-bottom:14px}
.code-wrap textarea{width:100%;min-height:48px;padding:12px 14px;padding-right:80px;background:var(--bg);border:1px solid var(--border);border-radius:10px;color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:11.5px;resize:none;outline:none;line-height:1.5;word-break:break-all}
.code-wrap textarea:focus{border-color:var(--accent)}
.code-wrap .cp{position:absolute;right:8px;top:8px}

/* Desc */
.desc{font-size:13px;color:var(--fg2);line-height:1.7;padding:14px 16px;background:var(--bg2);border-radius:10px;border-left:3px solid var(--border2);margin-bottom:16px}
.desc code{background:rgba(245,158,11,.1);color:var(--accent);padding:2px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px}
.desc strong{color:var(--fg)}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border:none;border-radius:8px;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}
.btn-accent{background:var(--accent);color:#0a0c10}
.btn-accent:hover{box-shadow:0 2px 14px var(--accent-glow);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border)}
.btn-ghost:hover{background:var(--card2);color:var(--fg);border-color:var(--border2)}
.btn-sm{padding:6px 12px;font-size:11.5px;border-radius:7px}

/* Source Toggle */
.src-tog{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--muted);transition:color .2s;padding:4px 0}
.src-tog:hover{color:var(--fg)}
.src-tog i{transition:transform .2s;font-size:11px}
.src-tog.open i{transform:rotate(90deg)}
.src-code{display:none;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.6;color:var(--fg2);max-height:400px;overflow:auto;white-space:pre-wrap;word-break:break-all;margin-top:8px}
.src-code.show{display:block}

/* Hosting Section */
.host{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;margin-top:28px}
.host h3{font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.host-step{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);font-size:13px;line-height:1.6}
.host-step:last-child{border-bottom:none}
.host-step .n{width:26px;height:26px;border-radius:8px;background:var(--accent-dim);color:var(--accent);font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.host-step code{background:var(--bg2);color:var(--accent);padding:2px 7px;border-radius:5px;font-family:'JetBrains Mono',monospace;font-size:11.5px}

/* URL Config */
.url-config{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:20px}
.url-config label{font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:8px}
.url-row{display:flex;gap:8px}
.url-row input{flex:1;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:12.5px;outline:none}
.url-row input:focus{border-color:var(--accent)}

/* Tips */
.tips{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;margin-top:20px}
.tips h3{font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.tip{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;line-height:1.6}
.tip:last-child{border-bottom:none}
.tip .n{width:22px;height:22px;border-radius:6px;background:var(--accent-dim);color:var(--accent);font-weight:700;font-size:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}

/* Toast */
.toast-w{position:fixed;bottom:20px;right:20px;z-index:200;display:flex;flex-direction:column;gap:8px}
.toast{padding:12px 18px;border-radius:10px;font-size:13px;font-weight:500;display:flex;align-items:center;gap:9px;box-shadow:0 8px 30px rgba(0,0,0,.5);animation:tI .3s ease,tO .3s ease 2.7s forwards;max-width:360px}
.toast-ok{background:#0a2618;border:1px solid rgba(16,185,129,.25);color:var(--success)}
.toast-info{background:#0a1526;border:1px solid rgba(59,130,246,.25);color:var(--info)}
@keyframes tI{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes tO{from{opacity:1}to{opacity:0;transform:translateY(8px)}}

@media(max-width:640px){
  .hero h1{font-size:22px}.hero{padding:32px 0 24px}
  .steps{grid-template-columns:1fr}.step{min-width:100%}
  .drag{flex-direction:column;text-align:center}
  .drag .hint{justify-content:center}
  .code-wrap textarea{padding-right:14px;min-height:60px}
  .code-wrap .cp{position:static;margin-top:6px}
  .url-row{flex-direction:column}
  .bm-head,.bm-body{padding:16px 18px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>
</head>
<body>
<div class="bg-fx"></div>
<div class="toast-w" id="tw"></div>
<div class="wrap">

  <header class="hero">
    <div class="hero-badge"><i class="fa-solid fa-bolt"></i> Bookmarklet Format</div>
    <div class="hero-icon"><i class="fa-brands fa-facebook-f"></i></div>
    <h1>FB Friend Tool Bookmarklet</h1>
    <p>Dua bookmarklet yang load script eksternal. Simpan di bookmark bar, klik saat buka Facebook. Script-nya pendek, update-nya gampang.</p>
  </header>

  <section class="steps">
    <div class="step"><div class="step-n">1</div><h3>Host main.js</h3><p>Upload file main.js ke GitHub atau hosting lain</p></div>
    <div class="step"><div class="step-n">2</div><h3>Drag ke Bookmark Bar</h3><p>Drag tombol di bawah ke bookmark bar browser</p></div>
    <div class="step"><div class="step-n">3</div><h3>Klik di Facebook</h3><p>Buka facebook.com, klik bookmark yang sudah disimpan</p></div>
  </section>

  <!-- URL Config -->
  <div class="url-config">
    <label><i class="fa-solid fa-link"></i> URL Base Script Kamu</label>
    <div class="url-row">
      <input type="text" id="baseUrl" value="https://raw.githubusercontent.com/odpdevoff/anjay/main/main.js" placeholder="https://raw.githubusercontent.com/USER/REPO/main/main.js" oninput="updateCodes()">
      <button class="btn btn-accent btn-sm" onclick="updateCodes()"><i class="fa-solid fa-rotate"></i> Update</button>
    </div>
  </div>

  <div class="alert alert-warn">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p><strong>Peringatan:</strong> Add teman massal bisa menyebabkan akun dibatasi Facebook. Gunakan delay 3000ms+ dan jangan add lebih dari 50 per sesi. Resiko ditanggung sendiri.</p>
  </div>

  <!-- BOOKMARKLET 1: GRAB -->
  <article class="bm">
    <div class="bm-head">
      <div class="bm-ico g"><i class="fa-solid fa-satellite-dish"></i></div>
      <div><h2>Grab Saran Teman</h2><p>Auto-scroll & kumpulkan saran dari halaman suggestions</p></div>
    </div>
    <div class="bm-body">
      <div class="desc">
        <strong>Cara pakai:</strong> Buka <code>facebook.com/friends/suggestions</code>, tunggu loading penuh, klik bookmarklet ini. Panel muncul di kanan atas — klik <strong>"Mulai Scroll"</strong> untuk auto-scroll. Setelah selesai, centang yang diinginkan, klik <strong>"Simpan Terpilih"</strong>.
      </div>
      <div class="drag" id="dGrab" draggable="true">
        <i class="fa-solid fa-grip-vertical grip"></i>
        <span class="label" id="grabLabel">Grab Saran Teman</span>
        <span class="hint"><i class="fa-solid fa-arrow-up"></i> Drag ke bookmark bar</span>
      </div>
      <div class="code-head"><span>Kode Bookmarklet</span></div>
      <div class="code-wrap">
        <textarea id="grabCode" readonly rows="2"></textarea>
        <div class="cp"><button class="btn btn-accent btn-sm" onclick="cp('grabCode')"><i class="fa-regular fa-copy"></i> Copy</button></div>
      </div>
      <div class="src-tog" onclick="togSrc('grabSrc',this)"><i class="fa-solid fa-chevron-right"></i> Lihat full source main.js</div>
      <pre class="src-code" id="grabSrc"></pre>
    </div>
  </article>

  <!-- BOOKMARKLET 2: ADD -->
  <article class="bm">
    <div class="bm-head">
      <div class="bm-ico a"><i class="fa-solid fa-user-plus"></i></div>
      <div><h2>Add Teman dari Bookmark</h2><p>Kirim permintaan pertemanan dari data yang sudah disimpan</p></div>
    </div>
    <div class="bm-body">
      <div class="desc">
        <strong>Cara pakai:</strong> Setelah grab & simpan, buka <strong>halaman Facebook mana saja</strong>, klik bookmarklet ini. Panel menampilkan daftar bookmark. Atur delay (3000ms+ recommended), klik <strong>"Mulai Add"</strong>. Menggunakan AJAX endpoint internal Facebook.
      </div>
      <div class="drag" id="dAdd" draggable="true">
        <i class="fa-solid fa-grip-vertical grip"></i>
        <span class="label" id="addLabel">Add Teman dari Bookmark</span>
        <span class="hint"><i class="fa-solid fa-arrow-up"></i> Drag ke bookmark bar</span>
      </div>
      <div class="code-head"><span>Kode Bookmarklet</span></div>
      <div class="code-wrap">
        <textarea id="addCode" readonly rows="2"></textarea>
        <div class="cp"><button class="btn btn-accent btn-sm" onclick="cp('addCode')"><i class="fa-regular fa-copy"></i> Copy</button></div>
      </div>
      <div class="src-tog" onclick="togSrc('addSrc',this)"><i class="fa-solid fa-chevron-right"></i> Lihat full source main.js</div>
      <pre class="src-code" id="addSrc"></pre>
    </div>
  </article>

  <!-- Hosting Guide -->
  <section class="host">
    <h3><i class="fa-solid fa-server" style="color:var(--accent)"></i> Cara Hosting main.js</h3>
    <div class="host-step"><span class="n">1</span><span>Buat file bernama <code>main.js</code>, isi dengan source code di bawah (klik "Lihat full source")</span></div>
    <div class="host-step"><span class="n">2</span><span>Push ke repository GitHub kamu (bisa private)</span></div>
    <div class="host-step"><span class="n">3</span><span>Buka file main.js di GitHub, klik <code>Raw</code></span></div>
    <div class="host-step"><span class="n">4</span><span>Copy URL-nya, paste ke kolom <strong>"URL Base Script"</strong> di atas</span></div>
    <div class="host-step"><span class="n">5</span><span>Kode bookmarklet otomatis update. Drag ke bookmark bar.</span></div>
    <div class="host-step"><span class="n">6</span><span><strong>Update logic?</strong> Edit main.js → push → selesai. Bookmarklet otomatis pakai versi baru karena ada <code>?t=</code> timestamp.</span></div>
  </section>

  <!-- Tips -->
  <section class="tips">
    <h3><i class="fa-solid fa-lightbulb" style="color:var(--accent)"></i> Tips</h3>
    <div class="tip"><span class="n">1</span><span><strong>Tampilkan Bookmark Bar:</strong> <code>Ctrl+Shift+B</code> (Windows) atau <code>Cmd+Shift+B</code> (Mac)</span></div>
    <div class="tip"><span class="n">2</span><span><strong>Manual paste:</strong> Jika drag tidak bisa, copy kode → buat bookmark baru → paste ke kolom URL</span></div>
    <div class="tip"><span class="n">3</span><span><strong>Tutup panel:</strong> Klik X di panel, atau klik bookmarklet yang sama lagi</span></div>
    <div class="tip"><span class="n">4</span><span><strong>Delay aman:</strong> 3000-5000ms. Lebih lama = lebih aman dari block</span></div>
    <div class="tip"><span class="n">5</span><span><strong>Data persisten:</strong> Tersimpan di localStorage facebook.com</span></div>
    <div class="tip"><span class="n">6</span><span><strong>Alternatif hosting:</strong> Selain GitHub Raw, bisa pakai jsDelivr <code>https://cdn.jsdelivr.net/gh/USER/REPO@main/main.js</code></span></div>
  </section>

</div>

<script>
// ==============================================
// SOURCE CODE MAIN.JS — ini yang harus di-host
// ==============================================
var MAIN_JS_SOURCE = `// =============================================
// FB Friend Tool — main.js
// Host di GitHub Raw, load via bookmarklet
// =============================================
(function() {
  'use strict';

  var LS_KEY = 'fbt_bookmarked';
  var COLS = ['#f59e0b','#10b981','#3b82f6','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16'];

  // === Utilitas ===
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h); return Math.abs(h); }
  function color(id) { return COLS[hash(id) % COLS.length]; }
  function initials(n) { return n.split(' ').filter(Boolean).map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2); }
  function now() { return new Date().toLocaleTimeString('id-ID', { hour12: false }); }
  function lsGet() { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch(e) { return []; } }
  function lsSet(d) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }

  // === Inject Style ===
  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement('style');
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // === Panel CSS ===
  var PANEL_CSS = [
    '#fbt{position:fixed;top:12px;right:12px;width:370px;max-height:88vh;z-index:999999;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#13171f;color:#e4e8f0;border:1px solid #222a3a;border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.6);display:flex;flex-direction:column;overflow:hidden;animation:fbtIn .25s ease}',
    '@keyframes fbtIn{from{opacity:0;transform:translateY(-10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}',
    '#fbt *{box-sizing:border-box;margin:0;padding:0}',
    '#fbt .hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #222a3a;background:#181d28}',
    '#fbt .hd h3{font-size:13.5px;font-weight:700;display:flex;align-items:center;gap:8px}',
    '#fbt .hd .close{width:28px;height:28px;border:none;border-radius:7px;background:transparent;color:#5e6b82;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .15s}',
    '#fbt .hd .close:hover{background:#222a3a;color:#e4e8f0}',
    '#fbt .bd{padding:14px 16px;overflow-y:auto;flex:1;max-height:58vh}',
    '#fbt .stats{display:flex;gap:8px;margin-bottom:12px}',
    '#fbt .st{flex:1;padding:8px 10px;background:#0e1118;border-radius:8px;text-align:center}',
    '#fbt .st .n{font-size:18px;font-weight:700;font-family:monospace}',
    '#fbt .st .l{font-size:9.5px;color:#5e6b82;text-transform:uppercase;letter-spacing:.5px}',
    '#fbt .btns{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}',
    '#fbt .b{padding:7px 13px;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;display:inline-flex;align-items:center;gap:5px}',
    '#fbt .b:disabled{opacity:.35;cursor:not-allowed;transform:none!important}',
    '#fbt .b1{background:#f59e0b;color:#0a0c10}',
    '#fbt .b1:hover:not(:disabled){box-shadow:0 2px 12px rgba(245,158,11,.3);transform:translateY(-1px)}',
    '#fbt .b2{background:transparent;color:#5e6b82;border:1px solid #222a3a}',
    '#fbt .b2:hover:not(:disabled){background:#222a3a;color:#e4e8f0}',
    '#fbt .b3{background:rgba(16,185,129,.1);color:#10b981}',
    '#fbt .b3:hover:not(:disabled){background:#10b981;color:#fff}',
    '#fbt .b4{background:rgba(239,68,68,.1);color:#ef4444}',
    '#fbt .b4:hover:not(:disabled){background:#ef4444;color:#fff}',
    '#fbt .row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;transition:background .1s}',
    '#fbt .row:hover{background:rgba(255,255,255,.02)}',
    '#fbt .row input[type=checkbox]{width:16px;height:16px;accent-color:#f59e0b;cursor:pointer;flex-shrink:0}',
    '#fbt .av{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}',
    '#fbt .inf{flex:1;min-width:0}',
    '#fbt .inf .nm{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#fbt .inf .id{font-size:10.5px;color:#5e6b82;font-family:monospace}',
    '#fbt .stx{font-size:11px;margin-left:auto;flex-shrink:0;font-weight:500}',
    '#fbt .stx.ok{color:#10b981}#fbt .stx.fail{color:#ef4444}#fbt .stx.wait{color:#5e6b82}#fbt .stx.cur{color:#f59e0b}',
    '#fbt .pbar{width:100%;height:5px;background:#0e1118;border-radius:3px;overflow:hidden;margin:8px 0}',
    '#fbt .pfill{height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:3px;transition:width .3s;width:0}',
    '#fbt .pstats{display:flex;gap:12px;font-size:11px;font-family:monospace;margin-bottom:10px;flex-wrap:wrap}',
    '#fbt .ps{display:flex;align-items:center;gap:4px}',
    '#fbt .ps-ok{color:#10b981}#fbt .ps-fail{color:#ef4444}#fbt .ps-cur{color:#f59e0b}#fbt .ps-left{color:#5e6b82}',
    '#fbt .dlr{display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:12px;color:#5e6b82}',
    '#fbt .dlr input{width:70px;padding:6px 8px;background:#0e1118;border:1px solid #222a3a;border-radius:6px;color:#e4e8f0;font-family:monospace;font-size:12px;outline:none}',
    '#fbt .dlr input:focus{border-color:#f59e0b}',
    '#fbt .log{background:#0e1118;border:1px solid #222a3a;border-radius:8px;max-height:130px;overflow-y:auto;margin-top:10px;font-size:10.5px;font-family:monospace}',
    '#fbt .log div{padding:4px 8px;border-bottom:1px solid rgba(255,255,255,.02)}',
    '#fbt .log .lok{color:#10b981}#fbt .log .ler{color:#ef4444}#fbt .log .lin{color:#3b82f6}#fbt .log .lwa{color:#f59e0b}',
    '#fbt .empty{text-align:center;padding:28px 10px;color:#5e6b82;font-size:12.5px}',
    '#fbt .ft{padding:8px 16px;border-top:1px solid #222a3a;font-size:10.5px;color:#5e6b82;text-align:center;background:#181d28}'
  ].join('\\n');

  // =============================================
  // MODE: GRAB SARAN TEMAN
  // =============================================
  window._fbtGrab = function() {
    var K = 'fbt';
    if (document.getElementById(K)) { document.getElementById(K).remove(); return; }

    var data = [], scrolling = false, iv = null;
    injectStyle(K + '_css', PANEL_CSS);

    var el = document.createElement('div');
    el.id = K;
    el.innerHTML =
      '<div class="hd"><h3>\\u{1F4E1} Grab Saran Teman</h3><button class="close" onclick="document.getElementById(\\'' + K + '\\').remove()">\\u00d7</button></div>' +
      '<div class="bd">' +
        '<div class="stats"><div class="st"><div class="n" style="color:#3b82f6" id="' + K + '_cnt">0</div><div class="l">Ditemukan</div></div><div class="st"><div class="n" style="color:#10b981" id="' + K + '_bmk">0</div><div class="l">Di-bookmark</div></div></div>' +
        '<div class="btns">' +
          '<button class="b b1" id="' + K + '_go" onclick="window._fbtGrabGo()">\\u25B6 Mulai Scroll</button>' +
          '<button class="b b2" id="' + K + '_stop" onclick="window._fbtGrabStop()" disabled>\\u23F9 Stop</button>' +
          '<button class="b b3" id="' + K + '_save" onclick="window._fbtGrabSave()" disabled>\\u{1F516} Simpan Terpilih</button>' +
          '<button class="b b4" onclick="window._fbtGrabClear()">Bersihkan</button>' +
        '</div>' +
        '<div id="' + K + '_list"><div class="empty">Klik "Mulai Scroll" untuk mengumpulkan saran teman</div></div>' +
      '</div>' +
      '<div class="ft">Data tersimpan di localStorage facebook.com</div>';
    document.body.appendChild(el);

    function scrape() {
      var labels = ['Tambah Teman', 'Add Friend', 'Tambahkan Teman', 'Teman tambahan'];
      var btns = [];
      document.querySelectorAll('[role="button"]').forEach(function(b) {
        var t = (b.textContent || '').trim();
        if (labels.indexOf(t) !== -1) btns.push(b);
      });
      if (btns.length === 0) {
        labels.forEach(function(lb) {
          document.querySelectorAll('[aria-label="' + lb + '"]').forEach(function(b) { btns.push(b); });
        });
      }
      var before = data.length;
      btns.forEach(function(btn) {
        var card = btn;
        for (var i = 0; i < 8; i++) {
          card = card.parentElement;
          if (!card) return;
          var link = card.querySelector('a[href*="/profile.php?id="], a[href*="facebook.com/"]');
          if (link) break;
        }
        if (!card || !link) return;
        var href = link.getAttribute('href') || '';
        var name = (link.textContent || '').trim();
        if (!name) { var sp = card.querySelector('span[dir="auto"], a[role="link"]'); if (sp) name = (sp.textContent || '').trim(); }
        if (!name) name = 'User';
        var id = '';
        var m = href.match(/\\/profile\\.php\\?id=(\\d+)/);
        if (m) id = m[1];
        else { var m2 = href.match(/facebook\\.com\\/([a-z0-9._-]+)/i); if (m2 && m2[1] !== 'profile.php') id = m2[1]; }
        if (id && !data.find(function(x) { return x.id === id; })) {
          data.push({ id: id, name: name, url: href });
        }
      });
      return data.length - before;
    }

    function render() {
      var list = document.getElementById(K + '_list');
      document.getElementById(K + '_cnt').textContent = data.length;
      var saved = lsGet();
      document.getElementById(K + '_bmk').textContent = saved.length;
      document.getElementById(K + '_save').disabled = data.length === 0;
      if (data.length === 0) { list.innerHTML = '<div class="empty">Belum ada saran ditemukan</div>'; return; }
      var h = '';
      data.forEach(function(u) {
        var bm = saved.find(function(s) { return s.id === u.id; });
        h += '<div class="row">' +
          '<input type="checkbox" data-id="' + esc(u.id) + '" ' + (bm ? 'checked' : '') + '>' +
          '<div class="av" style="background:' + color(u.id) + '">' + initials(u.name) + '</div>' +
          '<div class="inf"><div class="nm">' + esc(u.name) + '</div><div class="id">' + esc(u.id) + '</div></div>' +
          (bm ? '<span class="stx ok">\\u{1F516}</span>' : '') +
          '</div>';
      });
      list.innerHTML = h;
    }

    window._fbtGrabGo = function() {
      if (scrolling) return;
      scrolling = true;
      document.getElementById(K + '_go').disabled = true;
      document.getElementById(K + '_stop').disabled = false;
      var stuck = 0;
      iv = setInterval(function() {
        window.scrollBy(0, 1200);
        var n = scrape();
        render();
        if (n === 0) { stuck++; if (stuck > 6) window._fbtGrabStop(); } else { stuck = 0; }
      }, 2000);
    };

    window._fbtGrabStop = function() {
      if (iv) clearInterval(iv);
      iv = null; scrolling = false;
      document.getElementById(K + '_go').disabled = false;
      document.getElementById(K + '_stop').disabled = true;
      render();
    };

    window._fbtGrabSave = function() {
      var checks = document.querySelectorAll('#' + K + '_list input[type=checkbox]:checked');
      if (checks.length === 0) { alert('Pilih orang terlebih dahulu!'); return; }
      var saved = lsGet();
      var added = 0;
      checks.forEach(function(c) {
        var id = c.dataset.id;
        var u = data.find(function(x) { return x.id === id; });
        if (u && !saved.find(function(s) { return s.id === id; })) {
          saved.push({ id: u.id, name: u.name, url: u.url });
          added++;
        }
      });
      lsSet(saved);
      render();
      alert(added + ' orang disimpan ke bookmark!');
    };

    window._fbtGrabClear = function() {
      if (scrolling) window._fbtGrabStop();
      data = [];
      render();
    };

    scrape();
    render();
  };

  // =============================================
  // MODE: ADD TEMAN DARI BOOKMARK
  // =============================================
  window._fbtAdd = function() {
    var K = 'fbt';
    if (document.getElementById(K)) { document.getElementById(K).remove(); return; }

    var saved = lsGet();
    var running = false, stopped = false;
    injectStyle(K + '_css', PANEL_CSS);

    var el = document.createElement('div');
    el.id = K;
    el.innerHTML =
      '<div class="hd"><h3>\\u{1F91D} Add Teman dari Bookmark</h3><button class="close" onclick="document.getElementById(\\'' + K + '\\').remove()">\\u00d7</button></div>' +
      '<div class="bd">' +
        '<div class="pbar"><div class="pfill" id="' + K + '_pf"></div></div>' +
        '<div class="pstats">' +
          '<span class="ps ps-cur">\\u25B6 <span id="' + K + '_cur">0</span></span>' +
          '<span class="ps ps-left">Total: <span id="' + K + '_tot">' + saved.length + '</span></span>' +
          '<span class="ps ps-ok">\\u2713 <span id="' + K + '_ok">0</span></span>' +
          '<span class="ps ps-fail">\\u2717 <span id="' + K + '_fail">0</span></span>' +
        '</div>' +
        '<div class="dlr">Delay: <input type="number" id="' + K + '_dl" value="3000" min="500" step="500"> ms</div>' +
        '<div class="btns">' +
          '<button class="b b1" id="' + K + '_go" onclick="window._fbtAddGo()">\\u{1F91D} Mulai Add</button>' +
          '<button class="b b4" id="' + K + '_stop" onclick="window._fbtAddStop()" disabled>Stop</button>' +
          '<button class="b b2" onclick="window._fbtAddRefresh()">\\u{1F504} Refresh</button>' +
        '</div>' +
        '<div id="' + K + '_list"></div>' +
        '<div class="log" id="' + K + '_log"></div>' +
      '</div>' +
      '<div class="ft">Menggunakan AJAX endpoint internal Facebook</div>';
    document.body.appendChild(el);

    function render() {
      var list = document.getElementById(K + '_list');
      document.getElementById(K + '_tot').textContent = saved.length;
      if (saved.length === 0) {
        list.innerHTML = '<div class="empty">Tidak ada data bookmark.<br>Jalankan "Grab Saran Teman" dulu, lalu simpan terpilih.</div>';
        return;
      }
      var h = '';
      saved.forEach(function(u, i) {
        h += '<div class="row" id="' + K + '_r_' + i + '">' +
          '<div class="av" style="background:' + color(u.id) + '">' + initials(u.name) + '</div>' +
          '<div class="inf"><div class="nm">' + esc(u.name) + '</div><div class="id">' + esc(u.id) + '</div></div>' +
          '<span class="stx wait" id="' + K + '_s_' + i + '">Menunggu</span>' +
          '</div>';
      });
      list.innerHTML = h;
    }

    function log(msg, type) {
      var box = document.getElementById(K + '_log');
      var cls = { ok: 'lok', err: 'ler', info: 'lin', warn: 'lwa' }[type] || 'lin';
      box.innerHTML += '<div class="' + cls + '">[' + now() + '] ' + esc(msg) + '</div>';
      box.scrollTop = box.scrollHeight;
    }

    function updProg(cur, tot, ok, fail) {
      var pct = tot > 0 ? (cur / tot * 100) : 0;
      document.getElementById(K + '_pf').style.width = pct + '%';
      document.getElementById(K + '_cur').textContent = cur;
      document.getElementById(K + '_ok').textContent = ok;
      document.getElementById(K + '_fail').textContent = fail;
    }

    function setStatus(i, cls, txt) {
      var el = document.getElementById(K + '_s_' + i);
      if (el) { el.className = 'stx ' + cls; el.textContent = txt; }
    }

    function getDtsg() {
      try { return require('DTSGInitData').token; } catch(e) {}
      var el = document.querySelector('input[name="fb_dtsg"]');
      return el ? el.value : null;
    }

    function getUid() {
      try { return require('CurrentUserInitialData').USER_ID; } catch(e) {}
      var m = document.cookie.match(/c_user=(\\d+)/);
      return m ? m[1] : '0';
    }

    window._fbtAddGo = async function() {
      if (running) return;
      saved = lsGet();
      if (saved.length === 0) { alert('Tidak ada target! Jalankan Grab dulu.'); return; }
      var dtsg = getDtsg();
      if (!dtsg) { alert('Tidak bisa mendapatkan dtsg token. Pastikan kamu di facebook.com dan sudah login.'); return; }
      var uid = getUid();
      running = true; stopped = false;
      document.getElementById(K + '_go').disabled = true;
      document.getElementById(K + '_stop').disabled = false;
      document.getElementById(K + '_dl').disabled = true;
      var delay = parseInt(document.getElementById(K + '_dl').value) || 3000;
      var ok = 0, fail = 0;
      log('Mulai add ' + saved.length + ' teman (delay: ' + delay + 'ms)', 'info');
      updProg(0, saved.length, 0, 0);

      for (var i = 0; i < saved.length; i++) {
        if (stopped) { log('Dihentikan oleh user', 'warn'); break; }
        var u = saved[i];
        setStatus(i, 'cur', 'Mengirim...');
        log('[' + (i + 1) + '/' + saved.length + '] Add ' + u.name + '...', 'info');
        updProg(i + 1, saved.length, ok, fail);

        try {
          var params = 'fb_dtsg=' + encodeURIComponent(dtsg) +
            '&to_friend=' + encodeURIComponent(u.id) +
            '&action=add_friend' +
            '&how_found=friend_browser' +
            '&ref_param=none' +
            '&logging_location=friends_tab' +
            '&no_flyout_on_click=true' +
            '&__a=1' +
            '&__user=' + uid +
            '&__req=b' +
            '&__be=-1';
          var res = await fetch('/ajax/add_friend/action.php?__a=1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params,
            credentials: 'include'
          });
          var text = await res.text();
          if (text.indexOf('"success":true') !== -1 || text.indexOf('success') !== -1) {
            setStatus(i, 'ok', 'Berhasil');
            log(u.name + ': Berhasil dikirim', 'ok');
            ok++;
          } else if (text.indexOf('already') !== -1) {
            setStatus(i, 'ok', 'Sudah berteman');
            log(u.name + ': Sudah berteman', 'warn');
            ok++;
          } else {
            setStatus(i, 'fail', 'Gagal');
            log(u.name + ': Gagal', 'err');
            fail++;
          }
        } catch (e) {
          setStatus(i, 'fail', 'Error');
          log(u.name + ': ' + e.message, 'err');
          fail++;
        }
        updProg(i + 1, saved.length, ok, fail);
        if (delay > 0 && i < saved.length - 1 && !stopped) {
          await new Promise(function(r) { setTimeout(r, delay); });
        }
      }

      running = false;
      document.getElementById(K + '_go').disabled = false;
      document.getElementById(K + '_stop').disabled = true;
      document.getElementById(K + '_dl').disabled = false;
      log('Selesai! Berhasil: ' + ok + ', Gagal: ' + fail, ok > 0 ? 'ok' : 'err');
    };

    window._fbtAddStop = function() {
      stopped = true;
      document.getElementById(K + '_stop').disabled = true;
    };

    window._fbtAddRefresh = function() {
      if (running) return;
      saved = lsGet();
      render();
      updProg(0, saved.length, 0, 0);
    };

    render();
  };

  // =============================================
  // DETEKSI MODE: lihat URL halaman
  // =============================================
  var url = location.href;
  if (url.indexOf('friends/suggestions') !== -1 || url.indexOf('/suggestions/') !== -1) {
    window._fbtGrab();
  } else {
    window._fbtAdd();
  }

})();`;

// ==============================================
// HALAMAN INSTALLER — LOGIC
// ==============================================
function toast(msg, type) {
  var w = document.getElementById('tw');
  var t = document.createElement('div');
  t.className = 'toast toast-' + (type || 'ok');
  t.innerHTML = '<i class="fa-solid ' + (type === 'ok' ? 'fa-circle-check' : 'fa-circle-info') + '"></i> ' + msg;
  w.appendChild(t);
  setTimeout(function() { t.remove(); }, 3200);
}

function cp(id) {
  var ta = document.getElementById(id);
  var text = ta.value;
  navigator.clipboard.writeText(text).then(function() {
    toast('Kode bookmarklet disalin!');
  }).catch(function() {
    ta.select();
    document.execCommand('copy');
    toast('Kode bookmarklet disalin!');
  });
}

function togSrc(id, el) {
  document.getElementById(id).classList.toggle('show');
  el.classList.toggle('open');
}

// Generate kode bookmarklet dari base URL
function makeBookmarklet(baseUrl, label) {
  return 'javascript:(()=>{const s=document.createElement(\'script\');s.src=\'' + baseUrl + '?t=\'+Date.now();document.head.appendChild(s)})();';
}

function updateCodes() {
  var base = document.getElementById('baseUrl').value.trim();
  if (!base) return;

  var grabCode = makeBookmarklet(base, 'Grab Saran Teman');
  var addCode = makeBookmarklet(base, 'Add Teman dari Bookmark');

  document.getElementById('grabCode').value = grabCode;
  document.getElementById('addCode').value = addCode;

  // Update drag links
  document.getElementById('dGrab').setAttribute('data-url', grabCode);
  document.getElementById('dAdd').setAttribute('data-url', addCode);
}

// Drag setup
function setupDrag(elId) {
  var el = document.getElementById(elId);
  el.addEventListener('dragstart', function(e) {
    var url = el.getAttribute('data-url') || '';
    e.dataTransfer.setData('text/plain', url);
    e.dataTransfer.setData('text/x-moz-url', url);
    e.dataTransfer.setData('text/uri-list', url);
    e.dataTransfer.effectAllowed = 'copyLink';
  });
}

// Init
updateCodes();
setupDrag('dGrab');
setupDrag('dAdd');

// Isi source code panels
document.getElementById('grabSrc').textContent = MAIN_JS_SOURCE;
document.getElementById('addSrc').textContent = MAIN_JS_SOURCE;

// Klik langsung hanya bisa di facebook.com
document.getElementById('dGrab').addEventListener('click', function(e) {
  if (e.target.closest('.hint')) return;
  if (!location.hostname.includes('facebook')) {
    toast('Drag ke bookmark bar, lalu klik saat buka Facebook', 'info');
  }
});
document.getElementById('dAdd').addEventListener('click', function(e) {
  if (e.target.closest('.hint')) return;
  if (!location.hostname.includes('facebook')) {
    toast('Drag ke bookmark bar, lalu klik saat buka Facebook', 'info');
  }
});
</script>
</body>
</html>
