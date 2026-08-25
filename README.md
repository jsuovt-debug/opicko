# OPICKO — Homepage UI/UX Demo (v1)

Static approval prototype for the Opicko Australia homepage.
**Scope of this review:** layout, hierarchy, user flow, interactions, art direction.
**Explicitly NOT finalized here (swappable later without redesign):** final copy,
product names/prices, drop name & date, offer values (free-shipping threshold), legal wording.

---

## 1 · How to view

1. Open `index.html` in a browser (or `npx serve` / drop the folder on Netlify for a mobile URL).
2. Review on **desktop (≥1440px)** and **mobile (390px)** — real device preferred.
3. Exercise every interaction in §4 before signing off.

---

## 2 · Section map

| # | ID | Section |
|---|----|---------|
| 0 | `#opk-marquee` | Announcement marquee (config-driven) |
| 1 | `#opk-header` | Sticky header + bag drawer trigger |
| 2 | `#opk-hero` | Hero — headline, dual CTA, trust micro-line |
| 3 | `#opk-usp` | USP strip (config-driven) |
| 4 | `#opk-newin` | NEW IN rail — upgraded product card |
| 5 | `#opk-drop` | DROP 02 hype band — countdown + waitlist + locked cards |
| 6 | `#opk-words` | Brand words marquee divider |
| 7 | `#opk-collections` | Collections bento grid |
| 8 | `#opk-cats` | Category toggle (T-SHIRTS / HOODIES / future tab) |
| 9 | `#opk-spotlight` | Spotlight banner + shoppable hotspots |
| 10 | `#opk-best` | MOST WANTED (honest proof mode) |
| 11 | `#opk-quality` | Quality & fit block + macros + fit note |
| 12 | `#opk-cause` | Ballin for a Cause |
| 13 | `#opk-ugc` | UGC grid + reserved review slot |
| 14 | `#opk-faq` | FAQ accordion |
| 15 | `#opk-footer` | Footer wordmark + capture + payments |

---

## 3 · Approval checklist (per section)

### 0–1 · Marquee & Header
- [ ] Marquee reads as info, not noise; speed comfortable; pauses on `prefers-reduced-motion`
- [ ] Nav labels make sense: NEW IN / T-SHIRTS / HOODIES / COLLECTIONS / DROP 02
- [ ] Header condenses on scroll; bag icon opens the drawer; search opens overlay

### 2 · Hero
- [ ] Headline + sub + CTAs visible without scrolling on desktop; **stacks above image on mobile**
- [ ] Primary CTA (SHOP NEW IN) wins over secondary (PREVIEW DROP 02)
- [ ] Trust micro-line present (dispatch / returns / BNPL)

### 3 · USP strip
- [ ] Four items, one line each, legible at a glance

### 4 · NEW IN (the card is the most important sign-off on this page)
- [ ] Hover: image swaps **front → back print**; quick-add bar appears
- [ ] Quick-add: size chips appear; selecting a size shows success state (mock)
- [ ] Card shows: badge, name, price, `4 × $X with Afterpay`, swatches
- [ ] Mobile: rail swipes with scroll-snap + edge peek; arrows on desktop
- [ ] Meta text ≥ 13px on mobile

### 5 · DROP 02 band
- [ ] Countdown ticks; date reads clearly
- [ ] Locked cards look intentional (blurred + lock), not broken
- [ ] Waitlist form validates email + shows success toast (mock)
- [ ] "How drops work" link present

### 6 · Words marquee
- [ ] Reads as a brand beat between sections, not clutter

### 7 · Collections bento
- [ ] Tile hierarchy clear (2 large + 5 small + cause + all-collections)
- [ ] Labels legible over every image (scrim works)
- [ ] NO MERCY appears only once

### 8 · Category toggle
- [ ] T-SHIRTS ⇄ HOODIES swaps content instantly, no layout jump
- [ ] Greyed `NEXT: ACCESSORIES` tab reads as "coming," not broken

