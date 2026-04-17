/* ═══════════════════════════════════════════════════════════════
   MY MANIFESTO — Constellation + Quiz + Stack Share
   Depends on: PROMISES, CATS, PARTY (optional), core.js (persona, lang, t)
   ═══════════════════════════════════════════════════════════════ */

// Per-person annual ₹ value (approx) + impact score 1-10 for each promise.
// Used for constellation sizing and the running counter.
const PROMISE_VAL = {
  // Women
  'w-stipend':   {yr: 30000, impact: 10},
  'w-lpg':       {yr: 5400,  impact: 7},
  'w-bus':       {yr: 3000,  impact: 6},
  'w-force':     {yr: 0,     impact: 4},
  'w-education': {yr: 15000, impact: 9},
  'w-safety':    {yr: 0,     impact: 5},
  'w-marriage':  {yr: 6000,  impact: 6},
  'w-courts':    {yr: 0,     impact: 3},
  'w-pads':      {yr: 2000,  impact: 5},
  'w-shg':       {yr: 20000, impact: 7},
  'w-baby':      {yr: 500,   impact: 5},
  'w-dept':      {yr: 0,     impact: 2},
  // Youth
  'y-unemployment':{yr: 48000, impact: 9},
  'y-edu-loan':  {yr: 80000, impact: 8},
  'y-interns':   {yr: 120000,impact: 10},
  'y-startup':   {yr: 200000,impact: 7},
  'y-jobs':      {yr: 0,     impact: 5},
  'y-creative':  {yr: 0,     impact: 4},
  'y-service':   {yr: 180000,impact: 9},
  'y-drug':      {yr: 0,     impact: 3},
  'y-council':   {yr: 0,     impact: 2},
  // Farmers
  'f-waiver-small':{yr: 10000,impact: 9},
  'f-waiver-large':{yr: 15000,impact: 8},
  'f-msp-paddy': {yr: 8000,  impact: 8},
  'f-msp-sugar': {yr: 3000,  impact: 6},
  'f-annual':    {yr: 10000, impact: 8},
  'f-kids-edu':  {yr: 30000, impact: 7},
  'f-fair':      {yr: 2000,  impact: 4},
  'f-ration':    {yr: 0,     impact: 3},
  // MSME
  'msme-fund':   {yr: 50000, impact: 9},
  'msme-subsidy':{yr: 100000,impact: 8},
  'msme-tax':    {yr: 10000, impact: 6},
  'msme-peak':   {yr: 5000,  impact: 5},
  // Weavers
  'wv-aid':      {yr: 30000, impact: 10},
  'wv-power':    {yr: 6000,  impact: 7},
  'wv-input':    {yr: 8000,  impact: 7},
  'wv-insurance':{yr: 1000,  impact: 5},
  'wv-pension':  {yr: 36000, impact: 9},
  'wv-ecom':     {yr: 0,     impact: 4},
  'wv-showroom': {yr: 0,     impact: 3},
  // Police
  'p-salary':    {yr: 84000, impact: 10},
  'p-stress':    {yr: 12000, impact: 5},
  'p-women':     {yr: 0,     impact: 4},
  // Govt employees
  'ge-ops':      {yr: 30000, impact: 8},
  'ge-regularize':{yr: 60000,impact: 9},
  'ge-exams':    {yr: 0,     impact: 5},
  // Governance
  'g-white':     {yr: 0,     impact: 3},
  'g-pillars':   {yr: 0,     impact: 4},
  'g-impl':      {yr: 0,     impact: 3},
  'g-secular':   {yr: 0,     impact: 3}
};

const PERSONA_ICON = {
  woman: '👩', farmer: '🌾', youth: '🎓', business: '🏭',
  weaver: '🧵', all: '⭐'
};

