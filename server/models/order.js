const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    cartProduct: [{
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
