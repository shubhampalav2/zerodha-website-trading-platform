const RegexStore = require("../utils/RegexStore");
const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();


const loginHandler = async (req, res) => {
    console.log("Request is ", req.headers);
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
            return res.status(401).json({
                message: "Invalid credentials.Please enter correct username and password",
                success: false
            })
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

        //If password is incorrect,password does not match
        if (!isSamePassword) {
            return res.status(401).json({
                message: "Invalid credentials Please enter correct username and password",
                success: false
            })
        }
        const payload = {
            username: user.userName,
            userId: user._id
        }
        //Creating a jwt token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "8h"
        })

        res.cookie("tokenCookie", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        })
        res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
            authToken: token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something Went Wrong");
    }
};

const signUpHandler = async (req, res) => {
    const { fullName, mobileNumber, password, email } = req.body;
    console.log("Request is ", req.body);
    //validations
    if (!fullName || !RegexStore.userName.test(fullName)) {
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

        //hash the password
        let hashedPassword = await bcrypt.hash(password, 10);
        //Create a new user and store that in the database
        const data = await User.create({
            userName: email,
            password: hashedPassword,
            mobileNumber,
            fullName
        })

        // Create a jwt token
        const payload = {
            userName: fullName,
            email: email,
            userId: data._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "8h"
        });

        return res.status(200).json({
            success: true,
            message: "User successfully registered to Zerodha account",
            authToken: token
        })
    }
    catch (err) {
        res.status(500).send("Something Went Wrong");
    }
}

module.exports = { loginHandler, signUpHandler }