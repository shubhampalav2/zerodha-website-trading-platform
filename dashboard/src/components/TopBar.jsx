import React from "react";

import Menu from "./Menu";

const TopBar = () => {
    const showWatchlist = () => window.dispatchEvent(new Event("toggle-mobile-watchlist"));
    return (
        <div className="topbar-container">
            <div className="dashboard-brand"><span>T</span> TangelTrader</div>
            <div className="indices-container">
                <div className="nifty"><p className="index">NIFTY 50 - DEMO</p><p className="index-points">Sample</p></div>
                <div className="sensex"><p className="index">SENSEX - DEMO</p><p className="index-points">Sample</p></div>
            </div>

            <button type="button" className="watchlist-mobile-toggle" onClick={showWatchlist}>Watchlist</button>
            <Menu />
        </div>
    );
};

export default TopBar;
