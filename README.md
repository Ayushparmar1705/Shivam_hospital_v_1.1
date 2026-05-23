# Shivam Children Hospital — Website

Official marketing website for **Shivam Children Hospital** in Botad, Gujarat — pediatric and neonatal care, NICU/PICU, PM-JAY empanelled services, and family-focused healthcare.

## Features

- **Single-page experience** with routed sections: Home, About, Gallery, Testimonials, Contact
- **English** content with scroll-reveal animations
- **Hero** with hospital branding and `img1.jpg` background
- **About Us** — full story, Dr. Jignesh D. Vaghela, specialties, facilities, PM-JAY
- **Gallery** — facility photos with lightbox (desktop)
- **Testimonials** — Google reviews via backend API (SerpAPI)
- **Contact** — map, hours, phone, email, address
- **Security** — Helmet (Express), CORS, updated dependencies for production scans

## Tech stack

| Layer | Stack |
|-------|--------|
| Frontend | React 19, React Router, Create React App, i18next (English) |
| Backend | Node.js, Express 5 (local dev) |
| Serverless | Vercel functions for `/api/reviews` and `/api/health` |
| Reviews | SerpAPI (Google Maps reviews) |

## Project structure

```
Shivam_hospital_v_1.1-master/
├── frontend/          # React SPA (deploy separately on Vercel)
│   ├── public/images/   # img1.jpg (hero), hospital*.jpeg (gallery)
│   └── src/
├── backend/           # Express API + Vercel serverless handlers
│   ├── server.js      # Local development server (port 5000)
│   ├── api/           # Vercel serverless routes
│   └── lib/reviews.js # Shared reviews logic
├── DEPLOYMENT.md      # Step-by-step Vercel setup
└── README.md
```

## Local development

### Prerequisites

- Node.js 18+
- npm
- [SerpAPI](https://serpapi.com) key (for testimonials)

### Backend (port 5000)

```bash
cd backend
cp .env.example .env
# Set SERPAPI_KEY in .env
npm install
npm run dev
```

Health check: http://localhost:5000/api/health

### Frontend (port 3000)

```bash
cd frontend
npm install
npm start
```

The frontend `proxy` in `package.json` forwards `/api/*` to the backend during local dev.

Open http://localhost:3000

### Production build (frontend)

```bash
cd frontend
npm run build
```

## Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SERPAPI_KEY` | SerpAPI key for Google reviews |
| `CORS_ORIGIN` | Allowed frontend origin(s), comma-separated |

See `backend/.env.example`.

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend URL in production (no trailing slash) |

See `frontend/.env.example`. Leave unset locally to use the dev proxy.

## Deploy to Vercel

Deploy **frontend** and **backend** as two Vercel projects from this repo (different root directories).

Full instructions: **[DEPLOYMENT.md](DEPLOYMENT.md)**

Quick checklist:

1. Backend root: `backend` → set `SERPAPI_KEY`, `CORS_ORIGIN`
2. Frontend root: `frontend` → set `REACT_APP_API_URL` to your backend URL
3. Test `/api/health` and testimonials on the live site

## Hospital contact

- **Phone:** +91 78782 82866  
- **Email:** shivamhospital820@gmail.com  
- **Address:** Shivam Children Hospital, Bharat society, Paliyad Rd, Botad, Gujarat 364710, India  

## License

Private project for Shivam Children Hospital. All rights reserved.
