import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

// get all products
router.get('/', getProducts);

// creating a product
router.post('/', createProduct);

// updating a product
router.put('/:id', updateProduct);

// deleting a product
router.delete('/:id', deleteProduct);

export default router;