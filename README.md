# MyDNAPedia — Website

The marketing website for **MyDNAPedia**, live at **https://mydnapedia.org**.

Hand-coded static site (plain HTML, CSS, vanilla JavaScript — no framework, no build step). Push to `main` and it deploys itself via GitHub Pages.

---

## For the team: making changes with Claude Code

This repo is set up so you can make edits by *describing what you want* to **Claude Code** (an AI coding assistant), even without being a developer.

### One-time setup
1. **Install Claude Code:** follow https://claude.com/claude-code (available in the terminal and as a desktop/VS Code app).
2. **Get the project on your computer:**
   ```bash
   git clone https://github.com/Wasabie-studio/mydnapedia-landing-.git
   cd mydnapedia-landing-
   ```
3. **Open Claude Code in this folder.** It automatically reads `CLAUDE.md`, so it already understands the project.
4. *(Optional)* Type `/mydnapedia-site` in Claude Code to load the project skill for extra guidance.

### Making a change
Just tell Claude Code plainly, e.g.:
- "Change the hero headline to '…'."
- "Add a testimonial from Priya, Mumbai: '…'."
- "Update the New Delhi phone number to … on all pages."
- "Remove [name] from the team."

Then ask it to **commit and push** — the change goes live on mydnapedia.org in a couple of minutes (hard-refresh your browser to see it).

### The important docs (Claude Code reads these; you can too)
| File | What it's for |
|---|---|
| **`CLAUDE.md`** | Project overview, structure, how to run & deploy |
| **`docs/DECISIONS.md`** | *Why* things are built the way they are — read before changing core behavior |
| **`docs/EDITING-GUIDE.md`** | Step-by-step recipes for common edits |
| **`.claude/skills/mydnapedia-site/SKILL.md`** | The project skill (loads the rules on demand) |

### A few things to know
- **Content rule:** the site must not mention Finland, Europe, "EU-certified", or "ASPCR" (client decision — see DECISIONS.md).
- **Nav, footer, and page meta repeat on all 5 pages** — changes there apply everywhere.
- **If a change doesn't show up:** it's almost always browser/CDN caching or a still-running deploy, not a bug. Hard-refresh (Cmd/Ctrl+Shift+R) and give it a couple minutes.

---

## Run it locally
```bash
npx serve -l 4321 .
```
Open http://localhost:4321.

## Deploy
Automatic — push to `main`:
```bash
git add -A && git commit -m "your message" && git push origin main
```
GitHub Pages rebuilds and serves it at mydnapedia.org.

## Tech
Static HTML/CSS/JS. Fonts: **Sentient** (headings) + **Satoshi** (body) from Fontshare — both free for commercial/web use. Forms via Google Apps Script → Google Sheets. Analytics via Google Analytics 4.

## Accounts involved (owned by the client)
- **GitHub** (`Wasabie-studio/mydnapedia-landing-`) — code + hosting (GitHub Pages).
- **Domain** — `mydnapedia.org` (DNS at GoDaddy).
- **Google account `sales@mydnapedia.org`** — runs the form backend (Apps Script + the "MyDNAPedia Leads" Google Sheet). Lead alerts go to `support@mydnapedia.org`.
- **Google Analytics 4** — traffic + form-conversion tracking.
- **Google Search Console** — manages how the site appears in Google search.
