const mongoose = require("mongoose");

const OrderSchema = require("../schemas/OrderSchema");

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;