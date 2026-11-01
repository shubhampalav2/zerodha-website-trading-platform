const mongoose = require("mongoose");

const StocksSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    currentPrice: {
        type: String,
        required: true
    }
}, {
    _id: false
});

const WatchListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    stocks: {
        type: [StocksSchema],
        default: []
    }
});

module.exports = WatchListSchema;