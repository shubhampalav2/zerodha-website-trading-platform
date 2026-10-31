const express = require("express");

const router = express.Router();

const fetchHoldings = require("../controllers/holdings.controllers.js");

//GET Request-> Fetch all the Holdings for particular user
router.get("/holdings", fetchHoldings);

module.exports = router;