const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http");

const { dbConnection } = require("./config/dbConnect");
const { initializePriceSimulator } = require("./services/priceSimulator");
const { initializeSocket } = require("./sockets/socket");

const authRoutes = require("./routes/auth.routes");
const stockRoutes = require("./routes/stocks.routes");
const orderRoutes = require("./routes/order.routes");
const holdingRoutes = require("./routes/holding.routes");
const watchlistRoutes = require("./routes/watchlist.routes");

//Initialize the server
const app = express();

//using middleware for enabling the cors
app.use(cors());


//Using middleware to parse json data
app.use(express.json());

const authMiddleware = require("./middlewares/auth.js");


//creating a middleware for verifying the authentication
app.use("/api/v1/dashboard", authMiddleware)

//Mount the API's
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', stockRoutes);
app.use('/api/v1/dashboard', orderRoutes);
app.use('/api/v1/dashboard', holdingRoutes);
app.use('/api/v1/dashboard', watchlistRoutes);

const port = process.env.PORT || process.env.port || 7000;

//Default route
app.get('/', (req, res) => {
    res.send("Welcome to TangelTrader Server");
})

async function startServer() {
    try {
        await dbConnection();
        console.log("Database connected");
        await initializePriceSimulator();
        const server = http.createServer(app);
        initializeSocket(server);
        server.listen(port, () => {
            console.log(`Server is working at port: ${port}`);
        });
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
}

startServer();

//invalid route middleware
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "The resource your are trying to look does not exist on our server"
    })
})