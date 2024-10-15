import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success:true, data: products });
  } catch (error) {
    console.log('Error in Fetch products:', error.message);
    res.status(500).json({ success:false, message: "Server Error" });    
  }
};

// once we create a product, we return it under "data"
export const createProduct = async (req, res) => {         // good practise to include /api in the URL
  const product = req.body;     // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message: 'Please enter all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success:true, data: newProduct });   // use 201 for successful creation
  } catch (error) {
    console.log('Error in Create product:', error.message);
    res.status(500).json({ success:false, message: "Server Error" });    // using 500 since its an internal server error
  } 
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;                         

  const product = req.body;                     // the fields user wants to update

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success:false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new:true });   // new:true returns the updated document
    res.status(200).json({ success:true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success:false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;                         // destructure the "id" from the URL passed by the user
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success:false, message: "Invalid Product ID" });
  }
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success:true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error in Delete product:', error.message);
    res.status(500).json({ success:false, message: "Server Error" }); 
  }
};