// ─── CONSTELLATION ───
function renderConstellation(containerId, personaKey) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const pk = personaKey || persona || 'all';
  const matches = (pk === 'all')
    ? PROMISES.slice()
    : PROMISES.filter(p => p.personas.includes(pk));
  // Sort by impact desc so biggest benefits activate first
  matches.sort((a, b) => (PROMISE_VAL[b.id]?.impact || 0) - (PROMISE_VAL[a.id]?.impact || 0));

  const N = matches.length;
  const cx = 200, cy = 200;
  const baseR = 105;
  const stars = matches.map((p, i) => {
    const v = PROMISE_VAL[p.id] || {yr: 0, impact: 5};
    const ring = i % 3;
    const r = baseR + ring * 28 + (Math.sin(i * 3.17) * 8);
    const angle = (i / N) * Math.PI * 2 + Math.cos(i * 1.7) * 0.08;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const size = 3.5 + (v.impact / 10) * 7;
    const color = (CATS[p.c] && CATS[p.c].c) || '#ec4899';
    return {p, x, y, size, color, v};
  });

  const totalYr = stars.reduce((s, st) => s + (st.v.yr || 0), 0);
  const icon = PERSONA_ICON[pk] || '⭐';

  el.innerHTML = `
    <div class="const-head">
      <div class="const-counter">
        <div class="const-n" id="constN">0</div>
        <div class="const-l">${lang==='ta'?'ஆண்டு பலன்கள்':'Per-year benefits'}</div>
      </div>
      <div class="const-sub">
        <div class="const-count" id="constCount">0 ${lang==='ta'?'நன்மைகள்':'benefits'}</div>
        <div class="const-hint">${lang==='ta'?'நட்சத்திரத்தைத் தொடவும்':'Tap any star'}</div>
      </div>
    </div>
    <div class="const-stage">
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" class="const-svg" id="constSvg">
        <defs>
          <radialGradient id="constBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(233,69,96,0.12)"/>
            <stop offset="70%" stop-color="rgba(233,69,96,0.02)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
          <linearGradient id="threadG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e94560" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.15"/>
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#constBg)"/>
        ${stars.map((s, i) => `
          <line class="const-thread" data-i="${i}" x1="${cx}" y1="${cy}" x2="${s.x}" y2="${s.y}" stroke="url(#threadG)" stroke-width="0.6" opacity="0" stroke-dasharray="${Math.hypot(s.x-cx,s.y-cy).toFixed(1)}" stroke-dashoffset="${Math.hypot(s.x-cx,s.y-cy).toFixed(1)}"/>
        `).join('')}
        ${stars.map((s, i) => `
          <g class="const-star" data-i="${i}" data-id="${s.p.id}" transform="translate(${s.x},${s.y}) scale(0)" style="cursor:pointer">
            <circle r="${s.size + 4}" fill="${s.color}" opacity="0.18"/>
            <circle r="${s.size}" fill="${s.color}"/>
            <circle r="${s.size * 0.4}" fill="#fff" opacity="0.85"/>
          </g>
        `).join('')}
        <g transform="translate(${cx},${cy})">
          <circle r="30" fill="rgba(8,8,15,0.9)" stroke="#e94560" stroke-width="1.5"/>
          <circle r="34" fill="none" stroke="#fbbf24" stroke-width="0.5" opacity="0.5"/>
          <text x="0" y="10" text-anchor="middle" font-size="28">${icon}</text>
        </g>
      </svg>
    </div>
    <div class="const-foot">
      <button class="btn btn-ghost const-share" onclick="shareTVK()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        ${lang==='ta'?'பகிர்':'Share'}
      </button>
    </div>
  `;

  // Click handlers for stars
  el.querySelectorAll('.const-star').forEach(g => {
    g.addEventListener('click', () => {
      const id = g.dataset.id;
      if (typeof showPromiseModal === 'function') showPromiseModal(id);
    });
  });

  // Animate activation: thread draws + star pops + counter ticks
  const threads = el.querySelectorAll('.const-thread');
  const starEls = el.querySelectorAll('.const-star');
  const counterN = el.querySelector('#constN');
  const counterC = el.querySelector('#constCount');
  let cumulative = 0;
  stars.forEach((s, i) => {
    setTimeout(() => {
      const line = threads[i];
      line.style.transition = 'stroke-dashoffset 500ms ease, opacity 300ms ease';
      line.style.opacity = '1';
      line.style.strokeDashoffset = '0';
      const star = starEls[i];
      star.style.transition = 'transform 380ms cubic-bezier(.18,1.2,.42,1.02)';
      star.setAttribute('transform', `translate(${s.x},${s.y}) scale(1)`);
      cumulative += s.v.yr || 0;
      counterN.textContent = '₹' + cumulative.toLocaleString();
      counterC.textContent = `${i + 1} ${lang==='ta'?'நன்மைகள்':'benefits'}`;
    }, 250 + i * 85);
  });
}

