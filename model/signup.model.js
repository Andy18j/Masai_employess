

const mongoose = require("mongoose")

const signupSchema = mongoose.Schema({
    email : String,
    password : String,
    confirm_password : String
})

const signupModel = mongoose.model("signup",signupSchema)


module.exports = {
    signupModel
}