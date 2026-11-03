const Order = require("../models/OrderModel");

const Holding = require("../models/HoldingModel");
const Stock = require("../models/StockModel");
const { getPriceForSymbol } = require("../services/priceSimulator");
const fetchOrders = async (req, res) => {
    const id = req?.user?.userId;
    console.log("User id ", req.user.userId);
    try {
        //Extracting page and limit from request query
        let { page, limit, status } = req.query;
        //validations
        if (!page || !limit) {
            return res.status(400).json({
                success: false,
                message: "Page and Limit are required"
            })
        }
        if (!/^\d+$/.test(page) || !/^\d+$/.test(limit)) {
            return res.status(422).json({
                success: false,
                message: "Page and limit must contain numbers only"
            });
        }

        page = Number(page) || 1;
        limit = Number(limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be greater than 0"
            });
        }
        const offset = (page - 1) * limit;
        let query = {
            userId: id
        }
        if (status) {
            query.status = status;
        }
        //Fetching the orders for particular user and counting the total orders
        const [orders, totalOrders] = await Promise.all([Order.find(query).skip(offset).limit(limit),
        Order.countDocuments(query)]);

        if (totalOrders === 0) {
            return res.status(201).json({
                success: true,
                message: "No Orders present",
                orders: [],
                count: 0
            });
        }
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders: orders,
            count: totalOrders
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

const createOrder = async (req, res) => {
    // Extract data from request body
    const { type, qty, price, name } = req.body;

    // Accessing the userId
    const userId = req?.user?.userId;

    // Validate stock name
    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Stock name is required"
        });
    }

    // Validate order type
    const orderType = typeof type === "string"
        ? type.toUpperCase()
        : "";

    if (!["BUY", "SELL"].includes(orderType)) {
        return res.status(400).json({
            success: false,
            message: "Order type must be BUY or SELL"
        });
    }

    // Validate quantity
    if (
        qty === undefined ||
        qty === null ||
        typeof qty === "boolean" ||
        String(qty).trim() === "" ||
        !Number.isSafeInteger(Number(qty)) ||
        Number(qty) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be a positive integer"
        });
    }

    // Validate price
    if (
        price === undefined ||
        price === null ||
        typeof price === "boolean" ||
        String(price).trim() === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Price must be a valid positive number"
        });
    }

    const orderQty = Number(qty);
    const stockName = name.trim();

    try {
        const simulatedPrice = getPriceForSymbol(stockName);
        const stock = simulatedPrice ? null : await Stock.findOne({ symbol: stockName }).select("currentPrice").lean();
        const orderPrice = simulatedPrice ?? Number(stock?.currentPrice);
        if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
            return res.status(422).json({ success: false, message: "A valid execution price is unavailable for this stock" });
        }
        // SELL order validation
        if (orderType === "SELL") {
            const holdings = await Holding.findOne({
                userId,
                name: stockName
            });

            if (!holdings) {
                await Order.create({
                    userId,
                    name: stockName,
                    type: orderType,
                    price: orderPrice,
                    qty: orderQty,
                    status: "REJECTED",
                    timestamp: new Date()
                });

                return res.status(422).json({
                    success: false,
                    message: `You don't have any ${stockName} shares to sell.`
                });
            }

            if (orderQty > holdings.qty) {
                await Order.create({
                    userId,
                    name: stockName,
                    type: orderType,
                    price: orderPrice,
                    qty: orderQty,
                    status: "REJECTED",
                    timestamp: new Date()
                });

                return res.status(422).json({
                    success: false,
                    message: `You can sell a maximum of ${holdings.qty} ${stockName} share${holdings.qty > 1 ? "s" : ""}`
                });
            }

            // Sell all shares
            if (orderQty === holdings.qty) {
                await Holding.deleteOne({ _id: holdings._id });
            } else {
                // Sell partial shares
                holdings.qty -= orderQty;
                // Update current market price
                holdings.price = orderPrice;
                await holdings.save();
            }
        }

        // BUY order holdings update
        if (orderType === "BUY") {
            const holdings = await Holding.findOne({
                userId,
                name: stockName
            });

            if (holdings) {
                // Calculate average buying price
                const totalQty = holdings.qty + orderQty;

                const averagePrice =
                    ((holdings.qty * holdings.avg) +
                        (orderQty * orderPrice)) / totalQty;

                holdings.qty = totalQty;
                holdings.avg = averagePrice;
                holdings.price = orderPrice;

                await holdings.save();
            } else {
                // Create new holding
                await Holding.create({
                    userId,
                    name: stockName,
                    qty: orderQty,
                    avg: orderPrice,
                    price: orderPrice
                });
            }
        }

        // Create completed order
        await Order.create({
            userId,
            name: stockName,
            type: orderType,
            price: orderPrice,
            qty: orderQty,
            status: "COMPLETED",
            timestamp: new Date()
        });

        return res.status(201).json({
            success: true,
            message: `${orderType} Order Placed Successfully`
        });

    } catch (err) {
        console.log("Error is ", err);

        return res.status(500).json({
            success: false,
            message: "We couldn't place your order right now. Please try again."
        });
    }
};


module.exports = { fetchOrders, createOrder };