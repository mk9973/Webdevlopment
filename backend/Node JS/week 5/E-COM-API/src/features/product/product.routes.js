//Manage routes/paths to ProductController

//1. Import express

import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

//2. Initialize Express router.
const productRouter = express.Router();

const productController = new ProductController();

//ALl the Paths to controller methods.
//localhost/api/products
// localhost:9971/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter',productController.filterProducts);
productRouter.get("/",productController.getAllProducts);
productRouter.post("/",upload.single('imageUrl'), productController.addProduct);
productRouter.get('/:id',productController.getOneProduct);
productRouter.get('/rate',productController.rateProduct);

export default productRouter;