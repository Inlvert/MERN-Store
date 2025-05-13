const cartRouter = require("express").Router();
const cartController = require("../controllers/carts.controller");
const { findCart } = require("../middlewares/findCart");
const cartProductRouter = require("./cartProductRouter");

cartRouter
  .route("/")
  .post(cartController.getCart);
  // .get(cartController.getCarts);

// cartRouter.route("/:cartId").get(cartController.getCart);

// cartRouter.use("/:cartId/cartproducts", findCart, cartProductRouter);

module.exports = cartRouter;
