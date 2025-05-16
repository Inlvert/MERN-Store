const cartProductRouter = require("express").Router();
const cartProductController = require("../controllers/cartProduct.controller");
const { findCart } = require("../middlewares/findCart");

cartProductRouter
  .route("/")
  .get(cartProductController.findAllProductFromCartProduct);

cartProductRouter
  .route("/:cartProductId")
  .put(cartProductController.updateProductQuantity);

module.exports = cartProductRouter;
