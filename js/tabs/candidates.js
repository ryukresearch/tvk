/* ═══════════════════════════════════════════════════════════════
   CANDIDATES TAB — Filter chips + sort + 3 view modes + search
   ═══════════════════════════════════════════════════════════════ */

function buildCandidates(){
  const el=document.getElementById('tab3');
  el.innerHTML=`
  <div class="tab-sec">
    <div class="sec-label">${t('cand_label')}</div>
    <div class="sec-title">${t('cand_title')}</div>
    <div class="sec-desc">${t('cand_sub')}</div>

    <div class="cs-row">
      ${[[234,t('f_all'),'var(--red)'],[wC,t('f_women'),'var(--pink)'],[scC,t('f_scst'),'var(--purple)'],[kC,t('f_key'),'var(--orange)'],[2,t('f_vijay'),'#ff1744']].map(([v,l,c])=>`<div class="cs" style="border-left-color:${c}"><b>${v}</b><small>${l}</small></div>`).join('')}
    </div>

    <div class="m-search" style="margin-bottom:var(--sp3)"><input type="search" placeholder="${lang==='ta'?'வேட்பாளர், தொகுதி தேடு...':'Search candidate, constituency...'}" oninput="filterCands(this.value)"></div>

    <div class="chip-row" id="candFilters"></div>

    <div class="sort-row">
      <span>${t('sort_by')}:</span>
      <select id="candSortSel" onchange="setCandSort(this.value)">
        <option value="seat">${t('sort_seat')}</option>
        <option value="name">${t('sort_name')}</option>
        <option value="dist">${t('sort_dist')}</option>
        <option value="margin">${t('sort_margin')}</option>
      </select>
      <span style="margin-left:auto">${t('view')}:</span>
      <div class="view-toggle">
        <button class="vt ${candView==='grid'?'on':''}" onclick="setCandView('grid')">${t('v_grid')}</button>
        <button class="vt ${candView==='list'?'on':''}" onclick="setCandView('list')">${t('v_list')}</button>
        <button class="vt ${candView==='dist'?'on':''}" onclick="setCandView('dist')">${t('v_dist')}</button>
      </div>
    </div>

    <div id="candOut"></div>
  </div>
  <div class="tab-foot">made by <span>RYUK</span></div>`;

  renderCandFilters();
  document.getElementById('candSortSel').value=candSort;
  renderCands();
}

function renderCandFilters(){
  const el=document.getElementById('candFilters');if(!el)return;
  const filters=[
    {k:'all',l:t('f_all'),count:234},
    {k:'battle',l:t('f_battle'),count:battle},
    {k:'women',l:t('f_women'),count:wC},
    {k:'scst',l:t('f_scst'),count:scC},
    {k:'key',l:t('f_key'),count:kC},
    {k:'vijay',l:t('f_vijay'),count:2}
  ];
  el.innerHTML=filters.map(f=>`<button class="chip ${candFilter===f.k?'on':''}" onclick="setCandFilter('${f.k}')">${f.l} <b>${f.count}</b></button>`).join('');
}

function setCandFilter(k){candFilter=k;renderCandFilters();renderCands()}
function setCandSort(k){candSort=k;renderCands()}
function setCandView(k){candView=k;renderCands();document.querySelectorAll('.vt').forEach(b=>b.classList.toggle('on',b.textContent.trim()===({grid:t('v_grid'),list:t('v_list'),dist:t('v_dist')})[k]))}

function filterCandList(q){
  let list=ALL.slice();
  if(candFilter==='battle')list=list.filter(c=>c.m21<15000);
  else if(candFilter==='women')list=list.filter(c=>c.isW);
  else if(candFilter==='scst')list=list.filter(c=>c.isSC||c.isST);
  else if(candFilter==='key')list=list.filter(c=>c.isK);
  else if(candFilter==='vijay')list=list.filter(c=>c.isV);
  if(q){const ql=q.toLowerCase();list=list.filter(c=>c.cd.toLowerCase().includes(ql)||c.nm.toLowerCase().includes(ql)||DISTS[c.di].toLowerCase().includes(ql)||DISTS_TA[c.di].includes(ql))}
  if(candSort==='name')list.sort((a,b)=>a.cd.localeCompare(b.cd));
  else if(candSort==='dist')list.sort((a,b)=>DISTS[a.di].localeCompare(DISTS[b.di])||a.n-b.n);
  else if(candSort==='margin')list.sort((a,b)=>a.m21-b.m21);
  return list;
}

function filterCands(q){window._candQ=q;renderCands()}

function renderCands(){
  const out=document.getElementById('candOut');if(!out)return;
  const list=filterCandList(window._candQ||'');
  if(candView==='grid'){
    out.innerHTML=`<div class="cg">${list.map(c=>candCard(c)).join('')}</div>`;
  } else if(candView==='list'){
    out.innerHTML=`<div class="cl">${list.map(c=>`<div class="cl-r" onclick="jumpToSeat(${c.n})"><span class="n">#${c.n}</span><span class="nm"><b style="color:${c.isV?'#ff1744':'var(--t1)'};font-weight:${c.isV?700:500}">${c.cd}</b></span><span class="cd">${c.nm} · ${distName(c.di)}</span><span class="bds">${c.isV?'<span class="cc-bd" style="background:#ff1744">V</span>':''}${c.isW?'<span class="cc-bd" style="background:#ec4899">W</span>':''}${c.isSC?'<span class="cc-bd" style="background:#a855f7">SC</span>':''}${c.isST?'<span class="cc-bd" style="background:#a855f7">ST</span>':''}${c.isK&&!c.isV?'<span class="cc-bd" style="background:#f59e0b">K</span>':''}</span></div>`).join('')}</div>`;
  } else {
    // By district grouping
    const byD={};list.forEach(c=>{(byD[c.di]=byD[c.di]||[]).push(c)});
    const distIdx=Object.keys(byD).map(Number).sort((a,b)=>DISTS[a].localeCompare(DISTS[b]));
    out.innerHTML=distIdx.map(di=>{
      const seats=byD[di];
      return`<div class="dist-grp"><div class="dist-hd" onclick="this.parentElement.classList.toggle('open')"><b>${distName(di)}</b><small>${seats.length} ${lang==='ta'?'தொகுதி':'seats'}</small><span class="arr">›</span></div><div class="dist-body">${seats.map(c=>candCard(c)).join('')}</div></div>`;
    }).join('');
  }
}

function candCard(c){
  const col=c.isV?'#ff1744':c.isK?'#f59e0b':'#6366f1';
  return`<div class="cc" onclick="jumpToSeat(${c.n})"><div class="cc-i" style="background:${col}1a;color:${col}">#${c.n}</div><div class="cc-inf"><b>${c.cd}</b><small>${c.nm} · ${distName(c.di)}</small><div class="cc-bds">${c.isV?'<span class="cc-bd" style="background:#ff1744">VIJAY</span>':''}${c.isW?'<span class="cc-bd" style="background:#ec4899">WOMAN</span>':''}${c.isSC?'<span class="cc-bd" style="background:#a855f7">SC</span>':''}${c.isST?'<span class="cc-bd" style="background:#a855f7">ST</span>':''}${c.isK&&!c.isV?'<span class="cc-bd" style="background:#f59e0b">KEY</span>':''}${c.m21<15000?'<span class="cc-bd" style="background:#ef4444">BATTLE</span>':''}</div></div></div>`;
}
