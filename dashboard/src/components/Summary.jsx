import { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader.jsx";
import { fetchPortfolioData } from "../Services/PortfolioService.js";
import { setUserName } from "../common/Storage.js";
import "./Summary.css";

const Summary = () => {

    const [loader, setLoader] = useState(false);

    const [portfolio, setPortfolio] = useState({});

    const isProfit = portfolio?.pnl >= 0;

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
        }
        catch (error) {
            console.log("Error is ", error);
            setPortfolio({});
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

                                <h2>{formatCurrency(portfolio.currentValue)}</h2>
                            </div>

                            <div
                                className={`summary-return-badge ${isProfit ? "profit" : "loss"
                                    }`}
                            >
                                <span>{isProfit ? "▲" : "▼"}</span>
                                {formatNumber(Math.abs(portfolio.pnlPercentage))}%
                            </div>
                        </div>

                        <div className="summary-portfolio-divider"></div>

                        <div className="summary-portfolio-details">
                            <div>
                                <span>Total investment</span>
                                <strong>
                                    {formatCurrency(portfolio.totalInvestment)}
                                </strong>
                            </div>

                            <div>
                                <span>Current value</span>
                                <strong>
                                    {formatCurrency(portfolio.currentValue)}
                                </strong>
                            </div>

                            <div>
                                <span>Overall P&L</span>
                                <strong className={isProfit ? "profit-text" : "loss-text"}>
                                    {isProfit ? "+" : "-"}
                                    {formatCurrency(Math.abs(portfolio.pnl))}
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

                            <h3>{formatCurrency(portfolio.totalInvestment)}</h3>
                            <p>Amount invested in stocks</p>
                        </div>

                        <div className="summary-stat-card">
                            <div className="summary-stat-heading">
                                <span>Current value</span>
                                <div className="summary-stat-icon">↗</div>
                            </div>

                            <h3>{formatCurrency(portfolio.currentValue)}</h3>
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
                                {formatCurrency(Math.abs(portfolio.pnl))}
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
                                    {formatCurrency(portfolio.totalInvestment)}
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
                                    {formatCurrency(portfolio.currentValue)}
                                </strong>
                            </div>

                            <div className="summary-performance-bar">
                                <div
                                    className="summary-current-bar"
                                    style={{
                                        width: `${portfolio.totalInvestment > 0
                                            ? Math.max(
                                                0,
                                                Math.min(
                                                    100,
                                                    (portfolio.currentValue /
                                                        portfolio.totalInvestment) *
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