### 9 · Spotlight + hotspots
- [ ] Hotspots discoverable (pulse), open product chip with name + price
- [ ] Mobile: hotspot chips appear **below** the image

### 10 · MOST WANTED
- [ ] Honest mode accepted: qualitative chips ("Drop 01 crew pick"), **no invented numbers**
- [ ] Grey star slot visible as a reserved space (fills when real reviews land)

### 11 · Quality & fit
- [ ] Macros prove the quality story (print / fabric / hem)
- [ ] Fit note stands out: "Runs true to oversized — size down for regular fit"
- [ ] SIZE GUIDE link present

### 12 · Cause
- [ ] Story is clear in 5 seconds; CTA to learn more

### 13 · UGC
- [ ] Grid feels like real community, not stock; IG handle linked

### 14 · FAQ
- [ ] Covers: dispatch, returns, fit, payments, how drops work
- [ ] Accordion opens smoothly, one panel at a time

### 15 · Footer
- [ ] Capture offer clear (10% first order + drop alerts); form shows success (mock)
- [ ] Wordmark moment lands; Afterpay/Zip badges visible; Track Order + Size Guide linked

---

## 4 · Interactions to exercise (demo)

Hover card → back-print swap · quick-add size flow · sticky header condense ·
category toggle · countdown · hotspot chips · FAQ accordion ·
both forms' success toasts · rail scroll-snap swipe (mobile) ·
resize 1440 → 768 → 390 (no overlap, no horizontal scroll) ·
OS-level "reduce motion" on → marquee/zoom stop.

---

## 5 · Global sign-off

- [ ] **Tokens:** ink `#0B0B0C` / paper `#F7F5F1` / sand `#E5D9CC` · **red = brand & badges**, **teal = commerce (price/ATC)** · condensed display caps + grotesk body · sharp 0–4px radii
- [ ] **Ratios locked:** 16:9 / 4:3 / 1:1 / 3:4 / 9:16 only (CLS-safe)
- [ ] **Performance intent:** static hero (no slider), no carousel library (scroll-snap), deferred JS, lazy below fold
- [ ] **A11y:** scrims for label contrast, visible focus states, aria labels on controls, reduced-motion respected
- [ ] **Honesty/ACL:** no fake reviews or sold counts; offer values config-driven

---

## 6 · Config contract (`js/config.js` → future `opk-config`)

| Key | Demo value | Renders in |
|-----|-----------|------------|
| `freeShip` | `100` (tentative) or `null` | marquee, USP, (later PDP trust row) |
| `returnsDays` | `14` | marquee, USP, FAQ |
| `dispatch` | `24–48h` | hero micro-line, USP, FAQ |
| `dropDate` | ISO date +30d | countdown |
| `bnpl` | afterpay, zip | card lines, footer badges |

Changing a value must update every surface with **zero layout changes** — test this.

---

## 7 · WordPress port map (after approval)

| Demo file/piece | WP destination |
|---|---|
| `tokens.css` | plugin `assets/tokens.css` (shared PDP + home) |
| `base.css` / `home.css` | plugin CSS (keep `.opk-` prefixes) |
| `main.js` modules | plugin classes: rails→`class-rails`, header/bag→`class-drawers`+`class-ajax`, reviews slot→`class-reviews`, faq→`class-faq`, perf→`class-perf` |
| Static bands (hero/usp/bento/spotlight/quality/cause) | Elementor Pro Containers |
| Forms (waitlist/capture) | Elementor Pro Form → ESP tags |
| Countdown | Elementor Pro Countdown or plugin JS |
| Section IDs `#opk-*` | kept as anchor/module names |

**Rule:** nothing home-page lives in the WoodMart theme. Theme swap must not break this page (verify on staging with a default theme).

---

## 8 · Sign-off

Approved / Approved with notes / Not approved
Notes: ______________________________________
Name · Date · Signature
