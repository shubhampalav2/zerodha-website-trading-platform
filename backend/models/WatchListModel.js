const mongoose = require("mongoose");

const WatchListSchema = require("../schemas/WatchListSchema");

const WatchListModel = mongoose.model("watchlist", WatchListSchema);

module.exports = WatchListModel;