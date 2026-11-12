export default class API_URLS {
    dashboardServerBaseUrl = "https://zerodha-website-trading-platform.onrender.com/api/v1/dashboard/";

    //API Endpoints
    watchlist = "watchlist";
    portfolio = "portfolio";
    holdings = "holdings";
    order = "orders";
    stocks = "stocks";

    getWatchlistUrl() {
        return this.dashboardServerBaseUrl + this.watchlist;
    }

    getPortfolioUrl() {
        return this.dashboardServerBaseUrl + this.portfolio;
    }

    getHoldingsUrl() {
        return this.dashboardServerBaseUrl + this.holdings;
    }

    getOrdersUrl() {
        return this.dashboardServerBaseUrl + this.order;
    }

    getStocksUrl() {
        return this.dashboardServerBaseUrl + this.stocks;
    }
}
