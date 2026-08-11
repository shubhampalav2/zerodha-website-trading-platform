const mongoose = require("mongoose");

async function dbConnection() {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error("MONGO_URL is missing. Add it to your .env file.");
    }

    return mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000,
    });

}

module.exports = { dbConnection };
