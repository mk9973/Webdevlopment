//when you 'ejs' install, it update the package.json file

import express from 'express'
import ProductController from './src/controller/product.controller.js'
import UserController from './src/controller/user.controller.js'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js' 
import  {uploadFile}  from './src/middlewares/file.upload.middleware.js'
import session from 'express-session'
import { auth } from './src/middlewares/auth.middleware.js'
const server=express();
//it makes the public folder directly usable at any where
server.use(express.static('public'));

// session install ->> 'npm i express-session' and here i implement
server.use(
    session(
        {
            secret:'SecretKey',
            resave: false,
            saveUninitialized: true,
            //here we use 'secure:false' because we are using  'http'->false not 'https'->true
            cookie:{secure: false},
        }
    )
)

//middleware for parse form data() --> it take the data and parse it and put it inside the body
server.use(express.urlencoded({extended : true}));

//setup view engine setting (first install) --> 'npm i ejs '
server.set('view engine', 'ejs');
//here we have to only mention the path of folder which contained 'ejs' file not file
//path of our views
server.set('views',path.join(path.resolve(),'src','views'))

//middleware for 'ejs layouts' first install --> 'npm i express-ejs-layouts'
server.use(ejsLayouts);

//create an instance of product controller
const productController= new ProductController();

//create an instance of user controller
const usersController =new UserController();


//when path is default then it will call productController.getProducts method
server.get('/',auth,(productController.getProducts));

//when path is '/new' then it will call productController.getAddForm method
server.get('/new',auth,(productController.getAddProduct));

//when path is '/update-product' with id then it will call productController.getAddForm method
server.get('/update-product/:id',auth,productController.getUpdateProductView);

//when path is '/delete-product' then it will call productController.getAddForm method
server.post('/delete-product/:id',auth,productController.deleteProduct);

//when path is default then it will call productController.postAddProduct method
//first upload upload then validate otherwise it shows error
server.post('/',uploadFile.single('imageUrl'),auth,validationMiddleware,(productController.postAddProduct));

//when path is '/update-product' then it will call productController.postUpdateProduct method
server.post('/update-product',auth,(productController.postUpdateProduct));

//when path is '/register' then it will call usersController.getRegister method
server.get('/register',usersController.getRegister);

server.get('/login',usersController.getLogin);

server.post('/register',usersController.postRegister);

server.post('/login',usersController.postLogin);

server.get('/logout',usersController.logout);

server.use(express.static('src/views'));

server.listen(3700);
console.log('Server is listening on port 3500');