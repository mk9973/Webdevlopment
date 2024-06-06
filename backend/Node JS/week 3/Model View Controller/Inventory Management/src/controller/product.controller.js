import path from 'path';
import ProductModel from '../model/product.model.js'


class ProductController
{
    getProducts(req,res,next)
    { 
        //here get() is static method in Product Model thats we can't intantiated, direct use it
        var products=ProductModel.get();

        res.render("products",{products: products});
        // normally path.resolve() tells the currcnt directory path but here it tells the index.js path
        //bacuse it basicaaly tells us the path of current executing directory and you are running or excuting the application from index.js 
        //return res.sendFile(path.join(path.resolve(),'src','view','products.html'));
    }

    getAddProduct(req,res,next)
    {
        res.render("new-product",{errorMessage:null});
    }

    
    //this is for manually input the url
    // postAddProduct(req,res,next)
    // {
    //     //this validate code seperated by middleware in different file for better performance
    //     //validate data
    // //   const {name, price,imageUrl}=req.body;

    // //   let errors=[];
    // //   // if name is undefined or name is empty
    // //   if(!name || name.trim()=='')
    // //   {
    // //       errors.push('Name is required');
    // //   }

    // //   //if price is undefined or not less than 1
    // //   if(!price || parseFloat(price)<1)
    // //   {
    // //       errors.push("Price must be a positive value");
    // //   }

    // //   // if url not in url format then it throw error
    // //   try{
    // //       const validUrl=new URL(imageUrl);
    // //   }catch(err){
    // //       errors.push("URL is invalid");
    // //   }

    // //   //agar ek se bhi jyada error hua to it will pass the first error to 'new-product'
    // //   if(errors.length>0)
    // //   {
    // //       return res.render('new-product',{
    // //           errorMessage: errors[0],
    // //       });
    // //   }
      
    //     //access data from form
    //     ProductModel.add(req.body);
    //     var products=ProductModel.get();
    //     return res.render("products",{products});
    // }
    

    //this is for upload the image file
    postAddProduct(req,res,next)
     {
       // access data from form
       const {name,desc,price}=req.body;

       const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name,desc,price,imageUrl);
        var products=ProductModel.get();
         res.render("products",{products});
        
     }
    
    getUpdateProductView(req,res,next)
    {
        //1. if product exist then return product view
        //'req.params.id'--> it is an object which access all the url parameter which you defined in url
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(productFound)
        {
            res.render('update-product',{product:productFound, errorMessage:null});
        }
        //2. else return errors.
        else
        {
            res.status(401).send('Product not found');
        }
    }

    //update the existing product
    postUpdateProduct(req,res)
    {
        ProductModel.update(req.body);
        var products=ProductModel.get();
         res.render("products",{products});
    }

    //delete the existing product
    deleteProduct(req,res)
    {
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(!productFound)
        {
            return res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        var products=ProductModel.get();
        res.render("products",{products});
    }
}
export default ProductController;
