const jwt = require("jsonwebtoken");

const Stock = require("../models/StockModel");

const dotenv = require('dotenv')

dotenv.config();

const getStocks = async (req, res) => {
    try {
        //Fetching the data from the database
        const stocks = await Stock.find();
        if (!stocks) {
            return res.status(204).json({
                success: false,
                message: "Data Not Found",
                stocks: [],
                count: 0
            })
        }
        return res.status(200).json({
            success: true,
            message: "Successfully fetched",
            stocks,
            count: stocks.length
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong Server Error"
        })
    }
}

module.exports = getStocks;