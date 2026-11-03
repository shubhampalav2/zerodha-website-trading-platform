import axios from "axios";
import apiUrl from "./API_URLS";
import { getAccessToken } from "../common/Storage";

const authConfig = () => ({ headers: { Authorization: getAccessToken() } });

export const fetchStocks = async (page, limit = 10) => {
    const api = new apiUrl();
    const response = await axios.get(`${api.getStocksUrl()}?page=${page}&limit=${limit}`, authConfig());
    return response.data;
};

export const addStockToWatchlist = async (payload) => {
    const api = new apiUrl();
    const response = await axios.post(api.getWatchlistUrl(), payload, authConfig());
    return response.data;
};

export const removeStockFromWatchlist = async (payload) => {
    const api = new apiUrl();
    const response = await axios.delete(api.getWatchlistUrl(), { ...authConfig(), data: payload });
    return response.data;
};
