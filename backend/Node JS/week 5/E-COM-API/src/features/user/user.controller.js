//It is Basic Authentication

// import UserModel from "./user.model.js";

// export default class UserController{
//     signUp(req,res){
//         const {name, email, password, type}=req.body;

//         const user=UserModel.signUp(name, email, password, type);
//         res.status(201).send(user);
//     }

//     signIn(req,res){
//         const result = UserModel.signIn(
//             req.body.email,
//             req.body.password
//         );

//         if(!result){
//             return res.status(400).send("Incorrect Credentials");
//         }else{
//             return res.send('Login Succesful')
//         }
//     }
// }

//Now we are using jwt-->JSON Web Token
//first install "npm i jsonwebtoken"
//import jwt

import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";  //first install --> 'npm i bcrypt'

export default class UserController{

    constructor(){
        this.userRepository =new UserRepository();
    }

    async resetPassword(req,res,next){
        const {newPassword}=req.body;
        const hashedPassword =await  bcrypt.hash(newPassword,12);
        const userID=req.userID;

        try{
            await this.userRepository.resetPassword(userID,hashedPassword);
            res.status(200).send("Password is Updated");
        }catch(err){
            console.log(err);
            console.log("Passing error to middleware");
            next(err);
        }
    }

    async signUp(req,res,next){
    try{
        const {name, email, password, type}=req.body;

       //here 12 -> is salt which made unique password, jitna bara salt utna time lagega hash karne me
       //salt append to hash
       //Create a hash from password
       
       //for check the validation of password you to comment the const hashedPassword 
       //and UserModel ke andar hashedPassword ke jagah password likh do 
       //const hashedPassword =await  bcrypt.hash(password,12);

        const user=new UserModel(name, email, password, type);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
        }catch(err){
            next(err);
        }
    }

   async signIn(req,res,next){
       try{ 
        // 1. Find user by email
        const user = await this.userRepository.findByEmail(req.body.email);
        if(!user){
            return res.status(400).send("Incorrect Credentials");
        } 
        else{
            //2 . Compare password with hashed password
            const result=  await bcrypt.compare(req.body.password, user.password);
            if(result){
            //3. Create Our token
            //you should't store sensitive data in payload like password but you can stor id,email,etc.
            const token=jwt.sign({userID: user._id, email: user.email},process.env.JWT_SECRET,  // it is online key generator from "https://randomkeygen.com/"
                {
                    expiresIn: '1h',   //token will expire in one hour
                }
            );    

            //4. Send token
            return res.status(200).send(token);
            }else{
                return res.status(400).send("Incorrect Credentials");
            }
        }
    }catch(err){
           console.log(err);
           return res.status(200).send("Something went wrong");
    }
    }
}