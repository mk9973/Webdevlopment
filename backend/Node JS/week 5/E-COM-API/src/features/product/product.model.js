import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel{

    constructor(name,desc,price,imageUrl,category,sizes,id){

      // console.log("id:"+id);
      // console.log("name:"+name);
      // console.log("desc:"+desc);
      // console.log("id:"+id);
      // console.log("id:"+id);
      // console.log("id:"+id);

        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category = category;
        this.sizes=sizes;
    }

    

   

    //if you delete the product and after when add another product then product it will create duplicates
    //So it will resolve when database comes into picture 
    static add(product){
        product.id=products.length+1;
        products.push(product);
        return product;
    }

    static get(id){
      const product=products.find((i)=>i.id==id);
      return product;
    }
    
    static getAll()
    {
        return products;
    }

    static  filter(minPrice, maxPrice, category){
      const result=products.filter((product)=>{
        return (
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice) &&
          (!category || product.category==category)
      );
      });
      console.log(result)
      return result;
      
    }

    static rateProduct(userID, productID, rating){
      //1. Validate user and product
      const user=UserModel.getAll().find(u=> u.userID==userID);
     
      if(!user){
        //User-defined Error
       // throw new Error("User not found");
       throw new ApplicationError("User not found",404);
      }

      //Validate product
      const product=products.find((p)=>p.id==productID);
      if(!product){
        //throw new Error("Product not found");
        throw new ApplicationError("Product not found",400);
      }

      //2. Check if there are any rating and if not then add ratings array
      if(!product.ratings){
        product.ratigs=[];
        product.rating.push({
          userID: userID,
          rating: rating,
        });
      }else{
        //3. check if user rating is alread available
        if(existingRatingIndex >= 0)
          {
            product.ratings[existingRatingIndex]={
              userID: userID,
              rating: rating,
            };
          }
          else{
            //4. if no existing rating , then add new rating.
            product.rating.push({
              userID: userID,
              rating: rating,
            });
          }
      }
    } 
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M', 'XL','S']
    )];