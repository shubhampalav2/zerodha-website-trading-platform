# TangelTrader

TangelTrader is a full-stack stock-market learning and demonstration application. It combines a public React site, a separate authenticated trading dashboard, and an Express/MongoDB API with simulated real-time prices.

> **Demo only:** Prices and order handling are simulated. The project is not connected to an exchange or brokerage and must not be used to execute financial transactions or make investment decisions.

## What’s in the repository

| Folder | Purpose | Default local port |
| --- | --- | ---: |
| `frontend/` | Public landing page, login, and signup | `3000` |
| `dashboard/` | Authenticated dashboard, watchlists, orders, holdings, and funds | `3001` |
| `backend/` | Express API, authentication, MongoDB access, and price simulator | `7000` |
| `docs/` | Operations and publishing guides | — |

The frontend and dashboard are separate Create React App projects and each has its own `package.json` and dependencies. Open three terminal windows to run the full local stack.

## Features

- Account signup/login with JWT authentication.
- Dashboard summary and holdings backed by the API.
- Five user watchlists with stock selection and simulated live prices.
- Buy/sell order submission and order history filters.
- Socket.IO price updates from the backend simulator.
- Responsive public pages and dashboard layouts.

## Requirements

- Node.js 20 LTS (or a compatible version supported by the installed Create React App toolchain).
- npm.
- MongoDB connection string. A local MongoDB instance or a MongoDB Atlas database can be used.

## Run locally

### 1. Configure the backend

Create `backend/.env` using `backend/.env.example` as a template. Set a MongoDB connection string and a long, private JWT secret. Never commit `.env` files or paste secrets into an issue or pull request.

Install and start the API:

```bash
cd backend
npm install
npm run dev
```

The API defaults to `http://localhost:7000`. Startup waits for MongoDB and initializes the price simulator.

### 2. Start the public site

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`. The login and signup API currently targets `http://localhost:7000`.

### 3. Start the dashboard

In a third terminal, set the dashboard port to `3001` so the existing authentication handoff can open it:

PowerShell:

```powershell
cd dashboard
npm install
$env:PORT = "3001"
npm start
```

macOS/Linux:

```bash
cd dashboard
npm install
PORT=3001 npm start
```

Open `http://localhost:3001` directly for development, or use the login/signup flow from the public site. The dashboard API base can be changed with `dashboard/.env` using `dashboard/.env.example` as a template.

## Using the application

1. Create an account or log in from the public site.
2. The dashboard opens with a JWT from the existing auth flow.
3. Use **Dashboard** for portfolio summary, **Stocks** to browse instruments, and the five watchlist selectors to organize symbols.
4. Use a stock’s **Buy** or **Sell** action to open the order form. The API records simulated orders.
5. Review order statuses under **Orders** or current positions under **Holdings**.
6. Use the profile menu to log out.

Market movements displayed in the dashboard are simulated by the backend. Landing-page index values are sample values for illustration.

## API overview

All dashboard routes are protected by the auth middleware. The API base is `/api/v1`.

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/auth/signup` | Create an account |
| `POST` | `/auth/login` | Authenticate and return a token |
| `GET` | `/dashboard/stocks` | List available stocks |
| `GET`, `POST`, `DELETE` | `/dashboard/watchlist` | Read, add to, or remove from a watchlist |
| `GET`, `POST` | `/dashboard/orders` | List orders or submit an order |
| `GET` | `/dashboard/holdings` | Read holdings |
| `GET` | `/dashboard/portfolio` | Read portfolio summary |

Dashboard REST and Socket.IO URLs default to localhost. See [Project operations](docs/PROJECT_OPERATIONS.md) for configuration details and troubleshooting.

## Production builds

Run each command from its app directory:

```bash
cd frontend
npm run build

cd ../dashboard
npm run build
```

Backend tests are not configured (`npm test` currently exits with “no test specified”). The React apps include the Create React App test runner; add/maintain tests before relying on automated regression coverage.

## Publish to GitHub

Follow [the GitHub publishing checklist](docs/GITHUB_PUBLISHING.md). **Do not publish this repository publicly until the tracked environment files and their Git history have been cleaned and any included credentials rotated.**

## Project documents

- [Project operations and handling guide](docs/PROJECT_OPERATIONS.md)
- [GitHub publishing guide](docs/GITHUB_PUBLISHING.md)
