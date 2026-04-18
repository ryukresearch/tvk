/* ═══════════════════════════════════════════════════════════════
   PROMISES TAB — Persona picker + promise cards + modal + H2H + treemap + BA
   ═══════════════════════════════════════════════════════════════ */

function buildPromises(){
  const el=document.getElementById('tab1');
  const personas=[
    {k:'woman',ic:'♀',lk:'p_woman',sk:'p_woman_s'},
    {k:'farmer',ic:'🌾',lk:'p_farmer',sk:'p_farmer_s'},
    {k:'youth',ic:'⚡',lk:'p_youth',sk:'p_youth_s'},
    {k:'business',ic:'🏭',lk:'p_business',sk:'p_business_s'},
    {k:'weaver',ic:'🧵',lk:'p_weaver',sk:'p_weaver_s'},
    {k:'all',ic:'★',lk:'p_all',sk:'p_all_s'}
  ];

  let h=`
  <div class="tab-sec">
    <div class="sec-label">${t('prom_label')}</div>
    <div class="sec-title">${t('prom_title')}</div>
    <div class="sec-desc">${t('prom_sub')}</div>
    <div style="font-size:11px;color:var(--t3);letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:10px">${t('persona_title')}</div>
    <div class="persona-grid" id="personaGrid">
      ${personas.map(p=>`<button class="pers ${persona===p.k?'on':''}" onclick="setPersona('${p.k}')">
        <div class="pers-ic">${p.ic}</div>
        <div class="pers-txt"><b>${t(p.lk)}</b><small>${t(p.sk)}</small></div>
      </button>`).join('')}
    </div>
    <div class="pillar-chips" id="pillarChips">
      <button class="pchip on" data-p="all" onclick="setPillar('all')">${lang==='ta'?'அனைத்தும்':'All'}</button>
      <button class="pchip" data-p="aram"  onclick="setPillar('aram')"  style="--pc:#8b5cf6">அறம் · Aram</button>
      <button class="pchip" data-p="porul" onclick="setPillar('porul')" style="--pc:#e94560">பொருள் · Porul</button>
      <button class="pchip" data-p="inbam" onclick="setPillar('inbam')" style="--pc:#10b981">இன்பம் · Inbam</button>
    </div>
    <div class="view-row">
      <div class="view-toggle" id="promView">
        <button class="vt on" data-v="const" onclick="setPromiseView('const')">${lang==='ta'?'நட்சத்திரம்':'Constellation'}</button>
        <button class="vt" data-v="cards" onclick="setPromiseView('cards')">${lang==='ta'?'அட்டைகள்':'Cards'}</button>
      </div>
    </div>
    <div id="constWrap" class="const-wrap"></div>
    <div class="pg" id="promiseGrid" style="display:none"></div>
  </div>

  <div class="tab-sec">
    <div class="sec-label">${t('h2h_label')}</div>
    <div class="sec-title">${t('h2h_title')}</div>
    <div class="sec-desc">${t('h2h_sub')}</div>
    <div class="h2h-grid" id="h2hGrid"></div>
  </div>

  <div class="tab-sec">
    <div class="sec-label">${t('money_label')}</div>
    <div class="sec-title">${t('money_title')}</div>
    <div class="tree">
      <div class="trc big tr-1"><div class="a">₹15,000 Cr</div><div class="lb">MSME Credit Fund</div></div>
      <div class="trc tr-2"><div class="a">₹50L</div><div class="lb">MSME Subsidy</div></div>
      <div class="trc tr-3"><div class="a">₹25L</div><div class="lb">Youth Loans</div></div>
      <div class="trc tr-3"><div class="a">₹20L</div><div class="lb">Education Loans</div></div>
      <div class="trc tr-4"><div class="a">₹10L</div><div class="lb">Weaver Insurance</div></div>
      <div class="trc tr-4"><div class="a">₹5L</div><div class="lb">SHG Loans</div></div>
      <div class="trc tr-5"><div class="a">₹30K/yr</div><div class="lb">Weaver Aid</div></div>
      <div class="trc tr-5"><div class="a">₹15K/yr</div><div class="lb">Education</div></div>
      <div class="trc tr-5"><div class="a">₹10K/yr</div><div class="lb">Farmer Aid</div></div>
      <div class="trc tr-6"><div class="a">₹4K/mo</div><div class="lb">Unemployed</div></div>
      <div class="trc tr-6"><div class="a">₹2.5K/mo</div><div class="lb">Women</div></div>
      <div class="trc tr-6"><div class="a">₹3K/mo</div><div class="lb">Weaver Pension</div></div>
    </div>
  </div>

  <div class="tab-sec">
    <div class="sec-label">${t('pay_label')}</div>
    <div class="sec-title">${t('pay_title')}</div>
    <div class="pay-grid">
      ${[
        {l:'Weaver Aid',a:'₹30,000',u:'/yr'},{l:'Education',a:'₹15,000',u:'/yr'},
        {l:'Intern',a:'₹10,000',u:'/mo'},{l:'Farmer',a:'₹10,000',u:'/yr'},
        {l:'IT Intern',a:'₹8,000',u:'/mo'},{l:'Grad Aid',a:'₹4,000',u:'/mo'},
        {l:'Weaver Pen.',a:'₹3,000',u:'/mo'},{l:'Women',a:'₹2,500',u:'/mo'},
        {l:'Diploma',a:'₹2,000',u:'/mo'},{l:'Police',a:'₹1,000',u:'/mo'}
      ].map(p=>`<div class="pay"><div class="pay-amt">${p.a}</div><div class="pay-lbl">${p.l} ${p.u}</div></div>`).join('')}
    </div>
  </div>

  <div class="tab-sec">
    <div class="sec-label">${t('ba_label')}</div>
    <div class="sec-title">${t('ba_title')}</div>
    <div id="baList"></div>
  </div>

  <div class="tab-foot">made by <span>RYUK</span></div>`;

  el.innerHTML=h;
  renderPromiseCards();
  renderH2H();
  renderBA();
  // Default: render constellation view
  renderConstellation('constWrap', persona);
}

