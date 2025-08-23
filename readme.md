## MT‑commerce (MERN)

E‑commerce application built with Express/Node, MongoDB, React 17, Redux.

### Live demo

- `https:/project-1.maruf.com.bd/`

### Project presentation

- `https://www.canva.com/design/DAE1tDC5QxA/rsyg6yiVtZ5dMvxRoJr88g/view?utm_content=DAE1tDC5QxA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton`

## Prerequisites

- Node.js 18+ (Node 21 supported)
- npm 9+
- MongoDB database (Atlas or self‑hosted)

## Monorepo layout

- `backend/`: Express API and server
- `frontend/`: React app (Vite)

## Quick start (development)

1. Install dependencies

```bash
npm ci
cd frontend && npm install
```

2. Configure environment (backend)

- Create `backend/config/config.env` (see example table below).
- Ensure `PORT` matches the Vite proxy target (default backend `4002`).

3. Start backend API

```bash
# From repo root
npm start
# or with nodemon
npx nodemon backend/server.js
```

4. Start frontend (Vite dev server with API proxy)

```bash
cd frontend
npm run dev
```

- Vite dev server runs on `http://localhost:3000`.
- API requests `/api/*` are proxied to `http://127.0.0.1:4002` (configure in `frontend/vite.config.js`).

## Build and serve (production)

1. Build frontend

```bash
cd frontend
npm run build
```

- Output goes to `frontend/dist`.

2. Run backend in production mode

```bash
NODE_ENV=PRODUCTION node backend/server.js
```

- The backend is configured to serve static files from `frontend/dist` and SPA fallback to `index.html`.

## Environment variables (backend)

Path: `backend/config/config.env`

| Key                   | Example                                                          |
| --------------------- | ---------------------------------------------------------------- |
| DB_URI                | mongodb+srv://user:pass@cluster0.example.mongodb.net/mt-commerce |
| PORT                  | 4002                                                             |
| NODE_ENV              | PRODUCTION                                                       |
| JWT_SECRET            | change_me                                                        |
| JWT_EXPIRES_TIME      | 7d                                                               |
| COOKIE_EXPIRES_TIME   | 7                                                                |
| CLOUDINARY_CLOUD_NAME | your_cloud                                                       |
| CLOUDINARY_API_KEY    | 1234567890                                                       |
| CLOUDINARY_API_SECRET | abcdefghijklmnopqrstuvwxyz                                       |
| SMTP_HOST             | sandbox.smtp.mailtrap.io                                         |
| SMTP_PORT             | 2525                                                             |
| SMTP_EMAIL            | your_mailtrap_user                                               |
| SMTP_PASSWORD         | your_mailtrap_pass                                               |
| SMTP_FROM_EMAIL       | no-reply@mt-commerce.com                                         |
| SMTP_FROM_NAME        | MT‑commerce                                                      |
| STRIPE_API_KEY        | pk_test_xxx                                                      |
| STRIPE_SECRET_KEY     | sk_test_xxx                                                      |

Frontend (Vite) envs: not required for current setup. If you add any, prefix with `VITE_`.

### .env examples

Backend (`backend/config/config.env`):

```env
DB_URI="mongodb+srv://<USER>:<PASS>@cluster0.example.mongodb.net/mt-commerce?retryWrites=true&w=majority"
PORT=4002
NODE_ENV=PRODUCTION

JWT_SECRET=change_me
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=your_mailtrap_user
SMTP_PASSWORD=your_mailtrap_pass
SMTP_FROM_EMAIL=no-reply@mt-commerce.com
SMTP_FROM_NAME=MT-commerce

STRIPE_API_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

Frontend (`frontend/.env`):

```env
# Optional; Vite exposes only variables prefixed with VITE_
VITE_API_BASE=/api
# Optional: change Vite dev proxy target without editing config
VITE_API_PROXY=http://127.0.0.1:4002
# If you ever move Stripe key client-side (not recommended), example:
# VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

Vercel deployment:

- Set `VITE_API_BASE` to your backend origin (e.g., `https://your-backend.example.com`), or `/api` if the API is under the same domain.
- Rebuild after changing envs: Vite reads `VITE_` variables at build time.

## Available scripts

Root (backend):

- `npm start`: start Express server
- `npm run seeder`: run sample data seeder
- `npm run lint`: ESLint (backend, flat config)
- `npm run format` / `npm run format:check`: Prettier

Frontend (`frontend/`):

- `npm run dev`: Vite dev server (proxy to backend on `127.0.0.1:4002`)
- `npm run build`: Vite production build to `dist/`
- `npm run preview`: preview the Vite build locally

## Linting & formatting

- ESLint v9 flat config at repo root (`eslint.config.cjs`) for backend Node code
- Prettier config at repo root (`.prettierrc.json`)

### Pre-commit hooks

- Husky pre-commit is configured to run `lint-staged`.
- Staged files are auto-formatted with Prettier; backend JS runs ESLint `--fix`.

Bypass (if needed):

```bash
git commit --no-verify -m "your message"
```

## Seeding data

```bash
npm run seeder
```

Adjust seeder implementation/data in `backend/utils/seeder.js` and `backend/data/*.json`.

## Troubleshooting

- White screen after deploy: ensure frontend was built (`frontend/dist`) and backend `NODE_ENV=PRODUCTION` serves `dist`.
- API 404 from frontend: verify Vite proxy (`frontend/vite.config.js`) target matches backend `PORT`.
- Node 21 OpenSSL error: no longer applicable with Vite; if you see it on other tooling, set `NODE_OPTIONS=--openssl-legacy-provider` for that command.
- ESLint v9 warning about `.eslintignore`: handled via flat config; remove any stray `.eslintignore` files in repo root.

## Notes on migration

- Frontend migrated from CRA (react‑scripts) to Vite for faster dev/build.
- Many React source files are `.jsx` to enable JSX parsing under Vite.
