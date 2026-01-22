import { Product } from "./products.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or Server Error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json({
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({ message: "Incorrect information: " + error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "The product you want to update was not found." });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating: " + error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "The product you want to delete was not found." });
        }

        res.status(200).json({
            success: true,
            message: "The product has been successfully deleted.",
            data: deletedProduct
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete product: " + error.message });
    }
};