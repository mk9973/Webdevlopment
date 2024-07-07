import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository= new ProductRepository();
    }

    async getAllProducts(req,res){
        try{
        const products=await this.productRepository.getAll();
        res.status(200).send(products);
        }catch(err){
            console.log(err);
           return res.status(200).send("Something went wrong");
        }
    }

    async addProduct(req,res){
        //"req.body" gives undefined when client send json file req to server
        //because for passing json file client to server we have install "npm i body-parser" 
        // console.log(req.body);
        // console.log("this is a request");
        // res.status(200).send("Post request recieved");
        try{
            console.log(req.body);
        const {name,price,sizes}=req.body;
        const newProduct=new ProductModel(name,null,parseFloat(price),req.file.filename,null,sizes.split(','));

        const createdProduct=await this.productRepository.add(newProduct);
        res.status(201).send(createdProduct);
        }catch(err){
            console.log(err);
           return res.status(200).send("Something went wrong");
        }
    }

    async rateProduct(req,res){
        try{
        const userID=req.userID;
        const productID=req.body.productID;
        const rating = req.body.rating;
        
           await this.productRepository.rate(userID, productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
            return res.status(200).send("Product rating is done");
    }


    async getOneProduct(req,res){

        try{
            const id =req.params.id;
            const product=await this.productRepository.get(id);
            if(!product){
                res.status(404).send('Product not Found');
            }else{
                return res.status(200).send(product);
            }
            }catch(err){
                console.log(err);
               return res.status(200).send("Something went wrong");
            }   
    }
   async filterProducts(req,res){   
    try{
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result=await this.productRepository.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);
    }catch(err){
        console.log(err);
       return res.status(200).send("Something went wrong");
    } 
    }


}