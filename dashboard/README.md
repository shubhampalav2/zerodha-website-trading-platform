# Authenticated dashboard

This React application contains the authenticated TangelTrader workspace. It runs on `http://localhost:3001` for the existing local login handoff and calls the backend API at `http://localhost:7000` by default.

For full-stack setup, environment configuration, user flows, and GitHub publishing steps, see the [root README](../README.md) and [project operations guide](../docs/PROJECT_OPERATIONS.md).

PowerShell:

```powershell
npm install
$env:PORT = "3001"
npm start
npm run build
```

macOS/Linux:

```bash
npm install
PORT=3001 npm start
npm run build
```
