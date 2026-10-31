//Listing

const express = require("express");
const { fetchOrders, createOrder } = require("../controllers/orders.controllers");
const router = express.Router();

//GET Request-> Fetch all the Orders for particular user
router.get("/orders", fetchOrders)

//POST Request-> Create new order
router.post("/orders", createOrder)

module.exports = router;