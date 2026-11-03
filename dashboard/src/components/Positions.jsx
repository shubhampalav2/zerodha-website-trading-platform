import React from "react";
import { useLivePrices } from "../context/PriceContext";

import { positions } from "../data/data";

const Positions = () => {
    const { prices } = useLivePrices();
    return (
        <>
            <h3 className="title">Positions ({positions.length})</h3>

            <div className="order-table">
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Instrument</th>
                        <th>Qty.</th>
                        <th>Avg.</th>
                        <th>LTP</th>
                        <th>P&L</th>
                        <th>Chg.</th>
                    </tr>

                    {positions.map((stock, index) => {
                        const candidate = Number(prices[stock.name]?.currentPrice);
                        const fallback = Number(stock.price);
                        const livePrice = Number.isFinite(candidate) && candidate > 0 ? candidate : (Number.isFinite(fallback) && fallback > 0 ? fallback : 0);
                        const qty = Number(stock.qty) || 0;
                        const avg = Number(stock.avg) || 0;
                        const curValue = livePrice * qty;
                        const isProfit = curValue - avg * qty >= 0.0;
                        const profClass = isProfit ? "profit" : "loss";
                        const dayClass = stock.isLoss ? "loss" : "profit";

                        return (
                            <tr key={index}>
                                <td>{stock.product}</td>
                                <td>{stock.name}</td>
                                <td>{stock.qty}</td>
                                <td>{avg.toFixed(2)}</td>
                                <td>{livePrice.toFixed(2)}</td>
                                <td className={profClass}>
                                    {(curValue - avg * qty).toFixed(2)}
                                </td>
                                <td className={dayClass}>{stock.day}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </>
    );
};

export default Positions;