/*
 * GitHub OAuth handler for Decap CMS — Cloudflare Worker.
 * Lets mydnapedia.org/admin/ log in with GitHub (GitHub Pages is static and
 * can't do the OAuth handshake itself).
 *
 * DEPLOY (free, ~10 min):
 *  1. Create a GitHub OAuth App:
 *       GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
 *       • Application name:            MyDNAPedia CMS
 *       • Homepage URL:                https://mydnapedia.org
 *       • Authorization callback URL:  https://<your-worker-url>/callback
 *         (you get the worker URL in step 2 — come back and fill this in)
 *       Note the Client ID, and generate a Client Secret.
 *  2. Cloudflare dashboard → Workers & Pages → Create → Worker.
 *       Paste this file's contents, Deploy. Copy the worker URL
 *       (e.g. https://mydnapedia-cms.<you>.workers.dev).
 *  3. Worker → Settings → Variables → add two SECRET variables:
 *       GITHUB_CLIENT_ID       = <client id from step 1>
 *       GITHUB_CLIENT_SECRET   = <client secret from step 1>
 *     Then set the OAuth App's callback URL (step 1) to
 *       https://<worker-url>/callback
 *  4. In admin/config.yml set:
 *       backend:
 *         name: github
 *         repo: Wasabie-studio/mydnapedia-landing-
 *         branch: main
 *         base_url: https://<worker-url>
 *         auth_endpoint: auth
 *
 * Then mydnapedia.org/admin/ "Login with GitHub" works — all on GitHub, no Netlify.
 */

const GH_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GH_TOKEN = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;

    // Step A — Decap opens /auth; redirect the user to GitHub.
    if (url.pathname === '/auth') {
      const redirect = `${origin}/callback`;
      const authUrl = new URL(GH_AUTHORIZE);
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirect);
      authUrl.searchParams.set('scope', url.searchParams.get('scope') || 'repo');
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    // Step B — GitHub redirects back to /callback with a code.
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Missing code', { status: 400 });

      const tokenRes = await fetch(GH_TOKEN, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await tokenRes.json();

      const result = data.access_token
        ? { token: data.access_token, provider: 'github' }
        : { error: data.error_description || 'Authentication failed' };
      const status = data.access_token ? 'success' : 'error';

      const body = `<!doctype html><html><body><script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(result).replace(/</g, '\\u003c')}',
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>Logging you in…</body></html>`;

      return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    return new Response('MyDNAPedia CMS OAuth handler. Use /auth to begin.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