let promiseView = 'const';
function setPromiseView(v){
  promiseView = v;
  document.querySelectorAll('#promView .vt').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  const cw = document.getElementById('constWrap');
  const pg = document.getElementById('promiseGrid');
  if (v === 'const') {
    cw.style.display = '';
    pg.style.display = 'none';
    renderConstellation('constWrap', persona);
  } else {
    cw.style.display = 'none';
    pg.style.display = '';
  }
}

function setPersona(k){
  persona=k;
  document.querySelectorAll('.pers').forEach(b=>b.classList.remove('on'));
  document.querySelector(`.pers[onclick="setPersona('${k}')"]`)?.classList.add('on');
  renderPromiseCards();
  if (typeof renderConstellation === 'function') renderConstellation('constWrap', persona);
  updateURL();
}

// Compact money/unit formatter: "3500 rupees" → "₹3.5K", "15,000 crore" → "₹15K Cr", "5 lakh" → "₹5L"
function fmtMetric(s){
  if(!s) return '';
  let m = s.trim();
  // Pure % passthrough
  if(/^\d+(?:\.\d+)?\s*%$/.test(m)) return m.replace(/\s+/g,'');
  // Parse numeric head
  const match = m.match(/^₹?\s*([\d,]+(?:\.\d+)?)\s*(crore|cr|lakh|l|k|thousand|rupees?)?\b\s*(.*)$/i);
  if(!match){
    // Unit-only like "8 grams","200 km","5 acres" — compact spacing
    return m.replace(/(\d+(?:,\d+)*(?:\.\d+)?)\s+(grams?|km|acres?|beds?|years?|months?|days?|units?|cylinders?)/ig,(_,n,u)=>{
      const unitShort = {gram:'g',grams:'g',year:'y',years:'y',month:'mo',months:'mo',day:'d',days:'d'}[u.toLowerCase()]||u;
      return n+unitShort;
    });
  }
  const n = parseFloat(match[1].replace(/,/g,''));
  const unit = (match[2]||'').toLowerCase();
  const rest = match[3]||'';
  let out='';
  if(unit==='crore'||unit==='cr'){ out = n>=1000 ? '₹'+(n/1000)+'K Cr' : '₹'+n+' Cr'; }
  else if(unit==='lakh'||unit==='l'){ out = '₹'+n+'L'; }
  else if(unit==='k'||unit==='thousand'){ out = '₹'+n+'K'; }
  else if(unit==='rupee'||unit==='rupees'){
    // Plain rupees → choose best abbreviation
    if(n>=1e7) out='₹'+(n/1e7).toFixed(n>=1e8?0:1).replace(/\.0$/,'')+' Cr';
    else if(n>=1e5) out='₹'+(n/1e5).toFixed(n>=1e6?0:1).replace(/\.0$/,'')+'L';
    else if(n>=1000) out='₹'+(n/1000).toFixed(n>=10000?0:1).replace(/\.0$/,'')+'K';
    else out='₹'+n;
  }
  else{ out = (s.startsWith('₹')?'':'₹')+n; }
  return out + (rest?' '+rest.trim():'');
}

