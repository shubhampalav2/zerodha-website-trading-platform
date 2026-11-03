export default class API_URLS {
    dashboardServerBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:7000/api/v1/dashboard/";

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
