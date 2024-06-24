//Manage routes/paths to ProductController

//1. Import express

import express from 'express';
import UserController from './user.controller.js';

//2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

//ALl the Paths to controller methods.
userRouter.post("/signup", userController.signIn);
userRouter.get('/signin',userController.signUp);


export default userRouter;