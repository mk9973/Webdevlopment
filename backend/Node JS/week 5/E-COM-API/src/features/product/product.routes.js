//Manage routes/paths to ProductController

//1. Import express

import express from 'express';
import ProductController from './product.controller';

//2. Initialize Express router.
const router = express.Router();

const productController = new ProductController();

//ALl the Paths to controller methods.
//localhost/api/products

router.get("/",productController.getAllProducts);
router.post("/",productController.addProduct);
export default router;