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

  // Bento layout: 'hero' (2×2), 'med' (2×1), 'small' (1×1). Fills a 4-col grid.
  const _ti = [
    {sz:'hero', tag:'MIN',    emoji:'🏛',  name:"India's First AI Ministry",    sub:"A primary AI officer in every government department · the digital spine of governance",
      nameTa:'இந்தியாவின் முதல் AI அமைச்சகம்', subTa:'ஒவ்வொரு அரசுத் துறையிலும் AI அதிகாரி · ஆட்சியின் டிஜிட்டல் முதுகெலும்பு'},
    {sz:'med',  tag:'EDU',    emoji:'🎓',  name:'PIET University',               sub:'Periyar Institute of Emerging Tech · 6 domains',
      nameTa:'பெரியார் தொழில்நுட்பப் பல்கலை', subTa:'6 அதிநவீன களங்கள்'},
    {sz:'med',  tag:'APP',    emoji:'📱',  name:'Victorious TN Super App',       sub:'500 govt services from your mobile',
      nameTa:'வெற்றி TN சூப்பர் ஆப்', subTa:'500 அரசு சேவைகள் மொபைலில்'},
    {sz:'med',  tag:'AI',     emoji:'🧠',  name:'Tamil AI Model',                sub:'State-backed LLM · free for all citizens',
      nameTa:'தமிழ் AI மாதிரி', subTa:'மாநில LLM · அனைவருக்கும் இலவசம்'},
    {sz:'small',tag:'SPACE',  emoji:'🛰',  name:'Kulasekarapattinam',            sub:'Space investment region',
      nameTa:'குளசேகரபட்டினம்', subTa:'விண்வெளி முதலீட்டு மண்டலம்'},
    {sz:'small',tag:'DRONE',  emoji:'🚁',  name:'Drone Route',                   sub:'India-first · 10 districts',
      nameTa:'டிரோன் வழித்தடம்', subTa:'இந்தியாவில் முதல் · 10 மாவட்டம்'},
    {sz:'small',tag:'FORUM',  emoji:'📢',  name:"People's Forum",                sub:'Direct-to-govt demands',
      nameTa:'மக்கள் மன்றம்', subTa:'நேரடி-அரசு கோரிக்கை'},
    {sz:'small',tag:'DASH',   emoji:'📊',  name:'Governance Dashboard',          sub:'Real-time office tracking',
      nameTa:'ஆட்சி டாஷ்போர்டு', subTa:'நிகழ்நேர அலுவலக கண்காணிப்பு'},
    {sz:'small',tag:'AI-FARM',emoji:'🌾', name:'Ulavan AI',                     sub:'Farmer smartphone AI',
      nameTa:'உழவன் AI', subTa:'விவசாயி ஸ்மார்ட்போன் AI'},
    {sz:'small',tag:'HEALTH', emoji:'💊',  name:'3,000 Tele-medicine',           sub:'Welfare centres',
      nameTa:'3,000 டெலி-மருத்துவம்', subTa:'நல மையங்கள்'},
    {sz:'small',tag:'CCTV',   emoji:'👁',  name:'AI Surveillance',               sub:'Integrated monitoring',
      nameTa:'AI கண்காணிப்பு', subTa:'ஒருங்கிணைந்த கண்காணிப்பு'},
    {sz:'small',tag:'FUND',   emoji:'💰',  name:'₹500 Cr Venture Fund',          sub:'AI · DeepTech · FinTech',
      nameTa:'₹500 கோடி முதலீட்டு நிதி', subTa:'AI · DeepTech · FinTech'},
    {sz:'small',tag:'FIN',    emoji:'💹',  name:'i-Tamil FinTech',               sub:'Coimbatore corridor',
      nameTa:'i-தமிழ் FinTech', subTa:'கோயம்புத்தூர் தடங்கம்'},
    {sz:'small',tag:'CHIP',   emoji:'🔬',  name:'Semiconductor Lab',             sub:'Hardware testing',
      nameTa:'குறைகடத்தி ஆய்வகம்', subTa:'வன்பொருள் சோதனை'},
    {sz:'small',tag:'SKILL',  emoji:'🎯',  name:'District Skill Centres',        sub:'AI·EV·Cloud·Cyber · 38 dist.',
      nameTa:'மாவட்ட திறன் மையங்கள்', subTa:'AI·EV·Cloud·Cyber · 38 மாவட்டம்'},
    {sz:'small',tag:'GOV',    emoji:'⚖',  name:'Whistleblower Act',             sub:'State protection',
      nameTa:'ஊழல் அம்பலம் சட்டம்', subTa:'மாநில பாதுகாப்பு'},
    {sz:'small',tag:'ID',     emoji:'🪪',  name:'Rights Card',                   sub:'Aadhaar-like family card',
      nameTa:'உரிமை அட்டை', subTa:'ஆதார் போன்ற குடும்ப அட்டை'},
    {sz:'small',tag:'NA',     emoji:'✨',  name:'No-Application Welfare',        sub:'Auto-identify beneficiaries',
      nameTa:'விண்ணப்பமில்லா நலம்', subTa:'தானாக பயனாளி'}
  ];
  const techItems = _ti.map(x => ({...x, name: lang==='ta'?x.nameTa:x.name, sub: lang==='ta'?x.subTa:x.sub}));
  let h=`
  <div class="tab-sec">
    <div class="mani-wrap">
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
    <div class="thoon-chips" id="thoonChips">
      ${[[1,'Tamil','தமிழ்'],[2,'Dignity','கண்ணியம்'],[3,'Women','பெண்'],[4,'Youth','இளைஞர்'],[5,'Farmers','விவசாயி'],[6,'Education','கல்வி'],[7,'Wealth','செல்வம்'],[8,'Health','மருத்துவம்'],[9,'Infra','உட்கட்'],[10,'Govt','ஆட்சி']].map(([n,en,ta])=>{
        const pl=(typeof PILLARS!=='undefined'&&THOONS&&THOONS[n])?PILLARS[THOONS[n].pillar].c:'#e94560';
        const full=(THOONS&&THOONS[n])?THOONS[n].en:'';
        const lbl=lang==='ta'?ta:en;
        return `<button class="tchip" data-t="${n}" onclick="setThoon(${n})" title="${full}" style="--pc:${pl}"><b>${n}</b><span>${lbl}</span></button>`;
      }).join('')}
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
    <div class="sec-label">${lang==='ta'?'தொழில்நுட்பம் & புத்தாக்கம்':'TECH & INNOVATION'}</div>
    <div class="sec-title">${lang==='ta'?'AI முதலீடு, ஆளுமை, விண்வெளி':'AI, governance, space — the digital spine'}</div>
    <div class="bento">
      ${techItems.map(it=>`<div class="bento-c bento-${it.sz}">
        <div class="bento-emoji">${it.emoji}</div>
        <div class="bento-tag">${it.tag}</div>
        <div class="bento-body">
          <em>${it.name}</em>
          <span>${it.sub}</span>
        </div>
      </div>`).join('')}
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
let thoonFilter = 'all';
function setPillar(p){
  pillarFilter = p;
  thoonFilter = 'all';
  document.querySelectorAll('#pillarChips .pchip').forEach(b => b.classList.toggle('on', b.dataset.p === p));
  document.querySelectorAll('#thoonChips .tchip').forEach(b => b.classList.remove('on'));
  renderPromiseCards();
  if (typeof renderConstellation === 'function') renderConstellation('constWrap', persona);
}
function setThoon(n){
  thoonFilter = (thoonFilter === n) ? 'all' : n;
  document.querySelectorAll('#thoonChips .tchip').forEach(b => b.classList.toggle('on', +b.dataset.t === thoonFilter));
  renderPromiseCards();
  if (typeof renderConstellation === 'function') renderConstellation('constWrap', persona);
}

function renderPromiseCards(){
  const g=document.getElementById('promiseGrid');if(!g)return;
  let items = (typeof MANIFESTO !== 'undefined') ? MANIFESTO.slice() : [];
  if(persona !== 'all') items = items.filter(x => x.personas && (x.personas.includes(persona) || (x.personas.length===1 && x.personas[0]==='all')));
  if(pillarFilter !== 'all') items = items.filter(x => x.pillar === pillarFilter);
  if(thoonFilter !== 'all') items = items.filter(x => x.thoon === thoonFilter);
  if(!items.length){ g.innerHTML = `<div style="padding:32px;text-align:center;color:var(--t3)">No matches.</div>`; return; }
  // Flat single grid — sort by thoon then impact-ish (metric presence first)
  items.sort((a,b) => (a.thoon - b.thoon) || ((b.metric?1:0) - (a.metric?1:0)));
  g.innerHTML = `<div class="flat-grid">
    ${items.map(p => {
      const th = THOONS[p.thoon] || {en:'', pillar:p.pillar};
      const pl = PILLARS[p.pillar] || {c:'#e94560'};
      const title = p.title.replace(/^[A-Z]\.\s*/, '').replace(/[:;]+$/,'');
      const descShort = p.desc.length > 180 ? p.desc.slice(0, 178).replace(/\s+\S*$/,'') + '…' : p.desc;
      const m = fmtMetric(p.metric);
      return `<div class="pc" style="--pc:${pl.c}" onclick="showPromiseModal('${p.id}')">
        <div class="pc-top">
          <span class="pc-thoon">T${p.thoon}</span>
          ${m?`<span class="pc-metric" style="background:${pl.c}1a;color:${pl.c}">${m}</span>`:''}
        </div>
        <div class="pc-title">${title}</div>
        <div class="pc-desc">${descShort}</div>
      </div>`;
    }).join('')}
  </div>`;
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
