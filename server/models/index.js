const mongoose = require("mongoose");
const { DB_URL } = require("../constants");
const User = require("./user");
const Cart = require("./cart");
const Product = require("./product");
const User2 = require("./user2");
const Message = require("./message");
const CartProduct = require("./cartProduct");
const RefreshToken = require("./refreshToken");
const Order = require("./order");

async function connectToDb() {
  await mongoose.connect(DB_URL);
}

connectToDb().catch((err) => console.log(err));

module.exports = {
  User,
  Cart,
  Product,
  CartProduct,
  User2,
  Message,
  RefreshToken,
  Order
};
