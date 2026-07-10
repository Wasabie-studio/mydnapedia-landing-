---
name: mydnapedia-site
description: Load this before editing the MyDNAPedia landing website (mydnapedia.org). Use whenever making changes to this repo — copy edits, images, testimonials, team members, personas, plans, contact info, social links, the hero video, forms, SEO, or adding sections. It captures the project's rules, structure, and gotchas so changes stay consistent and don't break existing behavior.
---

# MyDNAPedia Landing Site — working skill

You are editing the **MyDNAPedia** marketing website (https://mydnapedia.org). Follow these rules. For anything beyond a quick edit, open the referenced docs in this repo.

## Read these first (they're in the repo)
- **`CLAUDE.md`** — project overview, tech stack, structure, how to run/deploy.
- **`docs/DECISIONS.md`** — *why* things are built this way. Read the relevant section before changing the hero video, testimonials ticker, forms, hosting, mobile card sizing, or content claims.
- **`docs/EDITING-GUIDE.md`** — step-by-step recipes for common edits.

## Non-negotiable rules
1. **Stay static.** Plain HTML + inline CSS + vanilla JS. No React/Vue/Next, no build step, no npm packages. Don't "modernise" the stack.
2. **Match the existing style.** Reuse the `:root` CSS variables and the two fonts (Sentient for headings, Satoshi for body). Colors: `--gold-lt #E4A92F` for fills/buttons, `--gold #9C6B16` for gold text, `--ink #322E27` for body text.
3. **Banned content — never reintroduce:** Finland, Europe, "EU-certified", the Finnish parent entity, or "ASPCR". The lab is a "Global Standards compliant laboratory" (99.9% accuracy). Client decision.
4. **Nav, footer, and `<head>` meta are duplicated across all 5 pages** (`index/about/privacy/terms/disclaimer.html`). Change them everywhere.
5. **Don't add a play button or `controls` to the hero video, and don't remove the poster-fallback JS** — it's what prevents iOS from showing its native play button (see DECISIONS.md §6).
6. **On mobile, size card components with explicit `height`, not `aspect-ratio`** — iOS Safari collapses aspect-ratio boxes whose children are all absolutely positioned (DECISIONS.md §8).
7. **Test at a mobile width (375px)** — mobile is the primary audience and the site is heavily responsive.

## Structure at a glance
- `index.html` — home (hero, tension line, personas, plans, how-it-works, trust, testimonials, lead form, footer).
- `about.html` — story, approach, leadership team, partner/franchise form.
- `privacy/terms/disclaimer.html` — legal. `404.html` — not-found.
- `assets/` — `.webp` images, `hero-loop.mp4`, `hero-poster.webp`, `logo.webp`, `og-image.jpg`, subfolders `personas/ team/ testimonials/ plan/`.
- `sitemap.xml`, `robots.txt`, `CNAME`, `.nojekyll` (don't delete `.nojekyll`).

## Forms & analytics (client's Google account)
- Lead + partner forms → Google Apps Script on **sales@mydnapedia.org** → Google Sheet "MyDNAPedia Leads" (tabs `Leads`, `Partners`). Alerts email **support@mydnapedia.org**; thank-yous send from **sales@**. To change recipients/wording: edit the Apps Script in the Sheet and **redeploy a new version** (editing alone does nothing).
- GA4 `G-3VM23JCP35`; form submits fire `generate_lead` / `partner_inquiry`.

## Deploy
Push to `main` → GitHub Pages auto-deploys to mydnapedia.org (~1–3 min + CDN cache). If a change doesn't show, it's caching or a running build, not a code bug — hard-refresh and check the repo's Actions tab.

```bash
git add -A && git commit -m "describe change" && git push origin main
```

## Workflow for a change
1. Make the edit in the right file(s) (remember the duplication rule for nav/footer/meta).
2. Preview locally (`npx serve -l 4321 .`) and check desktop **and** mobile width.
3. Commit and push to `main`.
4. Tell the user to hard-refresh after ~2 minutes.
