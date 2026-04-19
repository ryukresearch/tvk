/* ═══════════════════════════════════════════════════════════════
   MAP TAB — Interactive TN constituency map + detail panel + flip list
   ═══════════════════════════════════════════════════════════════ */

function buildMap() {
  const el = document.getElementById('tab2');
  el.innerHTML = `
  <div class="map-intro">
    <div class="sec-label">${t('map_label')}</div>
    <div class="sec-title">${t('map_title')}</div>
    <div class="sec-desc">${t('map_sub')}</div>
  </div>
  <div class="home-wrap">
    <div class="map-area">
      <div class="map-bar">
        <div class="m-search"><input type="search" id="mSearch" autocomplete="off" placeholder="${lang==='ta'?'தொகுதி பெயர் தேடவும்...':'Type or pick a constituency...'}" oninput="filterMap(this.value);mSug(this.value)" onfocus="mSug(this.value)" onblur="setTimeout(()=>{const s=document.getElementById('sugBox');if(s)s.style.display='none'},160)"><div id="sugBox" class="sug-box" hidden></div></div>
      </div>
      <div class="chip-row" id="ovChips"></div>
      <div class="map-meta">
        <span class="ov-desc" id="ovDesc"></span>
        <span class="map-count" id="mapCount"></span>
      </div>
      <div class="map-box">
        <svg id="mapSvg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="map-leg" id="mapLeg"></div>
      </div>
    </div>
    <div class="detail" id="detP">
      <div class="det-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <p>${lang==='ta'?'தொகுதியை அழுத்தவும்':'Tap any constituency for details'}</p>
      </div>
    </div>
  </div>
  <div class="tab-sec">
    <div class="sec-label">${t('flip_label')}</div>
    <div class="sec-title">${t('flip_title')}</div>
    <div class="sec-desc">${t('flip_sub')}</div>
    <div class="flip-list" id="flipList"></div>
  </div>
  <div class="tab-sec">
    <div class="sec-label">${t('stronghold_label')}</div>
    <div class="sec-title">${t('stronghold_title')}</div>
    <div class="sec-desc">${t('stronghold_sub')}</div>
    <div id="strongholds"></div>
  </div>
  <div class="tab-foot">
    <a href="https://www.instagram.com/tvk_shadow_warrior" target="_blank" rel="noopener noreferrer">Built by <span>Shadow Warrior</span></a>
    <div class="foot-disclaimer">Independent project · Public data · AI-assisted · Not affiliated with TVK or ECI · <a href="javascript:void(0)" onclick="showDisclaimer()">Disclaimer</a></div>
  </div>`;

  // Overlay chips
  document.getElementById('ovChips').innerHTML = OVS.map((o, i) =>
    `<button class="chip ${ov===i?'on':''}" style="${ov===i?`background:${o.c};border-color:${o.c}`:''}" onclick="setOv(${i})">${lang==='ta'?o.ta:o.l}</button>`
  ).join('');

  drawMap(filtered || ALL);
  updateMapCount(filtered || ALL);
  updateLeg();
  updateOvDesc();
  showDet();

  renderFlipList();

  // Strongholds stats (from elections.js aggregates)
  if (typeof strongholds !== 'undefined') {
    renderStrongholds();
  }
}

function renderStrongholds() {
  const el = document.getElementById('strongholds');
  if (!el) return;
  const dmkCt = strongholds.DMK.length;
  const admkCt = strongholds.AIADMK.length;
  const swingCt = strongholds.swing.length;
  el.innerHTML = `
    <div class="sh-grid">
      <div class="sh-card" style="border-color:${PARTY.DMK.c}44">
        <div class="sh-n" style="color:${PARTY.DMK.c}">${dmkCt}</div>
        <div class="sh-l">${t('dmk_fort')}</div>
        <div class="sh-s">${lang==='ta'?'2021-ல் 30K+':'Won by 30K+ in 2021'}</div>
      </div>
      <div class="sh-card" style="border-color:${PARTY.AIADMK.c}44">
        <div class="sh-n" style="color:${PARTY.AIADMK.c}">${admkCt}</div>
        <div class="sh-l">${t('admk_fort')}</div>
        <div class="sh-s">${lang==='ta'?'2021-ல் 30K+':'Won by 30K+ in 2021'}</div>
      </div>
      <div class="sh-card" style="border-color:#ef444444">
        <div class="sh-n" style="color:#ef4444">${swingCt}</div>
        <div class="sh-l">${t('swing_seats')}</div>
        <div class="sh-s">${t('swing_sub')}</div>
      </div>
    </div>`;
}

