import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import apiUrl from "../Services/API_URLS";

const PriceContext = createContext({ prices: {}, connected: false });

const samePrices = (left, right) => {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right || {});
    return leftKeys.length === rightKeys.length && leftKeys.every((key) =>
        left[key]?.currentPrice === right[key]?.currentPrice &&
        left[key]?.previousClose === right[key]?.previousClose &&
        left[key]?.companyName === right[key]?.companyName &&
        left[key]?.exchange === right[key]?.exchange
    );
};

export function PriceProvider({ children }) {
    const [prices, setPrices] = useState({});
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const apiBase = new apiUrl().dashboardServerBaseUrl;
        const socketBase = process.env.REACT_APP_API_BASE_URL
            ? process.env.REACT_APP_API_BASE_URL.replace(/\/api\/v1\/dashboard\/?$/, "")
            : apiBase.replace(/\/api\/v1\/dashboard\/?$/, "");
        const socket = io(socketBase, { reconnection: true });

        const updatePrices = (nextPrices) => {
            if (nextPrices && typeof nextPrices === "object") {
                setPrices((current) => samePrices(current, nextPrices) ? current : nextPrices);
            }
        };
        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("prices:initial", updatePrices);
        socket.on("prices:update", updatePrices);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("prices:initial", updatePrices);
            socket.off("prices:update", updatePrices);
            socket.disconnect();
        };
    }, []);

    const value = useMemo(() => ({ prices, connected }), [prices, connected]);
    return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
}

export function useLivePrices() {
    return useContext(PriceContext);
}

