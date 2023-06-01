const express=require('express')
const { RestaurantModel } = require("../model/restaurent.model")

const restaurantRouter=express.Router()


// ----------------------------POST RESTAURENT------------------------

restaurantRouter.post("/restaurents",async(req,res)=>{
    const data=req.body
    try{
        const restaurant=new RestaurantModel(data)
        await restaurant.save()
        res.send("Restaurent is added")
        console.log(restaurant)
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



// ---------------------------GET RESTAURENT---------------------------

restaurantRouter.get("/restaurents",async(req,res)=>{
    const data=req.query
    try{
        const restaurant=await RestaurantModel.find(data)   
        res.status(200).send(restaurant)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



// ----------------------------GET SPECIFIC RESTAURENRT--------------------



restaurantRouter.get("/restaurents/:id",async(req,res)=>{
    const data=req.query
    const id=req.params.id
    try{
        const restaurant=await RestaurantModel.findOne({_id:id})   
        res.status(200).send(restaurant)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})






// ---------------------------GET MENU------------------------


restaurantRouter.get("/restaurents/:id/menu",async(req,res)=>{
    const id=req.params.id
    try{
        const restaurant=await RestaurantModel.findOne({_id:id})   
        res.status(200).send(restaurant.menu)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})

// -------------------------MENU ADDED------------------------


restaurantRouter.put("/restaurents/:id/menu",async(req,res)=>{
    const data=req.body
    const id=req.params.id
    try{
        const rest=await RestaurantModel.findOne({_id:id})

        const restaurant=await RestaurantModel.findByIdAndUpdate({_id:id},{menu:[...rest.menu,data]})

        res.status(201).send("The menu is updated")
        console.log(restaurant)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})





// --------------------------delte perticular menu---------------------


restaurantRouter.delete("/restaurents/:id/menu/:id",async(req,res)=>{
    const data=req.body
    const id=req.params.id
    try{
        const rest=await RestaurantModel.findOne({_id:id})

        const restaurant=await RestaurantModel.findByIdAndUpdate({_id:id},{menu:[...rest.menu]})

        res.status(201).send("The menu is deleted")
        console.log(restaurant)
       
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})





module.exports={
    restaurantRouter
}