// ─── QUIZ WIZARD ───
function openMyManifestoQuiz() {
  const qs = [
    {
      id: 'gender',
      q: lang==='ta' ? 'நீங்கள் யார்?' : 'Who are you?',
      opts: [
        {k:'woman', l: lang==='ta'?'பெண்':'Woman',   ic:'♀'},
        {k:'man',   l: lang==='ta'?'ஆண்':'Man',     ic:'♂'},
        {k:'any',   l: lang==='ta'?'பிற':'Other / skip', ic:'☆'}
      ]
    },
    {
      id: 'age',
      q: lang==='ta' ? 'உங்கள் வயது?' : 'Your age?',
      opts: [
        {k:'lt25',  l:'< 25', ic:'🎓'},
        {k:'25_40', l:'25–40', ic:'⚡'},
        {k:'40_60', l:'40–60', ic:'👤'},
        {k:'gt60',  l:'60+',  ic:'👴'}
      ]
    },
    {
      id: 'work',
      q: lang==='ta' ? 'நீங்கள் என்ன செய்கிறீர்கள்?' : 'What do you do?',
      opts: [
        {k:'student',  l: lang==='ta'?'மாணவர்':'Student',       ic:'🎓'},
        {k:'farmer',   l: lang==='ta'?'விவசாயி':'Farmer',        ic:'🌾'},
        {k:'msme',     l: lang==='ta'?'சொந்த தொழில்':'Own business / MSME', ic:'🏭'},
        {k:'weaver',   l: lang==='ta'?'நெசவாளர்':'Weaver',        ic:'🧵'},
        {k:'employed', l: lang==='ta'?'வேலை':'Employed',          ic:'💼'},
        {k:'home',     l: lang==='ta'?'வீட்டில்':'Homemaker',       ic:'🏠'},
        {k:'retired',  l: lang==='ta'?'ஓய்வு':'Retired',          ic:'👴'},
        {k:'unemp',    l: lang==='ta'?'வேலையற்ற':'Unemployed',     ic:'🔍'}
      ]
    }
  ];
  const ans = {};
  let step = 0;

  const renderStep = () => {
    const qd = qs[step];
    const progress = qs.map((_, i) => `<span class="q-dot ${i===step?'on':''} ${i<step?'done':''}"></span>`).join('');
    const h = `
      <div class="modal-hd">
        <button class="modal-x" onclick="closeModal()">✕</button>
        <span class="modal-tag" style="background:rgba(233,69,96,.15);color:#e94560">${lang==='ta'?'உங்கள் அறிக்கை':'Your Manifesto'}</span>
        <div class="modal-title">${qd.q}</div>
        <div class="q-progress">${progress}</div>
      </div>
      <div class="modal-body">
        <div class="q-opts">
          ${qd.opts.map(o => `<button class="q-opt" data-k="${o.k}">
            <span class="q-opt-ic">${o.ic}</span>
            <span class="q-opt-l">${o.l}</span>
          </button>`).join('')}
        </div>
      </div>`;
    openModal(h);
    document.querySelectorAll('.q-opt').forEach(b => {
      b.addEventListener('click', () => {
        ans[qd.id] = b.dataset.k;
        step++;
        if (step < qs.length) renderStep();
        else finishQuiz(ans);
      });
    });
  };
  renderStep();
}

