import axios from "axios";
import apiUrl from "./API_URLS";
import { getAccessToken } from "../common/Storage";

export const fetchHoldings = async (page) => {
    const api = new apiUrl();
    const url = api.getHoldingsUrl();
    return await axios.get(`${url}?page=${page}&limit=10`, {
        headers: {
            'Authorization': getAccessToken()
        }
    }).then((res) => res.data);
}