import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();

const url = process.env.DB_URL;

export const connectUsingMongoose=async()=>{
    try{
        await mongoose.connect(url,{
            //both below is used in previous version not now
            // useNewUrlParser:true,
            // useUnifiedTopology: true
        }).then(()=>{
            console.log("Mongoose connected using mongoose");
            addCategories();
        }
        ).catch(err=>console.log(err));
    }catch(err){
        console.log("Error while connect to db");
        console.log(err);
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model('Category',categorySchema);
    const categories= await CategoryModel.find();
    if(!categories || categories.length==0)
    {
        await CategoryModel.insertMany([
            {
                name:'Books'
            },
            {
                name:'Clothing'
            },
            {
                name:'Electronics'
            }
        ])
    }
    console.log("Categories are added");
}