function setOv(i) {
  ov = i;
  document.querySelectorAll('#ovChips .chip').forEach((b, j) => {
    b.classList.toggle('on', j===i);
    b.style.background = j===i ? OVS[j].c : '';
    b.style.borderColor = j===i ? OVS[j].c : '';
  });
  drawMap(filtered || ALL);
  updateLeg();
  updateOvDesc();
}

function updateOvDesc() {
  const el = document.getElementById('ovDesc');
  if (!el) return;
  const descs = lang === 'ta' ? [
    'போர்க்களம்: 2021 வித்தியாசம் — சிவப்பு <15K · ஆரஞ்சு <30K · பச்சை 30K+',
    '2021-ல் வென்ற கட்சி நிறத்தில் புள்ளிகள்',
    'புள்ளி அளவு = வாக்காளர் அடர்த்தி',
    'த.வெ.க. அறிவித்த 2 தொகுதிகள் — பிற 232 நிலுவையில்'
  ] : [
    'Battlegrounds: 2021 margin — red <15K · orange <30K · green 30K+',
    'Dots colored by 2021 winning party',
    'Dot size reflects voter density',
    '2 TVK seats announced (Vijay) · other 232 pending'
  ];
  el.textContent = descs[ov] || '';
}

function updateLeg() {
  const el = document.getElementById('mapLeg');
  if (!el) return;
  if (ov === 0) {
    el.innerHTML = '<div class="leg-i"><div class="leg-d" style="background:#ef4444"></div>Battle</div><div class="leg-i"><div class="leg-d" style="background:#f59e0b"></div>Medium</div><div class="leg-i"><div class="leg-d" style="background:#10b981"></div>Safe</div>';
  } else if (ov === 1) {
    // 2021 Winner — show top parties in legend
    const topParties = ['DMK','AIADMK','INC','PMK','VCK','BJP','CPI'];
    el.innerHTML = topParties.map(p => `<div class="leg-i"><div class="leg-d" style="background:${PARTY[p].c}"></div>${lang==='ta'?PARTY[p].ta:PARTY[p].en}</div>`).join('');
  } else {
    el.innerHTML = `<div class="leg-i"><div class="leg-d" style="background:#ff1744"></div>Vijay</div><div class="leg-i"><div class="leg-d" style="background:#f59e0b"></div>Key</div><div class="leg-i"><div class="leg-d" style="background:${OVS[ov].c}"></div>${lang==='ta'?OVS[ov].ta:OVS[ov].l}</div>`;
  }
}

function drawMap(list) {
  const svg = document.getElementById('mapSvg');
  if (!svg || typeof AC_PATHS === 'undefined') return;
  const visible = new Set(list.map(c => c.n));
  // Build once per call; cheap for 234 paths.
  const frag = [];
  ALL.forEach(c => {
    const d = AC_PATHS[c.n]; if (!d) return;
    const fill = bc(c);
    const isSel = sel === c.n;
    const isVis = visible.has(c.n);
    const cls = ['ac'];
    if (isSel) cls.push('on');
    if (!isVis) cls.push('dim');
    if (c.isV) cls.push('vijay');
    frag.push(`<path class="${cls.join(' ')}" data-n="${c.n}" d="${d}" fill="${fill}"/>`);
  });
  svg.innerHTML = frag.join('');
  svg.querySelectorAll('path.ac').forEach(p => {
    p.addEventListener('click', () => selectSeat(+p.dataset.n));
  });
}

// Tiny count pill beside the overlay description. Shows "234 seats" by default,
// "38 of 234 match" when search narrows results.
function updateMapCount(list) {
  const el = document.getElementById('mapCount');
  if (!el) return;
  const total = ALL.length;
  const n = list.length;
  if (n === total) {
    el.textContent = `${total} ${lang==='ta'?'தொகுதி':'seats'}`;
    el.classList.remove('filtered');
  } else {
    el.textContent = lang==='ta'
      ? `${n} / ${total} பொருத்தம்`
      : `${n} of ${total} match${n!==1?'es':''}`;
    el.classList.add('filtered');
  }
}

