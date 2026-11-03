
import React, { useState, useEffect, useCallback } from "react";
import { fetchOrderData } from "../Services/OrdersService";
import "./Orders.css";

const PAGE_SIZE = 10;

const FILTERS = [
    { label: "All Orders", value: "" },
    { label: "Completed Orders", value: "COMPLETED" },
    { label: "Rejected Orders", value: "REJECTED" },
];

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [ordersCount, setOrdersCount] = useState(0);

    const [page, setPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState("");

    const [loader, setLoader] = useState(false);

    const totalPages = Math.ceil(ordersCount / PAGE_SIZE);

    // Fetch orders from API based on page and selected status.
    const fetchOrders = useCallback(async (pageNo, status) => {
        try {
            setLoader(true);

            const res = await fetchOrderData(pageNo, status);

            setOrders(res?.orders || []);
            setOrdersCount(res?.count || 0);
        } catch (error) {
            console.error("Error fetching orders:", error);

            setOrders([]);
            setOrdersCount(0);
        } finally {
            setLoader(false);
        }
    }, []);

    // Fetch whenever page or filter changes.
    useEffect(() => {
        fetchOrders(page, activeFilter);
    }, [page, activeFilter, fetchOrders]);

    // Change selected filter and reset pagination.
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setPage(1);
    };

    // Previous page.
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    // Next page.
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    // Format price.
    const formatCurrency = (value) => {
        return Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // Format order timestamp.
    const formatDate = (timestamp) => {
        if (!timestamp) return "-";

        const date = new Date(timestamp);

        if (Number.isNaN(date.getTime())) {
            return "-";
        }

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Get status badge class.
    const getStatusClass = (status) => {
        switch (status?.toUpperCase()) {
            case "COMPLETED":
                return "completed";

            case "PENDING":
                return "pending";

            case "REJECTED":
                return "rejected";

            case "CANCELLED":
                return "cancelled";

            default:
                return "default";
        }
    };

    return (
        <div className="orders-container">

            {/* Header */}
            <div className="orders-header">

                <div>
                    <h2 className="orders-title">
                        Orders
                    </h2>

                    <p className="orders-subtitle">
                        Track and manage your orders
                    </p>
                </div>

                <div className="orders-count">
                    {ordersCount} Orders
                </div>

            </div>

            {/* Order Filters */}
            <div className="orders-filter-container">

                <div className="orders-filters">

                    {FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            className={`orders-filter-btn ${activeFilter === filter.value
                                ? "active"
                                : ""
                                }`}
                            onClick={() =>
                                handleFilterChange(filter.value)
                            }
                            disabled={loader}
                        >
                            {filter.label}
                        </button>
                    ))}

                </div>

            </div>

            {/* Orders Table Card */}
            <div className="orders-table-card">

                {/* Table Header */}
                <div className="orders-table-header">

                    <h3>
                        {FILTERS.find(
                            (filter) =>
                                filter.value === activeFilter
                        )?.label}
                    </h3>

                    <span>
                        Page {page} of {totalPages || 1}
                    </span>

                </div>

                {/* Table */}
                <div className="orders-table-wrapper">

                    <table className="orders-table">

                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Type</th>
                                <th>Qty.</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Order Time</th>
                            </tr>
                        </thead>

                        <tbody>

                            {/* Loading State */}
                            {loader ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="orders-loader-cell"
                                    >
                                        <div className="orders-loader">

                                            <span className="orders-spinner"></span>

                                            <span>
                                                Loading orders...
                                            </span>

                                        </div>
                                    </td>
                                </tr>

                            ) : orders.length > 0 ? (

                                /* Actual Orders */
                                orders.map((order) => (

                                    <tr key={order._id}>

                                        {/* Instrument */}
                                        <td>
                                            <div className="order-instrument">

                                                <span className="order-instrument-name">
                                                    {order.name}
                                                </span>

                                                <span className="order-exchange">
                                                    NSE
                                                </span>

                                            </div>
                                        </td>

                                        {/* Buy / Sell */}
                                        <td>
                                            <span
                                                className={`order-type ${order.type?.toLowerCase()
                                                    }`}
                                            >
                                                {order.type}
                                            </span>
                                        </td>

                                        {/* Quantity */}
                                        <td>
                                            {order.qty}
                                        </td>

                                        {/* Price */}
                                        <td>
                                            ₹{formatCurrency(order.price)}
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span
                                                className={`order-status ${getStatusClass(
                                                    order.status
                                                )}`}
                                            >

                                                <span className="status-dot"></span>

                                                {order.status}

                                            </span>
                                        </td>

                                        {/* Timestamp */}
                                        <td className="order-timestamp">
                                            {formatDate(order.timestamp)}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                /* Empty State */
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="orders-empty"
                                    >

                                        <div className="orders-empty-content">

                                            <div className="orders-empty-icon">
                                                <span>↗</span>
                                            </div>

                                            <h4>
                                                No orders found
                                            </h4>

                                            <p>
                                                {activeFilter === "ALL"
                                                    ? "You haven't placed any orders yet."
                                                    : `There are no ${activeFilter.toLowerCase()} orders to display.`}
                                            </p>

                                        </div>

                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}
                <div className="orders-pagination">

                    <div className="orders-pagination-info">

                        Showing{" "}

                        {ordersCount === 0
                            ? 0
                            : (page - 1) * PAGE_SIZE + 1}

                        {" - "}

                        {Math.min(
                            page * PAGE_SIZE,
                            ordersCount
                        )}

                        {" of "}

                        {ordersCount} orders

                    </div>

                    <div className="orders-pagination-controls">

                        {/* Previous */}
                        <button
                            className="orders-pagination-btn"
                            onClick={handlePrevPage}
                            disabled={page === 1 || loader}
                        >
                            ← Prev
                        </button>

                        {/* Current Page */}
                        <span className="orders-pagination-current">
                            {page}
                        </span>

                        {/* Next */}
                        <button
                            className="orders-pagination-btn"
                            onClick={handleNextPage}
                            disabled={
                                page >= totalPages || loader
                            }
                        >
                            Next →
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Orders;
