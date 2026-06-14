# MyDNAPedia — Landing Page

Marketing landing page for **MyDNAPedia**, a DNA wellness testing company (India).
Single-page, scroll-driven experience across 9 sections + footer.

> **Status:** **S1 (Hero)** and **S2 (Rotating tension line)** are built. Sections S3–S9 + footer are open for the team (see *Sections* below).

---

## Run it locally

It's a static site — no build step. Serve the folder:

```bash
# option A
npx serve -l 4321 .
# option B
python3 -m http.server 4321
```

Then open http://localhost:4321

`npm install` is **only** needed if you want to re-generate the DNA helix frames (see *Assets*).

---

## How the hero works

S1 + S2 share **one pinned scroll stage** (`.stage` → `position: sticky`). As you scroll:

- a **97-frame webp sequence** of the glass DNA helix is scrubbed on a `<canvas>` (helix builds 1/3 → full),
- the hero copy + trust bar fade out,
- S2's rotating "Your DNA already knows…" line fades in once the helix completes.

All logic is vanilla JS at the bottom of `index.html`. (The helper hooks `window.__scrub` / `window.__freeze` are dev-only and will be removed before launch.)

---

## Project structure

```
index.html            # everything: markup, styles, scroll/scrub JS
assets/
  dna-helix.webp       # full animated helix (1 file, reference)
frames/                # frame_0001..0097.webp — the scrub sequence (native 1764px)
package.json           # ffmpeg-static, only for regenerating frames
```

---

## Design system / brand tokens

Defined as CSS variables in `:root` (top of `index.html`):

- **Display font:** Sentient (Fontshare, serif) — headlines + the S2 word
- **Body/UI font:** Satoshi (Fontshare)
- **Background:** `#F7F2E8` warm off-white
- **Ink:** `#16120A`
- **Gold (two-tone):**
  - `--gold #9C6B16` — gold **text** on light (legible)
  - `--gold-lt #E4A92F` — bright honey-gold for **fills/accents** (always with near-black `--on-gold` text)
- **Frosted glass:** shared `.glass` tokens (`--glass*`, `--blur`) — used by the nav, trust bar, eyebrow, and CTAs. Glass reads best **over the helix/glow**; over flat areas it stays subtle by design.

Please reuse these tokens so the sections stay consistent.

---

## Fonts

- **Sentient** (display) + **Satoshi** (body) — both from **Fontshare, free for commercial + web use**. No licensing blockers.
- (We trialled Canela earlier but moved off it to avoid the paid Commercial Type web licence.)

---

## Assets — regenerating the helix frames

Frames are committed, so you normally don't need this. To re-extract from a new master video:

```bash
npm install            # pulls ffmpeg-static
# then run the ffmpeg extract (1764px wide, q92) — see commit history / ask Tanish
```

---

## Working in parallel (branching)

`main` holds the integrated page. **Don't commit your section straight to `main`.**

1. Branch per section: `git checkout -b section/s4-pricing`
2. Build your section as a self-contained block (ideally its own partial/component or a clearly-marked block in `index.html`).
3. Open a PR into `main`. We'll integrate sections in order.

Keep to the brand tokens above and the frosted-glass / Sentient + Satoshi language.

### Sections
- **S1 Hero** — ✅ done
- **S2 Rotating tension line** — ✅ done
- S3 Scroll-triggered emotional copy
- S4 Three-tier pricing (scroll-based, DNA helix scrub across Lite → Standard → Premium)
- S5 How it works (5 steps)
- S6 After your test (counselling + report)
- S7 Trust & credentials
- S8 Lead capture form (Netlify forms)
- S9 Partner CTA
- Footer

---

## Open content/legal flags (read before publishing)

- **Pharmacogenomics "only in India" claim is factually wrong** — Mapmygenome's MedicaMap already offers consumer PGx in India (since 2022). The PGx benefit copy is fine; the "only" superlative must be dropped/qualified (ASCI risk).
- **Trust signals:** Indian buyers look for **NABL / CAP** accreditation — currently the copy leans EU/US (FDA/EMA). Confirm which accreditations MyDNAPedia can legitimately display before building S7.
- Testimonials and accreditation logos are **client-supplied placeholders**.

---

*Stack roadmap (per brief): Netlify hosting + forms, Google Analytics 4, TinaCMS, Zapier → Google Sheet for leads.*
