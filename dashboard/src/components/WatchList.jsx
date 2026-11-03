
import { useMemo, useState, useEffect, useContext } from "react";
import Loader from "../common/Loader/Loader";
import "./WatchList.css";
import { fetchWatchlistData } from "../Services/WatchlistService";
import { removeStockFromWatchlist } from "../Services/StocksService";
import GeneralContext from "./GeneralContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLivePrices } from "../context/PriceContext";

const initialWatchlist = {
    id: 1,
    name: "Watchlist 1",
    stocks: [],
};

const watchlistNames = [
    { id: 1, name: 'Watchlist 1' },
    { id: 2, name: 'Watchlist 2' },
    { id: 3, name: 'Watchlist 3' },
    { id: 4, name: 'Watchlist 4' },
    { id: 5, name: 'Watchlist 5' }
];
const WATCHLIST_STORAGE_KEY = "stockWatchlistSelections";

const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

const WatchList = () => {
    const general = useContext(GeneralContext);
    const { prices } = useLivePrices();
    const [watchlist, setWatchlist] = useState(initialWatchlist);
    const [activeWatchlist, setActiveWatchlist] = useState("Watchlist 1");
    const [sortBy, setSortBy] = useState("default");
    const [selectedStock, setSelectedStock] = useState(null);


    const sortedStocks = useMemo(() => {
        const stocks = (watchlist?.stocks || []).map((stock) => {
            const live = Number(prices[stock.companyname]?.currentPrice);
            const fallback = Number(stock.currentPrice);
            return { ...stock, displayPrice: Number.isFinite(live) && live > 0 ? live : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0) };
        });

        if (sortBy === "price-high") {
            return stocks.sort((a, b) => b.displayPrice - a.displayPrice);
        }

        if (sortBy === "price-low") {
            return stocks.sort((a, b) => a.displayPrice - b.displayPrice);
        }

        return stocks;
    }, [watchlist, sortBy, prices]);

    const [loader, setLoader] = useState(false);
    const [removingStock, setRemovingStock] = useState(null);

    const removeStock = async (stock) => {
        const key = stock.companyname;
        if (removingStock) return;
        setRemovingStock(key);
        try {
            await removeStockFromWatchlist({
                name: activeWatchlist,
                companyname: stock.companyname,
                exchange: stock.exchange,
            });
            try {
                const selections = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY) || "{}");
                const symbol = String(stock.companyname || "").toUpperCase();
                const nextSelections = { ...selections };
                Object.keys(nextSelections).forEach((selectionKey) => {
                    if (selectionKey.toUpperCase() !== symbol) return;
                    const updatedLists = nextSelections[selectionKey].filter((name) => name !== activeWatchlist);
                    if (updatedLists.length) nextSelections[selectionKey] = updatedLists;
                    else delete nextSelections[selectionKey];
                });
                localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(nextSelections));
                window.dispatchEvent(new Event("watchlist-selections-updated"));
            } catch (error) {
                console.error("Could not update saved watchlist selections:", error);
            }
            window.dispatchEvent(new CustomEvent("watchlist-updated", { detail: { name: activeWatchlist } }));
        } catch (error) {
            console.error("Could not remove stock from watchlist:", error);
        } finally {
            setRemovingStock(null);
        }
    };

    async function fetchWatchList(watchlistName) {
        try {
            setLoader(true);
            const res = await fetchWatchlistData(watchlistName);
            const data = res?.data;
            setWatchlist(data);
        }
        catch (error) {
            console.log("Error ", error);
            setWatchlist({});
        }
        finally {
            setLoader(false);
        }
    }

    //initial render
    useEffect(() => {
        //fetch the watchlist 1 stocks
        fetchWatchList("Watchlist 1");
    }, []);

    useEffect(() => {
        const handleWatchlistUpdate = (event) => {
            if (!event.detail?.name || event.detail.name === activeWatchlist) {
                fetchWatchList(activeWatchlist);
            }
        };
        window.addEventListener("watchlist-updated", handleWatchlistUpdate);
        return () => window.removeEventListener("watchlist-updated", handleWatchlistUpdate);
    }, [activeWatchlist]);

    return (
        <aside className="watchlist-container">
            <div className="watchlist-topbar">
                <button
                    type="button"
                    className="watchlist-favorite"
                    aria-label="Favourite watchlist"
                >
                    ♡
                </button>

                <h3>{activeWatchlist}</h3>

                <select
                    className="watchlist-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort stocks"
                >
                    <option value="default">Sort By</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                </select>
            </div>

            <div className="watchlist-stocks">
                {sortedStocks.length > 0 ? (
                    sortedStocks.map((stock) => {
                        const live = prices[stock.companyname] || {};
                        const apiPrice = Number(stock.currentPrice);
                        const apiClose = Number(stock.previousClose);
                        const livePrice = Number(live.currentPrice);
                        const liveClose = Number(live.previousClose);
                        const currentPrice = Number.isFinite(livePrice) && livePrice > 0 ? livePrice : (Number.isFinite(apiPrice) && apiPrice > 0 ? apiPrice : 0);
                        const previousClose = Number.isFinite(liveClose) && liveClose > 0 ? liveClose : (Number.isFinite(apiClose) && apiClose > 0 ? apiClose : 0);
                        const change = currentPrice - previousClose;
                        const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0;
                        const isPositive = change >= 0;
                        const stockKey = stock.symbol || stock.companyname;
                        const isSelected = selectedStock === stockKey;

                        return (
                            <div
                                key={stockKey}
                                className={`watchlist-stock-row ${isPositive ? "positive" : "negative"
                                    } ${isSelected ? "selected" : ""}`}
                                onClick={() =>
                                    setSelectedStock(stockKey)
                                }
                            >
                                <div className="watchlist-stock-details">
                                    <div className="watchlist-stock-name">
                                        <span>{stock.companyname}</span>

                                        {stock.event && (
                                            <span className="watchlist-event">
                                                ▣ {stock.event}
                                            </span>
                                        )}
                                    </div>

                                    <span className="watchlist-exchange">
                                        {stock.exchange}
                                    </span>
                                </div>

                                <div className="watchlist-stock-quote">
                                    <strong>{formatPrice(currentPrice)}</strong>
                                    <span className={isPositive ? "watchlist-positive" : "watchlist-negative-text"}>
                                        {change >= 0 ? "" : "-"}{formatPrice(Math.abs(change))} ({changePercent.toFixed(2)}%)
                                    </span>
                                </div>
                                <div className={`watchlist-stock-actions ${general.orderWindowOpen ? "order-open" : ""}`} onClick={(event) => event.stopPropagation()}>
                                    <button type="button" className="watchlist-action buy" title="Buy" aria-label={`Buy ${stock.companyname}`} onClick={() => general.openOrderWindow({ ...stock, name: stock.companyname, symbol: stock.companyname, price: currentPrice, currentPrice }, "BUY")}>B</button>
                                    <button type="button" className="watchlist-action sell" title="Sell" aria-label={`Sell ${stock.companyname}`} onClick={() => general.openOrderWindow({ ...stock, name: stock.companyname, symbol: stock.companyname, price: currentPrice, currentPrice }, "SELL")}>S</button>
                                    <button type="button" className="watchlist-action delete" title="Remove from watchlist" aria-label={`Remove ${stock.companyname} from watchlist`} disabled={removingStock === stockKey} onClick={() => removeStock(stock)}><DeleteOutlineIcon fontSize="small" /></button>
                                </div>
                            </div>
                        );
                    })
                ) : loader ?
                    <Loader />
                    : (
                        <div className="watchlist-empty">
                            No stocks in this watchlist.
                        </div>
                    )}
            </div>

            <div className="watchlist-pagination">
                {watchlistNames.map((watchlist) => (
                    <button
                        key={watchlist.id}
                        type="button"
                        className={
                            activeWatchlist === watchlist.name ? "active" : ""
                        }
                        onClick={() => {
                            setActiveWatchlist(watchlist.name);
                            fetchWatchList(watchlist.name);
                            setSortBy("default");
                            setSelectedStock(null);
                        }}
                    >
                        {watchlist.id}
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default WatchList;