let pillarFilter = 'all';
function setPillar(p){
  pillarFilter = p;
  document.querySelectorAll('#pillarChips .pchip').forEach(b => b.classList.toggle('on', b.dataset.p === p));
  renderPromiseCards();
  if (typeof renderConstellation === 'function') renderConstellation('constWrap', persona);
}

function renderPromiseCards(){
  const g=document.getElementById('promiseGrid');if(!g)return;
  let items = (typeof MANIFESTO !== 'undefined') ? MANIFESTO.slice() : [];
  if(persona !== 'all') items = items.filter(x => x.personas && (x.personas.includes(persona) || (x.personas.length===1 && x.personas[0]==='all')));
  if(pillarFilter !== 'all') items = items.filter(x => x.pillar === pillarFilter);
  if(!items.length){ g.innerHTML = `<div style="padding:32px;text-align:center;color:var(--t3)">No matches.</div>`; return; }
  const byThoon = {};
  items.forEach(p => { (byThoon[p.thoon] = byThoon[p.thoon] || []).push(p); });
  g.innerHTML = Object.keys(byThoon).sort((a,b)=>+a-+b).map(tn => {
    const th = THOONS[tn] || {en:'Thoon '+tn, pillar:'aram'};
    const pl = PILLARS[th.pillar] || {c:'#e94560', ta:'', en:''};
    return `<div class="thoon-grp" style="--pc:${pl.c}">
      <div class="thoon-hd">
        <span class="thoon-n">${tn}</span>
        <div class="thoon-ti"><b>${th.en}</b><small>${pl.ta} · ${pl.en}</small></div>
        <span class="thoon-ct">${byThoon[tn].length}</span>
      </div>
      <div class="thoon-body">
      ${byThoon[tn].map(p => {
        const title = p.title.replace(/^[A-Z]\.\s*/, '').replace(/[:;]+$/,'');
        const descShort = p.desc.length > 90 ? p.desc.slice(0, 88).replace(/\s+\S*$/,'') + '…' : p.desc;
        const m = fmtMetric(p.metric);
        return `<div class="pc" onclick="showPromiseModal('${p.id}')">
        ${m?`<span class="pc-metric" style="background:${pl.c}1a;color:${pl.c}">${m}</span>`:''}
        <div class="pc-title">${title}</div>
        <div class="pc-desc">${descShort}</div>
      </div>`;}).join('')}
      </div>
    </div>`;
  }).join('');
}

function showPromiseModal(id){
  // Try MANIFESTO first, fall back to legacy PROMISES
  let m = null;
  if (typeof MANIFESTO !== 'undefined') m = MANIFESTO.find(x => x.id === id);
  if (m) {
    const th = THOONS[m.thoon], pl = PILLARS[m.pillar];
    const h = `
      <div class="modal-hd">
        <button class="modal-x" onclick="closeModal()">✕</button>
        <span class="modal-tag" style="background:${pl.c}22;color:${pl.c}">Thoon ${m.thoon} · ${th.en}</span>
        <div class="modal-title">${m.title}</div>
        ${m.scheme?`<div class="modal-scheme">${m.scheme}</div>`:''}
      </div>
      <div class="modal-body">
        ${m.metric?`<div class="modal-sec"><h4>${t('context_benefits')||'Metric'}</h4><p><b style="color:${pl.c};font-family:var(--mono);font-size:20px">${fmtMetric(m.metric)}</b></p></div>`:''}
        <div class="modal-sec"><p>${m.desc}</p></div>
        <div class="modal-sec"><h4>Pillar</h4><p><b style="color:${pl.c}">${pl.en} · ${pl.ta}</b> — ${pl.sub}</p></div>
      </div>
      <div class="modal-ft">
        <button class="btn" onclick="closeModal();switchTab(2)">${t('show_on_map')||'Show on map'}</button>
        <button class="btn btn-ghost" onclick="closeModal()">${t('close')||'Close'}</button>
      </div>`;
    openModal(h); return;
  }
  // Legacy PROMISES path (for constellation on old IDs)
  const p = typeof id==='string' ? PROMISES.find(x=>x.id===id) : id;
  if(!p) return;
  const loc=p[lang]||p.en, c=CATS[p.c];
  const ctxRows=[
    {k:'compare',ic:'⚖',col:'#3b82f6',txt:loc.compare},
    {k:'legal',ic:'§',col:'#a855f7',txt:loc.legal},
    {k:'fiscal',ic:'₹',col:'#10b981',txt:loc.fiscal},
    {k:'risk',ic:'⚠',col:'#ef4444',txt:loc.risk}
  ].filter(r=>r.txt);
  openModal(`
    <div class="modal-hd"><button class="modal-x" onclick="closeModal()">✕</button>
      <span class="modal-tag" style="background:${c.c}22;color:${c.c}">${catLabel(p.c)}</span>
      <div class="modal-title">${loc.t}</div></div>
    <div class="modal-body">
      <div class="modal-sec"><p>${loc.d}</p></div>
      ${p.metric?`<div class="modal-sec"><h4>${t('context_benefits')}</h4><p><b style="color:${c.c};font-family:var(--mono);font-size:18px">${p.metric}</b>${loc.benefits?` · ${loc.benefits}`:''}</p></div>`:loc.benefits?`<div class="modal-sec"><h4>${t('context_benefits')}</h4><p>${loc.benefits}</p></div>`:''}
      ${ctxRows.map(r=>`<div class="ctx-row" style="--ctx-c:${r.col}"><div class="ctx-ic">${r.ic}</div><div class="ctx-txt"><b>${t('context_'+r.k)}</b><p>${r.txt}</p></div></div>`).join('')}
    </div>
    <div class="modal-ft"><button class="btn" onclick="closeModal();switchTab(2)">${t('show_on_map')}</button>
      <button class="btn btn-ghost" onclick="closeModal()">${t('close')}</button></div>`);
}

