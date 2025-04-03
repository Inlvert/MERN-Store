const { Schema, model } = require("mongoose");

const cartProductSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    quantity: { type: Number },
  },
  { timestamps: true }
);

const CartProduct = model("CartProduct", cartProductSchema);

module.exports = CartProduct;
