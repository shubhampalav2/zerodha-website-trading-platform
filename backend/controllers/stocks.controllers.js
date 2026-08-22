const Stock = require("../models/StockModel");

const dotenv = require('dotenv')

dotenv.config();

const getStocks = async (req, res) => {
    try {
        //Extracting the page number and limit from req query
        let { page, limit } = req.query;
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

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be greater than 0"
            });
        }
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
        const start = (page - 1) * limit;
        const end = start + limit;

        return res.status(200).json({
            success: true,
            message: "Successfully fetched",
            stocks: stocks.slice(start, end),
            count: stocks.length
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something Went Wrong Server Error"
        })
    }
}

module.exports = getStocks;