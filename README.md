# GharrPay — Luxury Co-Living & Executive Student PGs

GharrPay is a landing website for a luxury co-living / student PG business, with a **booking inquiry form** (public) and a **password-protected admin dashboard** for managing those inquiries.

- **Frontend:** React 19, Vite 6, Tailwind CSS 4, Framer Motion, React Router, React Hook Form, Swiper, Lenis smooth scroll
- **Backend:** Node.js, Express 5, Mongoose 9 (MongoDB), JWT auth
- **Deployment:** single-command production build that serves the frontend and API from one server

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Production Build & Run](#production-build--run)
- [Production Hardening (what was done)](#production-hardening-what-was-done)
- [API Reference](#api-reference)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)

---

## Features

**Public site (`/`)**
- Single-page landing: hero, properties, pricing, amenities, food, testimonials, FAQ, contact, and more
- "Book Now" inquiry modal (name, phone, city, room type, move-in date, notes)
- Dark mode, smooth scroll, floating call/back-to-top buttons, mobile menu

**Admin dashboard (`/admin`)**
- Login with username + password → issues a 12-hour JWT
- Live stats (Total / New / Contacted / Closed)
- Filter chips, search by name / phone / city
- Update status, delete bookings, refresh

---

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 19, Vite 6, Tailwind CSS 4, Framer Motion, React Router 7, React Hook Form, Swiper, Lenis |
| Backend    | Node.js (>=20), Express 5, Mongoose 9 |
| Database   | MongoDB (Atlas or local) |
| Auth       | jsonwebtoken (JWT, 12h expiry) |
| Security   | helmet, express-rate-limit, cors (restricted), input validation |
| Tooling    | oxlint, Vite code-splitting |

---

## Project Structure

```
GharrPay/
├── package.json              # Root scripts (dev, build, start) + concurrently/cross-env
├── .gitignore
├── backend/
│   ├── index.js              # Express app: middleware, routes, static serving, shutdown
│   ├── .env                  # ⚠️ Secrets — gitignored, never commit
│   ├── .env.example          # Copy this to .env
│   ├── middleware/
│   │   └── auth.js           # JWT sign + authRequired (admin role check)
│   ├── models/
│   │   └── Booking.js        # Mongoose schema + validation
│   └── routes/
│       ├── auth.js           # POST /api/auth/login
│       └── bookings.js       # CRUD for inquiries (public POST, protected GET/PATCH/DELETE)
├── deploy/
│   ├── setup-ec2.sh          # One-shot Ubuntu setup (Node 22, PM2, nginx, build, .env)
│   ├── ecosystem.config.js   # PM2 app definition (NODE_ENV=production)
│   └── nginx-gharrpay.conf   # Reverse proxy: port 80 -> 127.0.0.1:5000
└── frontend/
    ├── src/
    │   ├── pages/AdminPage.jsx   # Admin dashboard
    │   ├── components/           # Header, Footer, BookingModal, etc.
    │   ├── sections/             # Landing page sections
    │   ├── data/                 # Content data (nav, properties, etc.)
    │   └── ...
    └── index.html
```

---

## Prerequisites

- **Node.js >= 20** (tested on Node 24)
- **npm** (or pnpm/yarn)
- **MongoDB** — a local instance, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## Setup

```bash
# 1. Install all dependencies (backend + frontend + root tooling)
npm run install:all
# or, manually:
npm install --prefix backend
npm install --prefix frontend

# 2. Configure environment
cp backend/.env.example backend/.env
# 3. Edit backend/.env with your real values (see below)
```

### Environment Variables

`backend/.env` (copy from `.env.example`):

| Variable       | Required | Description |
|----------------|----------|-------------|
| `MONGO_URI`    | ✅       | MongoDB connection string |
| `PORT`         |          | API port (default `5000`) |
| `ADMIN_USERNAME` | ✅     | Admin dashboard username |
| `ADMIN_PASSWORD` | ✅     | Admin dashboard password — **use a strong one** |
| `JWT_SECRET`   | ✅       | Long random string for signing tokens. Generate with: `openssl rand -hex 32` |
| `CORS_ORIGIN`  |          | Comma-separated allowed frontend origins (default `http://localhost:5173`) |
| `TRUST_PROXY`  |          | Set to `1` behind a reverse proxy (nginx/Render) so rate limits see the real IP |

> ⚠️ `backend/.env` is gitignored. If you already committed it, rotate the secrets (MongoDB password, JWT secret, admin password) and remove it from git history.

---

## Development

```bash
# Run backend (port 5000, auto-reloads) and frontend (port 5173) together:
npm run dev

# …or separately:
npm run dev:backend
npm run dev:frontend
```

- Frontend proxies `/api/*` → `http://localhost:5000` (see `frontend/vite.config.js`).
- Admin dashboard: open `http://localhost:5173/admin`.

---

## Production Build & Run

```bash
# 1. Build the frontend (outputs to frontend/dist)
npm run build

# 2. Start the production server (serves API + built frontend from one process)
npm start
```

Open `http://localhost:5000` — the site, the admin dashboard, and all API routes are served by the same process.

**What production mode does** (`NODE_ENV=production`):
- Serves the built frontend statically with SPA fallback (so `/admin` deep-links work)
- Hides internal error messages (returns generic 500 body)
- Graceful shutdown on SIGINT/SIGTERM (used by PaaS deploys)

---

## Production Hardening (what was done)

This repo was hardened from a basic dev setup to a production-ready one. Summary of every change:

### Security

| Item | Before | After |
|------|--------|-------|
| **Secrets in git** | `backend/.env` had real MongoDB credentials, committable | `.env` gitignored; `backend/.env.example` added; real `JWT_SECRET` generated |
| **JWT secret** | Default placeholder (`change-me-in-production`) | Random 64-char hex; server warns at startup if unset/default |
| **Auth on bookings** | `authRequired` blocked even public POST → 401 bug | Public `POST /api/bookings` open; `GET`/`PATCH`/`DELETE` protected |
| **JWT role check** | Any valid token passed | Token must carry `role: "admin"` (403 otherwise) |
| **Status injection** | `new Booking(req.body)` let clients set `status` | POST whitelists fields; status always starts as `new` |
| **Input validation** | None | Phone must be 10 digits, city in enum, name 2–80 chars, notes ≤1000 chars |
| **Security headers** | None | `helmet()` |
| **CORS** | `cors()` open to all origins | Restricted to `CORS_ORIGIN` env var |
| **Request body** | Unlimited | `express.json({ limit: "16kb" })` |
| **Brute-force login** | Unlimited attempts | Rate limit: 10 tries / 15 min |
| **Form spam** | Unlimited | Rate limit: 20 POSTs / hr / IP |
| **Error leakage** | Raw `err.message` to clients in prod | Generic 500 in production |

### Reliability & Ops

| Item | Change |
|------|--------|
| **dotenv path** | Loads `backend/.env` relative to the file, so `npm start` works from the repo root |
| **404 handler** | Unknown `/api/*` returns JSON 404 |
| **Error handler** | Centralized error middleware |
| **Static serving** | In production, Express serves `frontend/dist` with SPA fallback (Express 5-compatible) |
| **Graceful shutdown** | Closes HTTP server + MongoDB connection on SIGINT/SIGTERM |
| **Code splitting** | Vite `manualChunks` splits react / framer-motion — big-bundle warning gone |
| **Lint cleanliness** | Fixed unused import, moved `navItems` to `src/data/navItems.js` — oxlint clean |

### Verified

Every behavior below was tested against a live server:
- Public booking POST → `201`; invalid phone → `400`; status injection → stays `new`
- No-token `GET` → `401`; bad login → `401`; good login → `200` + token
- `GET`/`PATCH`/`DELETE` with token → `200`
- Login limiter → `429` after 10 tries; bookings limiter → `429` after 20 POSTs
- Production `npm start` serves `/` and `/admin` (SPA fallback) → `200`
- `npm audit` → **0 vulnerabilities**; frontend lint + build clean

---

## API Reference

Base URL: `http://localhost:5000` (or your deployed domain)

| Method | Endpoint                | Auth   | Description |
|--------|-------------------------|--------|-------------|
| GET    | `/api/health`           | No     | Health check |
| POST   | `/api/auth/login`       | No*    | Login → `{ token }` (*rate-limited) |
| POST   | `/api/bookings`         | No*    | Create inquiry (*rate-limited) |
| GET    | `/api/bookings`         | Bearer | List all inquiries (newest first) |
| PATCH  | `/api/bookings/:id`     | Bearer | Set status: `new` / `contacted` / `closed` |
| DELETE | `/api/bookings/:id`     | Bearer | Delete an inquiry |

**Booking payload (POST):**
```json
{
  "fullName": "Rahul Sharma",
  "phone": "9876543210",
  "city": "Bengaluru",
  "roomType": "Single Private Room",
  "moveInDate": "2026-09-01",
  "notes": "Looking for WFH setup"
}
```

---

## Deployment Guide

### Option A — Single server (simplest)

One process serves everything. Works on Render, Railway, Fly.io, a VPS, etc.

1. `npm run build`
2. Start with `npm start` (`cross-env NODE_ENV=production node backend/index.js`)
3. Set env vars on the platform: `MONGO_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `PORT`, `TRUST_PROXY=1`, and `CORS_ORIGIN` = your domain
4. Set `TRUST_PROXY=1` so rate limiting works behind the platform's proxy

### Option B — Split (frontend on Vercel/Netlify, API on Render)

1. Deploy `frontend/` to Vercel/Netlify with build command `npm run build` and output `dist`
2. Deploy `backend/` separately; expose it at e.g. `https://api.gharrpay.com`
3. Set `CORS_ORIGIN=https://your-frontend-domain` on the backend
4. Update the frontend API base to the backend URL (or keep same-origin via a rewrite)

### Option C — AWS EC2 (Ubuntu, PM2 + nginx)

Single Ubuntu instance serving everything (site + API) on one process. Artifacts live in `deploy/`.

1. **Push this repo to GitHub** (any public or private repo).
2. **Launch an EC2 instance** — Ubuntu 22.04/24.04, `t3.micro` or larger, with a key pair.
   - Security group inbound rules: **SSH (22)**, **HTTP (80)**, and **HTTPS (443)** if you add a domain.
3. **SSH in and run the setup script** (installs Node 22, PM2, nginx; clones, builds, prompts for `.env` secrets, starts under PM2, configures nginx):
   ```bash
   sudo bash deploy/setup-ec2.sh https://github.com/<you>/<repo>.git
   ```
4. Open `http://<public-ip>` — the site, admin dashboard, and `/api/health` are live.
5. **(Optional) Add HTTPS later**: point a domain at the Elastic IP, install certbot (`sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d yourdomain.com`).

**Updating the app after a code push:**
```bash
cd /opt/gharrpay && sudo git pull && sudo npm ci --prefix backend && sudo npm ci --prefix frontend && sudo npm run build --prefix frontend && sudo pm2 restart gharrpay && sudo pm2 save
```

Notes:
- MongoDB Atlas is used, so nothing MongoDB-related runs on the instance (set `MONGO_URI` in `.env` on the server).
- `TRUST_PROXY=1` is set so rate limiting sees real client IPs behind nginx.
- PM2 keeps the app running and restarts it on reboot (`pm2 startup` runs automatically).

### Checklist before going live

- [ ] Strong `ADMIN_PASSWORD` and unique `JWT_SECRET` (never the defaults)
- [ ] `MONGO_URI` points at the production cluster; restrict network access to the server IP
- [ ] `CORS_ORIGIN` set to your real domain
- [ ] `TRUST_PROXY=1` behind any reverse proxy
- [ ] HTTPS enabled (helmet's HSTS header is included)
- [ ] Verify: booking form submits, admin login works, `/admin` deep-link loads

---

## Troubleshooting

**`401 Unauthorized: missing token` on login → that's a stale server.** Kill old `node index.js` processes and restart — earlier versions required a token on all booking routes.

**MongoDB connection error** — check `MONGO_URI` in `backend/.env` and that your network/IP is allowed in Atlas.

**Login returns 429 "Too many attempts"** — the rate limit is per IP for 15 minutes; wait or restart the server (limits are in-memory).

**Frontend can't reach API in dev** — the Vite proxy targets `http://localhost:5000`; make sure the backend is running.

**Admin page crash `Cannot read properties of undefined (reading 'label')`** — that bug (missing `all` entry in `STATUS_META`) is already fixed in `frontend/src/pages/AdminPage.jsx`.

---

## License

Private project. All rights reserved.
