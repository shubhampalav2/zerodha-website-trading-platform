const mongoose = require("mongoose");
const StockSchema = require("../schemas/StockSchema");

module.exports = mongoose.model("stock", StockSchema);