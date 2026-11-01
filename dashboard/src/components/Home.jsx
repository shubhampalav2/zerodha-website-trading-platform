import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";


const Home = () => {
    const location = useLocation();

    useEffect(() => {
        const search = new URLSearchParams(location.search);
        const accessToken = search.get('authToken');
        if (accessToken) {
            localStorage.setItem('authToken', accessToken);
        }
    }, []);

    return (
        <>
            <TopBar />
            <Dashboard />
        </>
    );
};

export default Home;