import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create();
let redirectingToSignup = false;

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !redirectingToSignup) {
            redirectingToSignup = true;
            toast.error("Session as Expired");

            window.setTimeout(() => {
                window.location.assign("https://zerodha-website-trading-platform-51.vercel.app/signup");
            }, 1500);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
