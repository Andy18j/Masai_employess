const express = require('express')
const { connection } = require('mongoose')
require("dotenv").config()
const config = require("./config/db")
const cors = require("cors")
const { SignupRouter} = require("./Routes/signup.routes")
// const {signinRouter} = require("./Routes/signin.routes")
const {userModel, userRouter} = require("./Routes/dashboard.route")

const app = express()
app.use(express.json())
app.use(cors())


app.use("",SignupRouter)
// app.use("",signinRouter)
app.use("",userRouter)



app.get("/",(req,res)=>{
    res.send("Home Page 🏠")
})



app.listen(process.env.port,async()=>{
    try{
         await connection
         console.log("connected to the db")
    }
    catch(err){
        console.log(err)
    }
    console.log(`port is running at the ${process.env.port}`)
})