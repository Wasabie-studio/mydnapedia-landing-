# EDITING-GUIDE.md — How to make common changes

Practical recipes for the most common edits. Aimed at a non-developer working with Claude Code. For each task: what to say to Claude Code, and which file/area it touches.

> **Golden rules**
> 1. After any change: `git add -A && git commit -m "..." && git push origin main`, wait ~2 min, then hard-refresh the site.
> 2. The **nav, footer, and meta tags are duplicated on all 5 pages** — change them everywhere, not just one page.
> 3. Don't reintroduce the banned words: **Finland, Europe, EU-certified, ASPCR** (see DECISIONS.md).
> 4. Preview locally first when possible: `npx serve -l 4321 .`

---

## Change text / copy on a page
**Say to Claude Code:** "On the home page, change the headline from '…' to '…'." or "Update the sub-text under the hero."
- Home page content is in `index.html`; About in `about.html`; legal pages in their own files.
- Headlines usually live in `<h1>`/`<h2>` tags; body text in `<p>` tags.
- If the text also appears in the FAQ JSON-LD (bottom of `index.html`) or a meta description, update those copies too so search results match.

## Update contact phone numbers or email
**Say:** "Update the New Delhi phone number to X on all pages."
- Appears in the home page CTA band, the footer (all pages), and the Organization JSON-LD.
- Search the repo for the old number to catch every instance.

## Add / edit / remove a testimonial
**Say:** "Add a testimonial from [name], [city], saying '[quote]', for [plan]."
- Testimonial cards are in `index.html` in the `.tticker` container (section "What our members say").
- Each card is a `.tcard` block. Copy an existing one and edit the quote, name, and location.
- Optional photo: drop a `member-N.webp` in `assets/testimonials/` and set the card's `data-photo` attribute — the JS swaps it in automatically. Without a photo it shows a placeholder.
- The ticker duplicates cards automatically for the seamless loop — just add the single card.

## Add / edit / remove a leadership team member (About page)
**Say:** "Remove [name] from the team" or "Add [name], [role], [credentials]."
- In `about.html`, the "Leadership" section. Each person is a `.team-card` with a photo (`assets/team/name.webp`), name, role, and credentials.
- To add: add a `name.webp` (square, e.g. 600×600) to `assets/team/`, then copy an existing card and edit.

## Change a persona ("Who it's for")
**Say:** "Change persona 3's title and description to '…'."
- In `index.html`, section "Who it's for", the `.personas-grid`. Each is a `.pcard` with an image (`assets/personas/pN.webp`), a `.pcard-title`, and a `.pcard-desc`.
- Photos are portrait; keep new ones portrait so they crop well.

## Update pricing / plans
**Say:** "Change the Premium plan description / add a plan."
- In `index.html`, the "Our Plans" section (`#tests` / `#plans`). Plans are rendered from a small JS array near the plans code — edit the plan objects (title, subtitle, description, price).

## Change social media links
**Say:** "Update the Instagram/YouTube/Facebook link to X."
- In the footer "Follow" block on **all 5 pages**. They're plain `<a href="...">` links.

## Swap the hero video or its poster
**Say:** "Replace the hero video with this MP4."
- Replace `assets/hero-loop.mp4` (keep it MP4/H.264, muted-friendly, and reasonably small — under ~3 MB).
- Also update the still fallback `assets/hero-poster.webp` to a frame that matches (shown when autoplay is blocked). Keep the same filenames so nothing else needs changing.

## Change the social share (OG) image
**Say:** "Replace the OG image with this file."
- Replace `assets/og-image.jpg` — should be **1200×630**, JPG. Keep the filename.
- After deploying, refresh the cache on each platform: Facebook Sharing Debugger, LinkedIn Post Inspector (they cache old images).

## Update the favicon
- Replace `assets/favicon.svg`.

## Forms — where the leads go / changing recipients
- Leads land in the Google Sheet **"MyDNAPedia Leads"** (on the sales@mydnapedia.org account), tabs `Leads` and `Partners`.
- New-lead **alert emails** go to **support@mydnapedia.org**; **thank-you emails** to the person send **from sales@mydnapedia.org**.
- To change the alert recipient or email wording: open the Google Sheet → **Extensions → Apps Script**, edit the `NOTIFY` address or the email text, **Save**, then **Deploy → Manage deployments → Edit → New version → Deploy**. (Editing without redeploying a new version does nothing.)
- The website's form `action=` URL only changes if you create a brand-new Apps Script deployment. For wording/recipient tweaks you don't touch the website at all.
- See DECISIONS.md §3 for the deployment gotchas (must be "Execute as: Me", "Who has access: Anyone").

## Add a whole new section to the home page
**Say:** "Add a new section between [X] and [Y] that does [Z]."
- Copy the structure/spacing of an existing section, reuse the `:root` color variables and the two fonts (Sentient headings, Satoshi body). Ask Claude Code to match the existing visual style.
- Test at mobile widths (375px) — the site is responsive and mobile is the primary audience.

## SEO / Google
- Page titles, descriptions, and JSON-LD are in each page's `<head>` and bottom.
- `sitemap.xml` should list any new page you add (and bump the `<lastmod>` date).
- To manage what Google shows (remove old URLs, submit sitemap): **Google Search Console** for `mydnapedia.org`.

---

## Deploy checklist (every change)
1. Preview locally: `npx serve -l 4321 .` → check it, including a narrow mobile width.
2. `git add -A && git commit -m "describe the change"`
3. `git push origin main`
4. Wait ~2 minutes, then **hard-refresh** (Cmd/Ctrl+Shift+R) on mydnapedia.org.
5. If it still looks old: it's cache or the build is still running — check the repo's **Actions** tab. It is not a code problem.
