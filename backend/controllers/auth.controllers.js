const RegexStore = require("../utils/RegexStore");
const User = require("../models/UserModel");
const loginHandler = async (req, res) => {
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
}

module.exports = { loginHandler, signUpHandler }