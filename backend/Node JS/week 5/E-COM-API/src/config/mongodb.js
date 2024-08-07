//first install mongodb npm --> "npm install mongodb"

import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// dotenv.config();


// const url = process.env.DB_URL;
// console.log("URL: "+url);
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
            createCounter(client.db());
            createIndexes(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}
export const getDB=()=>{
    //here we have to add the database name client.db('ecomdb') but we have already added in url
    return client.db();
}


const createCounter = async(db)=>{
    const existingCounter=await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId', value:0});
    }
}

const createIndexes = async (db)=>{
    try{
        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1, category:-1});
        await db.collection("products").createIndex({desc:"text"});

    }catch(arr){
        console.log(arr);
    }
    console.log("Indexes are created");
}