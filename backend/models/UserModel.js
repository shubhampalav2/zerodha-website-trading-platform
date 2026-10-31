const mongoose = require("mongoose");

const UserSchema = require("../schemas/UserSchema");

//creating a model from the user schema
const UserModel = mongoose.model("user", UserSchema, "users");

module.exports = UserModel;