import { Document, Schema, model } from "mongoose";

export interface ICategoryModel extends Document {
    categoryName: string;
}

const CategorySchema = new Schema<ICategoryModel>({
    categoryName: {
        type: String,
        required: [true, "Category name is required"],
        minlength: [3, "Category name must be at least 3 characters long"],
        maxlength: [50, "Category name must be less than 50 characters long"],
    },
}, {
    versionKey: false,
});

export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");