function mSug(q) {
  const box = document.getElementById('sugBox');
  if (!box) return;
  const ql = (q || '').trim().toLowerCase();
  const list = ql ? ALL.filter(c => c.nm.toLowerCase().includes(ql) || DISTS[c.di].toLowerCase().includes(ql) || String(c.n) === ql) : ALL;
  const show = list.slice(0, 60);
  if (!show.length) { box.hidden = true; return; }
  box.hidden = false;
  box.style.display = 'block';
  box.innerHTML = show.map(c => `<div class="sug-i" onmousedown="pickSug(${c.n})"><b>${c.nm}</b><span>#${c.n} · ${lang==='ta'?DISTS_TA[c.di]:DISTS[c.di]}${c.isV?' · VIJAY':''}</span></div>`).join('');
}
function pickSug(n) {
  const c = ALL.find(x => x.n === n);
  if (!c) return;
  const inp = document.getElementById('mSearch'); if (inp) inp.value = c.nm;
  document.getElementById('sugBox').hidden = true;
  selectSeat(n);
}

function renderFlipList() {
  const el = document.getElementById('flipList'); if (!el) return;
  const top = ALL.slice().sort((a,b) => a.m21 - b.m21).slice(0, 10);
  const maxM = top[top.length-1].m21;
  el.innerHTML = top.map((c, i) =>
    `<div class="flip-r ${sel===c.n?'on':''}" onclick="selectSeat(${c.n})">
      <span class="rk">#${i+1}</span>
      <span class="nm">${c.nm} · ${distName(c.di)}</span>
      <div class="bar"><span style="width:${(c.m21/maxM)*100}%"></span></div>
      <span class="mg">${fmt(c.m21)}</span>
    </div>`).join('');
}

function selectSeat(n) {
  sel = n;
  drawMap(filtered || ALL);
  showDet();
  renderFlipList();
  updateURL();
  if (window.innerWidth < 768) {
    setTimeout(() => document.getElementById('detP').scrollIntoView({behavior:'smooth',block:'start'}), 50);
  }
}

