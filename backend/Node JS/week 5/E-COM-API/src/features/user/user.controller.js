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

export default class UserController{
    async signUp(req,res){
        const {name, email, password, type}=req.body;

        const user=await UserModel.signUp(name, email, password, type);
        res.status(201).send(user);
    }

    signIn(req,res){
        const result = UserModel.signIn(
            req.body.email,
            req.body.password
        );

        if(!result){
            return res.status(400).send("Incorrect Credentials");
        }else{
            //1. Create Our token
            //you should't store sensitive data in payload like password but you can stor id,email,etc.
            const token=jwt.sign({userID: result.id, email: result.email},'FajKSq7ckDgv8alY0rdNTUvuePvSwvBw',  // it is online key generator from "https://randomkeygen.com/"
                {
                    expiresIn: '1h',   //token will expire in one hour
                }
            );    

            //2. Send token
            return res.status(200).send(token);
        }
    }
}