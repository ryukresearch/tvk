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

    <div class="p-hook">${t('hook_pulse')}</div>
    <div class="p-headline">${t('headline_1')}<br><em>${t('headline_2')}</em></div>
    <div class="p-sub">${t('sub_pulse')}</div>
    <div class="big-num-grid">
      <div class="big-num"><div class="n count-up" data-to="234">0</div><div class="l">${t('bn_seats')}</div><div class="s">${t('bn_seats_s')}</div></div>
      <div class="big-num"><div class="n count-up" data-to="50">0</div><div class="l">${t('bn_promises')}</div><div class="s">${t('bn_promises_s')}</div></div>
      <div class="big-num"><div class="n">₹15,000<span style="font-size:.6em"> Cr</span></div><div class="l">${t('bn_cr')}</div><div class="s">${t('bn_cr_s')}</div></div>
      <div class="big-num"><div class="n">₹2,500</div><div class="l">${t('bn_women')}</div><div class="s">${t('bn_women_s')}</div></div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${t('big3_label')}</div>
    <div class="sec-title">${t('big3_title')}</div>
    <div class="hero-promises">
      ${big3.map(p => {
        const cc = (CATS[p.cat] && CATS[p.cat].c) || '#e94560';
        return `<div class="hp" style="--cat:${cc}" onclick="openPromiseById('${p.id}')">
          <div class="hp-num"><span class="hp-dot" style="background:${cc}"></span>PROMISE ${p.num}</div>
          <div class="hp-title">${p.title}</div>
          <div class="hp-desc">${p.desc}</div>
          <div class="hp-metric">${p.metric}</div>
        </div>`;
      }).join('')}
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
    <div class="mini-tl">
      <div class="mtl"><b>${lang==='ta'?'நாள் 1':'DAY 1'}</b><p>${lang==='ta'?'பேருந்துப் பயணம் இலவசம்':'Free bus travel'}</p><small>${lang==='ta'?'நிர்வாக உத்தரவு':'Executive order'}</small></div>
      <div class="mtl"><b>${lang==='ta'?'30 நாள்':'30 DAYS'}</b><p>${lang==='ta'?'காவல்துறை சம்பள உயர்வு':'Police salary hike'}</p><small>₹18.2K → ₹25K</small></div>
      <div class="mtl"><b>${lang==='ta'?'3 மாதம்':'3 MONTHS'}</b><p>${lang==='ta'?'₹2,500 பெண்கள் உதவி':'₹2,500 women stipend'}</p><small>${lang==='ta'?'~2.6 கோடி பயனாளிகள்':'~2.6Cr beneficiaries'}</small></div>
      <div class="mtl"><b>${lang==='ta'?'1 ஆண்டு':'1 YEAR'}</b><p>${lang==='ta'?'விவசாயக் கடன் தள்ளுபடி':'Farm loan waiver'}</p><small>${lang==='ta'?'~72 லட்சம் குடும்பங்கள்':'~72L households'}</small></div>
    </div>
  </div>

  <div class="tab-foot">
    <a href="https://x.com/ryuk_nl" target="_blank" rel="noopener noreferrer">made by <span>RYUK</span></a>
    <a class="ig-link" href="https://instagram.com/anbu_lenin" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" fill="currentColor" style="width:11px;height:11px;vertical-align:-1px;margin-right:3px"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>@anbu_lenin
    </a>
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
