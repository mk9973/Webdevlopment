//when you 'ejs' install, it update the package.json file

import express from 'express'
import ProductController from './src/controller/product.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js' 
const server=express();

server.use(express.static('public'));
//middleware for parse form data() --> it take the data and parse it and put it inside the body
server.use(express.urlencoded({extended : true}));

//setup view engine setting (first install) --> 'npm i ejs'
server.set('view engine', 'ejs');
//here we have to only mention the path of folder which contained 'ejs' file not file
//path of our views
server.set('views',path.join(path.resolve(),'src','views'))

//middleware for 'ejs layouts' first install --> 'npm i express-ejs-layouts'
server.use(ejsLayouts);

//create an instance of product controller
const productController= new ProductController();

//when path is default then it will call productController.getProducts method
server.get('/',(productController.getProducts));

//when path is '/new' then it will call productController.getAddForm method
server.get('/new',(productController.getAddProduct));

//when path is '/update-product' with id then it will call productController.getAddForm method
server.get('/update-product/:id',productController.getUpdateProductView);

//when path is '/delete-product' then it will call productController.getAddForm method
server.post('/delete-product/:id',productController.deleteProduct);

//when path is default then it will call productController.postAddProduct method
server.post('/',validationMiddleware,(productController.postAddProduct));

//when path is '/update-product' then it will call productController.postUpdateProduct method
server.post('/update-product',(productController.postUpdateProduct));

server.use(express.static('src/views'));

server.listen(3500);
console.log('Server is listening on port 3500');