function renderH2H(){
  const g=document.getElementById('h2hGrid');if(!g)return;
  const data=[
    {l:"Women ₹/mo (Madhippumigu)",tvk:"₹2,500",dmk:"₹1,000",aiadmk:"₹1,000"},
    {l:"LPG cylinders (Annapoorani 6)",tvk:"6/yr",dmk:"3/yr",aiadmk:"3/yr"},
    {l:"Bus (Vettri Payanam)",tvk:"All govt buses",dmk:"Town only",aiadmk:"Town only"},
    {l:"Edu loans (collateral-free)",tvk:"₹20L",dmk:"Partial",aiadmk:"₹10L"},
    {l:"Internships /yr at ₹10K/mo",tvk:"5L",dmk:"1L",aiadmk:"None"},
    {l:"Paddy MSP (₹/qtl)",tvk:"₹3,500",dmk:"₹2,320",aiadmk:"₹2,800"},
    {l:"Sugarcane MSP (₹/ton)",tvk:"₹4,500",dmk:"₹3,200",aiadmk:"₹3,400"},
    {l:"MSME credit guarantee",tvk:"₹15,000 Cr",dmk:"Central only",aiadmk:"None"},
    {l:"TNSIA strategic investment",tvk:"₹50,000 Cr",dmk:"None",aiadmk:"None"},
    {l:"Police base salary",tvk:"₹18.2K→₹25K",dmk:"₹18.2K",aiadmk:"₹20K"}
  ];
  g.innerHTML=data.map(d=>`<div class="h2h">
    <div class="h2h-label">${d.l}</div>
    <div class="h2h-tvk">${d.tvk}<small>TVK</small></div>
    <div class="h2h-row"><b>DMK</b>${d.dmk}</div>
    <div class="h2h-row"><b>AIADMK</b>${d.aiadmk}</div>
  </div>`).join('');
}

function renderBA(){
  const el=document.getElementById('baList');if(!el)return;
  const comps=[
    {l:'Police Base Salary',b:18200,a:25000,mx:30000,c:'#ef4444'},
    {l:'Paddy MSP (₹/qtl)',b:2320,a:3500,mx:4000,c:'#10b981'},
    {l:'Sugarcane (₹/ton)',b:3200,a:4500,mx:5000,c:'#10b981'},
    {l:'Weaver Pension',b:1000,a:3000,mx:3500,c:'#06b6d4'},
    {l:'Weaver Annual Aid',b:10000,a:30000,mx:35000,c:'#06b6d4'}
  ];
  el.innerHTML=comps.map(c=>`<div class="ba-row">
    <div class="ba-label">${c.l}</div>
    <div class="ba-track"><div class="ba-fill" data-w="${(c.a/c.mx*100)}" style="background:linear-gradient(90deg,${c.c}88,${c.c})">₹${c.b.toLocaleString()} → ₹${c.a.toLocaleString()}</div></div>
    <div class="ba-pct" style="color:${c.c}">+${Math.round((c.a-c.b)/c.b*100)}%</div>
  </div>`).join('');
  setTimeout(()=>el.querySelectorAll('.ba-fill[data-w]').forEach(b=>b.style.width=b.dataset.w+'%'),200);
}
