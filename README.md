# NextJS Hello Button

This is a minimal Next.js app that renders a single page with a button. When clicked, the button reveals the message **"hello"** so the app can be shared as a quick live demo.

## Features
- Next.js App Router setup (`app/` directory)
- Client-side state to toggle the message
- Basic styling for a centered layout

## Getting Started
1. Install Node.js 18.17+ or 20+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000` and click the button to see "hello".
5. Alternatively: https://next-js-app-test-six.vercel.app/

## Deployment
Pushing to the `main` branch triggers a GitHub Actions workflow that builds the project and deploys it to Vercel. Configure the repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` with your Vercel credentials before running the workflow.

## Cloudflare Worker (Auto‑Deploy)
- Location: `cloudflare-worker/`
- Entry: `cloudflare-worker/src/index.js`
- Config: `cloudflare-worker/wrangler.toml`

The Worker returns JSON with the current server time:

```
{
  "time": "2025-01-01T12:34:56.000Z"
}
```

### GitHub Actions
Commits to `main` also trigger `.github/workflows/cloudflare-worker.yml`, which deploys the Worker via Wrangler.

### Required GitHub Secrets
Add these repository secrets for Cloudflare deployment:
- `CLOUDFLARE_API_TOKEN` — API token with Workers Scripts:Edit and Account:Read permissions
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

After the first successful deploy, the Worker will be available at a `*.workers.dev` URL (shown in workflow logs). Optionally, configure custom routes/domains in `wrangler.toml`.

### Using from the App
Update the Worker URL in `app/page.js` to the newly deployed `*.workers.dev` URL once available.
