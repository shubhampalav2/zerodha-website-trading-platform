import React, { useEffect, useMemo, useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { addStockToWatchlist, fetchStocks, removeStockFromWatchlist } from "../Services/StocksService";
import "./Stocks.css";

const PAGE_SIZE = 10;
const WATCHLISTS = ["Watchlist 1", "Watchlist 2", "Watchlist 3", "Watchlist 4", "Watchlist 5"];
const STORAGE_KEY = "stockWatchlistSelections";

const readSelections = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
};

const formatPrice = (value) => Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Stocks = () => {
    const general = useContext(GeneralContext);
    const [stocks, setStocks] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState(readSelections);
    const [drawerStock, setDrawerStock] = useState(null);
    const [updatingList, setUpdatingList] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const refreshSelections = () => setSelections(readSelections());
        window.addEventListener("watchlist-selections-updated", refreshSelections);
        return () => window.removeEventListener("watchlist-selections-updated", refreshSelections);
    }, []);

    const totalPages = Math.ceil(count / PAGE_SIZE);

    useEffect(() => {
        let active = true;
        setLoading(true);
        fetchStocks(page, PAGE_SIZE).then((response) => {
            if (!active) return;
            setStocks(response?.stocks || []);
            setCount(response?.count || 0);
        }).catch((requestError) => {
            if (!active) return;
            setStocks([]);
            setCount(0);
            setError(requestError?.response?.data?.message || "Unable to load stocks.");
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [page]);

    const drawerSelections = useMemo(
        () => (drawerStock ? selections[drawerStock.symbol] || [] : []),
        [drawerStock, selections]
    );

    const toggleWatchlist = async (watchlistName) => {
        if (!drawerStock || updatingList) return;
        const stock = drawerStock;
        const isAdded = (selections[stock.symbol] || []).includes(watchlistName);
        const payload = {
            name: watchlistName,
            companyname: stock.symbol,
            exchange: stock.exchange,
            ...(isAdded ? {} : {
                currentPrice: stock.currentPrice,
                previousClose: stock.previousClose
            }),
        };
        setUpdatingList(watchlistName);
        setError("");
        try {
            if (isAdded) await removeStockFromWatchlist(payload);
            else await addStockToWatchlist(payload);

            const next = { ...selections };
            const updated = isAdded
                ? (next[stock.symbol] || []).filter((name) => name !== watchlistName)
                : [...(next[stock.symbol] || []), watchlistName];
            if (updated.length) next[stock.symbol] = updated;
            else delete next[stock.symbol];
            setSelections(next);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            window.dispatchEvent(new Event("watchlist-selections-updated"));
            window.dispatchEvent(new CustomEvent("watchlist-updated", { detail: { name: watchlistName } }));
        } catch (requestError) {
            setError(requestError?.response?.data?.message || "Could not update this watchlist.");
        } finally {
            setUpdatingList("");
        }
    };

    return (
        <div className="stocks-container">
            <header className="stocks-header">
                <div>
                    <h1>Stocks</h1>
                    <p>Current market data</p>
                </div>
                <span className="stocks-count">{count} Stocks</span>
            </header>

            <section className="stocks-card">
                <div className="stocks-card-heading">
                    <h2>All Stocks</h2>
                    <span>Page {page} of {totalPages || 1}</span>
                </div>
                <div className="stocks-table-scroll">
                    <table className="stocks-table">
                        <thead><tr><th>Instrument</th><th>Exchange</th><th>Price</th><th>Change</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" className="stocks-empty">Loading stocks…</td></tr> : stocks.length ? stocks.map((stock) => {
                                const change = Number(stock.currentPrice) - Number(stock.previousClose);
                                const changePercent = stock.previousClose ? change / Number(stock.previousClose) * 100 : 0;
                                const isWatched = (selections[stock.symbol] || []).length > 0;
                                return <tr key={stock._id || stock.symbol}>
                                    <td><div className="stocks-instrument"><strong>{stock.companyName}</strong><span>{stock.symbol}</span></div></td>
                                    <td>{stock.exchange}</td>
                                    <td>₹{formatPrice(stock.currentPrice)}</td>
                                    <td className={change >= 0 ? "stocks-positive" : "stocks-negative"}>{change >= 0 ? "+" : "−"}₹{formatPrice(Math.abs(change))}<small>{changePercent >= 0 ? "+" : ""}{changePercent.toFixed(2)}%</small></td>
                                    <td><div className="stocks-actions">
                                        <button type="button" className="stocks-buy" onClick={() => general.openOrderWindow(stock, "BUY")}>Buy</button>
                                        <button type="button" className="stocks-sell" onClick={() => general.openOrderWindow(stock, "SELL")}>Sell</button>
                                        <button type="button" className={`stocks-watch ${isWatched ? "active" : ""}`} aria-label={`Manage ${stock.symbol} watchlists`} title="Manage watchlists" onClick={() => { setDrawerStock(stock); setError(""); }}>♡</button>
                                    </div></td>
                                </tr>;
                            }) : <tr><td colSpan="5" className="stocks-empty">{error || "No stocks found."}</td></tr>}
                        </tbody>
                    </table>
                </div>
                <footer className="stocks-pagination">
                    <span>Showing {count ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, count)} of {count} stocks</span>
                    <div>
                        <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1 || loading}>Previous</button>
                        <strong>{page}</strong>
                        <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page >= totalPages || loading}>Next</button>
                    </div>
                </footer>
            </section>

            {drawerStock && <div className="watchlist-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawerStock(null); }}>
                <aside className="watchlist-drawer" role="dialog" aria-modal="true" aria-labelledby="watchlist-drawer-title">
                    <header><div><h2 id="watchlist-drawer-title">Add to watchlist</h2><p>{drawerStock.companyName} · {drawerStock.symbol}</p></div><button type="button" aria-label="Close" onClick={() => setDrawerStock(null)}>×</button></header>
                    <div className="watchlist-drawer-options">
                        {WATCHLISTS.map((name) => {
                            const isAdded = drawerSelections.includes(name);
                            return <button key={name} type="button" className={isAdded ? "added" : ""} disabled={Boolean(updatingList)} title={isAdded ? "Remove from watchlist" : `Add to ${name}`} onClick={() => toggleWatchlist(name)}>
                                <span>{name}</span><span>{updatingList === name ? "Saving…" : isAdded ? "Added ✓" : "Add +"}</span>
                            </button>;
                        })}
                    </div>
                    {error && <p className="watchlist-drawer-error" role="alert">{error}</p>}
                </aside>
            </div>}
        </div>
    );
};

export default Stocks;
