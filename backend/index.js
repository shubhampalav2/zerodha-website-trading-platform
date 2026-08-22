const express = require("express");
const dotenv = require("dotenv");

const { dbConnection } = require("./config/dbConnect");

const authRoutes = require("./routes/auth.routes");
const stockRoutes = require("./routes/stocks.routes");

//Loading all the configurations in the process object
dotenv.config();

//Initialize the server
const app = express();

//Using middleware to parse json data
app.use(express.json());

const authMiddleware = require("./middlewares/auth.js");

//creating a middleware for verifying the authentication
app.use("/api/v1/dashboard", authMiddleware)

//Mount the API's
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', stockRoutes);

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

//invalid route middleware
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "The resource your are trying to look does not exist on our server"
    })
})