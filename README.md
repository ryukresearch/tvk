# TVK 2026 Dashboard

Interactive visual explorer of **Tamilaga Vettri Kazhagam's 2026 election campaign** — 234 constituencies, 50 manifesto promises (with heavy analyst context), party comparisons, candidate roster, and strategic battleground map.

**Live on your machine:** open `index.html` in any modern browser. No build step, no dependencies beyond Google Fonts.

---

## Project Structure

```
tvk/
├── index.html                       # App shell (HTML only)
├── README.md                        # This file
├── css/
│   └── styles.css                   # All styling (theme vars, responsive, print)
└── js/
    ├── data/
    │   ├── constituencies.js        # 234 seats, 38 districts, map coords, categories
    │   ├── promises.js              # 50 promises with EN/TA + heavy context
    │   └── i18n.js                  # English + Tamil UI translations
    ├── tabs/
    │   ├── pulse.js                 # Landing tab (title, toggles, hero, 3 big promises, Vijay, battle CTA)
    │   ├── promises.js              # Persona picker + modal + H2H + treemap + BA bars
    │   ├── map.js                   # SVG map + search + filters + detail panel + flip list
    │   └── candidates.js            # 234 cards + chips + sort + grid/list/district views
    └── core.js                      # State, helpers (t, fmt, gp, bc), theme/lang toggles, modal, share, init
```

---

## Architecture

**Single-page, vanilla JS**. No framework, no bundler, no build step.

### Load order (matters)
1. **Data layer** (`js/data/*.js`) — defines `DISTS`, `DP`, `RAW`, `ALL`, `CATS`, `PROMISES`, `I18N` as globals + computed aggregates (`totV`, `battle`, `wC`, etc.)
2. **Tab builders** (`js/tabs/*.js`) — each file defines a `buildX()` function; no side-effects at load time
3. **Core** (`js/core.js`) — state vars, helpers, `switchTab()`, `DOMContentLoaded` → `initApp()` calls `buildTab(activeTab)` lazily

Tabs 1-3 are built **on first switch** (lazy-load) to keep initial render fast.

### Tabs (fixed 4)

| # | Tab       | Key content                                                                  |
|---|-----------|------------------------------------------------------------------------------|
| 0 | Pulse     | Dashboard title, theme/lang toggles, hero headline, 4 big numbers, 3 hero promises, Vijay's 2 seats, battleground counter, mini timeline |
| 1 | Promises  | Persona picker → filtered cards → tap card → modal with compare/legal/fiscal/risk. Treemap, payouts, before/after bars. |
| 2 | Map       | Search, 4 overlay chips, SVG dot map, constituency list, detail panel, top-10 flip list. |
| 3 | Candidates| 5 stat cards, search, filter chips, sort, 3 view modes (grid/list/by-district). |

### State

Globals in `core.js`:
- `lang` / `theme` — persisted to `localStorage`
- `activeTab`, `sel`, `ov`, `filtered`, `persona`, `candFilter`, `candSort`, `candView`
- `tabBuilt[]` — lazy-load guard

URL hash reflects: `#tab=1&p=woman&seat=12` (shareable state).

### Cross-tab linking
- Pulse hero promise → Promises tab + opens promise modal
- Pulse Vijay card → Map tab with seat selected
- Pulse battleground CTA → Map tab
- Promises modal "Show on map" → Map tab
- Map list click → detail panel

---

## How to update

### Add a new manifesto promise
Edit `js/data/promises.js`. Append an object:
```js
{
  id: 'unique-id', c: 'women', metric: '₹1K/mo',
  personas: ['woman','all'],
  en: { t:'English title', d:'English desc', benefits:'~X beneficiaries', compare:'...', legal:'...', fiscal:'...', risk:'...' },
  ta: { t:'Tamil title', d:'...', benefits:'...', compare:'...', legal:'...', fiscal:'...', risk:'...' }
}
```
Rebuild happens automatically next page load.

### Add a new UI label
Edit `js/data/i18n.js`. Add the key to **both** `I18N.en` and `I18N.ta` blocks. Reference in templates via `${t('my_key')}` or in HTML via `<span data-t="my_key">fallback</span>`.

### Add a new tab (5th)
1. Extend `core.js`: bump tab count in `tabBuilt`, `switchTab`, keyboard shortcuts
2. Add `tab4` div to `index.html`
3. Add button to sidebar + bottom nav
4. Create `js/tabs/new-tab.js` with `buildNewTab()`
5. Register in `core.js` `buildTab()` switch
6. Add `<script src="js/tabs/new-tab.js"></script>` to `index.html`

### Swap theme colors
Edit CSS variables in `css/styles.css` under `:root[data-theme="dark"]` / `:root[data-theme="light"]`.

### Update constituency data
Replace the `RAW` string in `js/data/constituencies.js`. Format per row: `seat#,name,districtIdx,candidate,flags,margin2021K,voters1000`. Flags: `V=Vijay, K=Key, W=Woman, S=SC, T=ST`.

### Move a dot on the map
Edit `DP[districtIdx]` in `js/data/constituencies.js` — `[x, y]` in the SVG viewBox `40 60 340 490`. Multiple seats in same district auto-stagger via `gp()`.

---

## Features

- **Mobile-first responsive** — base styles for 320px, progressive enhancement at 640 / 768 / 1024 / 1440px
- **Bilingual** — full English + Tamil translations (toggle in header or on Pulse home)
- **Dark + Light theme** — with `prefers-color-scheme` default + `localStorage` persistence
- **Keyboard shortcuts** — `1-4` switch tabs, `/` focuses search, `Esc` closes modal
- **Deep-linkable** — URL hash captures tab + persona + selected seat
- **Share** — Web Share API with clipboard fallback + toast confirmation
- **Heavy context** — every promise has compare / legal / fiscal / risk fact-check
- **Print-friendly** — `@media print` strips chrome for clean manifesto export
- **Lazy tab loading** — only builds DOM when tab first opened
- **iPhone safe-area-inset** — bottom nav respects notch

---

## Deployment

It's a static site. Any host works:
- **Local preview:** `open index.html` or `python3 -m http.server`
- **GitHub Pages:** push to a repo, enable Pages on main branch
- **Vercel / Netlify:** drag the folder onto their dashboard
- **S3 / CDN:** upload files preserving directory structure

No environment variables, no secrets, no backend.

---

## Credits

Data sourced from [tvkvijay.com/en/manifesto](https://tvkvijay.com/en/manifesto), public election records (ECI, TN State), and press reporting.

Built for visual analysis. Not affiliated with TVK or any political party.

made by **RYUK**
