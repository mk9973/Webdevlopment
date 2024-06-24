//first install npm
//second install express then make server file

//const express=require('express');    //common module
import express from "express";   //ES6 module but you have to also add "type":"module" in json file
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";

const server=express();

server.use(bodyParser.json());
//for all requests related tp product, redirect to product routes.
//localhost:9973/api/products

server.use("/api/products",productRouter);

server.get('/',(req,res)=>{
    return res.send("Welcome to E-commerce API ");
});


server.listen(9971,()=>{
    console.log("Server is on port 9971");
});
