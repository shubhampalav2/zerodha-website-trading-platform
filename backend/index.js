const express = require("express");
const dotenv = require("dotenv");

const { dbConnection } = require("./config/dbConnect");

const authRoutes = require("./routes/auth.routes");
const stockRoutes = require("./routes/stocks.routes");

const StockModel = require("./models/StockModel");
const getStocks = require("./controllers/stocks.controllers");
//Loading all the configurations in the process object
dotenv.config();

//Initialize the server
const app = express();

//Using middleware to parse json data
app.use(express.json());

//Mount the API's
app.use('/auth', authRoutes);
app.use('/stocks', stockRoutes);

const port = process.env.PORT || process.env.port || 3000;

//Default route
app.get('/', (req, res) => {
    res.send("Welcome to Zerodha Server");
})

async function startServer() {
    try {
        await dbConnection();
        console.log("Database connected");

        app.listen(port, () => {
            console.log(`Server is working at port: ${port}`);
        });
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
}

startServer();