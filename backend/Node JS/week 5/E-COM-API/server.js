//first install npm
//second install express then make server file

//const express=require('express');    //common module
import express from "express";   //ES6 module but you have to also add "type":"module" in json file
import * as ProductRouter from './src/features/product/product.routes';

const server=express();

//for all requests related tp product, redirect to product routes.
//localhost:9973/api/products
server.use("/api/products",ProductRouter);

server.get('/',(req,res)=>{
    return res.send("Welcome to E-commerce API ");
});


server.listen(9973,()=>{
    console.log("Server is on port 9973");
});
