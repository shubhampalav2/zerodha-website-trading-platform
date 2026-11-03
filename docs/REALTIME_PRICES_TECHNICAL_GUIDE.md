# Real Time Simulated Prices: Technical Guide

This guide documents the current implementation in this repository. Prices are **simulated** from the MongoDB Stock collection. They are not live exchange prices, investment data, or NSE/BSE market feeds.

## 1. Components and responsibilities

| Component | File | Responsibility |
| --- | --- | --- |
| Express and HTTP startup | `backend/index.js` | Loads environment, mounts REST routes, connects MongoDB, initializes the simulator and Socket.IO, then listens on the configured port. |
| MongoDB connection | `backend/config/dbConnect.js` | Opens the existing Mongoose connection using `MONGO_URL`. |
| Price engine | `backend/services/priceSimulator.js` | Loads the entire Stock collection and owns the in-memory map and single simulation interval. |
| Socket.IO server | `backend/sockets/socket.js` | Sends the initial snapshot and broadcasts full snapshots on each tick. |
| React socket owner | `dashboard/src/context/PriceContext.jsx` | Creates one connection, retains the latest snapshot, exposes connection state, and cleans up listeners. |
| REST URL configuration | `dashboard/src/Services/API_URLS.js` | Supplies the dashboard REST base URL and fallback local development URL. |
| Price consumers | `dashboard/src/components/Stocks.jsx`, `WatchList.jsx`, `Holdings.jsx`, `Positions.jsx`, `Summary.jsx` | Render shared prices, use REST data as fallback, and calculate display values. |
| Order validation | `backend/controllers/orders.controllers.js` | Executes Buy/Sell using the server's current price and keeps the existing quantity/holding checks. |

The marketing application in `frontend/` is separate from the trading dashboard in `dashboard/`. Socket.IO is mounted only in the dashboard tree.

## 2. End-to-end startup and price flow

1. `backend/index.js` loads `.env` before importing the price service. This matters because the service reads its interval settings when it is loaded.
2. Express middleware and REST routes are configured as before. Dashboard REST routes remain under `/api/v1/dashboard` and use the existing JWT middleware.
3. Startup calls `dbConnection()`. No second MongoDB connection is opened.
4. After MongoDB connects, `initializePriceSimulator()` runs `Stock.find()` with the actual schema fields: `symbol`, `companyName`, `exchange`, `currentPrice`, and `previousClose`. This query is not limited to the ten stocks returned on an individual Stocks API page.
5. Valid stocks are stored in a process-local `Map` keyed by `symbol`. Invalid or non-positive starting prices are skipped. Existing simulated prices and `previousClose` are preserved during refreshes.
6. The app creates one Node HTTP server around the existing Express app, attaches Socket.IO, then listens on the configured port.
7. Socket.IO sends a complete `prices:initial` snapshot to a newly connected client. The simulator emits complete `prices:update` snapshots to all clients after each tick.
8. React's single `PriceProvider` stores snapshots. Components re-render from that shared state; they do not create their own sockets and do not poll REST endpoints for prices.

The payload is an object keyed by symbol, for example:

```json
{
  "RELIANCE": {
    "symbol": "RELIANCE",
    "companyName": "Reliance Industries",
    "exchange": "NSE",
    "currentPrice": 2945.35,
    "previousClose": 2918.65
  }
}
```

The numeric values above are illustrative only; the running payload starts from the project's database records.

## 3. Price simulation behavior

The current defaults in `backend/services/priceSimulator.js` are:

- `PRICE_UPDATE_INTERVAL`: 500 milliseconds.
- `MAX_PERCENTAGE_MOVEMENT`: 0.002, a fraction. The formula `(Math.random() - 0.5) * 0.002` gives a per-tick range of approximately **?0.1% to +0.1%**.
- Prices are rounded to two decimal places and rejected if the result is zero, negative, or invalid.
- `previousClose` stays fixed. The UI's gain/loss color compares the simulated current price to that previous close; it does not indicate whether the latest individual tick went up or down.
- Simulated prices are not written to MongoDB. The stock list is re-read every 30 seconds to initialize stocks added after startup, without resetting the current simulated prices of existing symbols.
- A module-level guard prevents starting more than one interval, and a shared in-flight refresh guard prevents overlapping stock refresh queries.

Optional backend `.env` overrides:

```dotenv
PRICE_UPDATE_INTERVAL=500
MAX_PERCENTAGE_MOVEMENT=0.002
```

