import React, { useContext, useEffect, useRef, useState } from "react";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";
import { executeOrder } from "../Services/OrdersService";
import { toast } from "react-toastify";

const integerValue = (value, fallback = 1) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : fallback;
};

const SellActionWindow = ({ holding, mode = "SELL" }) => {
    const general = useContext(GeneralContext);
    const isBuy = mode === "BUY";
    const [quantity, setQuantity] = useState(integerValue(isBuy ? 1 : holding.qty));
    const [price, setPrice] = useState(integerValue(holding.price ?? holding.currentPrice));
    const [position, setPosition] = useState(null);
    const dragState = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const move = (event) => {
            if (!dragState.current) return;
            const { x, y, left, top } = dragState.current;
            const maxLeft = Math.max(0, window.innerWidth - 320);
            const maxTop = Math.max(0, window.innerHeight - 160);
            setPosition({
                left: Math.min(maxLeft, Math.max(0, left + event.clientX - x)),
                top: Math.min(maxTop, Math.max(0, top + event.clientY - y)),
            });
        };
        const stop = () => { dragState.current = null; };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", stop);
        return () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", stop);
        };
    }, []);

    const startDrag = (event) => {
        if (event.button !== 0) return;
        if (event.target.closest("button")) return;
        const rect = event.currentTarget.parentElement.getBoundingClientRect();
        dragState.current = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
        setPosition({ left: rect.left, top: rect.top });
        event.preventDefault();
    };

    const updateInteger = (setter) => (event) => {
        const digits = event.target.value.replace(/\D/g, "");
        setter(digits === "" ? "" : Number(digits));
    };

    const handleSell = async (event) => {
        event.preventDefault();
        setLoading(true);
        const order = {
            name: holding.name || holding.symbol,
            qty: Number(quantity),
            price: Number(price),
            type: mode,
        };
        console.info("SELL_ORDER_JSON", JSON.stringify(order));
        try {
            const res = await executeOrder(order);
            console.log("Response is ", res);
            if (res?.success === false) {
                throw new Error(res.message || "Order was not successful");
            }
            toast.success(res?.message ?? "Order Placed Successfully");
            general.refreshHoldings();
            general.closeBuyWindow();
        }
        catch (err) {
            console.log("Error is ", err);
            toast.error(err?.response?.data?.message ?? err?.message ?? "Something Went Wrong")
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="sell-window-backdrop" role="presentation">
            <section
                className="sell-order-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sell-order-title"
                style={position ? { left: position.left, top: position.top, transform: "none" } : undefined}
            >
                <header className="sell-order-header" onPointerDown={startDrag}>
                    <div>
                        <span className="sell-order-eyebrow">{mode} ORDER</span>
                        <h2 id="sell-order-title">{holding.companyName || holding.name || holding.symbol}</h2>
                    </div>
                    <button className="sell-order-close" type="button" onClick={general.closeBuyWindow} aria-label="Close sell order">×</button>
                </header>

                <form onSubmit={handleSell}>
                    <div className="sell-order-fields">
                        <label>
                            <span>Quantity</span>
                            <input type="number" min="1" step="1" inputMode="numeric" required value={quantity} onChange={updateInteger(setQuantity)} />
                        </label>
                        <label>
                            <span>Price (₹)</span>
                            <input type="number" min="1" step="1" inputMode="numeric" required value={price} onChange={updateInteger(setPrice)} />
                        </label>
                    </div>
                    <footer className="sell-order-footer">
                        <button className="sell-order-cancel" type="button" onClick={general.closeBuyWindow}>Cancel</button>
                        <button className={`sell-order-submit ${isBuy ? "buy" : ""}`} type="submit" disabled={loading || !Number.isInteger(Number(quantity)) || Number(quantity) < 1 || !Number.isInteger(Number(price)) || Number(price) < 1}>{loading ? "Submitting…" : mode === "BUY" ? "Buy" : "Sell"}</button>
                    </footer>
                </form>
            </section>
        </div>
    );
};

export default SellActionWindow;
