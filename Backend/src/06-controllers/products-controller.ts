import { ProductModel } from './../03-models/product-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/products-logic";

// Create a router object
const router = express.Router();

// Get all products from the database
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProducts();
        response.json(products);
    } catch (err: any) {
        next(err);
    }
});

// Get products by category
router.get("/:categoryId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getProductsByCategory(request.params.categoryId);
        response.json(products);
    } catch (err: any) {
        next(err);
    }
});

// Get one product from the database
router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = await logic.getOneProduct(request.params._id);
        response.json(product);
    } catch (err: any) {
        next(err);
    }
});

// Add a new product to the database
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    } catch (err: any) {
        next(err);
    }
});

// Update a product 
router.put("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updateProduct(product);
        response.json(updatedProduct);

    } catch (err: any) {
        next(err);
    }
});

// Delete product from the database
router.delete("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteProduct(_id);
        response.status(204).send();
    } catch (err: any) {
        next(err);
    }
});


export default router;
