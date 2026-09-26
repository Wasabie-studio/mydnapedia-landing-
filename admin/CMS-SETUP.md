# MyDNAPedia CMS

The blog/events are managed in **Decap CMS** at **`/admin/`**, hosted on
**GitHub Pages** with the **GitHub backend**. Login uses the shared Wasabie
Cloudflare Worker OAuth relay (the same one OASYS uses), so there's nothing to
deploy.

## Logging in
1. Open **https://mydnapedia.org/admin/** (or `<user>.github.io/<repo>/admin/`).
2. Click **Login with GitHub**.
3. Authorize with a GitHub account that has **write access** to
   `Wasabie-studio/mydnapedia-landing-`.

That's it — edits you publish in the CMS are committed straight to the repo,
and the blog page picks them up automatically.

## Who can edit
Anyone with write access to the repo. Add editors as **collaborators**:
GitHub → repo → Settings → Collaborators.

## How content flows
- Posts are markdown files in `content/blog/`; images upload to `assets/blog/`.
- The public blog reads those posts live via the GitHub API, so new/edited
  events appear on the site automatically after publishing.

## Editing without the CMS (optional)
You can also add/edit a post directly on github.com — create/edit a markdown
file in `content/blog/` with this front-matter and commit:

```
---
title: Your event title
date: 2026-07-01
category: Launch          # Launch | Community | Webinar | Partnership | Milestone
location: New Delhi        # optional
image: /assets/blog/your-photo.webp   # optional
excerpt: One or two sentences shown on the card.
---

Full write-up (optional).
```
