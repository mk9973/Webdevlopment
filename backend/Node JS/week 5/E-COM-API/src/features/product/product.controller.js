import ProductModel from "./product.model.js";

export default class ProductController{

    getAllProducts(req,res){

        const products=ProductModel.getAll();
        res.status(200).send(products);
    }0

    addProduct(req,res){
        //"req.body" gives undefined when client send json file req to server
        //because for passing json file client to server we have install "npm i body-parser" 
        // console.log(req.body);
        // console.log("this is a request");
        // res.status(200).send("Post request recieved");

        const {name,price,sizes}=req.body;
        const newProduct={
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl:req.file.filname,
        };

        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req,res){
        const userID=req.query.userID;
        const productID=req.query.productID;
        const rating = req.query.rating;
        try{
            ProductModel.rateProduct(userID, productID,rating);
        }catch(err){
            return res.status(400).send(err.message);
        }
            return res.status(200).send("Product rating is done");
    }


    getOneProduct(req,res){
        const id =req.params.id;
        const product=ProductModel.get(id);
        if(!product){
            res.status(404).send('Product not Found');
        }
        else{
            return res.status(200).send(product);
        }
    }
    filterProducts(req,res){   
        const minPrice=req.query.minPrice;
        const maxPrice=req.query.maxPrice;
        const category=req.query.category;
        const result=ProductModel.filter(
            minPrice,
            maxPrice,
            category
        );
        res.status(200).send(result);

    }


}