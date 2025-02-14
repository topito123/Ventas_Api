
import Product from "./Product";

export const createProduct = async (data) => {
    const newProduct = new Product(data);
    return await newProduct.save();
};

export const getAllProducts = async () => {
    return await Product.find();
};

export const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw  new Error ("Product not found");
    return product;
};

export const updateProduct = async (id, data) => {
    const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true});
    if (!updateProduct) throw new Error("Product not found")
        return updateProduct
};

export const deleteProduct = async (id) => {
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) throw new Error("Product not found")
        return deleteProduct;
};

