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
      <button class="btn btn-ghost const-share" onclick="openStackShare('${pk}')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        ${lang==='ta'?'பகிர்':'Share my manifesto'}
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

// ─── STACK SHARE ───
function openStackShare(personaKey) {
  const pk = personaKey || persona || 'all';
  const matches = (pk === 'all')
    ? PROMISES.slice()
    : PROMISES.filter(p => p.personas.includes(pk));
  matches.sort((a, b) => (PROMISE_VAL[b.id]?.yr || 0) - (PROMISE_VAL[a.id]?.yr || 0));
  const total = matches.reduce((s, p) => s + (PROMISE_VAL[p.id]?.yr || 0), 0);
  const icon = PERSONA_ICON[pk] || '⭐';
  const pLabel = t('p_' + (pk === 'all' ? 'all' : pk)) || pk;

  const cards = matches.map((p, i) => {
    const v = PROMISE_VAL[p.id] || {yr: 0, impact: 5};
    const c = CATS[p.c] || {c: '#ec4899'};
    const loc = p[lang] || p.en;
    const yrLabel = v.yr > 0
      ? '₹' + v.yr.toLocaleString() + (lang==='ta'?'/ஆண்டு':'/yr')
      : (lang==='ta' ? 'நேரடி நன்மை' : 'Direct benefit');
    return `<section class="stk-card" style="background:linear-gradient(160deg,${c.c}25,${c.c}08 60%, transparent)">
      <div class="stk-tag" style="background:${c.c}33;color:${c.c}">${catLabel(p.c)}</div>
      <div class="stk-num">#${(i+1).toString().padStart(2,'0')}</div>
      <div class="stk-title">${loc.t}</div>
      <div class="stk-desc">${loc.d}</div>
      <div class="stk-amt" style="color:${c.c}">${yrLabel}</div>
    </section>`;
  }).join('');

  const html = `
    <div class="stk-wrap" id="stkWrap">
      <header class="stk-hd">
        <button class="stk-close" onclick="closeStackShare()">✕</button>
        <div class="stk-hd-ic">${icon}</div>
        <div class="stk-hd-txt">
          <small>${lang==='ta'?'உங்கள் அறிக்கை':'Your TVK Manifesto'}</small>
          <b>${pLabel}</b>
        </div>
        <div class="stk-hd-total">
          <span>${lang==='ta'?'மொத்தம்':'Total'}</span>
          <b id="stkTotal">₹0</b>
        </div>
      </header>
      <main class="stk-scroll" id="stkScroll">
        <section class="stk-card stk-intro" style="background:linear-gradient(160deg,#e94560,#fbbf24)">
          <div class="stk-intro-ic">${icon}</div>
          <div class="stk-intro-t">${lang==='ta'?'தி.வெ.க. 2026':'TVK 2026'}</div>
          <div class="stk-intro-d">${lang==='ta'?'உங்களுக்கு என்ன கிடைக்கும்':'Here\'s what you unlock'}</div>
          <div class="stk-intro-total">₹${total.toLocaleString()}<span>${lang==='ta'?'/ஆண்டு':'/year'}</span></div>
          <div class="stk-intro-c">${matches.length} ${lang==='ta'?'நன்மைகள்':'benefits'}</div>
          <div class="stk-intro-hint">${lang==='ta'?'கீழே உருட்டவும்':'Scroll ↓'}</div>
        </section>
        ${cards}
        <section class="stk-card stk-end" style="background:linear-gradient(160deg,#0f0f1a,#1a1a2e)">
          <div class="stk-end-t">${lang==='ta'?'₹':'₹'}${total.toLocaleString()}</div>
          <div class="stk-end-d">${lang==='ta'?'ஒரு ஆண்டில் உங்களுக்குக் கிடைப்பவை':'yours, every year'}</div>
          <button class="btn" onclick="doShareMyManifesto(${total})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;margin-right:6px"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            ${lang==='ta'?'பகிர்':'Share'}
          </button>
          <button class="btn btn-ghost" onclick="closeStackShare()" style="margin-top:10px">${lang==='ta'?'மூடு':'Close'}</button>
        </section>
      </main>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  document.body.style.overflow = 'hidden';
  document.getElementById('stkTotal').textContent = '₹' + total.toLocaleString();
  // Fade in
  requestAnimationFrame(() => document.getElementById('stkWrap').classList.add('on'));
}

function closeStackShare() {
  const w = document.getElementById('stkWrap');
  if (!w) return;
  w.classList.remove('on');
  document.body.style.overflow = '';
  setTimeout(() => w.remove(), 260);
}

async function doShareMyManifesto(total) {
  const txt = (lang==='ta'
    ? `தி.வெ.க. 2026 அறிக்கையில் எனக்கு ₹${total.toLocaleString()}/ஆண்டு கிடைக்கும். உங்களுக்கு எவ்வளவு?`
    : `TVK 2026 manifesto unlocks ₹${total.toLocaleString()}/yr for me. What's yours?`);
  const url = 'https://tvk-2026.vercel.app';
  try {
    if (navigator.share) { await navigator.share({title:'TVK 2026', text: txt, url}); return; }
  } catch(e){}
  try { await navigator.clipboard.writeText(`${txt} ${url}`); toast(t('share_copied') || 'Copied'); }
  catch(e){ prompt('Copy:', `${txt} ${url}`); }
}