function showDet() {
  const el = document.getElementById('detP');
  if (!el) return;
  if (sel === null) {
    el.innerHTML = `<div class="det-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><p>${lang==='ta'?'தொகுதியை அழுத்தவும்':'Tap any constituency for details'}</p></div>`;
    return;
  }
  const c = ALL.find(x => x.n === sel);
  if (!c) return;
  const mCol = c.m21 < 15000 ? '#ef4444' : '#10b981';
  const res21 = typeof P21 !== 'undefined' ? P21[c.n] : null;
  const opp26 = typeof OPP !== 'undefined' ? (OPP[c.n] || {}) : {};
  el.scrollTop = 0;

  // Unified "Competition" block — merges 2021 winner/runner-up + 2026 opposition
  // One row per party. Columns: [Party flag] [2026 candidate] [2021 result pill]
  let htmlField = '';
  const PARTY_ORDER = ['DMK','AIADMK','NTK','INC','BJP','PMK','VCK','AMMK','MDMK'];
  const field = [];
  const seen = new Set();
  PARTY_ORDER.forEach(pk => {
    const cand = opp26[pk] || null;
    let p21 = null;
    if (res21 && res21.wp === pk) p21 = {rank:'won', m:res21.m, mp:res21.mp, name:res21.wn};
    else if (res21 && res21.rp === pk) p21 = {rank:'2nd'};
    if (cand || p21) { field.push({pk, cand, p21}); seen.add(pk); }
  });
  // Include any 2021 winner/runner whose party isn't in PARTY_ORDER (fallback)
  if (res21 && res21.wp && !seen.has(res21.wp)) field.unshift({pk:res21.wp, cand:null, p21:{rank:'won', m:res21.m, mp:res21.mp, name:res21.wn}});
  if (res21 && res21.rp && !seen.has(res21.rp)) field.push({pk:res21.rp, cand:null, p21:{rank:'2nd'}});

  if (field.length) {
    const turnoutMeta = res21 && res21.pv ? `<span class="field-meta">${res21.pv}% ${lang==='ta'?'2021 வாக்களிப்பு':'2021 turnout'}</span>` : '';
    const wonLbl = lang==='ta' ? '2021 வெற்றி' : 'Won 2021';
    const secondLbl = lang==='ta' ? '2021 2வது' : '2nd 2021';
    const tbaLbl = lang==='ta' ? 'அறிவிக்கப்படவில்லை' : 'TBA';
    htmlField = `<div class="dc dc-field">
      <div class="demo-t">${lang==='ta'?'போட்டியாளர்கள்':'COMPETITION'}${turnoutMeta}</div>
      ${field.map(r => {
        const p = PARTY[r.pk] || PARTY.OTH;
        const won = r.p21 && r.p21.rank==='won';
        const candTxt = r.cand ? r.cand : (won && r.p21.name ? r.p21.name : tbaLbl);
        const candCls = r.cand ? 'field-cand' : (won && r.p21.name ? 'field-cand field-cand-21' : 'field-cand field-tba');
        let p21Pill = '';
        if (won) {
          p21Pill = `<span class="field-p21 fw" style="background:${p.c}1a;color:${p.c};border-color:${p.c}55">🏆 ${wonLbl} · ${fmt(r.p21.m)}</span>`;
        } else if (r.p21 && r.p21.rank === '2nd') {
          p21Pill = `<span class="field-p21">${secondLbl}</span>`;
        }
        return `<div class="field-row ${won?'field-won':''}">
          <span class="party-flag" style="background:${p.c}">${lang==='ta'?p.ta:p.en}</span>
          <span class="${candCls}">${candTxt}</span>
          ${p21Pill}
        </div>`;
      }).join('')}
    </div>`;
  }

  // Local issues block
  let htmlIssues = '';
  const iss = (typeof ISSUES !== 'undefined') ? ISSUES[c.n] : null;
  if (iss && iss.i && iss.i.length) {
    const ICN = {water:'💧',flooding:'🌊',agriculture:'🌾',pollution:'☁️',jobs:'💼',roads:'🛣',transport:'🚌',waste:'🗑',health:'🏥',land:'📋',safety:'🛡',governance:'⚖',housing:'🏠',fisheries:'🎣',education:'🎓',power:'⚡',caste:'👥'};
    const confCol = {HIGH:'#10b981',MED:'#f59e0b',LOW:'#6b7280'}[iss.c]||'#6b7280';
    htmlIssues = `<div class="dc dc-issues">
      <div class="demo-t">${lang==='ta'?'உள்ளூர் பிரச்னைகள்':'LOCAL ISSUES'}<span class="issue-conf" style="color:${confCol}">· ${lang==='ta'?'நம்பகத்தன்மை':'confidence'} ${iss.c}</span></div>
      ${iss.i.map(([t,cat,sev])=>`<div class="issue-row"><span class="issue-ic">${ICN[cat]||'•'}</span><span class="issue-sev s-${sev.toLowerCase()}">${sev}</span><span class="issue-t">${t}</span></div>`).join('')}
    </div>`;
  }

  el.innerHTML = `
    <div class="dc dc-hero">
      <div class="badges">
        ${c.isV?'<span class="badge" style="background:#ff1744">VIJAY</span>':''}
        ${c.isK&&!c.isV?'<span class="badge" style="background:#f59e0b">KEY</span>':''}
        <span class="badge" style="background:${mCol}">${c.m21<15000?t('battleground_seat').toUpperCase():t('safe_seat').toUpperCase()} · ${fmt(c.m21)}</span>
      </div>
      <div class="sn">${t('constituency')} #${c.n}</div>
      <div class="s-name">${c.nm}</div>
      <div class="s-dist">${distName(c.di)}</div>
      <div class="cand-box">
        <div class="cb-label"><span class="party-flag" style="background:${PARTY.TVK.c}">TVK</span> ${t('tvk_candidate')}</div>
        <div class="cb-row">
          ${(typeof CAND!=='undefined' && CAND[c.n]?.img)?`<img class="cb-avatar" src="${CAND[c.n].img}" alt="" loading="lazy" onerror="this.remove()">`:''}
          <div class="cb-info">
            <div class="cb-name">${c.cd}</div>
            ${(typeof CAND!=='undefined' && CAND[c.n]?.role)?`<div class="cb-role">${CAND[c.n].role}</div>`:''}
            ${(typeof CAND!=='undefined' && CAND[c.n]?.edu)?`<div class="cb-edu">${CAND[c.n].edu}</div>`:''}
          </div>
        </div>
        <div class="badges" style="margin-top:6px;margin-bottom:0">
          ${c.isW?'<span class="badge" style="background:#ec4899">WOMAN</span>':''}
          ${c.isSC?'<span class="badge" style="background:#a855f7">SC</span>':''}
          ${c.isST?'<span class="badge" style="background:#a855f7">ST</span>':''}
        </div>
      </div>
    </div>
    ${(() => {
      const ext = (typeof CAND_EXT !== 'undefined') ? (CAND_EXT[c.n] || null) : null;
      if (!ext || (!ext.evm && !ext.ig)) return '';
      const evmLbl = lang==='ta' ? 'வாக்கு எண்' : 'EVM NUMBER';
      const evmSub = lang==='ta' ? 'வாக்களிக்கும் நாளில் இந்த எண்ணை அழுத்தவும்' : 'Press this number on ballot day';
      const igLbl = lang==='ta' ? 'அதிகாரப்பூர்வ Instagram' : 'OFFICIAL INSTAGRAM';
      const evmBlock = ext.evm ? `
        <div class="cta-evm">
          <div class="cta-evm-box">${ext.evm}</div>
          <div class="cta-evm-txt">
            <div class="cta-evm-lbl">${evmLbl}</div>
            <div class="cta-evm-sub">${evmSub}</div>
          </div>
        </div>` : '';
      const igHandle = ext.ig ? '@' + ext.ig.replace(/^https?:\/\/(www\.)?instagram\.com\//,'').replace(/[\/?].*$/,'').replace(/\/$/,'') : '';
      const igBlock = ext.ig ? `
        <a class="cta-ig" href="${ext.ig}" target="_blank" rel="noopener noreferrer" aria-label="${igLbl}">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          <span class="cta-ig-h">${igHandle}</span>
          <span class="cta-ig-cta">${lang==='ta'?'பார்வை':'Visit'}</span>
        </a>` : '';
      return `<div class="dc dc-cta">${evmBlock}${igBlock}</div>`;
    })()}
    ${htmlField}
    ${htmlIssues}
    <div class="dc">
      <div class="demo-t">${t('voter_demographics')}</div>
      <div class="demo-g">
        <div class="demo-c"><div class="n">${fmt(c.vt)}</div><div class="l">${t('total')}</div></div>
        <div class="demo-c"><div class="n bl">${fmt(c.ma)}</div><div class="l">${t('male')}</div></div>
        <div class="demo-c"><div class="n pk">${fmt(c.fe)}</div><div class="l">${t('female')}</div></div>
      </div>
      <div class="kpi-g">
        <div class="kpi"><div class="v" style="color:#f59e0b">${fmt(c.ft)}</div><div class="l">${t('first_time')}</div></div>
        <div class="kpi"><div class="v" style="color:#3b82f6">${fmt(c.y)}</div><div class="l">${t('youth_under')}</div></div>
        <div class="kpi"><div class="v" style="color:${mCol}">${fmt(c.m21)}</div><div class="l">${t('margin_2021')}</div></div>
      </div>
    </div>
    ${c.m21<15000 ? `<div class="bat"><b>${t('battleground_seat')}</b><span>${t('battleground_sub')} ${c.m21.toLocaleString()}</span></div>` : ''}`;
}

function filterMap(q) {
  const ql = q.toLowerCase().trim();
  filtered = ql ? ALL.filter(c =>
    c.nm.toLowerCase().includes(ql) ||
    c.cd.toLowerCase().includes(ql) ||
    DISTS[c.di].toLowerCase().includes(ql) ||
    DISTS_TA[c.di].includes(ql)
  ) : null;
  drawMap(filtered || ALL);
  updateMapCount(filtered || ALL);
}
