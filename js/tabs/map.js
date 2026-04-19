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
      <div class="ov-desc" id="ovDesc"></div>
      <div class="map-box">
        <svg id="mapSvg" viewBox="0 0 500 700" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="map-leg" id="mapLeg"></div>
      </div>
      <div>
        <div class="m-list-h" id="listH">${lang==='ta'?'அனைத்து தொகுதிகள்':'All Constituencies'}</div>
        <div class="m-list" id="listW"></div>
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
  buildList(filtered || ALL);
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

function buildList(list) {
  const el = document.getElementById('listW');
  if (!el) return;
  document.getElementById('listH').textContent = (
    list.length === ALL.length
      ? (lang==='ta' ? 'அனைத்து தொகுதிகள்' : 'All Constituencies')
      : `${list.length} ${lang==='ta' ? 'பொருந்துதல்' : 'Match'+(list.length!==1?'es':'')}`
  );
  const show = list.slice(0, 80);
  el.innerHTML = show.map(c =>
    `<div class="mli ${sel===c.n?'on':''}" onclick="selectSeat(${c.n})">
      <span class="mli-n">#${c.n}</span>
      <span class="mli-d" style="background:${bc(c)}"></span>
      <span class="mli-nm ${c.isV?'vijay':''}">${c.nm}</span>
      <span class="mli-v">${fmt(c.vt)}</span>
    </div>`
  ).join('') + (list.length>80 ? `<div style="font-size:10px;color:var(--t4);padding:8px;text-align:center">+ ${list.length-80} more</div>` : '');
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
  buildList(filtered || ALL);
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

  // 2021 result block
  let html2021 = '';
  if (res21) {
    const wp = PARTY[res21.wp] || PARTY.OTH;
    const rp = PARTY[res21.rp] || PARTY.OTH;
    const winName = res21.wn ? `<div class="p21-wn">${res21.wn} <span class="crown" title="2021 winner">👑</span></div>` : '';
    const turnout = res21.pv ? `<span class="p21-turnout">${res21.pv}% ${lang==='ta'?'வாக்களிப்பு':'turnout'}</span>` : '';
    const mpct = res21.mp ? `<span class="p21-mpct">· ${res21.mp}%</span>` : '';
    html2021 = `<div class="dc">
      <div class="demo-t">${t('result_2021')}</div>
      ${winName}
      <div class="p21-row">
        <span class="p21-win" style="background:${wp.c}">${lang==='ta'?wp.ta:wp.en}</span>
        <span class="p21-txt">${t('won_by')} <b>${res21.m.toLocaleString()}</b> ${t('votes_suffix')}${mpct}</span>
      </div>
      <div class="p21-row" style="margin-top:6px">
        <span class="p21-run" style="background:${rp.c}22;color:${rp.c};border:1px solid ${rp.c}55">2nd · ${lang==='ta'?rp.ta:rp.en}</span>
        ${turnout}
      </div>
    </div>`;
  }

  // 2026 opposition block — all announced parties, ordered by prominence
  let html2026 = '';
  const PARTY_ORDER = ['DMK','AIADMK','NTK','INC','BJP','PMK','VCK','AMMK','MDMK'];
  const oppEntries = PARTY_ORDER.filter(pk => opp26[pk]).map(pk => [pk, opp26[pk]]);
  if (oppEntries.length) {
    html2026 = `<div class="dc">
      <div class="demo-t">${t('opponents_2026')}</div>
      ${oppEntries.map(([pk, name]) => {
        const p = PARTY[pk] || PARTY.OTH;
        const won = res21 && res21.wp === pk;
        const crown = won ? ` <span class="crown" title="${lang==='ta'?'2021 வெற்றி':'Won in 2021'}">👑</span>` : '';
        return `<div class="opp-row ${won?'opp-won':''}"><span class="party-flag" style="background:${p.c}">${lang==='ta'?p.ta:p.en}</span><span class="opp-n">${name}${crown}</span></div>`;
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
    ${html2021}
    ${html2026}
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
  buildList(filtered || ALL);
}
