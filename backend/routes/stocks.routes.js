const express = require("express");

const getStocks = require("../controllers/stocks.controllers");

const router = express.Router();

router.get("/stocks", getStocks);

module.exports = router;