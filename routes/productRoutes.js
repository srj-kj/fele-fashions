import express from "express";
import { addProduct, addcategory, category, product } from "../controller/productController.js";

const router = express.Router();


router.post('/product/category/save',addcategory)

router.get('/product/categories',category);


router.get('/product/list',product)

router.post('/product/save',addProduct)


export default router;
