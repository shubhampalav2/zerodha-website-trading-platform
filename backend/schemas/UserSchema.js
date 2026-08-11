const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    fullName: {
        type: "String",
        required: true
    },
    mobileNumber: {
        type: "String",
        required: true,
        maxLength: 10
    }
});


module.exports = UserSchema;