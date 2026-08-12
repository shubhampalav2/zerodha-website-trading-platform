const mongoose = require('mongoose');

//creating a schema
const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    previousClose: {
        type: Number,
        required: true
    }
});

module.exports = stockSchema;