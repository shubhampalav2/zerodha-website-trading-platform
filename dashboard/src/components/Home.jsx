import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Loader from "../common/Loader/Loader";


const Home = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const search = new URLSearchParams(location.search);
        const accessToken = search.get('authToken');
        setLoading(false);
        if (accessToken) {
            localStorage.setItem('authToken', accessToken);
        }
    }, []);

    return (loading ?
        <Loader /> :
        <>
            <TopBar />
            <Dashboard />
        </>
    );
};

export default Home;