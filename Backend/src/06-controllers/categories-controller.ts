import express, { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../03-models/category-model";
import logic from "../05-bll/categories-logic";

// Create router object
const router = express.Router();

// Get all categories
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await logic.getAllCategories();
        response.json(categories);
    } catch (err: any) {
        next(err);
    }
});

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const category = new CategoryModel(request.body);
        const addedCategory = await logic.addCategory(category);
        response.status(201).json(addedCategory);
    } catch (err: any) {
        next(err);
    }
});

export default router;