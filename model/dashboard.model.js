

const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    FirstName : String,
    LastName  : String,
    Email     : String,
    Department: String,
    Salery  :   Number
})

  const userModel = mongoose.model("user",userSchema)

  module.exports = {
    userModel
  }