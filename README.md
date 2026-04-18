# TVK 2026 Dashboard

Interactive explorer of Tamilaga Vettri Kazhagam's 2026 manifesto, candidates, and TN constituencies.

**Live:** https://tvk-2026.vercel.app

## Stack
Plain HTML + CSS + vanilla JS. No frameworks, no build step. Single static site on Vercel.

## Structure
```
index.html              shell, 4 tabs, loads data + tab scripts in order
css/styles.css          single stylesheet, CSS vars, EN+TA typography
assets/                 TVK logo, leader portraits
js/data/
  constituencies.js     RAW (234 seats) · DISTS (38) · CATS
  candidates.js         CAND dict — role + education + image per seat
  manifesto.js          304 manifesto items grouped by 10 Thoons / 3 pillars
  philosophy.js         thesis, 5 ideological leaders, fiscal constants
  elections.js          P21 2021 results · PARTY · strongholds aggregates
  opponents.js          OPP dict — 2026 DMK/AIADMK/NTK/+ candidates per seat
  tn-paths.js           234 simplified AC SVG paths (Datameet India_AC)
  i18n.js               EN + TA string tables
js/tabs/
  pulse.js              Vetri (landing)
  promises.js           Manifesto (pillar/thoon filters, cards, H2H, tech bento)
  map.js                Constituency (SVG map + search + detail panel)
  candidates.js         Candidates (grid/list/district views)
  myman.js              Constellation + quiz + share
js/core.js              state, theme/lang toggle, modal, init
```

## Tabs
- **Vetri** — hook + benefit hero + philosophy bento, economy vision ($1.5T/2036), 5-year mission timeline, fiscal reality, Vijay spotlight, battleground CTA, 5 leaders
- **Manifesto** — 304 promises by 10 Thoons × 3 pillars; constellation top-15 by impact; flat 4-col card grid; Tech & Innovation bento (AI Ministry, PIET, Super App, etc.); H2H table; before/after
- **Constituency** — real TN AC map, type-ahead search, overlay tiers; detail panel with 2021 winner + 2026 opposition + TVK candidate card; Top 10 flip list; strongholds
- **Candidates** — 234 cards with role + education + image; filter by Vijay/key/battle/woman/SC/ST; grid/list/district views

## Deploy
```
git push && vercel --yes --prod && vercel alias set <new-url> tvk-2026.vercel.app
```

## Data provenance
- 2021 results — IndiaVotes TN 2021 CSV, cross-verified with ECI + Wikipedia
- 2026 candidates — TVK + party CSVs in `/data/`, extracted into `opponents.js`
- Manifesto — official English PDF (96 pages), heading-based extraction script
- TN SVG paths — Datameet India_AC.shp → Ramer-Douglas-Peucker simplified (ε=0.005)
- Leader portraits — Wikimedia Commons + user-provided
- Candidate images — CloudFront via tvkvijay.com

## Analytics
Google Analytics 4 — `G-M94KW1MYW0`.

## Credits
Built by **RYUK** ([@ryuk_nl](https://x.com/ryuk_nl)) · DM [@anbu_lenin](https://instagram.com/anbu_lenin) for suggestions.
