const express = require("express");

const router = express.Router();

const fetchHoldings = require("../controllers/holdings.controllers.js");

const getPortfolio = require("../controllers/portfolio.controllers.js");

//GET Request-> Fetch all the Holdings for particular user
router.get("/holdings", fetchHoldings);

//GET Request-> Fetch the portfolio for the logged user
router.get("/portfolio", getPortfolio);

module.exports = router;