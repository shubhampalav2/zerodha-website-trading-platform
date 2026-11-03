import axios from "axios";
import apiUrl from "./API_URLS";
import { getAccessToken } from "../common/Storage";

export const fetchOrderData = async (page, status) => {
    const api = new apiUrl();
    const url = api.getOrdersUrl();
    return await axios.get(`${url}?page=${page}&limit=10&status=${status}`, {
        headers: {
            'Authorization': getAccessToken()
        }
    }).then((res) => res.data);
}

export const executeOrder = async (payload) => {
    const api = new apiUrl();
    const url = api.getOrdersUrl();
    return await axios.post(url, payload, {
        headers: {
            'Authorization': getAccessToken()
        }
    }).then((res) => res.data);
}