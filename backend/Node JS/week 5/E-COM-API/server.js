//sbse upar 'dotevn' config karna h warna undefined de dega 'url' aur 'jwt' me 
import dotenv from "dotenv";   //--> first install -->'npm i dotenv'
//load all the environment variables in application
dotenv.config();

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
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.routes.js";
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
server.use("/api/orders",jwtAuth,orderRouter);
server.use("/api/products",jwtAuth,productRouter);
server.use("/api/users",userRouter);
server.use("/api/cartItems",jwtAuth,loggerMiddleware,cartRouter);
server.use("/api/likes",jwtAuth,likeRouter);


//first import swagger ui express
server.use("/api-docs",swagger.serve, swagger.setup(apiDocs));

//Error handler middleware
//it will handle both server and user-defined error 
// server.use((err,req,res,next)=>{
//     console.log(err);
//     res.status(503).send("Something went wrong please try later");
// })

//same as above only one thing is added
server.use((err,req,res,next)=>{
        console.log(err);
        if(err instanceof mongoose.Error.ValidationError){
            return res.status(400).send(err.message);
        }
        if(err instanceof ApplicationError){
            return res.status(err.code).send(err.message);
        }
        res.status(500).send("Something went wrong please try later");
     })

//Default request handler
server.get('/',(req,res)=>{
    return res.send("Welcome to E-commerce API ");
});

//Middleware to handle 404 request when no url matched
server.use((req,res)=>{
    return res.status(404).send("API not Found. Please check documentation for more information on http://localhost:9971/api-docs");
})

server.listen(9971,()=>{
    console.log("Server is on port 9971");
    //connectToMongoDB();
    connectUsingMongoose();
});
