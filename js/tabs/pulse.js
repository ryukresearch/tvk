/* ═══════════════════════════════════════════════════════════════
   PULSE TAB — Landing dashboard
   Hero title + toggles + 4 big numbers + 3 hero promises + Vijay spotlight
   + battleground CTA + mini timeline
   ═══════════════════════════════════════════════════════════════ */

function buildPulse() {
  const el = document.getElementById('tab0');

  // Top 3 promises — categories used for small colored dots only (no full gradients)
  const big3 = [
    { id:'w-stipend', cat:'women', num:'01',
      title: lang==='ta' ? 'ஒவ்வொரு பெண் தலைவிக்கும் ₹2,500/மாதம்' : '₹2,500/mo to every woman head of family',
      desc:  lang==='ta' ? '60 வயது வரை. ~2.6 கோடி பெண்களுக்குப் பயனளிக்கும். ஆண்டு செலவு ~₹78K கோடி.' : 'Up to age 60. Benefits ~2.6Cr women. Est. annual cost ~₹78K Cr.',
      metric:'₹2,500' },
    { id:'y-jobs', cat:'youth', num:'02',
      title: lang==='ta' ? '75% உள்ளூர் வேலை சட்டம்' : '75% local jobs law',
      desc:  lang==='ta' ? 'தமிழ்நாட்டில் 75% வேலைகள் உள்ளூர்வாசிகளுக்கு. AP சட்டம் 2023-ல் ரத்தானது — நீதிமன்ற சவால் வரும்.' : '75% of TN jobs for locals. AP struck down in 2023 — court challenge likely.',
      metric:'75%' },
    { id:'msme-fund', cat:'msme', num:'03',
      title: lang==='ta' ? '₹15,000 கோடி MSME நிதி' : '₹15,000 Cr MSME credit fund',
      desc:  lang==='ta' ? 'மாநில கடன் உத்தரவாதம். TN FY26 பற்றாக்குறை ₹52K கோடி — நிதி வெளியீடு கடினம்.' : 'State credit guarantee. TN FY26 deficit is ₹52K Cr — funding is tight.',
      metric:'₹15,000 Cr' }
  ];

  const vj = ALL.filter(c => c.isV);

  let h = `
  <div class="pulse-hero fade-in">
    <div class="dashboard-title">
      <div class="dashboard-title-logo"><img src="assets/tvk-logo.jpg?v=2" alt="TVK" loading="eager" decoding="async"></div>
      <div class="dashboard-title-text">
        <h1>${lang==='ta' ? 'த.வெ.க. டாஷ்போர்டு' : 'TVK Dashboard'}</h1>
        <p>${lang==='ta' ? 'தமிழக வெற்றிக் கழகம் · 2026' : 'Tamilaga Vettri Kazhagam · 2026'}</p>
      </div>
    </div>

    <div class="home-toggles">
      <button class="home-toggle ${theme==='light'?'on':''}" data-toggle="theme" onclick="toggleTheme()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
        <span>${t('home_theme_label')}</span>
        <small>${theme==='dark' ? t('home_theme_dark') : t('home_theme_light')}</small>
      </button>
      <button class="home-toggle ${lang==='ta'?'on':''}" data-toggle="lang" onclick="toggleLang()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>${t('home_lang_label')}</span>
        <small>${lang==='en' ? 'English' : 'தமிழ்'}</small>
      </button>
    </div>

    <div class="benefit-hero" onclick="openMyManifestoQuiz()">
      <div class="benefit-hero-l">
        <div class="benefit-hero-eyebrow">${lang==='ta'?'தனிப்பயன் கணிப்பு':'PERSONAL ESTIMATE'}</div>
        <div class="benefit-hero-t">${lang==='ta'?'த.வெ.க. உங்களுக்கு என்ன தருகிறது':'How TVK Benefits You'}</div>
        <div class="benefit-hero-s">${lang==='ta'?'3 கேள்விகள் · ஒரு ஆண்டில் உங்களுக்குக் கிடைக்கும் ₹ மதிப்பு':'3 questions · your personal ₹ unlock per year'}</div>
        <div class="benefit-hero-cta">${lang==='ta'?'தொடங்கு':'Start'} <span>→</span></div>
      </div>
      <div class="benefit-hero-r" aria-hidden="true"></div>
    </div>

    <div class="philo-thesis">"${lang==='ta'?(PHILO.thesis.ta):PHILO.thesis.en}"</div>
    <div class="philo-grid">
      <div class="philo-card" style="--pc:#8b5cf6"><div class="philo-ttl">Aram · ${lang==='ta'?'அறம்':'Virtue'}</div><div class="philo-q">${lang==='ta'?PHILO.pillars.aram.ta:PHILO.pillars.aram.en}</div><div class="philo-sub">Thoon 1–2</div></div>
      <div class="philo-card" style="--pc:#e94560"><div class="philo-ttl">Porul · ${lang==='ta'?'பொருள்':'Wealth'}</div><div class="philo-q">${lang==='ta'?PHILO.pillars.porul.ta:PHILO.pillars.porul.en}</div><div class="philo-sub">Thoon 3–7</div></div>
      <div class="philo-card" style="--pc:#10b981"><div class="philo-ttl">Inbam · ${lang==='ta'?'இன்பம்':'Joy'}</div><div class="philo-q">${lang==='ta'?PHILO.pillars.inbam.ta:PHILO.pillars.inbam.en}</div><div class="philo-sub">Thoon 8–10</div></div>
    </div>
    <div class="p-hook">${t('hook_pulse')}</div>
    <div class="p-headline">${t('headline_1')}<br><em>${t('headline_2')}</em></div>
    <div class="big-num-grid">
      <div class="big-num"><div class="n count-up" data-to="234">0</div><div class="l">${lang==='ta'?'தொகுதிகள்':'Seats contested'}</div><div class="s">${lang==='ta'?'தனியாக · கூட்டணி இல்லை':'Solo · no alliance'}</div></div>
      <div class="big-num"><div class="n count-up" data-to="10">0</div><div class="l">${lang==='ta'?'தூண்கள்':'Manifesto Thoons'}</div><div class="s">${lang==='ta'?'3 பகுதிகள் · அறம்/பொருள்/இன்பம்':'3 pillars · Aram / Porul / Inbam'}</div></div>
      <div class="big-num"><div class="n">₹50K<span style="font-size:.6em"> Cr</span></div><div class="l">TNSIA</div><div class="s">${lang==='ta'?'மூலோபாய முதலீட்டு அமைப்பு':'Strategic Investment Authority'}</div></div>
      <div class="big-num"><div class="n">₹2,500</div><div class="l">${lang==='ta'?'மகளிர் உதவி':'Women stipend'}</div><div class="s">${lang==='ta'?'மாதம் · 60 வயது வரை':'Per month · up to 60'}</div></div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="fiscal-card">
      <div class="fiscal-hdr">${lang==='ta'?'நிதி நிலவரம்':'FISCAL REALITY'}</div>
      <div class="fiscal-row">
        <div class="fiscal-num">${PHILO.fiscal.debt.v}</div>
        <div class="fiscal-lbl">${lang==='ta'?PHILO.fiscal.debt.ta:PHILO.fiscal.debt.en}</div>
      </div>
      <div class="fiscal-line">${lang==='ta'?PHILO.fiscal.debtLine.ta:PHILO.fiscal.debtLine.en}</div>
      <div class="fiscal-row fiscal-ans">
        <div class="fiscal-num" style="color:#fbbf24">${PHILO.fiscal.answer.v}</div>
        <div class="fiscal-lbl">${lang==='ta'?PHILO.fiscal.answer.ta:PHILO.fiscal.answer.en}</div>
      </div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${t('vjy_label')}</div>
    <div class="sec-title">${t('vjy_title')}</div>
    <div class="vjy-wrap">
      ${vj.map(c => `<div class="vjy" onclick="jumpToSeat(${c.n})">
        <span class="vjy-b">VIJAY</span>
        <div class="vjy-n">#${c.n} · ${distName(c.di)}</div>
        <div class="vjy-name">${c.nm}</div>
        <div class="vjy-d">${c.cd}</div>
        <div class="vjy-stats">
          <div class="vjy-stat"><b>${fmt(c.vt)}</b><small>${t('vjy_stat_voters')}</small></div>
          <div class="vjy-stat"><b>${fmt(c.m21)}</b><small>${t('vjy_stat_margin')}</small></div>
          <div class="vjy-stat"><b style="color:${c.m21<15000?'var(--red)':'var(--t1)'}">${c.m21<15000?(lang==='ta'?'போர்':'BATTLE'):(lang==='ta'?'பாதுகாப்பு':'SAFE')}</b><small>${t('vjy_stat_cat')}</small></div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="battle-cta" onclick="switchTab(2)">
      <div class="big count-up" data-to="${battle}">0</div>
      <div class="lbl">${t('bg_title')}</div>
      <div style="font-size:12px;color:var(--t3);margin-top:8px;max-width:420px;margin-left:auto;margin-right:auto">${t('bg_sub')}</div>
      <div class="arrow">${t('bg_cta')}</div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${t('first_label')}</div>
    <div class="sec-title">${t('first_title')}</div>
    <div class="mini-tl mini-tl-5">
      <div class="mtl"><b>${lang==='ta'?'நாள் 1':'DAY 1'}</b><p>${lang==='ta'?'இலவச பேருந்து':'Free bus travel'}</p><small>${lang==='ta'?'நிர்வாக உத்தரவு':'Executive order'}</small></div>
      <div class="mtl"><b>${lang==='ta'?'30 நாட்கள்':'30 DAYS'}</b><p>${lang==='ta'?'காவல் சம்பளம் உயர்வு · போதைப் பொருள் தடை':'Police pay + anti-drug zones'}</p><small>₹18.2K → ₹25K</small></div>
      <div class="mtl"><b>${lang==='ta'?'90 நாட்கள்':'90 DAYS'}</b><p>${lang==='ta'?'₹2,500 மகளிர் உதவி':'Women ₹2,500/mo rollout'}</p><small>Madhippumigu Magalir</small></div>
      <div class="mtl"><b>${lang==='ta'?'6 மாதம்':'6 MONTHS'}</b><p>${lang==='ta'?'விவசாய கடன் தள்ளுபடி':'Farm loan waiver processing'}</p><small><5 acres · 100%</small></div>
      <div class="mtl"><b>${lang==='ta'?'1 ஆண்டு':'1 YEAR'}</b><p>${lang==='ta'?'TNSIA செயல்பாடு · கலைப் பள்ளிகள்':'TNSIA operational · Creative schools'}</p><small>₹50,000 Cr</small></div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${lang==='ta'?'பண்பாடு & சுற்றுலா':'CULTURE & TOURISM'}</div>
    <div class="sec-title">${lang==='ta'?'Thoon 01 — தமிழ் அடையாளம்':'Thoon 01 — Tamil Identity'}</div>
    <div class="tour-strip">
      <div class="tour-c"><b>4</b><span>${lang==='ta'?'ஆன்மீக சுற்றுலா பாதைகள்':'Spiritual routes'}</span></div>
      <div class="tour-c"><b>⛰</b><span>${lang==='ta'?'நீலகிரி சாகச சுற்றுலா':'Nilgiris adventure'}</span></div>
      <div class="tour-c"><b>🚤</b><span>${lang==='ta'?'வேதாரண்யம் → ராமேஸ்வரம்':'Vedaranyam → Rameswaram'}</span></div>
      <div class="tour-c"><b>🚐</b><span>${lang==='ta'?'கேரவன் சுற்றுலா':'Caravan tourism policy'}</span></div>
      <div class="tour-c"><b>AR/VR</b><span>${lang==='ta'?'கீழடி · ஆதிசனல்லூர்':'Keeladi · Adichanallur'}</span></div>
      <div class="tour-c"><b>🤖</b><span>${lang==='ta'?'தமிழ் AI மாதிரி':'Tamil AI model'}</span></div>
      <div class="tour-c"><b>1,000</b><span>${lang==='ta'?'சிலம்பம் மையங்கள்':'Silambam centres'}</span></div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${lang==='ta'?'கருத்தியல் மூதாதையர்':'IDEOLOGICAL LEGACY'}</div>
    <div class="sec-title">${lang==='ta'?'5 தலைவர்கள் · ஒரு கொள்கை':'Five names, one philosophy'}</div>
    <div class="leader-strip">
      ${PHILO.leaders.map(L=>`<div class="leader"><div class="leader-av">${L.n[0]}</div><div class="leader-n">${lang==='ta'?L.ta:L.n}</div><div class="leader-r">${L.role}</div></div>`).join('')}
    </div>
  </div>

  <div class="tab-foot">
    <div class="tvk-official">
      <div class="foot-label">${lang==='ta'?'அதிகாரப்பூர்வ தி.வெ.க.':'OFFICIAL TVK'}</div>
      <div class="tvk-links">
        <a href="https://tvkvijay.com/en/contact-us" target="_blank" rel="noopener noreferrer">tvkvijay.com</a>
        <a href="https://x.com/TVKPartyHQ" target="_blank" rel="noopener noreferrer">@TVKPartyHQ</a>
        <a href="https://www.instagram.com/tvkvijayhq" target="_blank" rel="noopener noreferrer">@tvkvijayhq</a>
      </div>
    </div>
    <div class="foot-sep"></div>
    <a href="https://x.com/ryuk_nl" target="_blank" rel="noopener noreferrer">made by <span>RYUK</span></a>
    <a class="ig-link" href="https://instagram.com/anbu_lenin" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg><span>@anbu_lenin</span></a>
    <span class="foot-dm">${lang==='ta'?'பரிந்துரைகளுக்கு DM':'DM for suggestions'}</span>
  </div>`;

  el.innerHTML = h;

  // Count-up animation
  setTimeout(() => {
    el.querySelectorAll('.count-up[data-to]').forEach(n => {
      const to = +n.dataset.to;
      let cur = 0;
      const step = Math.max(1, Math.ceil(to/30));
      const tick = () => {
        cur += step;
        if (cur >= to) { n.textContent = to.toLocaleString(); return; }
        n.textContent = cur.toLocaleString();
        requestAnimationFrame(tick);
      };
      tick();
    });
  }, 200);
}

// Cross-tab: jump from Pulse to Map with seat selected
function jumpToSeat(n) { sel = n; switchTab(2); }

// Cross-tab: jump from Pulse hero promise to Promises tab & open modal
function openPromiseById(id) {
  switchTab(1);
  setTimeout(() => {
    const p = PROMISES.find(x => x.id === id);
    if (p) showPromiseModal(p.id);
  }, 150);
}
