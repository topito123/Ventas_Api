import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} from "./product.service.js";

export const getProducts = async (req, res) => {
    try{
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    export const getProduct = async (req, res) => {
        try{
            const product = await getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
            } catch (error) {
                res.status(500).json({ error: error.message });
        }
    };

    export const createProduct = async (req, res) => {
        try{
            const newProduct = await createProduct(req.body);
            res.status(201).json(newProduct)            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

export const updateProduct = async (req, res) => {
    try{
        const updateProduct = await updateProduct(req.params.id, req.body);
        if (!updateProduct){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updateProduct);
    } catch (error){
        res.status(400).json({ error: error.message})
    }
};

export const deleteProduct = async (req, res) => {
    try{
        const deleteProduct = await deleteProduct(req.params.id);
        if (!deleteProduct){
            return res.status(404).json({ message: " Product not found " })
        }
        res.status(204).send();
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    