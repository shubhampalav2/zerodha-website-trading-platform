export const getAccessToken = () => {
    return localStorage.getItem('authToken');
}

export const setUserName = (value) => {
    localStorage.setItem("username", value);
    window.dispatchEvent(new CustomEvent("username-updated", { detail: value }));
}


export const getUserName = () => {
    return localStorage.getItem("username");
}
