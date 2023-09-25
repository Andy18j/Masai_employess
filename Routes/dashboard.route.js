const express = require("express")

const {userModel} = require("../model/dashboard.model")



const userRouter = express.Router()

userRouter.post("/employees",async(req,res)=>{
   try{ 
      const {FirstName,LastName,Email,Department,Salary} = req.body
      const user = await userModel({FirstName,LastName,Email,Department,Salary})
       await user.save()
       res.status(201).json({msg:"user are posted sucessfully✅"})
   }
   catch(err){
    res.status(501).json({msg:"user are not posted"})
    console.log(err.err)
   }
})


userRouter.get("/employees",async(req,res)=>{
    try{
        let data = await userModel.find();
        res.status(201).json({msg:"users data are here",user:data})
    }
    catch(err){
        res.status(501).json({msg:"user are not found"})
        console.log(err.err)
    }

})



userRouter.delete("/employees",async(req,res)=>{
    try{
            const user = await userModel.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"user are deleted sucessfully"})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"something went wrong"})
    }
})


userRouter.get("/employees",async(req,res)=>{
    const {order} = req.query
    try{
        const sortedbysalery = await userModel.find().sort({Salary:order})
        res.status(201).json({msg:"Salery Sorted by Employyess"})

    }
    catch(err){
        console.log(err.err)
        res.status(501).json({msg:"something went wrong"})
    }
})





module.exports = {
    userRouter
}