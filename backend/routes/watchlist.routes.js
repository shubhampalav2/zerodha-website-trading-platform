const express = require("express");

const router = express.Router();

const { fetchWatchlist, createWatchlist, removeStockFromWatchlist } = require("../controllers/watchlist.controllers");

//GET Route Returns particular watchlist data
router.get("/watchlist", fetchWatchlist);

//POST Route Add the stock to a particular watchlist
router.post("/watchlist", createWatchlist);

//Delte Route For deleting the stock from particular watchlist
router.delete('/watchlist', removeStockFromWatchlist);

module.exports = router;