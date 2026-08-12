const express = require("express");

const getStocks = require("../controllers/stocks.controllers");

const router = express.Router();

router.get("/", getStocks);

module.exports = router;