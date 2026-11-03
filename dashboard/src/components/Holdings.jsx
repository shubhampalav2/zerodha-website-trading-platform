
import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Holdings.css";
import GeneralContext from "./GeneralContext";

import { fetchHoldings } from "../Services/HoldingsService";
import { useLivePrices } from "../context/PriceContext";

const PAGE_SIZE = 10;

const Holdings = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [holdingsCount, setHoldingsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const general = useContext(GeneralContext);
    const { prices } = useLivePrices();
    const { holdingsRefreshVersion } = general;

    const totalPages = Math.ceil(holdingsCount / PAGE_SIZE);

    const fetchHoldingsData = useCallback(async (pageNo) => {
        try {
            setLoader(true);

            const res = await fetchHoldings(pageNo);

            setAllHoldings(res?.data || []);
            setHoldingsCount(res?.count || 0);
        } catch (error) {
            console.error("Error fetching holdings:", error);

            setAllHoldings([]);
            setHoldingsCount(0);
        } finally {
            setLoader(false);
        }
    }, []);

    useEffect(() => {
        fetchHoldingsData(page);
    }, [page, fetchHoldingsData, holdingsRefreshVersion]);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const totalInvestment = allHoldings.reduce(
        (total, stock) => total + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
        0
    );

    const currentValue = allHoldings.reduce((total, stock) => {
        const live = Number(prices[stock.name]?.currentPrice);
        const fallback = Number(stock.price);
        const price = Number.isFinite(live) && live > 0 ? live : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0);
        return total + price * (Number(stock.qty) || 0);
    }, 0);

    const totalPnL = currentValue - totalInvestment;

    const pnlPercentage =
        totalInvestment > 0
            ? (totalPnL / totalInvestment) * 100
            : 0;

    return (
        <div className="holdings-container">

            {/* Header */}
            <div className="holdings-header">
                <div>
                    <h2 className="holdings-title">
                        Holdings
                    </h2>

                    <p className="holdings-subtitle">
                        Your investments and portfolio performance
                    </p>
                </div>

                <div className="holdings-count">
                    {holdingsCount} Stocks
                </div>
            </div>

            {/* Holdings Table */}
            <div className="holdings-table-card">

                <div className="holdings-table-header">
                    <h3>Your Holdings</h3>

                    <span>
                        Page {page} of {totalPages || 1}
                    </span>
                </div>

                <div className="holdings-table-wrapper">

                    <table className="holdings-table">

                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Qty.</th>
                                <th>Avg. Cost</th>
                                <th>LTP</th>
                                <th>Cur. Val</th>
                                <th>P&L</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {loader ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="holdings-loader-cell"
                                    >
                                        <div className="holdings-loader">
                                            <span className="loader-spinner"></span>

                                            <span>
                                                Loading holdings...
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : allHoldings.length > 0 ? (

                                allHoldings.map((stock) => {
                                    const live = Number(prices[stock.name]?.currentPrice);
                                    const fallback = Number(stock.price);
                                    const livePrice = Number.isFinite(live) && live > 0 ? live : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0);
                                    const qty = Number(stock.qty) || 0;
                                    const avg = Number(stock.avg) || 0;
                                    const curValue = livePrice * qty;
                                    const pnl = curValue - avg * qty;

                                    const isProfit = pnl >= 0;

                                    return (
                                        <tr key={stock._id || stock.name}>

                                            <td>
                                                <div className="instrument-info">
                                                    <span className="instrument-name">
                                                        {stock.name}
                                                    </span>

                                                    <span className="instrument-exchange">
                                                        NSE
                                                    </span>
                                                </div>
                                            </td>

                                            <td>{stock.qty}</td>

                                            <td>
                                                ₹{formatCurrency(avg)}
                                            </td>

                                            <td>
                                                ₹{formatCurrency(livePrice)}
                                            </td>

                                            <td>
                                                ₹{formatCurrency(curValue)}
                                            </td>

                                            <td>
                                                <div
                                                    className={`pnl-cell ${isProfit
                                                        ? "profit"
                                                        : "loss"
                                                        }`}
                                                >
                                                    <span>
                                                        {isProfit ? "+" : "-"}₹
                                                        {formatCurrency(
                                                            Math.abs(pnl)
                                                        )}
                                                    </span>

                                                    <span className="pnl-percentage">
                                                        {stock.avg > 0
                                                            ? (
                                                                ((livePrice - avg) / avg) *
                                                                100
                                                            ).toFixed(2)
                                                            : "0.00"}
                                                        %
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="holding-action-cell">
                                                <button
                                                    type="button"
                                                    className="holding-sell-button"
                                                    onClick={() => general.openSellWindow({ ...stock, price: livePrice })}
                                                    aria-label={`Sell ${stock.name}`}
                                                >
                                                    Sell
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })

                            ) : (

                                <tr>
                                    <td
                                        colSpan="7"
                                        className="holdings-empty"
                                    >
                                        No holdings found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}
                <div className="holdings-pagination">

                    <div className="pagination-info">
                        Showing{" "}
                        {holdingsCount === 0
                            ? 0
                            : (page - 1) * PAGE_SIZE + 1}
                        {" - "}
                        {Math.min(page * PAGE_SIZE, holdingsCount)}
                        {" of "}
                        {holdingsCount} holdings
                    </div>

                    <div className="pagination-controls">

                        <button
                            className="pagination-btn"
                            onClick={handlePrevPage}
                            disabled={page === 1 || loader}
                        >
                            <span>←</span>
                            Prev
                        </button>

                        <span className="pagination-current">
                            {page}
                        </span>

                        <button
                            className="pagination-btn"
                            onClick={handleNextPage}
                            disabled={
                                page >= totalPages || loader
                            }
                        >
                            Next
                            <span>→</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Holdings;
