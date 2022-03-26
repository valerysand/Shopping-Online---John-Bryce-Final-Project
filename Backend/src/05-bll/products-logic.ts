import ClientError from '../03-Models/client-error';
import mongoose from 'mongoose';
import { v4 as uuid } from "uuid";
import { IProductModel, ProductModel } from '../03-models/product-model';


// Get all products from the database
async function getAllProducts(): Promise<IProductModel[]> {
    return ProductModel.find().populate("category").exec();
}

// Get products by category
async function getProductsByCategory(categoryId: string): Promise<IProductModel[]> {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) throw new ClientError(404, `_id ${categoryId} not valid`); // Check if _id is valid
    const products = await ProductModel.find({ categoryId: categoryId }).exec();
    if (!products) throw new ClientError(404, `Products with categoryId ${categoryId} not found`);
    return products;

}

// Get a product by id
async function getOneProduct(_id: string): Promise<IProductModel> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // Check if _id is valid
    const product = await ProductModel.findById(_id).exec();
    if (!product) throw new ClientError(404, `Product with id ${_id} not found`);
    return product;
}

// Add a new product to the database
async function addProduct(product: IProductModel): Promise<IProductModel> {
    // Validate errors
    const errors = product.validateSync();
    if (errors) throw new ClientError(400, errors.message);
    // const extension = product.image.name.substr(product.image.name.lastIndexOf("."));
    // product.imageUrl = uuid() + extension;
    // Save the image to the disc
    // await product.image.mv("./src/assets/images/products/" + product.imageUrl);
    // Delete image from the model
    // delete product.image;
    // Save product
    return product.save();
}

// Update a product
async function updateProduct(product: IProductModel): Promise<IProductModel> {
    if (!mongoose.Types.ObjectId.isValid(product._id)) throw new ClientError(404, `_id ${product._id} not valid`); // Check if _id is valid
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ClientError(404, `Product with id ${product._id} not found`);

    return updatedProduct;
}

// Delete a product
async function deleteProduct(_id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // Check if _id is valid
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new ClientError(404, `Product with id ${_id} not found`);
}

export default {
    getAllProducts,
    getProductsByCategory,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};
