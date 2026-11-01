
import { useMemo, useState, useEffect } from "react";
import Loader from "../common/Loader/Loader";
import "./WatchList.css";
import { fetchWatchlistData } from "../Services/WatchlistService";

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

const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

const WatchList = () => {
    const [watchlist, setWatchlist] = useState(initialWatchlist);
    const [activeWatchlist, setActiveWatchlist] = useState("Watchlist 1");
    const [sortBy, setSortBy] = useState("default");
    const [selectedStock, setSelectedStock] = useState(null);


    const sortedStocks = useMemo(() => {
        const stocks = [...(watchlist?.stocks || [])];

        if (sortBy === "price-high") {
            return stocks.sort((a, b) => b.currentPrice - a.currentPrice);
        }

        if (sortBy === "price-low") {
            return stocks.sort((a, b) => a.currentPrice - b.currentPrice);
        }

        return stocks;
    }, [watchlist, sortBy]);

    const [loader, setLoader] = useState(false);

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
                        const isPositive = stock.change >= 0;
                        const isSelected = selectedStock === stock.symbol;

                        return (
                            <div
                                key={stock.symbol}
                                className={`watchlist-stock-row ${isPositive ? "positive" : "negative"
                                    } ${isSelected ? "selected" : ""}`}
                                onClick={() =>
                                    setSelectedStock(stock.symbol)
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
                                    <strong>{formatPrice(stock.currentPrice)}</strong>
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
