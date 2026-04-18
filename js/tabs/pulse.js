/* VETRI TAB — landing. Hero CTA, philosophy bento, economy vision, 5-yr mission,
   fiscal, Vijay spotlight, battleground CTA, leaders. */

function buildPulse() {
  const el = document.getElementById('tab0');
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

  </div>

  <div class="tab-sec fade-in v-sec">
    <div class="p-hook">${t('hook_pulse')}</div>
    <div class="p-headline">${t('headline_1')}<br><em>${t('headline_2')}</em></div>
    <div class="big-num-grid">
      <div class="big-num"><div class="n count-up" data-to="234">0</div><div class="l">${lang==='ta'?'தொகுதிகள்':'Seats contested'}</div><div class="s">${lang==='ta'?'தனியாக · கூட்டணி இல்லை':'Solo · no alliance'}</div></div>
      <div class="big-num"><div class="n count-up" data-to="10">0</div><div class="l">${lang==='ta'?'தூண்கள்':'Manifesto Thoons'}</div><div class="s">${lang==='ta'?'3 பகுதிகள்':'3 pillars'}</div></div>
      <div class="big-num"><div class="n">₹50K<span style="font-size:.6em"> Cr</span></div><div class="l">TNSIA</div><div class="s">${lang==='ta'?'மூலோபாய முதலீடு':'Strategic Investment'}</div></div>
      <div class="big-num"><div class="n">₹2,500</div><div class="l">${lang==='ta'?'மகளிர் உதவி':'Women stipend'}</div><div class="s">${lang==='ta'?'மாதம் · 60 வயது':'Per month · 60 yr'}</div></div>
    </div>
  </div>

  <div class="tab-sec fade-in v-sec">
    <div class="benefit-hero" onclick="openMyManifestoQuiz()">
      <div class="benefit-hero-l">
        <div class="benefit-hero-eyebrow">${lang==='ta'?'தனிப்பயன் கணிப்பு':'PERSONAL ESTIMATE'}</div>
        <div class="benefit-hero-t">${lang==='ta'?'த.வெ.க. உங்களுக்கு என்ன தருகிறது':'How TVK Benefits You'}</div>
        <div class="benefit-hero-s">${lang==='ta'?'3 கேள்விகள் · ஒரு ஆண்டில் உங்களுக்குக் கிடைக்கும் ₹ மதிப்பு':'3 questions · your personal ₹ unlock per year'}</div>
        <div class="benefit-hero-cta">${lang==='ta'?'தொடங்கு':'Start'} <span>→</span></div>
      </div>
      <div class="benefit-hero-r" aria-hidden="true"></div>
    </div>
  </div>

  <div class="tab-sec fade-in v-sec">
    <div class="sec-label">${lang==='ta'?'கோட்பாடு':'CORE PHILOSOPHY'}</div>
    <div class="philo-thesis">"${lang==='ta'?(PHILO.thesis.ta):PHILO.thesis.en}"</div>
    <div class="philo-lede">${lang==='ta'
      ?'திருக்குறள் அரசாங்கத்திற்கு மூன்று நிபந்தனைகளை வைக்கிறது — அறம், பொருள், இன்பம். தி.வெ.க. அறிக்கை இந்த மூன்றையும் ஒன்றாக நடைமுறைப்படுத்துகிறது.'
      :"Thiruvalluvar's Thirukkural sets three tests every government must pass — virtue (Aram), wealth (Porul), and joy (Inbam). The TVK manifesto runs all three as one integrated framework, not sequentially."}</div>
    <div class="bento philo-bento">
      <div class="bento-c" style="--pc:#8b5cf6">
        <div class="bento-emoji">⚖</div>
        <div class="bento-tag">ARAM</div>
        <div class="bento-body">
          <em>அறம் · ${lang==='ta'?'அறம்':'Virtue'}</em>
          <span>${lang==='ta'?PHILO.pillars.aram.ta:PHILO.pillars.aram.en}</span>
        </div>
      </div>
      <div class="bento-c" style="--pc:#e94560">
        <div class="bento-emoji">💎</div>
        <div class="bento-tag">PORUL</div>
        <div class="bento-body">
          <em>பொருள் · ${lang==='ta'?'பொருள்':'Wealth'}</em>
          <span>${lang==='ta'?PHILO.pillars.porul.ta:PHILO.pillars.porul.en}</span>
        </div>
      </div>
      <div class="bento-c" style="--pc:#10b981">
        <div class="bento-emoji">☀</div>
        <div class="bento-tag">INBAM</div>
        <div class="bento-body">
          <em>இன்பம் · ${lang==='ta'?'இன்பம்':'Joy'}</em>
          <span>${lang==='ta'?PHILO.pillars.inbam.ta:PHILO.pillars.inbam.en}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="econ-card">
      <div class="econ-eyebrow">${lang==='ta'?'2036 பொருளாதார இலக்கு':'ECONOMY VISION · 2036'}</div>
      <div class="econ-num">$1.5<span>${lang==='ta'?'டிரில்லியன்':'Trillion'}</span></div>
      <div class="econ-lbl">${lang==='ta'?'2036-க்குள் தமிழ்நாட்டின் பொருளாதாரம்':"Tamil Nadu's economy by 2036"}</div>
      <div class="econ-sub">${lang==='ta'?'இந்தியாவின் $10T இலக்கில் TN பங்கு · AI ஒன்றே $1.7T சேர்க்கும் (2035)':'TN share of India\'s $10T target · AI alone adds $1.7T to India by 2035'}</div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="sec-label">${lang==='ta'?'5 ஆண்டு பார்வை':'5-YEAR MISSION · 2026-2031'}</div>
    <div class="sec-title">${lang==='ta'?'ஒவ்வொரு ஆண்டும் என்ன நடக்கும்':'What happens every year · consolidated'}</div>
    <div class="vision-tl">
      <div class="vtl-line"></div>
      <div class="vtl-yr" style="--yc:#ef4444">
        <div class="vtl-dot">Y1</div>
        <div class="vtl-body">
          <div class="vtl-hd">${lang==='ta'?'தொடக்கம் · 2026–27':'LAUNCH · 2026–27'}</div>
          <ul>${(lang==='ta'?['நாள் 1 — இலவச பேருந்து பயணம் (நிர்வாக உத்தரவு)','30 நாட்கள் — காவல் ₹18.2K → ₹25K · போதை தடை மண்டலம்','90 நாட்கள் — பெண் ₹2,500/மா · மதிப்புமிகு','6 மாதம் — விவசாய கடன் தள்ளுபடி · <5 ஏக்கர் · 100%','ஆண்டு 1 — TNSIA ₹50,000 கோடி செயல்பாடு',"இந்தியாவின் முதல் AI அமைச்சகம்",'மக்கள் மன்றம் ஆப் நேரலை']:['Day 1 — Free bus travel (executive order)','30 days — Police ₹18.2K → ₹25K · anti-drug zones','90 days — Women ₹2,500/mo · Madhippumigu','6 months — Farm loan waiver · <5 acres · 100%','Year 1 — TNSIA ₹50,000 Cr operational',"India's first AI Ministry formed","People's Forum app live"]).map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="vtl-yr" style="--yc:#f59e0b">
        <div class="vtl-dot">Y2</div>
        <div class="vtl-body">
          <div class="vtl-hd">${lang==='ta'?'விரிவாக்கம் · 2027–28':'SCALE · 2027–28'}</div>
          <ul>${(lang==='ta'?['5 லட்சம் பயிற்சி/ஆண்டு · ₹10K/மா','5 பொறியியல் + 3 மருத்துவ கல்லூரிகள்','முதல் 500-படுக்கை மல்டி-ஸ்பெஷாலிட்டி மருத்துவமனை','உழவன் AI பரவல்','சூப்பர் ஆப் · முதல் 250 சேவைகள்']:['5L internships/yr at ₹10K/mo operational','5 new engineering + 3 medical colleges','First 500-bed multi-specialty hospital opens','Ulavan Farmer AI rollout','Super App · first 250 services live']).map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="vtl-yr" style="--yc:#ec4899">
        <div class="vtl-dot">Y3</div>
        <div class="vtl-body">
          <div class="vtl-hd">${lang==='ta'?'நிறுவனங்கள் · 2028–29':'INSTITUTIONS · 2028–29'}</div>
          <ul>${(lang==='ta'?['PIET பல்கலைக்கழகம் துவக்கம்','தமிழ் AI மாதிரி · இலவசம்','டிரோன் வழித்தடம் · 10 மாவட்டம்','ஆட்சி டாஷ்போர்டு பொதுத் திறப்பு','குறைகடத்தி சோதனை ஆய்வகம் செயல்பாடு']:['PIET University inaugurated','Tamil AI Model released · free for citizens','Drone Route live · 10 districts','Governance Dashboard public','Semiconductor hardware testing lab operational']).map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="vtl-yr" style="--yc:#10b981">
        <div class="vtl-dot">Y4</div>
        <div class="vtl-body">
          <div class="vtl-hd">${lang==='ta'?'மாற்றம் · 2029–30':'TRANSFORMATION · 2029–30'}</div>
          <ul>${(lang==='ta'?['டெலி-மருத்துவம் · 3,000 மையங்கள்','குளசேகரபட்டினம் விண்வெளி மண்டலம்','i-தமிழ் FinTech தடங்கம் · கோயம்புத்தூர்','30 லட்சம் ஏக்கர் நீர்ப்பாசனம் சேர்ப்பு']:['Tele-medicine · 3,000 centres complete','Kulasekarapattinam space region opens','i-Tamil FinTech Corridor live · Coimbatore','30L acres added to irrigation']).map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="vtl-yr" style="--yc:#6366f1">
        <div class="vtl-dot">Y5</div>
        <div class="vtl-body">
          <div class="vtl-hd">${lang==='ta'?'மரபு · 2030–31':'LEGACY · 2030–31'}</div>
          <ul>${(lang==='ta'?['பசுமை TN · 33% காடு (2031 இலக்கு)','$1T GSDP · 2036-க்கு $1.5T பாதையில்','சூப்பர் ஆப் · 500 சேவைகள் முழுமை','ஊழல் அம்பலம் சட்டம் அமல்','அறிக்கை மதிப்பெண் வெளியீடு']:['Green TN · 33% forest coverage (2031 target)','$1T GSDP milestone · on path to $1.5T by 2036','Super App · 500 services complete','Whistleblower Protection Act enforcement','Manifesto scorecard published']).map(x=>`<li>${x}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-sec fade-in">
    <div class="fiscal-card">
      <div class="fiscal-hdr">${lang==='ta'?'நிதி நிலவரம்':'FISCAL REALITY'}</div>
      <div class="fiscal-row">
        <div class="fiscal-num">${PHILO.fiscal.debt.v}</div>
        <div class="fiscal-lbl">${lang==='ta'?PHILO.fiscal.debt.ta:PHILO.fiscal.debt.en}</div>
      </div>
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
        ${(typeof CAND!=='undefined' && CAND[c.n]?.img)?`<img class="vjy-av" src="${CAND[c.n].img}" alt="" onerror="this.remove()">`:''}
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
    <div class="sec-label">${lang==='ta'?'கருத்தியல் மூதாதையர்':'IDEOLOGICAL LEGACY'}</div>
    <div class="sec-title">${lang==='ta'?'5 தலைவர்கள் · ஒரு கொள்கை':'Five names, one philosophy'}</div>
    <div class="leader-strip">
      ${PHILO.leaders.map(L=>`<div class="leader">
        <div class="leader-av">${L.img?`<img src="${L.img}" alt="${L.n}" loading="lazy" onerror="this.parentNode.innerHTML='${L.n[0]}'">`:L.n[0]}</div>
        <div class="leader-n">${lang==='ta'?L.ta:L.n}</div>
        <div class="leader-r">${L.role}</div>
      </div>`).join('')}
    </div>
  </div>

  <div class="tab-foot">
    <div class="tvk-official">
      <div class="foot-label">${lang==='ta'?'அதிகாரப்பூர்வ தி.வெ.க.':'OFFICIAL TVK'}</div>
      <div class="tvk-links">
        <a href="https://tvkvijay.com/en/contact-us" target="_blank" rel="noopener noreferrer"><svg class="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>tvkvijay.com</a>
        <a href="https://x.com/TVKPartyHQ" target="_blank" rel="noopener noreferrer"><svg class="ico-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>@TVKPartyHQ</a>
        <a href="https://www.instagram.com/tvkvijayhq" target="_blank" rel="noopener noreferrer"><svg class="ico-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>@tvkvijayhq</a>
      </div>
    </div>
    <div class="foot-sep"></div>
    <a href="https://x.com/ryuk_nl" target="_blank" rel="noopener noreferrer">made by <span>RYUK</span></a>
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

function jumpToSeat(n) { sel = n; switchTab(2); }
