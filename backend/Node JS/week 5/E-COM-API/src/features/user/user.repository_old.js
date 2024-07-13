import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";


class UserRepository{


    async signUp(newUser){
        //here we are using mongo database
        //in asynchronous operation we should always use 'try'- 'catch' block
        try{
        //1. Get the database
        const db= getDB();
        //2. Get the coleection
        const collection=db.collection("users");
        //3. Insert the document.
        await collection.insertOne(newUser)
            return newUser;
        }catch(err){
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }
    async signIn(email,password){
        //here we are using mongo database
        //in asynchronous operation we should always use 'try'- 'catch' block
        try{
        //1. Get the database
        const db= getDB();
        //2. Get the coleection
        const collection=db.collection("users");
        //3. Findthe document.
       return await collection.findOne({email,password});

        }catch(err){
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }

    // async findByEmail(email){
    //     //here we are using mongo database
    //     //in asynchronous operation we should always use 'try'- 'catch' block
    //     try{
    //     //1. Get the database
    //     const db= getDB();
    //     //2. Get the coleection
    //     const collection=db.collection("users");
    //     //3. Findthe document.
    //    return await collection.findOne({email});

    //     }catch(err){
    //         throw new ApplicationError("Something went wrong with Database",500);
    //     }
    // }
}

export default UserRepository;