import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, {
  timestamps: true     // automatically create fields createdAt and updatedAt for each document
});

const Product = mongoose.model('Product', productSchema);
// We say "Product" is the model/collections name but mongoose will automatically conver it to "products" in the database

export default Product;