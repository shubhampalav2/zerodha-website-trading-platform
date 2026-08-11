const mongoose = require("mongoose");

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
    price: {
        type: Number,
        required: true
    },
    percent: {
        type: String,
        required: true
    },
    isDown: {
        type: boolean,
        required: true
    }
});

module.exports = WatchListSchema;