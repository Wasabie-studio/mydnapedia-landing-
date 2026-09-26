# MyDNAPedia CMS — GitHub setup

The blog/events are managed in **Decap CMS** at `/admin/`, hosted on **GitHub
Pages** with the **GitHub backend**. No Netlify.

## How editing works
- Posts are markdown files in `content/blog/`; images live in `assets/blog/`.
- The public blog reads those posts live via the GitHub API, so new/edited
  events show up automatically.

## Two ways to edit

### Option 1 — Edit directly on GitHub (zero setup)
The simplest, purely-GitHub way — no login service needed:
1. Go to the repo → `content/blog/` on github.com.
2. **Add file → Create new file** (or open an existing post to edit).
3. Use this template, then **Commit**:
   ```
   ---
   title: Your event title
   date: 2026-07-01
   category: Launch          # Launch | Community | Webinar | Partnership | Milestone
   location: New Delhi        # optional
   image: /assets/blog/your-photo.webp   # optional (upload to assets/blog first)
   excerpt: One or two sentences shown on the card.
   ---

   Full write-up (optional).
   ```
The blog updates on its own after the commit.

### Option 2 — The Decap CMS admin UI at /admin/
Nicer editing UI, but GitHub Pages is static, so the **login button needs one
small OAuth helper** (there is no way around this on GitHub Pages):
1. Deploy the Cloudflare Worker in **`admin/oauth-worker.js`** (free; full
   steps are in the file's comment).
2. Create a **GitHub OAuth App** and put its Client ID/Secret in the Worker.
3. Set `base_url` in **`admin/config.yml`** to the Worker's URL.
Then `mydnapedia.org/admin/` → **Login with GitHub** works.

Until step 3 is done, `/admin/` will load but the login button won't complete —
so use **Option 1** in the meantime.
