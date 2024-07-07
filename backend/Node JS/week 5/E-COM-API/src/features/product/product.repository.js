import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository{

    constructor(){
        this.collection="products";
    }
    async add(newProduct){
        try{
            //1. Get the DB
            const db=getDB();
            const collection=db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }

    async getAll(){
        try{
            const db= getDB();
            const collection=db.collection(this.collection);
            const products= await collection.find().toArray();
            return products;
        }catch{
            console.log(err);
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }

    async get(id){
        try{
            const db= getDB();
            const collection=db.collection(this.collection);
            return await collection.findOne({_id:new ObjectId(id)});
        }catch{
            console.log(err);
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }
    async filter(minPrice,maxPrice,category){
        try{
            const db= getDB();
            const collection=db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)};
            }
            if(maxPrice){
                
                filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)};
            }
            if(category){
                filterExpression.category=category;
            }
            return await collection.find(filterExpression).toArray();
        }catch{
        console.log(err);
        throw new ApplicationError("Something went wrong with Database",500);
    }
    }
    async rate (userID, productID, rating){
        try{
            const db= getDB();
            const collection=db.collection(this.collection);
           
           
           //1. Method 
            //Removes existing entry
            await collection.updateOne({
                _id: new ObjectId(productID) 
            },{
                $pull:{ratings:{userID:new ObjectId(userID)}}
            })

           //add new rating
            await collection.updateOne({
                _id: new ObjectId(productID) 
            },{
                $push:{ratings:{userID:new ObjectId(userID), rating}}
            })


        //2. Method 
        //here there is a problem when two computer with same user , rating at the same time then it will create problem thats why we used first method
        
         //1. Find the Product
         //const product=await collection.findOne({_id:new ObjectId(productID)});
         //2. Find the rating
        // const userRating=product?.ratings?.find(r=>r.userID==userID);
        //     if(userRating){
        //         //3. Update the rating
        //         await collection.updateOne({
        //             _id:new ObjectId(productID),"ratings.userID": new ObjectId(userID)
        //         },{
        //             $set:{
        //                 "ratings.$.rating":rating
        //             }
        //         })
        //    }else{
        //     await collection.updateOne({
        //         _id: new ObjectId(productID) 
        //     },{
        //         $push:{ratings:{userID:new ObjectId(userID), rating}}
        //     })
        //    }
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with Database",500);
        }
    }


}

export default ProductRepository;