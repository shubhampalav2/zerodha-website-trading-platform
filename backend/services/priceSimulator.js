const Stock = require("../models/StockModel");

const PRICE_UPDATE_INTERVAL = Math.max(100, Number(process.env.PRICE_UPDATE_INTERVAL) || 500);
const MAX_PERCENTAGE_MOVEMENT = Math.min(0.05, Math.max(0, Number(process.env.MAX_PERCENTAGE_MOVEMENT) || 0.002));
const STOCK_REFRESH_INTERVAL = 30_000;

const prices = new Map();
let simulatorInterval = null;
let lastStockRefresh = 0;
let stockSyncPromise = null;

const validPrice = (value) => Number.isFinite(Number(value)) && Number(value) > 0;

async function syncStocks() {
    if (stockSyncPromise) return stockSyncPromise;
    stockSyncPromise = (async () => {
        const stocks = await Stock.find({}, "symbol companyName exchange currentPrice previousClose").lean();
        for (const stock of stocks) {
            if (!stock.symbol || !validPrice(stock.currentPrice)) continue;
            const existing = prices.get(stock.symbol);
            prices.set(stock.symbol, {
                symbol: stock.symbol,
                companyName: stock.companyName,
                exchange: stock.exchange,
                currentPrice: existing?.currentPrice ?? Number(stock.currentPrice),
                previousClose: existing?.previousClose ?? (validPrice(stock.previousClose) ? Number(stock.previousClose) : Number(stock.currentPrice)),
            });
        }
        lastStockRefresh = Date.now();
    })().finally(() => { stockSyncPromise = null; });
    return stockSyncPromise;
}

function getPriceSnapshot() {
    return Object.fromEntries(prices);
}

function getPriceForSymbol(symbol) {
    return prices.get(String(symbol || "").trim())?.currentPrice;
}

function startPriceSimulator(onUpdate) {
    if (simulatorInterval) return simulatorInterval;
    if (!prices.size) throw new Error("Price simulator must be initialized before it is started");
    simulatorInterval = setInterval(() => {
        for (const [symbol, stock] of prices) {
            const movement = (Math.random() - 0.5) * MAX_PERCENTAGE_MOVEMENT;
            const nextPrice = Number((stock.currentPrice * (1 + movement)).toFixed(2));
            if (validPrice(nextPrice)) prices.set(symbol, { ...stock, currentPrice: nextPrice });
        }
        if (Date.now() - lastStockRefresh >= STOCK_REFRESH_INTERVAL) {
            syncStocks().catch((error) => console.error("Unable to refresh simulator stock list:", error.message));
        }
        onUpdate?.(getPriceSnapshot());
    }, PRICE_UPDATE_INTERVAL);
    return simulatorInterval;
}

async function initializePriceSimulator() {
    await syncStocks();
    if (!prices.size) console.warn("Price simulator initialized without valid stocks");
    return getPriceSnapshot();
}

module.exports = {
    initializePriceSimulator,
    startPriceSimulator,
    getPriceSnapshot,
    getPriceForSymbol,
    PRICE_UPDATE_INTERVAL,
    MAX_PERCENTAGE_MOVEMENT,
};
