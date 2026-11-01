const watchList = require("../models/WatchListModel");
const list = ['watchlist 1', 'watchlist 2', 'watchlist 3', 'watchlist 4', 'watchlist 5'];
const fetchWatchlist = async (req, res) => {
    const { name } = req.query;
    const userId = req?.user?.userId;
    console.log("Name is ", name);
    if (!name) {
        return res.status(422).json({
            success: false,
            message: "Watchlist Name is required"
        });
    }
    if (!list.includes(name?.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: "Invalid watchlist name"
        });
    }
    try {
        const watchlist = await watchList.findOne({ userId, name: name.toLowerCase() });
        if (!watchlist) {
            return res.status(201).json({
                success: true,
                data: [],
                message: "No Stocks present in these Watchlist"
            });
        }
        return res.status(200).json({
            success: true,
            data: watchlist,
            message: "Watchlist fetched"
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}

const createWatchlist = async (req, res) => {
    const { name, companyname, exchange, currentPrice } = req.body;
    const userId = req.user?.userId;

    // Validate watchlist name
    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Watchlist name is required"
        });
    }

    // Validate company name
    if (
        !companyname ||
        typeof companyname !== "string" ||
        !companyname.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Company name is required"
        });
    }

    // Validate exchange
    if (
        !exchange ||
        typeof exchange !== "string" ||
        !exchange.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Exchange is required"
        });
    }

    // Validate currentPrice
    if (
        typeof currentPrice !== "number" ||
        !Number.isFinite(currentPrice) ||
        currentPrice < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Current price must be a valid number"
        });
    }


    try {
        //find whether watchlist is present or not
        const watchListData = await watchList.findOne({ userId, name: name.toLowerCase() });
        console.log("watchlist is ", watchListData);
        //not present
        if (!watchListData) {
            //add new watchlist in database
            await watchList.create({
                userId,
                name: name.toLowerCase(),
                stocks: [
                    {
                        companyname,
                        exchange,
                        currentPrice
                    }
                ]
            });
        }
        else {
            watchListData.stocks.push({
                companyname,
                exchange,
                currentPrice
            });
            await watchListData.save();
        }

        return res.status(200).json({
            success: true,
            message: `${companyname} added successfully to Watchlist`
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}


const removeStockFromWatchlist = async (req, res) => {
    const { name, companyname, exchange } = req.body;
    const userId = req.user?.userId;

    try {
        // Validate authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // Validate watchlist name
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Watchlist name is required"
            });
        }

        // Validate company name
        if (
            !companyname ||
            typeof companyname !== "string" ||
            !companyname.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Company name is required"
            });
        }

        // Validate exchange
        if (
            !exchange ||
            typeof exchange !== "string" ||
            !exchange.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Exchange is required"
            });
        }

        const watchlistName = name.trim().toLowerCase();
        const stockName = companyname.trim();
        const stockExchange = exchange.trim();

        // Find the user's watchlist
        const watchListData = await watchList.findOne({
            userId,
            name: watchlistName
        });

        // Watchlist doesn't exist
        if (!watchListData) {
            return res.status(404).json({
                success: false,
                message: "Watchlist not found"
            });
        }

        // Check whether the stock exists
        const stockExists = watchListData.stocks.some(
            (stock) =>
                stock.companyname === stockName &&
                stock.exchange === stockExchange
        );

        if (!stockExists) {
            return res.status(404).json({
                success: false,
                message: "Stock not found in this watchlist"
            });
        }

        // Remove the matching stock
        watchListData.stocks.pull({
            companyname: stockName,
            exchange: stockExchange
        });

        await watchListData.save();

        return res.status(200).json({
            success: true,
            message: `${stockName} removed successfully from Watchlist`
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
};


module.exports = { fetchWatchlist, createWatchlist, removeStockFromWatchlist };