const Holding = require("../models/HoldingModel");

const Stock = require("../models/StockModel");

const getPortfolio = async (req, res) => {
    const userId = req.user?.userId;

    const userName = req?.user?.userName;

    try {
        // Validate authentication
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // Fetch user's holdings
        const holdings = await Holding.find({ userId });

        // Extract stock symbols from holdings
        const symbols = holdings.map(
            (holding) => holding.name
        );

        // Fetch all corresponding stocks in one query
        const stocks = await Stock.find({
            symbol: { $in: symbols }
        });

        // Create a lookup map using stock symbols
        const stockMap = new Map(
            stocks.map((stock) => [
                stock.symbol,
                stock
            ])
        );

        let totalInvestment = 0;
        let currentValue = 0;

        // Calculate investment and current value
        for (const holding of holdings) {

            const stock = stockMap.get(holding.name);

            // Skip if stock is not found
            if (!stock) {
                continue;
            }

            const investment =
                holding.qty * holding.avg;

            const currentStockValue =
                holding.qty * stock.currentPrice;

            totalInvestment += investment;

            currentValue += currentStockValue;
        }

        // Calculate profit and loss
        const pnl = currentValue - totalInvestment;

        // Calculate P&L percentage
        const pnlPercentage = totalInvestment > 0
            ? (pnl / totalInvestment) * 100
            : 0;

        return res.status(200).json({
            success: true,
            portfolio: {
                userName,
                totalHoldings: holdings.length,
                totalInvestment,
                currentValue,
                pnl,
                pnlPercentage
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
};

module.exports = getPortfolio;