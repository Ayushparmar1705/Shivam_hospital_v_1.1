# Deploy Shivam Hospital (Frontend + Backend) on Vercel

This repo has two folders. Deploy each as a **separate Vercel project**.

## 1. Backend (`backend/`)

1. In Vercel: **Add New Project** → import repo → set **Root Directory** to `backend`.
2. Framework Preset: **Other** (Vercel auto-detects `api/` serverless functions).
3. Environment variables:

| Variable | Required | Example |
|----------|----------|---------|
| `SERPAPI_KEY` | Yes | From [serpapi.com](https://serpapi.com) |
| `CORS_ORIGIN` | Yes | `https://your-frontend.vercel.app` |

   For preview deployments, add both production and preview frontend URLs, comma-separated:

   ```
   https://shivam-hospital.vercel.app,https://shivam-hospital-git-main-you.vercel.app,http://localhost:3000
   ```

4. Deploy. Test: `https://YOUR-BACKEND.vercel.app/api/health` → `{"ok":true}`

### Local backend

```bash
cd backend
cp .env.example .env
# Edit .env and set SERPAPI_KEY
npm install
npm run dev
```

## 2. Frontend (`frontend/`)

1. **Add New Project** → same repo → **Root Directory** `frontend`.
2. Framework Preset: **Create React App** (build: `npm run build`, output: `build`).
3. Environment variable:

| Variable | Required | Example |
|----------|----------|---------|
| `REACT_APP_API_URL` | Yes (production) | `https://YOUR-BACKEND.vercel.app` |

   No trailing slash. Leave empty only for local dev (uses proxy).

4. Deploy. React Router paths (`/about`, `/gallery`, etc.) work via `vercel.json` rewrites.

### Local frontend

```bash
cd frontend
npm install
npm start
```

With backend running on port 5000, testimonials load via the `proxy` in `package.json`.

## 3. Aikido security scans

- Backend uses **helmet** (local Express) and **security headers** on Vercel serverless routes.
- Dependencies are pinned with npm **overrides** for known CVEs (`axios`, `follow-redirects`, `i18next`).
- Do not commit `.env` files; use Vercel Environment Variables.
- Re-scan in Aikido after deploy. `webpack-dev-server` may still show as dev-only (Create React App); it is not shipped in production builds.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Testimonials empty on Vercel | Set `REACT_APP_API_URL` on frontend and `SERPAPI_KEY` on backend |
| CORS error in browser | Add your exact frontend URL to backend `CORS_ORIGIN` |
| `/about` 404 on refresh | Ensure `frontend/vercel.json` is deployed (SPA rewrite) |
| Reviews never cache on Vercel | Normal — cache uses `/tmp` on serverless (resets when function is cold) |
