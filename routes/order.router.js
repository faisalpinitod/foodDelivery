const express=require('express')
const { OrderModel } = require("../model/order.model")

const orderRouter=express.Router()

orderRouter.post("/orders",async(req,res)=>{
    const data=req.body
    try{
        const order=new OrderModel(data)
        await order.save()
        res.status(201).send("Order is placed")
        console.log(order)
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


// --------------------GET ORDER------------------


orderRouter.get("/orders/:id",async(req,res)=>{
    const data=req.query
    const id=req.params.id
    try{
        const order=await OrderModel.findOne({_id:id})   
        res.status(200).send(order)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})





// --------------------CHANGE STATUS---------------------


orderRouter.patch("/orders/:id",async(req,res)=>{
    const data=req.body
    const id=req.params.id
    try{
        const order=await OrderModel.findByIdAndUpdate({_id:id},data)   
        res.status(204).send("Order updated")
        console.log(order)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


module.exports={
    orderRouter
}