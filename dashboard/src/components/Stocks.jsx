import React, { useEffect, useMemo, useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { addStockToWatchlist, fetchStocks, removeStockFromWatchlist } from "../Services/StocksService";
import { fetchWatchlistData } from "../Services/WatchlistService";
import "./Stocks.css";
import { useLivePrices } from "../context/PriceContext";
import { toast } from "react-toastify";

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
    const { prices } = useLivePrices();
    const [stocks, setStocks] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState(readSelections);
    const [selectionsLoaded, setSelectionsLoaded] = useState(false);
    const [drawerStock, setDrawerStock] = useState(null);
    const [updatingList, setUpdatingList] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const refreshSelections = () => setSelections(readSelections());
        window.addEventListener("watchlist-selections-updated", refreshSelections);
        return () => window.removeEventListener("watchlist-selections-updated", refreshSelections);
    }, []);

    useEffect(() => {
        let active = true;
        Promise.all(WATCHLISTS.map((name) => fetchWatchlistData(name)))
            .then((responses) => {
                if (!active) return;
                const savedSelections = {};
                responses.forEach((response, index) => {
                    const watchlist = response?.data;
                    const watchlistStocks = Array.isArray(watchlist) ? [] : (watchlist?.stocks || []);
                    watchlistStocks.forEach((stock) => {
                        const symbol = String(stock.companyname || "").toUpperCase();
                        if (!symbol) return;
                        savedSelections[symbol] = [...(savedSelections[symbol] || []), WATCHLISTS[index]];
                    });
                });
                setSelections(savedSelections);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSelections));
            })
            .catch((requestError) => {
                console.warn("Could not load saved watchlists from the server:", requestError);
            })
            .finally(() => {
                if (active) setSelectionsLoaded(true);
            });
        return () => { active = false; };
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
        if (!drawerStock || updatingList || !selectionsLoaded) return;
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
            const response = isAdded
                ? await removeStockFromWatchlist(payload)
                : await addStockToWatchlist(payload);
            toast.success(response?.message || (isAdded ? "Stock removed from watchlist." : "Stock added to watchlist."));

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
            const message = requestError?.response?.data?.message || "Could not update this watchlist.";
            setError(message);
            toast.error(message);
        } finally {
            setUpdatingList("");
        }
    };

    return (
        <div className="stocks-container">
            <header className="stocks-header">
                <div>
                    <h1>Stocks</h1>
                    <p>Simulated prices update live</p>
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
                                const live = prices[stock.symbol] || {};
                                const apiPrice = Number(stock.currentPrice);
                                const apiClose = Number(stock.previousClose);
                                const streamedPrice = Number(live.currentPrice);
                                const streamedClose = Number(live.previousClose);
                                const currentPrice = Number.isFinite(streamedPrice) && streamedPrice > 0 ? streamedPrice : (Number.isFinite(apiPrice) && apiPrice > 0 ? apiPrice : 0);
                                const previousClose = Number.isFinite(streamedClose) && streamedClose > 0 ? streamedClose : (Number.isFinite(apiClose) && apiClose > 0 ? apiClose : 0);
                                const change = currentPrice - previousClose;
                                const changePercent = previousClose > 0 ? change / previousClose * 100 : 0;
                                const isWatched = (selections[stock.symbol] || []).length > 0;
                                return <tr key={stock._id || stock.symbol}>
                                    <td><div className="stocks-instrument"><strong>{stock.companyName}</strong><span>{stock.symbol}</span></div></td>
                                    <td>{stock.exchange}</td>
                                    <td>₹{formatPrice(currentPrice)}</td>
                                    <td className={change >= 0 ? "stocks-positive" : "stocks-negative"}>{change >= 0 ? "+" : "−"}₹{formatPrice(Math.abs(change))}<small>{changePercent >= 0 ? "+" : ""}{changePercent.toFixed(2)}%</small></td>
                                    <td><div className="stocks-actions">
                                        <button type="button" className="stocks-buy" onClick={() => general.openOrderWindow({ ...stock, name: stock.symbol, price: currentPrice, currentPrice }, "BUY")}>Buy</button>
                                        <button type="button" className="stocks-sell" onClick={() => general.openOrderWindow({ ...stock, name: stock.symbol, price: currentPrice, currentPrice }, "SELL")}>Sell</button>
                                        <button type="button" className={`stocks-watch ${isWatched ? "active" : ""}`} aria-label={`Manage ${stock.symbol} watchlists`} title="Manage watchlists" onClick={() => { setDrawerStock({ ...stock, currentPrice, previousClose }); setError(""); }}>♡</button>
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
                            return <button key={name} type="button" className={isAdded ? "added" : ""} disabled={Boolean(updatingList) || !selectionsLoaded} title={isAdded ? "Remove from watchlist" : `Add to ${name}`} onClick={() => toggleWatchlist(name)}>
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
