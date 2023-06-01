const express=require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.router")
const { restaurantRouter } = require("./routes/restaurent.router")
const  { orderRouter } = require ("./routes/order.router")



const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/user",userRouter)
app.use("/restaurent",restaurantRouter)
app.use("/order",orderRouter)

app.listen(7070,async()=>{
    try{
        await connection
        console.log("The server is connected to DB")
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
    console.log("The server is running at port 7070")
})