import { Document, Schema, model } from "mongoose";
import { UploadedFile } from "express-fileupload";
import { CategoryModel } from "./category-model";

export interface IProductModel extends Document {
    name: string;
    categoryId: Schema.Types.ObjectId;
    price: number;
    imageUrl: string;
    image: UploadedFile;
}

const ProductSchema = new Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [50, "Product name must be less than 50 characters long"],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    imageUrl: {
        type: String,
    },
    image: {
        type: Schema.Types.ObjectId,
    },
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,

});

// Virtuals
ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true,
});


export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");