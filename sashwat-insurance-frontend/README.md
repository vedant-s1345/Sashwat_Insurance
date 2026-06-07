# Sashwat Insurance — React Frontend

React 18 + Vite + React Router v6 frontend for the Sashwat Insurance platform.

## Tech Stack

| Layer    | Tech |
|----------|------|
| Framework | React 18 |
| Bundler   | Vite 5 |
| Routing   | React Router v6 |
| HTTP      | Axios (proxied to Spring Boot) |
| Styling   | CSS Modules + Global design tokens |
| Auth      | JWT via AuthContext (localStorage) |

## Design System

- **Navy** `#0a1628` — primary dark
- **Gold** `#c9a84c` — accent
- **Cream** `#faf9f7` — background
- **Fonts** — Cormorant Garamond (display) + DM Sans (body)

## Backend Connection

The Spring Boot backend runs at `http://localhost:8081` with context-path `/api`.

Vite proxies all `/api/*` requests to `http://localhost:8081/api/*`.

### Endpoints used

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login → returns JWT |
| GET  | `/api/auth/me` | Current user profile |
| GET  | `/api/products` | All active products |
| GET  | `/api/products/featured` | Featured products (homepage) |
| GET  | `/api/products/type/:type` | Filter by type |
| POST | `/api/calculator/calculate` | Calculate premium |
| GET  | `/api/calculator/quote/:ref` | Retrieve quote by reference |
| POST | `/api/leads` | Submit quote/callback request |

### Auth flow

1. `POST /auth/login` returns `{ success, data: { accessToken, user } }`
2. JWT stored in `localStorage` under key `sashwat_token`
3. Axios interceptor attaches `Authorization: Bearer <token>` to all requests
4. On 401, interceptor fires `sashwat:logout` event → AuthContext clears session

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start backend (must be running on :8081)
# cd ../sashwat-insurance-backend && mvn spring-boot:run

# 3. Start frontend dev server
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
# Output → dist/
```

## Pages

| Route | Component | Auth |
|-------|-----------|------|
| `/` | Home | Public |
| `/products` | Products | Public |
| `/calculator` | Calculator | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard | 🔒 Private |
| `/*` | NotFound | Public |

## Demo Admin Account

The DataSeeder creates this admin on first run:
- Email: `admin@sashwatinsurance.com`
- Password: `Admin@123`

## Key Components

- **QuoteModal** — 3-step lead capture form → `POST /leads`
- **CalculatorSection** — Full premium calculator → `POST /calculator/calculate`
- **ProductsSection** — Fetches `/products/featured` or all products
- **AuthContext** — JWT login/register/logout with auto-persist
