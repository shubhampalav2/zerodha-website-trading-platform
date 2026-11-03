import React, { useState } from "react";

import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext();

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [selectedHolding, setSelectedHolding] = useState(null);
    const [activeWindow, setActiveWindow] = useState(null);
    const [holdingsRefreshVersion, setHoldingsRefreshVersion] = useState(0);

    const handleOpenBuyWindow = (uid) => {
        setActiveWindow("buy");
        setIsBuyWindowOpen(true);
        setSelectedHolding(typeof uid === "object" ? uid : { name: uid, symbol: uid, qty: 1, price: 0 });
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setActiveWindow(null);
        setSelectedHolding(null);
    };

    const handleOpenSellWindow = (holding) => {
        setActiveWindow("sell");
        setSelectedHolding(holding);
        setIsBuyWindowOpen(true);
    };

    const handleOpenOrderWindow = (stock, mode) => {
        setActiveWindow(mode.toLowerCase());
        setSelectedHolding(stock);
        setIsBuyWindowOpen(true);
    };

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow: handleOpenBuyWindow,
                openSellWindow: handleOpenSellWindow,
                openOrderWindow: handleOpenOrderWindow,
                closeBuyWindow: handleCloseBuyWindow,
                orderWindowOpen: isBuyWindowOpen,
                refreshHoldings: () => setHoldingsRefreshVersion((version) => version + 1),
                holdingsRefreshVersion,
            }}
        >
            {props.children}
            {isBuyWindowOpen && selectedHolding && <SellActionWindow holding={selectedHolding} mode={activeWindow?.toUpperCase()} />}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;
