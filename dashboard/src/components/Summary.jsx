import { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader.jsx";
import { fetchPortfolioData } from "../Services/PortfolioService.js";
import { setUserName } from "../common/Storage.js";
import { fetchHoldings } from "../Services/HoldingsService.js";
import { useLivePrices } from "../context/PriceContext";
import "./Summary.css";

const Summary = () => {

    const [loader, setLoader] = useState(false);

    const [portfolio, setPortfolio] = useState({});
    const [holdings, setHoldings] = useState([]);
    const { prices } = useLivePrices();
    const livePortfolio = { ...(holdings.length ? holdings.reduce((result, holding) => {
        const qty = Number(holding.qty) || 0;
        const avg = Number(holding.avg) || 0;
        const candidate = Number(prices[holding.name]?.currentPrice);
        const fallback = Number(holding.price);
        result.totalInvestment += avg * qty;
        result.currentValue += (Number.isFinite(candidate) && candidate > 0 ? candidate : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0)) * qty;
        return result;
    }, { ...portfolio, totalInvestment: 0, currentValue: 0 }) : portfolio) };
    livePortfolio.pnl = (Number(livePortfolio.currentValue) || 0) - (Number(livePortfolio.totalInvestment) || 0);
    livePortfolio.pnlPercentage = livePortfolio.totalInvestment > 0 ? livePortfolio.pnl / livePortfolio.totalInvestment * 100 : 0;
    const isProfit = livePortfolio?.pnl >= 0;

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const formatNumber = (value) =>
        new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
        }).format(value);

    async function fetchPortfolio() {
        try {
            setLoader(true);
            const res = await fetchPortfolioData();
            setUserName(res.portfolio.userName);
            setPortfolio(res.portfolio);
            const firstPage = await fetchHoldings(1);
            const combinedHoldings = firstPage?.data || [];
            const pages = Math.ceil((Number(firstPage?.count) || 0) / 10);
            for (let page = 2; page <= pages; page += 1) {
                const nextPage = await fetchHoldings(page);
                combinedHoldings.push(...(nextPage?.data || []));
            }
            setHoldings(combinedHoldings);
        }
        catch (error) {
            console.log("Error is ", error);
            setPortfolio({});
            setHoldings([]);
        }
        finally {
            setLoader(false);
        }
    }
    useEffect(() => {
        fetchPortfolio();
    }, []);

    return (
        <div className="summary-container">
            {loader ? <Loader /> : Object.keys(portfolio).length === 0 ?
                <h2>No Portfolio Available</h2> :
                <>
                    {/* Page Heading */}
                    <div className="summary-page-header">
                        <div>
                            <p className="summary-breadcrumb">
                                Dashboard / Overview
                            </p>

                            <h1>
                                Hi, {portfolio.userName.split(" ")[0]}
                            </h1>

                            <p className="summary-subtitle">
                                Here's an overview of your investment portfolio.
                            </p>
                        </div>

                        <span className="summary-market-status">
                            <span></span> Market overview
                        </span>
                    </div>

                    {/* Portfolio Main Value */}
                    <section className="summary-portfolio-card">
                        <div className="summary-portfolio-top">
                            <div>
                                <p className="summary-label">Current portfolio value</p>

                                <h2>{formatCurrency(livePortfolio.currentValue)}</h2>
                            </div>

                            <div
                                className={`summary-return-badge ${isProfit ? "profit" : "loss"
                                    }`}
                            >
                                <span>{isProfit ? "▲" : "▼"}</span>
                                {formatNumber(Math.abs(livePortfolio.pnlPercentage))}%
                            </div>
                        </div>

                        <div className="summary-portfolio-divider"></div>

                        <div className="summary-portfolio-details">
                            <div>
                                <span>Total investment</span>
                                <strong>
                                    {formatCurrency(livePortfolio.totalInvestment)}
                                </strong>
                            </div>

                            <div>
                                <span>Current value</span>
                                <strong>
                                    {formatCurrency(livePortfolio.currentValue)}
                                </strong>
                            </div>

                            <div>
                                <span>Overall P&L</span>
                                <strong className={isProfit ? "profit-text" : "loss-text"}>
                                    {isProfit ? "+" : "-"}
                                    {formatCurrency(Math.abs(livePortfolio.pnl))}
                                </strong>
                            </div>
                        </div>
                    </section>

                    {/* Statistics Cards */}
                    <section className="summary-stats-grid">
                        <div className="summary-stat-card">
                            <div className="summary-stat-heading">
                                <span>Total investment</span>
                                <div className="summary-stat-icon">₹</div>
                            </div>

                            <h3>{formatCurrency(livePortfolio.totalInvestment)}</h3>
                            <p>Amount invested in stocks</p>
                        </div>

                        <div className="summary-stat-card">
                            <div className="summary-stat-heading">
                                <span>Current value</span>
                                <div className="summary-stat-icon">↗</div>
                            </div>

                            <h3>{formatCurrency(livePortfolio.currentValue)}</h3>
                            <p>Present market value</p>
                        </div>

                        <div className="summary-stat-card">
                            <div className="summary-stat-heading">
                                <span>Total holdings</span>
                                <div className="summary-stat-icon">▤</div>
                            </div>

                            <h3>{portfolio.totalHoldings}</h3>
                            <p>Stocks in your portfolio</p>
                        </div>

                        <div className="summary-stat-card">
                            <div className="summary-stat-heading">
                                <span>Overall P&L</span>
                                <div className={`summary-stat-icon ${isProfit ? "profit-icon" : "loss-icon"}`}>
                                    {isProfit ? "↗" : "↘"}
                                </div>
                            </div>

                            <h3 className={isProfit ? "profit-text" : "loss-text"}>
                                {isProfit ? "+" : "-"}
                                {formatCurrency(Math.abs(livePortfolio.pnl))}
                            </h3>
                            <p>Overall returns</p>
                        </div>
                    </section>

                    {/* Holdings*/}
                    <section className="summary-holdings-section">
                        <div className="summary-section-header">
                            <div>
                                <h3>Holdings</h3>
                            </div>

                            <span>{portfolio.totalHoldings} Stocks</span>
                        </div>
                        <div className="summary-table-wrapper">
                            <table className="summary-holdings-table">
                                <thead><tr><th>Instrument</th><th>Qty.</th><th>Avg. cost</th><th>Current value</th><th>P&L</th></tr></thead>
                                <tbody>{holdings.slice(0, 5).map((holding) => {
                                    const qty = Number(holding.qty) || 0;
                                    const avg = Number(holding.avg) || 0;
                                    const streamed = Number(prices[holding.name]?.currentPrice);
                                    const fallback = Number(holding.price);
                                    const current = Number.isFinite(streamed) && streamed > 0 ? streamed : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0);
                                    const pnl = (current - avg) * qty;
                                    return <tr key={holding._id || holding.name}>
                                        <td><div className="summary-stock-name"><strong>{holding.name}</strong><span>{holding.exchange || "NSE"}</span></div></td>
                                        <td>{qty}</td><td>{formatCurrency(avg)}</td><td>{formatCurrency(current * qty)}</td>
                                        <td><strong className={pnl >= 0 ? "profit-text" : "loss-text"}>{pnl >= 0 ? "+" : "−"}{formatCurrency(Math.abs(pnl))}</strong></td>
                                    </tr>;
                                })}{holdings.length === 0 && <tr><td colSpan="5">No holdings to display yet.</td></tr>}</tbody>
                            </table>
                        </div>
                    </section>

                    {/* Portfolio Performance */}
                    <section className="summary-performance-section">
                        <div className="summary-section-header">
                            <div>
                                <h3>Portfolio performance</h3>
                                <p>Your investment versus current market value</p>
                            </div>
                        </div>

                        <div className="summary-performance-content">
                            <div className="summary-performance-item">
                                <div className="summary-performance-label">
                                    <span className="investment-dot"></span>
                                    <span>Investment</span>
                                </div>

                                <strong>
                                    {formatCurrency(livePortfolio.totalInvestment)}
                                </strong>
                            </div>

                            <div className="summary-performance-bar">
                                <div
                                    className="summary-investment-bar"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>

                            <div className="summary-performance-item">
                                <div className="summary-performance-label">
                                    <span className="current-value-dot"></span>
                                    <span>Current value</span>
                                </div>

                                <strong>
                                    {formatCurrency(livePortfolio.currentValue)}
                                </strong>
                            </div>

                            <div className="summary-performance-bar">
                                <div
                                    className="summary-current-bar"
                                    style={{
                                        width: `${livePortfolio.totalInvestment > 0
                                            ? Math.max(
                                                0,
                                                Math.min(
                                                    100,
                                                    (livePortfolio.currentValue /
                                                        livePortfolio.totalInvestment) *
                                                    100
                                                )
                                            )
                                            : 0
                                            }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </section>
                </>}

        </div>
    );
};

export default Summary;
