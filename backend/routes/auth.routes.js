const express = require("express");

const {
    loginHandler,
    signUpHandler
} = require("../controllers/auth.controllers");

const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signUpHandler);

module.exports = router;