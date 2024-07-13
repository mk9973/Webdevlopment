import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel= mongoose.model('Product',productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel=mongoose.model("Category",categorySchema);
class ProductRepository{

    constructor(){
        this.collection="products";
    }
    async add(productData){
        try{

            //1. Add the product
            productData.categories=productData.category.split(',').map(e=> e.trim());
            console.log(productData);
            const newProduct= new ProductModel(productData);
            const savedProduct= await newProduct.save();
            
            //2. Update the categories.
            await CategoryModel.updateMany(
                {
                    _id:{$in: productData.categories}
                },
                {
                    $push:{products: new ObjectId(savedProduct._id)}
                }
            )


            // //1. Get the DB
            // const db=getDB();
            // const collection=db.collection(this.collection);
            // await collection.insertOne(newProduct);
            // return newProduct;
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
        }catch(err){
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
    //Product should have min Price specified and category
    async filter(minPrice,categories){
        try{
            const db= getDB();
            const collection=db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)};
            }
            // if(maxPrice){
                
            //     filterExpression.price={...filterExpression.price,$lte:parseFloat(maxPrice)};
            // }

            //like categories=['Cat1','Cat2']
            categories=JSON.parse(categories.replace(/'/g, '"'))
            console.log(categories);
            if(categories){
                //if there is not any operator
                //filterExpression.category=category;

                //if there is only one category
                //"AND" operator
                //filterExpression={$and:[{category:category}, filterExpression]}
                
                //"OR" operator
                //filterExpression={$or:[{category:category}, filterExpression]}

                //if there are many category using "IN" operator
                filterExpression={$and:[{category:{$in:categories}}, filterExpression]}


                
            }
            //projection operator is used show thw particular attribute
            //1--> show hoga, 0--> show ni hoga
            //id --> default show karega hi , agar hatana h to '0' karna hoga
            // ratings:{$slice:1}} --> pehla user ka rating dikhega bs agar slice hata de to sb user ka rating dikhega
            //ratings:{$slice:-1}} --> for last rating
            //ratings:{$slice:2}} --> first two rating
            return await collec
            tion.find(filterExpression).project({name:1,price:1, _id:0,ratings:{$slice:-1}}).toArray();

           // return await collection.find(filterExpression).toArray();
        }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with Database",500);
    }
    }
    async rate (userID, productID, rating){
        try{
            // 1. Check if product exists
            const productToUpdate = await ProductModel.findById(productID);
            if(!productToUpdate){
                throw new Error("Product not found")
            }

            // Find the existing review
            const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
            if(userReview){
                userReview.rating = rating;
                await userReview.save();
            }else{
                const newReview = new ReviewModel({
                    product: new ObjectId(productID),
                    user: new ObjectId(userID),
                    rating: rating
                });
                newReview.save();
        }
        //     const db= getDB();
        //     const collection=db.collection(this.collection);
           
           
        //    //1. Method 
        //     //Removes existing entry
        //     await collection.updateOne({
        //         _id: new ObjectId(productID) 
        //     },{
        //         $pull:{ratings:{userID:new ObjectId(userID)}}
        //     })

        //    //add new rating
        //     await collection.updateOne({
        //         _id: new ObjectId(productID) 
        //     },{
        //         $push:{ratings:{userID:new ObjectId(userID), rating}}
        //     })


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

    async averageProductPricePerCategory(){
       try{
            const db=getDB();
            return await db.collection(this.collection)
            .aggregate([
                {
                    //Stage 1: Get Average price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();

    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with Database",500);
    }
    }


}

export default ProductRepository;