//Manage routes/paths to ProductController

//1. Import express

import express from 'express';
import UserController from './user.controller.js';

//2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

//ALl the Paths to controller methods.
//userRouter.post("/signin", userController.signIn);
userRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res);
});

//userRouter.post("/signup",userController.signUp);
userRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res);
});


export default userRouter;