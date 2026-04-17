/* ═══════════════════════════════════════════════════════════════
   TVK CORE — State, helpers, theme/language, modal, share, init
   Depends on: data/constituencies.js, data/promises.js, data/i18n.js
   ═══════════════════════════════════════════════════════════════ */

// ─── STATE (global) ───
let lang = localStorage.getItem('tvk-lang') || 'ta';
let theme = localStorage.getItem('tvk-theme') || 'light';
let activeTab = 0;
let sel = null;         // selected constituency seat#
let ov = 0;             // map overlay index
let filtered = null;    // map filter results
let persona = 'all';    // promise persona filter
let candFilter = 'all'; // candidate filter chip
let candSort = 'seat';  // candidate sort key
let candView = 'grid';  // candidate view mode
const tabBuilt = [false, false, false, false];
const SVG_NS = "http://www.w3.org/2000/svg";

// Overlay definitions (bilingual labels)
const OVS = [
  { k: 'battle',  l: 'Battlegrounds', ta: 'போர்க்களம்', c: '#ef4444' },
  { k: 'winner',  l: '2021 Winner',   ta: '2021 வெற்றி', c: '#e11d48' },
  { k: 'voters',  l: 'Voters',        ta: 'வாக்காளர்',   c: '#6366f1' },
  { k: 'vijay',   l: 'TVK Seats',     ta: 'த.வெ.க.',   c: '#f59e0b' }
];

// ─── HELPERS ───
function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }
function fmt(n) { return n>=1e7 ? (n/1e7).toFixed(1)+"Cr" : n>=1e5 ? (n/1e5).toFixed(1)+"L" : n>=1e3 ? (n/1e3).toFixed(0)+"K" : ""+n; }
function distName(i) { return lang==='ta' ? DISTS_TA[i] : DISTS[i]; }
function catLabel(k) { return lang==='ta' ? CATS[k].ta : CATS[k].en; }

// Compute dot position within district (stagger multiple seats per district).
// Wider stagger for big districts to prevent dots overlapping visually.
function gp(c) {
  const d = DP[c.di];
  const sd = ALL.filter(x => x.di === c.di);
  const i = sd.indexOf(c);
  const cols = Math.ceil(Math.sqrt(sd.length));
  // Stagger tuned so dots don't touch/overlap at any zoom level.
  const step = sd.length > 15 ? 6 : sd.length > 8 ? 8 : 10;
  return [
    d[0] + ((i%cols) - (cols-1)/2) * step,
    d[1] + (Math.floor(i/cols) - (Math.ceil(sd.length/cols)-1)/2) * step
  ];
}

// Dot color based on overlay
function bc(c) {
  if (c.isV) return "#ff1744";
  if (ov === 0) return c.m21<15000 ? "#ef4444" : c.m21<30000 ? "#f59e0b" : "#10b981";
  if (ov === 1) { // 2021 Winner — color by winning party
    const r = typeof P21 !== 'undefined' ? P21[c.n] : null;
    return r && PARTY[r.wp] ? PARTY[r.wp].c : '#6b7280';
  }
  if (ov === 2) return "#6366f1";  // Voters — indigo
  if (ov === 3) return c.isK ? "#f59e0b" : "#6366f1";  // TVK strongholds
  return c.isK ? "#f59e0b" : "#6366f1";
}

// ─── THEME / LANGUAGE ───
function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme==='dark' ? '#0a0a12' : '#fafafa');
  // Update theme icon on Pulse (if present)
  document.querySelectorAll('.home-toggle[data-toggle="theme"] small').forEach(el => {
    el.textContent = theme === 'dark' ? t('home_theme_dark') : t('home_theme_light');
  });
}
function applyLang() {
  document.documentElement.setAttribute('lang', lang);
  document.body.setAttribute('lang', lang);
  document.getElementById('langBtn').textContent = lang==='en' ? 'தமிழ்' : 'ENG';
  document.querySelectorAll('[data-t]').forEach(el => {
    const k = el.getAttribute('data-t');
    el.textContent = t(k);
  });
  renderHeaderStats();
  // Rebuild current tab with new lang
  for (let i=0; i<4; i++) tabBuilt[i] = false;
  document.getElementById('tab'+activeTab).innerHTML = '';
  buildTab(activeTab);
  tabBuilt[activeTab] = true;
}
function toggleTheme() {
  theme = theme==='dark' ? 'light' : 'dark';
  localStorage.setItem('tvk-theme', theme);
  applyTheme();
}
function toggleLang() {
  lang = lang==='en' ? 'ta' : 'en';
  localStorage.setItem('tvk-lang', lang);
  applyLang();
}

