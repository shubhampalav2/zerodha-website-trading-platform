const express = require("express");
const dotenv = require("dotenv");
const User = require("./models/UserModel");

const { dbConnection } = require("./config/dbConnect");
const { default: RegexStore } = require("../frontend/src/utils/RegexStore");
//Loading all the configurations in the process object
dotenv.config();

//Initialize the server
const app = express();

//Using middleware to parse json data
app.use(express.json());

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

app.post('/auth/login', async (req, res) => {
    console.log("Request is ", req.body);
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
        return res.status(422).json({
            message: "Validation Error.Email and Password are required to login",
            success: false
        })
    }

    if (!RegexStore.emailRegex.test(email)) {
        return res.status(422).json({
            message: "Validation Error.Please enter valid email",
            success: false
        })
    }

    if (!RegexStore.passwordRegex.test(password)) {
        return res.status(422).json({
            message: "Validation Error.Password must contains one uppercase,one lowercase,one digit,one special letter",
            success: false
        })
    }


    try {
        //Find the user in database
        const user = await User.findOne({ userName: email })

        //If user not present in database
        if (!user) {
            return res.status(422).json({
                message: "Invalid credentials Please correct username and password",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully Login"
        });
    }
    catch (err) {

        res.status(500).send("Something Went Wrong");
    }
})

app.post('/auth/signup', async (req, res) => {
    const { fullName, mobileNumber, password, email } = req.body;

    //validations
    if (!fullName || !RegexStore.fullNameRegex.test(fullName)) {
        return res.status(422).json({
            message: "Fullname is not valid",
            success: false
        })
    }

    if (!mobileNumber || !RegexStore.mobileRegex.test(mobileNumber)) {
        return res.status(422).json({
            message: "MobileNumber is not valid",
            success: false
        })
    }

    if (!password || !RegexStore.passwordRegex.test(password)) {
        return res.status(422).json({
            message: "Password is not valid",
            success: false
        })
    }

    if (!email || !RegexStore.emailRegex.test(email)) {
        return res.status(422).json({
            message: "Email is not valid",
            success: false
        })
    }

    try {
        //Verify whether user already exists
        const user = await User.findOne({ userName: email });
        if (user) {
            return res.status(422).json({
                success: false,
                message: "User already exist in the database"
            })
        }

        //Create a new user and store that in the database
        await User.create({
            userName: email,
            password,
            mobileNumber,
            fullName
        })

        return res.status(200).json({
            success: true,
            message: "User successfully registered to Zerodha account"
        })
    }
    catch (err) {
        res.status(500).send("Something Went Wrong");
    }
})
