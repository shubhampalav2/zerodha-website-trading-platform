# TangelTrader project operations and handling guide

This guide describes how the current implementation is organized, how to run it locally, and how its main user and data flows behave. It documents the existing project; it does not describe a real brokerage service.

## 1. System map

```text
Public React app (3000) ── login/signup HTTP ──┐
                                             ├── Express API (7000) ── MongoDB
Dashboard React app (3001) ── REST + JWT ─────┘          │
                                                        └── simulated price service
Dashboard React app (3001) ◀──── Socket.IO price events ─┘
```

### Application responsibilities

- `frontend/src/`: public landing pages and signup/login forms. `AuthService.js` sends auth requests to the API. After authentication, the current local flow forwards the JWT to the dashboard on port `3001`.
- `dashboard/src/components/`: authenticated pages and UI: summary, watchlist, stocks, orders, holdings, positions, and funds.
- `dashboard/src/Services/`: Axios request functions and the configurable dashboard API base URL.
- `dashboard/src/context/PriceContext.jsx`: owns the Socket.IO connection and exposes latest simulated price data to components.
- `dashboard/src/components/GeneralContext.js`: shared order-window and holdings-refresh actions.
- `backend/routes/`: HTTP route declarations.
- `backend/controllers/`: auth, stock, order, portfolio, holdings, and watchlist request handlers.
- `backend/models/` and `backend/schemas/`: MongoDB/Mongoose data definitions.
- `backend/middlewares/auth.js`: JWT verification for dashboard API routes.
- `backend/services/priceSimulator.js` and `backend/sockets/socket.js`: simulated market movement and Socket.IO broadcasts.

Keep business rules in the API/controllers/services. UI components should call the existing service layer and preserve the current request/response contract.

## 2. Environment configuration

Copy examples to local files and replace example values:

```text
backend/.env.example     → backend/.env
dashboard/.env.example  → dashboard/.env (optional for default localhost)
```

| Variable | Used by | Purpose |
| --- | --- | --- |
| `MONGO_URL` | Backend | MongoDB connection string; required |
| `JWT_SECRET` | Backend | Private signing/verification key; required |
| `PORT` | Backend | API port; defaults to `7000` |
| `PRICE_UPDATE_INTERVAL` | Backend | Optional simulator update interval in milliseconds |
| `MAX_PERCENTAGE_MOVEMENT` | Backend | Optional maximum per-update simulated movement |
| `REACT_APP_API_BASE_URL` | Dashboard | REST API and Socket.IO base; defaults to localhost API |

The public app auth URLs and dashboard handoff currently use local development URLs in source code (`localhost:7000` and `localhost:3001`). Before deploying the apps to other hosts, make those endpoints environment-configurable and configure CORS, HTTPS, and token handling for the deployment environment.

Never commit `.env`, credential files, database URLs, signing keys, or tokens. `.env.example` files must contain placeholders only.

## 3. Start the full local stack

Use three terminals. Start MongoDB before the API.

### Terminal A: backend

```bash
cd backend
npm install
npm run dev
```

The API should report a successful MongoDB connection and listen on port `7000`. For a one-time start without nodemon, use `npm start`.

### Terminal B: public frontend

```bash
cd frontend
npm install
npm start
```

The public site runs at `http://localhost:3000` by default.

### Terminal C: authenticated dashboard

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

The dashboard runs at `http://localhost:3001`. Keep all three services running during a local session.

## 4. Main user workflows

### Sign up and login

1. Open the public frontend and choose **Get started** or **Login**.
2. Enter valid account details. Form validation is handled in the React forms.
3. The API returns an auth token. The public app forwards it to the dashboard using the existing local handoff.
4. Dashboard API requests include the token through the existing service/auth flow. The portfolio endpoint supplies the username displayed by the dashboard profile.

### Watchlists and stock actions

- Five watchlists are available. Selecting a numbered tab loads that list from the API.
- Stock rows show exchange and current price. Price data is streamed by the simulator over Socket.IO; values fall back to API-provided data where available.
- Buy and Sell open the shared order dialog. Delete removes the selected instrument from the current list.
- The Stocks page can manage membership across the five watchlists.

### Orders, holdings, and summary

- Orders are fetched from the API with pagination. The filters use the API status values **All**, **Rejected**, and **Completed** (`COMPLETED`).
- Holdings are fetched from the holdings endpoint. Live/simulated prices are used for displayed value and P&L where available, with the existing fallback price otherwise.
- The summary gets portfolio data and holdings from the API and derives its displayed totals from those values.
- Funds is a read-only demonstration view. Its displayed balances are examples; there is no deposit, withdrawal, or payment integration.

## 5. API and real-time handling

Base REST prefix: `http://localhost:7000/api/v1`

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/signup` | No | Register an account |
| `POST` | `/auth/login` | No | Authenticate an account |
| `GET` | `/dashboard/stocks` | Yes | List stock instruments |
| `GET`, `POST`, `DELETE` | `/dashboard/watchlist` | Yes | Read, add, and remove watchlist entries |
| `GET`, `POST` | `/dashboard/orders` | Yes | List and place orders |
| `GET` | `/dashboard/holdings` | Yes | Read holdings |
| `GET` | `/dashboard/portfolio` | Yes | Read portfolio summary |

The dashboard listens for Socket.IO `prices:initial` and `prices:update` events. It also tracks connection status and reconnects through Socket.IO’s client behavior.

## 6. Common troubleshooting

| Symptom | Check |
| --- | --- |
| API exits before listening | Confirm MongoDB is available and `MONGO_URL` is valid in `backend/.env`. |
| Missing/invalid token | Log in through the public app and confirm the dashboard is running on port `3001`. |
| Network errors in dashboard | Confirm the backend is on port `7000`; check `dashboard/.env` if its API base was overridden. |
| Price values do not update | Check the backend simulator logs and browser network connection for the Socket.IO endpoint. |
| Port already in use | Stop the other process or choose a port, keeping the public app/dashboard handoff aligned with the configured dashboard port. |
| Frontend build fails after dependency changes | Install packages from the specific app folder and inspect that app’s build output. The frontend and dashboard use separate dependency trees. |

## 7. Verification commands

Run from each app’s directory:

```bash
npm run build
```

The backend package does not currently define an automated test suite. Do not treat a successful frontend build as proof that MongoDB, authentication, API requests, or Socket.IO work end to end; verify those against a configured local backend before release.
