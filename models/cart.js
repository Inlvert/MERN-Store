const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    cartProducts: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
