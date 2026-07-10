# CLAUDE.md — MyDNAPedia Landing Site

Guidance for Claude Code (and any AI assistant) working on this project. Read this first.

## What this is
The marketing website for **MyDNAPedia**, a DNA wellness / genetic testing company (India). Live at **https://mydnapedia.org**.

It is a **hand-coded static website** — plain HTML, CSS, and vanilla JavaScript. **No framework (not React/Vue/Next), no build step, no bundler.** The files you edit are the files that ship.

## Tech stack (keep it this way)
- **HTML5** — one file per page, all self-contained.
- **CSS3** — written inline inside each page's `<style>` block. Uses CSS custom properties (variables). No Tailwind/Sass.
- **Vanilla JavaScript** — inline `<script>` blocks at the bottom of each page. No libraries.
- **Fonts:** Sentient (display/headings) + Satoshi (body), loaded from Fontshare.
- **Hosting:** GitHub Pages, custom domain `mydnapedia.org` (see `CNAME`).
- **Forms:** Google Apps Script → Google Sheets + email (no backend server).
- **Analytics:** Google Analytics 4 (`gtag.js`).

Do **not** introduce a framework, build tool, or package.json unless the client explicitly asks. Simplicity is the point — it loads fast and anyone can edit it.

## Files
| File | What it is |
|---|---|
| `index.html` | Home page (the big one, ~2100 lines: hero, tension line, personas, plans, how-it-works, trust, testimonials, lead form, footer) |
| `about.html` | About page (story, approach, leadership team, partner/franchise form) |
| `privacy.html` `terms.html` `disclaimer.html` | Legal pages |
| `404.html` | Branded not-found page |
| `sitemap.xml` `robots.txt` | SEO |
| `CNAME` | Custom domain for GitHub Pages (`mydnapedia.org`) |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll and serve files as-is (more reliable deploys) |
| `assets/` | Images (`.webp`), the hero video (`hero-loop.mp4`), poster, logo, favicon, OG image, plus subfolders `personas/`, `team/`, `testimonials/`, `plan/` |
| `docs/DECISIONS.md` | Why things are built the way they are — **read before changing core behavior** |
| `docs/EDITING-GUIDE.md` | Step-by-step recipes for common edits (copy, testimonials, team, contact, forms) |

## Run / preview locally
```bash
npx serve -l 4321 .
```
Then open http://localhost:4321. (Any static file server works.)

## Deploy
Deployment is automatic: **push to the `main` branch → GitHub Pages rebuilds → live at mydnapedia.org in a few minutes.**
```bash
git add -A
git commit -m "your message"
git push origin main
```
- After pushing, allow ~1–3 minutes, then **hard-refresh** (Cmd/Ctrl+Shift+R) — GitHub's CDN and browsers cache aggressively.
- If a change doesn't appear, it's almost always caching or a still-running build, **not** a code problem. Check the repo's **Settings → Pages** and **Actions** tab for build status.

## House rules
- **Match the existing style.** Reuse the CSS variables in `:root` (see below) and the two fonts. Don't add new colors/fonts without reason.
- **Keep content claims accurate.** By client decision, the site must **not** mention Finland, Europe, "EU-certified", or "ASPCR" (see DECISIONS.md). Don't reintroduce them.
- **Test before pushing** when you can — run it locally and check the change, especially on mobile widths (the site is heavily responsive).
- **The same footer / nav / meta appears on all 5 pages** — if you change one, change all of them.

## Design tokens (from `:root` in each page)
```
--bg        #FFFFFF   page background
--ink       #322E27   main text (warm near-black)
--muted     #837B69   muted grey text
--gold      #9C6B16   deep gold — gold TEXT
--gold-lt   #E4A92F   honey-gold — FILLS / buttons (dark text on it)
--on-gold   #1c1406   text on gold fills
Display font: Sentient (headings)   Body font: Satoshi
```

## Integrations (owned by the client's Google account)
- **Lead + partner forms → Google Apps Script**, hosted on the **sales@mydnapedia.org** Google account, writing to a Google Sheet ("MyDNAPedia Leads", tabs `Leads` and `Partners`). New-lead alerts email **support@mydnapedia.org**; confirmation emails send from **sales@mydnapedia.org**. The endpoint URL is in each form's `action=` attribute. Full details + how to edit in `docs/EDITING-GUIDE.md`.
- **Google Analytics 4** — Measurement ID `G-3VM23JCP35`, snippet in each page's `<head>`. Form submits fire `generate_lead` (home) and `partner_inquiry` (about) events.

## When in doubt
Read `docs/DECISIONS.md` for the "why", and `docs/EDITING-GUIDE.md` for the "how". If a task would change the architecture (add a framework, backend, CMS, etc.), pause and confirm with the client first.
