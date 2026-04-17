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
    <div class="pg" id="promiseGrid"></div>
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
      <div class="trc big" style="background:linear-gradient(135deg,#b91c1c,#e94560)"><div class="a">₹15,000 Cr</div><div class="lb">MSME Credit Fund</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#7c3aed,#8b5cf6)"><div class="a">₹50L</div><div class="lb">MSME Subsidy</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#a855f7,#c084fc)"><div class="a">₹25L</div><div class="lb">Youth Loans</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#ec4899,#f472b6)"><div class="a">₹20L</div><div class="lb">Education Loans</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#f59e0b,#fbbf24)"><div class="a">₹10L</div><div class="lb">Weaver Insurance</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#10b981,#34d399)"><div class="a">₹5L</div><div class="lb">SHG Loans</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#06b6d4,#22d3ee)"><div class="a">₹30K/yr</div><div class="lb">Weaver Aid</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#ef4444,#f87171)"><div class="a">₹15K/yr</div><div class="lb">Education</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#8b5cf6,#a78bfa)"><div class="a">₹10K/yr</div><div class="lb">Farmer Aid</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#f97316,#fb923c)"><div class="a">₹4K/mo</div><div class="lb">Unemployed</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#d946ef,#e879f9)"><div class="a">₹2.5K/mo</div><div class="lb">Women</div></div>
      <div class="trc" style="background:linear-gradient(135deg,#14b8a6,#2dd4bf)"><div class="a">₹3K/mo</div><div class="lb">Weaver Pension</div></div>
    </div>
  </div>

  <div class="tab-sec">
    <div class="sec-label">${t('pay_label')}</div>
    <div class="sec-title">${t('pay_title')}</div>
    <div class="pay-grid">
      ${[
        {l:'Weaver Aid',a:'₹30,000',u:'/yr',c:'#06b6d4'},{l:'Education',a:'₹15,000',u:'/yr',c:'#a855f7'},
        {l:'Intern',a:'₹10,000',u:'/mo',c:'#3b82f6'},{l:'Farmer',a:'₹10,000',u:'/yr',c:'#10b981'},
        {l:'IT Intern',a:'₹8,000',u:'/mo',c:'#60a5fa'},{l:'Grad Aid',a:'₹4,000',u:'/mo',c:'#6366f1'},
        {l:'Weaver Pen.',a:'₹3,000',u:'/mo',c:'#0891b2'},{l:'Women',a:'₹2,500',u:'/mo',c:'#ec4899'},
        {l:'Diploma',a:'₹2,000',u:'/mo',c:'#818cf8'},{l:'Police',a:'₹1,000',u:'/mo',c:'#ef4444'}
      ].map(p=>`<div class="pay"><div class="pay-amt" style="color:${p.c}">${p.a}</div><div class="pay-lbl">${p.l} ${p.u}</div></div>`).join('')}
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
}

function setPersona(k){
  persona=k;
  document.querySelectorAll('.pers').forEach(b=>b.classList.remove('on'));
  document.querySelector(`.pers[onclick="setPersona('${k}')"]`)?.classList.add('on');
  renderPromiseCards();
  updateURL();
}

function renderPromiseCards(){
  const g=document.getElementById('promiseGrid');if(!g)return;
  const fl=persona==='all'?PROMISES:PROMISES.filter(p=>p.personas.includes(persona));
  g.innerHTML=fl.map(p=>{
    const loc=p[lang]||p.en;
    const c=CATS[p.c];
    return`<div class="pc" onclick="showPromiseModal(${JSON.stringify(p.id)})">
      <span class="pc-tag" style="background:${c.c}22;color:${c.c}">${catLabel(p.c)}</span>
      <div class="pc-title">${loc.t}</div>
      <div class="pc-desc">${loc.d}</div>
      <div class="pc-foot">
        ${p.metric?`<span class="pc-metric" style="background:${c.c}1a;color:${c.c}">${p.metric}</span>`:''}
        <span class="pc-ben">${loc.benefits||''}</span>
      </div>
    </div>`;
  }).join('');
}

function showPromiseModal(id){
  const p=typeof id==='string'?PROMISES.find(x=>x.id===id):id;
  if(!p)return;
  const loc=p[lang]||p.en;
  const c=CATS[p.c];
  const ctxRows=[
    {k:'compare',ic:'⚖',col:'#3b82f6',txt:loc.compare},
    {k:'legal',ic:'§',col:'#a855f7',txt:loc.legal},
    {k:'fiscal',ic:'₹',col:'#10b981',txt:loc.fiscal},
    {k:'risk',ic:'⚠',col:'#ef4444',txt:loc.risk}
  ].filter(r=>r.txt);
  const h=`
    <div class="modal-hd">
      <button class="modal-x" onclick="closeModal()">✕</button>
      <span class="modal-tag" style="background:${c.c}22;color:${c.c}">${catLabel(p.c)}</span>
      <div class="modal-title">${loc.t}</div>
    </div>
    <div class="modal-body">
      <div class="modal-sec"><p>${loc.d}</p></div>
      ${p.metric?`<div class="modal-sec"><h4>${t('context_benefits')}</h4><p><b style="color:${c.c};font-family:var(--mono);font-size:18px">${p.metric}</b>${loc.benefits?` · ${loc.benefits}`:''}</p></div>`:loc.benefits?`<div class="modal-sec"><h4>${t('context_benefits')}</h4><p>${loc.benefits}</p></div>`:''}
      ${ctxRows.map(r=>`<div class="ctx-row" style="--ctx-c:${r.col}"><div class="ctx-ic">${r.ic}</div><div class="ctx-txt"><b>${t('context_'+r.k)}</b><p>${r.txt}</p></div></div>`).join('')}
    </div>
    <div class="modal-ft">
      <button class="btn" onclick="closeModal();switchTab(2)">${t('show_on_map')}</button>
      <button class="btn btn-ghost" onclick="closeModal()">${t('close')}</button>
    </div>`;
  openModal(h);
}

function renderH2H(){
  const g=document.getElementById('h2hGrid');if(!g)return;
  const data=[
    {l:"Women's aid",tvk:"₹2,500",dmk:"₹1,000",aiadmk:"₹1,000"},
    {l:"LPG cylinders",tvk:"6/yr",dmk:"3/yr",aiadmk:"3/yr"},
    {l:"Bus travel",tvk:"All buses",dmk:"Town only",aiadmk:"Town only"},
    {l:"Edu loans",tvk:"₹20L free",dmk:"Partial",aiadmk:"₹10L"},
    {l:"Youth aid",tvk:"₹4K/mo",dmk:"None",aiadmk:"₹3K"},
    {l:"Jobs quota",tvk:"75% law",dmk:"None",aiadmk:"None"},
    {l:"Internships",tvk:"5L/yr",dmk:"1L/yr",aiadmk:"None"},
    {l:"Farm waiver",tvk:"100% <5ac",dmk:"Partial",aiadmk:"Partial"},
    {l:"Paddy MSP",tvk:"₹3,500",dmk:"₹2,320",aiadmk:"₹2,800"},
    {l:"MSME fund",tvk:"₹15K Cr",dmk:"Existing",aiadmk:"None"},
    {l:"Police pay",tvk:"₹25K",dmk:"₹18.2K",aiadmk:"₹20K"},
    {l:"Weaver aid",tvk:"₹30K/yr",dmk:"₹10K",aiadmk:"₹15K"}
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
