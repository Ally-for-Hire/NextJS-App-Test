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

## CI/CD Overview
This repo deploys two things when you push to `main`:

- Next.js app → Vercel (workflow: `Deploy Next.js (Vercel)`)
- Cloudflare Worker → Workers (workflow: `Deploy Cloudflare Worker`)

Both workflows add a short summary to the GitHub Actions run so you can quickly see what was deployed and where.

## Next.js → Vercel Deploy
- Workflow file: `.github/workflows/deploy.yml`
- Triggers: push to `main`, manual run (workflow_dispatch)
- Steps:
  - Checkout, setup Node, install deps
  - `vercel pull` to sync project settings
  - `vercel build` then `vercel deploy --prebuilt --prod`
  - Writes a summary including the Production deployment URL

Required GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Environment variables:
- If your app needs the Worker URL at runtime, set `NEXT_PUBLIC_WORKER_URL` in your Vercel Project → Settings → Environment Variables (Production and Preview as desired), then redeploy.

## Cloudflare Worker Deploy
- Location: `cloudflare-worker/`
- Entry: `cloudflare-worker/src/index.js`
- Config: `cloudflare-worker/wrangler.toml` (service name: `nextjs-app-test-worker`)
- Workflow file: `.github/workflows/cloudflare-worker.yml`
- Triggers: push to `main`, manual run (workflow_dispatch)

What the workflow does:
- Publishes the Worker using Cloudflare Wrangler
- Adds a summary with:
  - Service name and config locations
  - Dashboard link to the service
  - Note that the `*.workers.dev` URL appears in the Wrangler step logs

Required GitHub Secrets:
- `CLOUDFLARE_API_TOKEN` — API token scoped to your Account with Workers Scripts:Edit and Account:Read
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

After a successful publish, copy the `*.workers.dev` URL from the Wrangler logs and, if you’re connecting it to the Next.js app, set it as `NEXT_PUBLIC_WORKER_URL` in Vercel.

## Local Development
- Run the Worker locally:
  - Install Wrangler: `npm i -g wrangler`
  - From `cloudflare-worker/`: `wrangler dev` → `http://127.0.0.1:8787`
- Run the Next.js app:
  - Create `.env.local` with `NEXT_PUBLIC_WORKER_URL=http://127.0.0.1:8787`
  - `npm install` then `npm run dev`

## Troubleshooting
- Worker deploy succeeded but code looks empty
  - Ensure the workflow ran after the Worker files were added
  - Confirm `wrangler.toml` has `main = "src/index.js"` and service name matches
  - Check the Wrangler step logs in GitHub Actions for publish output and any errors
- App still uses old Worker URL
  - Update `NEXT_PUBLIC_WORKER_URL` in Vercel and redeploy the app
  - In development, confirm `.env.local` is set and you restarted the dev server

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
