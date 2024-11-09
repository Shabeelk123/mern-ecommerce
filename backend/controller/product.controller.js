import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({ success: true, data: allProducts})
    } catch (error) {
        console.log('error in fetching all products');
        res.status(500).json({ success: false, message: error.message})
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        console.log(product);
        return res.status(400).json({ success: false, message: 'please provide all fields'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.log('error in create product api', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ success: false, message: 'Invalid product id'});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        console.log('error in product update', error);
        res.status(500).json({ success: false, message: 'server error'});
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: 'Invalid product id'});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'product deleted'});
    } catch (error) {
        console.log('error in product deletion', error);
        res.status(500).json({ success: false, message: 'server error' });
    }
};