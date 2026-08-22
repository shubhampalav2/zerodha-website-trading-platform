const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization Token is Required"
            });
        }
        //verifying the authenticity
        jwt.verify(token, process.env.JWT_SECRET);
        console.log("User is authenticated");
        //If user is successfully authenticated then call the next
        next();
    }
    catch (err) {
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Invalid or Expired Access Token"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = authMiddleware;