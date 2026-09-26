# MyDNAPedia CMS — Netlify setup (one time)

The blog/events are managed in **Decap CMS** at `/admin/`, using **Netlify
Identity + Git Gateway** for login. The code is already in place — these are
the dashboard steps to switch it on. Do them once.

## 1. Connect the repo to Netlify
- Log in at https://app.netlify.com → **Add new site → Import an existing project**.
- Pick GitHub → the repo **Wasabie-studio/mydnapedia-landing-**.
- Build command: *(leave empty)*  •  Publish directory: **`.`**  → **Deploy**.
  (The repo already has `netlify.toml` set up for this.)

## 2. Enable Identity
- Site → **Identity** → **Enable Identity**.
- Identity → **Registration preferences** → set to **Invite only**.

## 3. Enable Git Gateway
- Identity → **Services** → **Enable Git Gateway**.
  (This lets logged-in editors commit to the repo without their own GitHub access.)

## 4. Invite editors
- Identity → **Invite users** → enter each editor's email.
- They get an email → click the link → set a password → they land in `/admin/`.

## 5. Open the CMS
- Go to **`https://<your-netlify-site>/admin/`** and log in.
- To use it at **mydnapedia.org/admin/**, point the domain to this Netlify site
  (Netlify → Domain settings → add `mydnapedia.org`, then update DNS as Netlify
  instructs). Until the domain is moved, use the `*.netlify.app` URL for the CMS.

---

### Notes
- Posts are saved as markdown in `content/blog/`; images upload to `assets/blog/`.
- The public site reads those posts live via the GitHub API, so new/edited
  events appear on the blog automatically after they're published in the CMS.
- Login is handled entirely by Netlify Identity — no GitHub OAuth app or
  external OAuth handler is needed.
