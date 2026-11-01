import axios from "axios";
import apiUrl from "./API_URLS";
import { getAccessToken } from "../common/Storage";

export const fetchPortfolioData = async () => {
    const api = new apiUrl();
    const url = api.getPortfolioUrl();
    return await axios.get(url, {
        headers: {
            'Authorization': getAccessToken()
        }
    }).then((res) => res.data);
}