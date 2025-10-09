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