function finishQuiz(ans) {
  // Priority map quiz answers → single primary persona key
  let pk = 'all';
  if (ans.gender === 'woman') pk = 'woman';
  else if (ans.work === 'weaver') pk = 'weaver';
  else if (ans.work === 'farmer') pk = 'farmer';
  else if (ans.work === 'msme') pk = 'business';
  else if (ans.work === 'student' || (ans.age === 'lt25' && ans.work !== 'retired')) pk = 'youth';
  else if (ans.work === 'unemp' && ans.age === 'lt25') pk = 'youth';

  localStorage.setItem('tvk-persona', pk);
  persona = pk;
  closeModal();
  switchTab(1);
  // Force promises tab rebuild so constellation renders with this persona
  setTimeout(() => {
    tabBuilt[1] = false;
    document.getElementById('tab1').innerHTML = '';
    buildTab(1);
    tabBuilt[1] = true;
  }, 120);
}

// ─── QUICK SHARE (WhatsApp / Instagram / Copy) ───
async function shareTVK() {
  const url = 'https://tvk-2026.vercel.app' + (location.hash || '');
  const text = lang==='ta'
    ? 'த.வெ.க. 2026 அறிக்கை — உங்கள் தொகுதி, வாக்குறுதி, பலன்கள் அனைத்தும் இங்கே'
    : 'TVK 2026 — 234 seats, 50 promises, and your personal ₹ estimate';
  // Native share sheet on mobile (offers WhatsApp, Instagram, etc.)
  if (navigator.share) {
    try { await navigator.share({title: 'TVK 2026', text, url}); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  openShareMenu(url, text);
}

function openShareMenu(url, text) {
  const enc = encodeURIComponent(`${text} ${url}`);
  const html = `
    <div class="share-menu" id="shareMenu" onclick="if(event.target===this)closeShareMenu()">
      <div class="share-menu-box">
        <div class="share-menu-title">${lang==='ta'?'பகிர்':'Share'}</div>
        <a class="share-opt" href="https://wa.me/?text=${enc}" target="_blank" rel="noopener">
          <span class="share-ic" style="background:#25D366">
            <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.891-11.893 11.891a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.595 5.35l.093.148-.995 3.635 3.635-.954.161.096z"/></svg>
          </span>
          <span>WhatsApp</span>
        </a>
        <a class="share-opt" href="https://www.instagram.com/" target="_blank" rel="noopener" onclick="navigator.clipboard&&navigator.clipboard.writeText('${text.replace(/'/g,"\\'")} ${url}');toast('${(lang==='ta'?'இணைப்பு நகலெடுக்கப்பட்டது — Instagram-ல் ஒட்டவும்':'Link copied — paste into Instagram').replace(/'/g,"\\'")}')">
          <span class="share-ic" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)">
            <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </span>
          <span>Instagram</span>
        </a>
        <button class="share-opt" onclick="copyShareLink('${url.replace(/'/g,"\\'")}')">
          <span class="share-ic" style="background:var(--s3)">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--t1)" stroke-width="2" width="18" height="18"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </span>
          <span>${lang==='ta'?'இணைப்பை நகலெடு':'Copy link'}</span>
        </button>
        <button class="share-cancel" onclick="closeShareMenu()">${lang==='ta'?'ரத்து':'Cancel'}</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  requestAnimationFrame(() => document.getElementById('shareMenu').classList.add('on'));
}

function closeShareMenu() {
  const el = document.getElementById('shareMenu');
  if (!el) return;
  el.classList.remove('on');
  setTimeout(() => el.remove(), 200);
}

async function copyShareLink(url) {
  try { await navigator.clipboard.writeText(url); toast(t('share_copied') || 'Link copied'); }
  catch(e) { prompt('Copy:', url); }
  closeShareMenu();
}
