//first install npm
//second install express then make server file

//const express=require('express');    //common module
import express from "express";   //ES6 module but you have to also add "type":"module" in json file
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
const server=express();

//server.use(bodyParser.json());  // for using this you have to install ans import the parser
server.use(express.json());
//for all requests related tp product, redirect to product routes.
//localhost:9973/api/products

server.use("/api/products",jwtAuth,productRouter);
server.use("/api/users",userRouter);

server.get('/',(req,res)=>{
    return res.send("Welcome to E-commerce API ");
});


server.listen(9971,()=>{
    console.log("Server is on port 9971");
});
