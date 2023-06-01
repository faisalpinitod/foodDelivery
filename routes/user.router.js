const express=require('express')
const { UserModel } = require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body
    try{
        bcrypt.hash(password,5,async(req,hash)=>{
            const user=new UserModel({name,email,password:hash,address})
            await user.save()
            console.log(user)
            res.status(201).send("User is registered")
        })
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await UserModel.findOne({email})
        if(!user){
            res.send("Invalid User")
        }
        const hashPassword=user?.password
        bcrypt.compare(password,hashPassword,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},'MASAI')
                res.status(201).send({"MSG":"Login Successful",token})
            }else{
                res.send("Wrong Credentials")
            }
        })
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
})

// ---------------------------RESET PASSWORD---------------------

userRouter.put("/:id/reset",async(req,res)=>{
    const {password,newpassword}=req.body
    const id=req.params.id
    
    try{
        const maina=await UserModel.findOne({_id:id})
        if(!maina){
            res.send('Invalid User')
        }
        bcrypt.compare(password,maina.password,(err,result)=>{
            if(result){
                bcrypt.hash(newpassword,5,async(req,hash)=>{
                    const user=await UserModel.findByIdAndUpdate({_id:id},{password:hash})
                    console.log(user)
                    res.status(204).send("password is updated")  
                })
                
            }else{
                res.send("Wrong Credentials")
            }
        })            
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
})


userRouter.get("/",async(req,res)=>{
    const query=req.query
    try{
        const user=await UserModel.find(query)
       res.send(user)

    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
})





module.exports={
    userRouter
}