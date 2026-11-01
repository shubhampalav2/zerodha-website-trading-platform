export default class API_URLS {
    dashboardServerBaseUrl = "http://localhost:7000/api/v1/dashboard/";

    //API Endpoints
    watchlist = "watchlist";
    portfolio = "portfolio";

    getWatchlistUrl() {
        return this.dashboardServerBaseUrl + this.watchlist;
    }

    getPortfolioUrl() {
        return this.dashboardServerBaseUrl + this.portfolio;
    }
}