// ─── HEADER STATS BAR ───
function renderHeaderStats() {
  document.getElementById('statsBar').innerHTML = [
    [t('st_electorate'), fmt(totV)],
    [t('st_women'),      fmt(totF)],
    [t('st_firsttime'),  fmt(totFT)],
    [t('st_youth'),      yPct+'%'],
    [t('st_battleground'), battle+'']
  ].map(([l, v]) => `<div class="stat-chip"><small>${l}</small><b>${v}</b></div>`).join('');
}

// ─── TAB SWITCHING ───
function buildTab(i) {
  if (i === 0) buildPulse();
  else if (i === 1) buildPromises();
  else if (i === 2) buildMap();
  else if (i === 3) buildCandidates();
}
function switchTab(i) {
  if (i === activeTab) return;
  activeTab = i;
  document.querySelectorAll('.bnav button, .side-item').forEach((b, k) => {
    const idx = b.getAttribute('data-idx') !== null ? +b.getAttribute('data-idx') : k%4;
    b.classList.toggle('on', idx === i);
  });
  for (let k=0; k<4; k++) document.getElementById('tab'+k).classList.toggle('hidden', k!==i);
  if (!tabBuilt[i]) { buildTab(i); tabBuilt[i] = true; }
  document.getElementById('tab'+i).scrollTop = 0;
  updateURL();
}

// ─── MODAL ───
function openModal(html) {
  document.getElementById('modalBox').innerHTML = html;
  document.getElementById('modal').classList.add('on');
}
function closeModal() {
  document.getElementById('modal').classList.remove('on');
}

// ─── TOAST ───
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(el._to);
  el._to = setTimeout(() => el.classList.remove('on'), 2000);
}

// ─── SHARE (delegates to shareTVK in myman.js — native sheet + WA/IG fallback) ───
function doShare() {
  if (typeof shareTVK === 'function') { shareTVK(); return; }
  // Minimal fallback if myman.js hasn't loaded yet
  const url = location.href;
  if (navigator.share) navigator.share({ title: 'TVK 2026', url }).catch(()=>{});
  else navigator.clipboard?.writeText(url).then(() => toast(t('share_copied')));
}

// ─── URL STATE ───
function updateURL() {
  const h = `#tab=${activeTab}${persona!=='all' ? `&p=${persona}` : ''}${sel ? `&seat=${sel}` : ''}`;
  history.replaceState(null, '', h);
}
function readURL() {
  const h = location.hash.slice(1);
  if (!h) return;
  const p = Object.fromEntries(h.split('&').map(x => x.split('=')));
  if (p.tab)  activeTab = +p.tab;
  if (p.p)    persona = p.p;
  if (p.seat) sel = +p.seat;
}

// ─── KEYBOARD SHORTCUTS ───
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key>='1' && e.key<='4' && !/^(input|textarea|select)$/i.test(e.target.tagName)) {
    switchTab(+e.key - 1);
  }
  if (e.key === '/') {
    const inp = document.querySelector('.tc:not(.hidden) input[type=search]');
    if (inp) { e.preventDefault(); inp.focus(); }
  }
});

// ─── INIT ───
function initApp() {
  readURL();
  applyTheme();
  applyLang();
  if (activeTab !== 0) {
    const a = activeTab;
    activeTab = 0;
    switchTab(a);
  } else {
    buildTab(0);
    tabBuilt[0] = true;
  }
}
// Defer init until all tab scripts are loaded
document.addEventListener('DOMContentLoaded', initApp);
