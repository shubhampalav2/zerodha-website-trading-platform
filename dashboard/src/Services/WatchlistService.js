import axios from "axios";
import apiUrl from "./API_URLS";
import { getAccessToken } from "../common/Storage";

export const fetchWatchlistData = async (watchlistName) => {
    const api = new apiUrl();
    const url = api.getWatchlistUrl();
    return await axios.get(`${url}?name=${watchlistName}`, {
        headers: {
            'Authorization': getAccessToken()
        }
    }).then((res) => res.data);
}