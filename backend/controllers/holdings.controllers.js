const Holdings = require("../models/HoldingModel");
const fetchHoldings = async (req, res) => {
    // Accessing the logged-in userId
    const userId = req?.user?.userId;

    //extracting the page and limit from the request query
    let { page, limit } = req.query;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user"
        });
    }

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    if (typeof page !== 'number' || typeof limit !== 'number') {
        return res.status(400).json({
            success: false,
            message: "Page and limit must be Integer only"
        });
    }

    if (page <= 0 || limit <= 0) {
        return res.status(422).json({
            success: false,
            message: "Page and Limit must be greater than zero"
        });
    }

    let offset = (page - 1) * limit;

    try {
        // Fetch all holdings of the logged-in user
        const [holdings, totalHoldings] = await Promise.all([
            Holdings.find({ userId }).skip(offset).limit(limit),
            Holdings.countDocuments({ userId })
        ]);

        if (holdings.length === 0) {
            return res.status(201).json({
                success: true,
                message: "No Holdings available",
                data: [],
                count: totalHoldings
            });
        }

        return res.status(200).json({
            success: true,
            message: "Holdings fetched successfully",
            data: holdings,
            count: totalHoldings
        });

    } catch (err) {
        console.log("Error fetching holdings:", err);

        return res.status(500).json({
            success: false,
            message: "We couldn't fetch your holdings right now. Please try again."
        });
    }
};

module.exports = fetchHoldings;