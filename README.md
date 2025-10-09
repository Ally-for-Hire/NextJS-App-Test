# Next.js + Cloudflare Worker Demo

This is a minimal Next.js app that shows a counter and fetches the current server time from a Cloudflare Worker via a Next.js API route. It’s set up so you can run everything locally and deploy via GitHub Actions.

- Live demo (if configured): https://next-js-app-test-six.vercel.app/

## Features
- Next.js App Router (`app/` directory)
- Simple UI with a counter and “Show Time” button
- API route proxy at `app/api/time/route.js` that calls the Worker
- Cloudflare Worker that returns `{ time: "<ISO string>" }` with CORS headers
- CI/CD: Vercel deploy for the app and Wrangler deploy for the Worker

## Getting Started
1. Install Node.js 18.17+ or 20+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Worker locally:
   - Install Wrangler: `npm i -g wrangler`
   - From `cloudflare-worker/`: `wrangler dev` (serves on `http://127.0.0.1:8787` by default)
4. Create `./.env.local` for the Next.js app and point it at your Worker:
   ```bash
   # .env.local
   WORKER_URL=http://127.0.0.1:8787
   # or NEXT_PUBLIC_WORKER_URL=http://127.0.0.1:8787
   ```
5. Start the app:
   ```bash
   npm run dev
   ```
6. Visit `http://localhost:3000`, click “Show Time”, and you should see the Worker’s time.

## How the pieces connect
- The page (`app/page.js`) calls the Next.js API route `/api/time`.
- The API route (`app/api/time/route.js`) reads `WORKER_URL` or `NEXT_PUBLIC_WORKER_URL` and fetches the Worker.
- The Worker (`cloudflare-worker/src/index.js`) returns `{ time: "..." }` and sets permissive CORS headers.

## Deploy: Next.js to Vercel
- Workflow file: `.github/workflows/deploy.yml`
- Triggers: push to `main`, manual run (`workflow_dispatch`)
- Summary of steps:
  - Checkout, setup Node, install deps
  - `vercel pull` → `vercel build` → `vercel deploy --prebuilt --prod`
  - Writes a summary including the deployment URL

Required GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Environment variables in Vercel:
- Set `WORKER_URL` (or `NEXT_PUBLIC_WORKER_URL`) to your Worker’s production URL.
  - Update the value and redeploy if the Worker URL changes.

## Deploy: Cloudflare Worker
- Location: `cloudflare-worker/`
- Entry: `cloudflare-worker/src/index.js`
- Config: `cloudflare-worker/wrangler.toml` (service: `nextjs-app-test-worker`)
- Workflow file: `.github/workflows/cloudflare-worker.yml`
- Triggers: push to `main`, manual run (`workflow_dispatch`)

What the workflow does:
- Publishes the Worker using `cloudflare/wrangler-action@v3`
- Adds a summary with service info and a dashboard link
- The `*.workers.dev` URL is printed in the Wrangler step logs

Required GitHub Secrets:
- `CLOUDFLARE_API_TOKEN` — Token scoped to your account with Workers Scripts:Edit and Account:Read
- `CLOUDFLARE_ACCOUNT_ID` — Your Cloudflare account ID

After publish:
- Copy the `*.workers.dev` URL from the logs. Use it as `WORKER_URL`/`NEXT_PUBLIC_WORKER_URL` in Vercel.
- Optionally configure custom routes/domains in `wrangler.toml`.

## Local Development Tips
- Worker shows CORS headers, but the app calls it via a server route to avoid browser CORS issues.
- If you change `.env.local`, restart the Next.js dev server.

## Troubleshooting
- Missing Worker URL in the app
  - `/api/time` returns 500 with `WORKER_URL env var not set`.
  - Set `WORKER_URL` (or `NEXT_PUBLIC_WORKER_URL`) locally or in Vercel and restart/redeploy.
- Worker deploy succeeded but something looks off
  - Confirm `cloudflare-worker/wrangler.toml` has `main = "src/index.js"` and the service name matches.
  - Check Wrangler logs in GitHub Actions for the publish URL and any errors.
- App still uses an old Worker URL
  - Update the env var in Vercel and redeploy.
