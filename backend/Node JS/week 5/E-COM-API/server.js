//first install npm
//second install express then make server file

//const express=require('express');    //common module
import express from "express";   //ES6 module but you have to also add "type":"module" in json file
import swagger from "swagger-ui-express";
import cors from "cors";
//import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
//import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
//import apiDocs under swagger ui express
//here only javascript module should imported but here it is json module so we have to explicitly type:'json' 
//import apiDocs from "./swagger2.0.json" assert{type:'json'};
import apiDocs from "./swagger3.0.json" assert{type:'json'};
//import logger middleware
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
const server=express();

//CORS policy configuration
//here we are using cors library , it allow all origins,hearder,method etc.
//first install -->  'npm i cors' and import
server.use(cors());


// CORS policy configuration
// server.use((req, res, next)=>{
//     //here if you add '*' --> instead of 'http://localhost:9971'then give access to all the web browser clients or origin
//     res.header('Access-Control-Allow-Origin','http://localhost:9971');
//     //here we allow all the headers using '*' if you allow specific header the you you can add 'Content-Type,Authorization')
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     // return ok for preflight request.
//     if(req.method=="OPTIONS"){
//       return res.sendStatus(200);
//     }
//     next();
//   })

server.use(loggerMiddleware);
//server.use(bodyParser.json());  // for using this you have to install and import the parser
server.use(express.json());

//for all requests related tp product, redirect to product routes.
//localhost:9973/api/products

server.use("/api/products",jwtAuth,productRouter);
server.use("/api/users",userRouter);
server.use("/api/cartItems",jwtAuth,loggerMiddleware,cartRouter);

//first import swagger ui express
server.use("/api-docs",swagger.serve, swagger.setup(apiDocs));



server.get('/',(req,res)=>{
    return res.send("Welcome to E-commerce API ");
});

//Middleware to handle 404 request when no url matched
server.use((req,res)=>{
    return res.status(404).send("API not Found. Please check documentation for more information on http://localhost:9971/api-docs");
})

server.listen(9971,()=>{
    console.log("Server is on port 9971");
});
