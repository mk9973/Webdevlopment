//first install mongodb npm --> "npm install mongodb"

import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();

//you can copy this string from mongodb application and after '/' we have added 'ecomdb'
//const url ="mongodb://localhost:27017/ecomdb" --> instead of hard code we have used environment variables
//const url = process.env.DB_URL;

// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
//const url = "mongodb://127.0.0.1:27017/ecomdb";
let client;
export const connectToMongoDB = ()=>{
     MongoClient.connect(process.env.DB_URL)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
        })
        .catch(err=>{
            console.log(err);
        })
}
export const getDB=()=>{
    //here we have to add the database name client.db('ecomdb') but we have already added in url
    return client.db();
}
