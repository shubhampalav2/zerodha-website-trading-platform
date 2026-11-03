export const getAccessToken = () => {
    return localStorage.getItem('authToken');
}

export const setUserName = (value) => {
    return localStorage.setItem("username", value);
}


export const getUserName = () => {
    return localStorage.getItem("username");
}