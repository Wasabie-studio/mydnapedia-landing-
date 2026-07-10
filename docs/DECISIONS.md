# DECISIONS.md — Why the site is built the way it is

Read this before changing core behaviour. Each entry is a decision that was made deliberately — reversing one without understanding it will likely reintroduce a bug or break a client requirement.

---

## 1. Plain HTML/CSS/JS — no framework, no build step
**Decision:** hand-coded static site. No React/Vue/Next, no bundler, no `package.json`.
**Why:** it's a marketing landing page. Static files load instantly, cost nothing to host, never break a build, and anyone (or any AI assistant) can edit them directly. A framework would add complexity with no benefit here.
**Implication:** don't "modernise" it into a framework unless the client wants a full web app (logins, dashboards). For content/design tweaks, edit the HTML directly.

## 2. Hosting on GitHub Pages + custom domain
**Decision:** repo on GitHub, served by GitHub Pages from `main`, domain `mydnapedia.org` via the `CNAME` file. HTTPS enforced (free Let's Encrypt cert).
**Why:** free, reliable, zero-config for static sites. Push to deploy.
**Gotchas:**
- Deploys can take a few minutes; GitHub's CDN caches for ~10 min. "It didn't update" is almost always cache, not code.
- GitHub Pages builds occasionally fail transiently ("Page build failed"). The `.nojekyll` file was added so Pages skips the Jekyll build and just serves files — this makes deploys far more reliable. **Do not delete `.nojekyll`.**
- Custom-domain HTTPS cert can take up to 24h to issue after DNS changes (one-time).

## 3. Forms via Google Apps Script (not a backend, not Netlify)
**Decision:** the lead form (home) and partner form (about) POST to a **Google Apps Script Web App** that records to a Google Sheet and sends emails.
**Why:** no server to run or pay for; the client can read leads in a familiar Google Sheet; free.
**How it works:**
- Script + Sheet live on the **sales@mydnapedia.org** Google account. Sheet name: "MyDNAPedia Leads", with tabs `Leads` and `Partners`.
- On submit: appends a row, emails a new-lead alert to **support@mydnapedia.org**, and emails a thank-you to the person (from **sales@mydnapedia.org**).
- The partner form posts a hidden field `formType=partner` so the script routes it to the `Partners` tab.
- The browser posts with `fetch(..., { mode:'no-cors' })` because Apps Script doesn't send CORS headers — so the JS can't read the response and optimistically shows the thank-you message.
**Deployment gotchas (these cost real time — respect them):**
- The Apps Script Web App must be deployed with **Execute as: Me** and **Who has access: Anyone** (the plain "Anyone", NOT "Anyone with Google account" → that returns 401).
- Editing the script code does nothing until you **redeploy a new version** (Deploy → Manage deployments → Edit → New version).
- The "from" address of emails = whichever Google account runs the script. It runs as sales@ so mail comes from sales@.
- An account emailing **itself** (e.g. sales→sales) gets hidden from the Gmail inbox by Gmail — always send alerts to a *different* address (that's why alerts go to support@, not sales@).

## 4. Analytics: GA4
**Decision:** Google Analytics 4 (`G-3VM23JCP35`) on every page. Form submissions fire `generate_lead` (home) and `partner_inquiry` (about) events as conversions.
**Why:** free, standard, tracks both traffic and actual form conversions.

## 5. Content constraints — NO Finland / Europe / EU / ASPCR
**Decision:** the site must not reference **Finland**, **Europe/EU**, "**EU-certified**", the Finnish parent entity, or "**ASPCR**" (a lab technology term). These were deliberately removed.
**Why:** client positioning decision — the brand is presented as India-based, and these terms were removed at the client's request.
**Implication:** when writing new copy or editing lab/credential text, **do not reintroduce** these terms. The lab is referred to as a "Global Standards compliant laboratory" with "99.9% accuracy". Legal jurisdiction in `terms.html` is New Delhi, India.

## 6. Hero video: autoplay with a static-poster fallback (no play button)
**Decision:** the hero background is a muted, looping, autoplaying MP4 (`hero-loop.mp4`). If autoplay is blocked (e.g. iOS **Low Power Mode**), the JS hides the `<video>` entirely and shows a static poster image (`hero-poster.webp`) instead. There is intentionally **no play button** anywhere.
**Why:** the client did not want a play button on any device. iOS shows its own native play button whenever a blocked video is *visible* — the only reliable way to prevent that is to never show a blocked video. So the video is revealed **only once it is confirmed playing**; otherwise the poster shows.
**Implication:** don't add `controls`, and don't remove the poster-fallback logic — that's what keeps iOS from drawing its native button. In Low Power Mode the hero is a still image and won't play (accepted tradeoff).
**Format note:** keep the video as **MP4 (H.264)** — it plays everywhere. WebM does not play reliably on iPhones, so avoid it for the hero.

## 7. Testimonials ticker driven by JavaScript (requestAnimationFrame), not CSS animation
**Decision:** the testimonials marquee scrolls via a JS `requestAnimationFrame` loop, not a CSS `@keyframes` animation.
**Why:** iOS (especially Low Power Mode) pauses CSS animations, which froze the ticker. `requestAnimationFrame` keeps running where CSS animations get paused. The cards are cloned once in JS so the loop wraps seamlessly.
**Implication:** don't convert it back to a pure CSS animation.

## 8. The iOS `aspect-ratio` collapse — use explicit heights on mobile
**Decision:** the persona cards and testimonial cards use an **explicit height** on mobile, not `aspect-ratio`.
**Why:** iOS Safari has a bug where an element sized by `aspect-ratio` whose children are all absolutely positioned **collapses to zero height** and disappears. That made these cards vanish on iPhones. Explicit `height` (e.g. `height: clamp(...)` or `height: 90vw`) fixes it.
**Implication:** if you add another card component with only absolutely-positioned children, give it an explicit height on mobile — don't rely on `aspect-ratio` alone.

## 9. SEO basics
- Each page has a unique `<title>`, meta description, canonical URL, Open Graph + Twitter Card tags, and JSON-LD structured data (Organization on all pages; FAQPage on home).
- `sitemap.xml` lists the 5 real pages; `robots.txt` points to it.
- The OG share image is `assets/og-image.jpg` (1200×630, the MyDNAPedia logo). Social platforms cache it — after changing it, refresh via Facebook Sharing Debugger / LinkedIn Post Inspector.
- **Note:** the domain previously hosted a different website, so old pages may linger in Google's index. They're removed via Google Search Console (Removals tool); the current site correctly returns 404 for them.

---

### Rule of thumb
If a change touches one of the areas above (video, ticker, forms, hosting, mobile card sizing, or the banned content terms), re-read that section first. Everything else — copy, images, colors, adding sections — is safe to edit directly following `EDITING-GUIDE.md`.
