export default class ProductModel{

    constructor(id,name,desc,imageUrl,category,price,sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.imageUrl=imageUrl;
        this.price=price;
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

    static filter(minPrice, maxPrice, category){
      const result=products.filter((product)=>{
        return (
          (!minPrice || product.price >= minPrice) &&
          (!maxPrice || product.price <= maxPrice) &&
          (!category || product.category==category)
      );
      });
      return result;
    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];