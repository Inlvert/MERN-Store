const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: [true, 'product name is required'] },
  description: { type: String },
  images: [{ type: String }],
  price: { type: Number },
});

const Product = model("Product", productSchema);

module.exports = Product;
