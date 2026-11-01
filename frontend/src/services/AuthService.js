import axios from "axios"

export const login = async (payload) => {
    const url = "http://localhost:7000/api/v1/auth/login";
    return await axios.post(url, payload).then((res) => res.data);
}

export const signUp = async (payload) => {
    const url = "http://localhost:7000/api/v1/auth/signup";
    return await axios.post(url, payload).then((res) => res.data);
}