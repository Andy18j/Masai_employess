const express = require('express')
const {signupModel} = require("../model/signup.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const SignupRouter = express.Router()


SignupRouter.post("/signup",async(req,res)=>{
     try {
          const {email,password,confirm_password} = req.body
          
          const user = await signupModel.findOne({email})
          if (user) {
            return res.status(204).json({msg:"this user already present!! Login Please"})
          }

          const hash = await bcrypt.hash(password,6)

          const newUser = new signupModel({email,password:hash,confirm_password:hash})

          await newUser.save()

          res.status(201).json({msg:"Singup Sucessfully 🥳"})

     }
     catch(err){
        res.status(501).json({msg:"wrong credentials"})
        console.log(err)
     }
})



SignupRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body

        const isuserpresent = await signupModel.findOne({email})

        if (!isuserpresent) return res.status(501).json({msg:"user not present!! please signUp"})

        const ispasscorrect = await bcrypt.compare(password,isuserpresent.password)

        const token =  jwt.sign({userId:isuserpresent._id},"secret",{
            expiresIn:"5min"
        })
        if (ispasscorrect){
            return res.status(201).json({msg:"Login Sucessfully🥳 ",token})
        }else{
            res.status(501).json({msg:"wrong credentials"})
        }

        // res.status(201).json({msg:"Login Sucessfully ✅✅"})

    }
    catch(err){
        console.log(err,err)
        res.status(501).json({msg:"wrong credentials"})
        }
})


module.exports={
    SignupRouter
}