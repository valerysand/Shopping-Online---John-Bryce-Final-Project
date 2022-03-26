import mongoose from "mongoose";
import { CategoryModel, ICategoryModel } from "../03-models/category-model";
import ClientError from "../03-Models/client-error";



// Get all categories from the database
async function getAllCategories():Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

// Get a category by id
async function getOneCategory(_id: string): Promise<ICategoryModel> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // Check if _id is valid
    const category = await CategoryModel.findById(_id).exec();
    if (!category) throw new ClientError(404, `Category with id ${_id} not found`);
    return category;
}

// Add categories to the database
async function addCategory(category: ICategoryModel): Promise<ICategoryModel> {
    // Validate errors
    const errors = category.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    // Save category
    return category.save();
}


export default {
    getAllCategories,
    getOneCategory,
    addCategory

}