The interval is clamped to at least 100 ms and the movement fraction to at most 0.05 (5% as a fraction; the formula's symmetric maximum is half of that value). Use conservative settings: every connected client receives the full stock snapshot on every tick.

After changing backend environment values, restart the backend process. These settings are read at process startup.

## 4. React socket lifecycle and URL selection

`PriceProvider` is mounted once in `dashboard/src/index.js`, around `Home` and the toast container. Its effect:

1. Resolves the socket origin from `REACT_APP_API_BASE_URL`, if set, or the REST base URL with `/api/v1/dashboard` removed.
2. Calls `io(socketOrigin, { reconnection: true })`.
3. Listens for `connect`, `disconnect`, `prices:initial`, and `prices:update`.
4. Replaces React state only when the snapshot's stock fields differ.
5. Removes the exact event handlers and disconnects on unmount.

The provider retains the last snapshot if the socket disconnects. Consumers use their existing REST response as fallback until a valid socket price exists. The current Socket.IO connection does not send a JWT; prices are shared, non-user-specific data. REST account data remains authenticated.

For a local dashboard, the default URL is `http://localhost:7000/api/v1/dashboard/`. For a deployed dashboard, set CRA's `REACT_APP_API_BASE_URL` to the REST base URL, such as:

```dotenv
REACT_APP_API_BASE_URL=https://api.example.com/api/v1/dashboard/
```

CRA environment variables are embedded at build time. Rebuild the dashboard after changing them. The dashboard and API should use HTTPS together in production; browsers block insecure WebSocket connections from a secure page.

## 5. UI mapping and REST compatibility

- **Stocks:** API pagination is retained. The visible page maps each row by `prices[stock.symbol]`. Price, change and percentage use live values when valid, otherwise that row's API values.
- **Watchlist:** Each saved watchlist stock maps by `prices[stock.companyname]`. Its API `currentPrice` and `previousClose` are strings, so the component converts and validates them before calculations.
- **Holdings:** Maps by `prices[holding.name]`; `name` is the symbol. Current value and P&L update while average cost stays unchanged.
- **Positions:** The current Positions page uses local dummy records from `dashboard/src/data/data.js`; it maps by `stock.name` and falls back to the record's `price`. It is not currently backed by a Positions REST endpoint.
- **Summary:** It retains the portfolio API for account/name and fallback data, loads the user's paginated holdings once, then recalculates total investment/current value/P&L from those holdings and shared prices.
- **Stocks watchlist markers:** On mount, Stocks fetches the user's five watchlists once through the authenticated Watchlist REST endpoint. Each stored `companyname` is normalized to uppercase and mapped to the matching stock symbol. The server result refreshes the browser cache; membership is not inferred from Socket.IO.
- **Orders:** Socket.IO only transports prices. It never creates or completes an order. The REST order endpoint validates the request and uses the backend simulated map price (or the Stock document price fallback) for execution; the submitted client price is not trusted for execution. Existing quantity checks, sell availability/quantity checks, partial sells, holdings updates, and average-price calculations remain on the backend.

The Stocks, Holdings, Watchlist, and other REST response shapes have not been changed to deliver live prices.

## 6. Local development runbook

Open two terminals at the project root.

Backend:

```powershell
cd backend
npm install
npm start
```

Dashboard:

```powershell
cd dashboard
npm install
npm start
```

The backend requires a valid `backend/.env` containing at least `MONGO_URL` and the application's existing JWT secret setting. Do not commit real credentials. The default backend port is 7000; `PORT` or the existing lowercase `port` setting can override it.

After startup, verify the backend log reports the database connection and listening port. Open the dashboard, sign in, and use browser DevTools Network to inspect the Socket.IO connection. The initial handshake commonly appears as `/socket.io/?EIO=4&transport=polling`, followed by a WebSocket upgrade when supported. Confirm that the connection stays open and that the UI's simulated-price status indicates connected.

## 7. Production deployment checklist

1. Configure `MONGO_URL`, JWT secrets, `PORT`, and simulator settings in the deployment environment, not in source control.
2. Build the dashboard with the production `REACT_APP_API_BASE_URL`; verify it points to the public API origin and the correct REST base path.
3. Permit the frontend origin through the API and Socket.IO CORS configuration. The current Socket.IO configuration allows origins broadly for this dummy project; production should replace that with an explicit allowlist. CORS is not authentication.
4. If TLS terminates at a reverse proxy, proxy Socket.IO's `/socket.io/` path with HTTP/1.1 upgrade headers and a suitable idle timeout. Example Nginx location:

```nginx
location /socket.io/ {
    proxy_pass http://backend_upstream/socket.io/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 75s;
    proxy_send_timeout 75s;
}
```

Also proxy the REST API paths to the same backend. Match the proxy path/trailing slash behavior to your deployment.
5. Keep one backend instance for this in-memory simulator unless you deliberately add shared coordination. Multiple instances currently maintain independent Maps and intervals; clients connected to different instances can see different prices. Sticky sessions alone do not make their price maps equal. A multi-instance deployment needs a shared price source/broadcast (for example, a coordinated worker plus a Socket.IO Redis adapter) and an explicit design for simulator ownership.
6. The server broadcasts full snapshots every 500 ms. Monitor bandwidth and event-loop/database load before scaling stock count or client count. If needed, use symbol subscriptions or changed-symbol deltas and update the client merge logic together.
7. Restart/redeploy the backend after updating it. An old process still bound to port 7000 serves the old code.

## 8. Production debugging guide

### Dashboard says reconnecting or shows only REST prices

1. In browser DevTools Network, filter for `socket.io`. Check whether the polling handshake returns HTTP 200 and whether it upgrades to WebSocket.
2. In the console, check for `connect_error`; inspect the browser's actual socket origin and compare it with the built `REACT_APP_API_BASE_URL`.
3. Check HTTPS mixed-content errors, DNS, firewall rules, reverse-proxy `/socket.io/` routing, CORS allowlist, and proxy idle timeout.
4. Confirm the backend process log reports a listening port and a client connection. REST success alone does not prove the Socket.IO path is routed.
5. Check that `PriceProvider` remains mounted around the dashboard and that consumers import `useLivePrices` from the shared context rather than creating another socket.

### Socket connects, but initial prices are empty

1. Check backend startup for MongoDB connection and inspect the stock collection for documents with a non-empty `symbol` and valid positive `currentPrice`.
2. The simulator loads all Stock documents, not the paginated Stocks API response. A stock missing a symbol or valid starting price is intentionally skipped.
3. Confirm startup order: DB connection, simulator initialization, socket attach, then HTTP listen.
4. A newly inserted stock is discovered by the periodic refresh (up to approximately 30 seconds later).

### Prices appear frozen

1. Inspect Socket.IO frames/events for repeated `prices:update` payloads and verify the values in them actually change. If payloads change, investigate React context/provider mounting and symbol mapping.
2. Check the environment overrides. `PRICE_UPDATE_INTERVAL` is clamped to at least 100 ms. The movement setting is a fraction; use a small positive value such as `0.002` for visible but limited changes. An unset or zero value currently uses the default.
3. Two-decimal rounding may hide very small movements for low-priced stocks.
4. Verify UI symbol keys: Stocks uses `symbol`, Watchlist uses `companyname`, and Holdings/Positions use `name`.
5. Red/green is measured against fixed `previousClose`; random movement does not guarantee a downward trend. A red value means current price is below previous close.

### API works but Watchlist markers are missing

1. In DevTools Network, inspect the five authenticated `GET /api/v1/dashboard/watchlist?name=...` requests made by Stocks.
2. Verify the Authorization header/token is present and the response has `data.stocks` (or an empty array for an unused watchlist).
3. Confirm each saved stock has the expected `companyname`, and that it matches the Stocks API `symbol` after case normalization.
4. If the request fails, the component logs a warning and retains its cached selection state; fix authentication/API access and reload to restore the server-authoritative membership.

### Backend fails with EADDRINUSE

Another process already owns the configured port. Identify it before stopping anything. On Windows PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 7000 -State Listen |
    Select-Object LocalAddress, LocalPort, OwningProcess
Get-Process -Id <OwningProcess>
```

Stop or reconfigure the intended stale/duplicate process, then restart the updated backend. Do not start multiple copies of the in-memory simulator expecting them to share state.

### MongoDB or order execution fails

- For Mongo errors, verify the deployment secret is present without printing it, the database host is reachable from the backend network, and the MongoDB user/database permissions are correct.
- For order errors, inspect the HTTP response status/message and backend logs. The order REST route still requires JWT authentication, a valid symbol and positive integer quantity; SELL also requires sufficient holdings.
- The displayed client price is advisory. Execution uses the server's current simulated price. If the symbol is absent from the simulator, the backend falls back to the Stock collection price; an absent/invalid price rejects the order.

## 9. Verification notes and current limits

The dashboard has compiled successfully with `DISABLE_ESLINT_PLUGIN=true npm run build`. The normal build currently stops in the existing ESLint configuration because it reports `jest/globals` as an unknown environment. Backend syntax checks passed. The backend test script is a placeholder (`no test specified`); no automated backend test suite is configured.

A backend startup check connected to MongoDB, then found port 7000 already in use in the development environment. That indicates a process must be identified/restarted before the new Socket.IO server can be confirmed on that port. This is particularly relevant when testing a code change against a backend process that was started earlier.

## 10. Expected behavior summary

- REST calls load application data and provide fallback prices.
- Socket.IO carries only shared simulated prices.
- One backend interval and one dashboard socket connection own the live-price flow.
- No simulated per-tick MongoDB writes or REST polling are performed.
- Order execution remains on the authenticated REST API and is priced by the backend.
- Prices and P&L are educational dummy data, not market data.
