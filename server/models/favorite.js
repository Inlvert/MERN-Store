const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
