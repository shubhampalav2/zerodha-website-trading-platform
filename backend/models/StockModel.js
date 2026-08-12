const mongoose = require("mongoose");
const StockSchema = require("../schemas/StockSchema");

module.exports = new mongoose.model("stock", StockSchema);