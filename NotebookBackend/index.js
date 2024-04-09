const connectToMongo = require("./db");
const express=require("express");
connectToMongo();

const app=express();
const port=2000;

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
    console.log(`server connected at ${port}`);
})

