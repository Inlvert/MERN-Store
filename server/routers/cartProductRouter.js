const cartProductRouter = require("express").Router();
const cartProductController = require("../controllers/cartProduct.controller");

cartProductRouter
  .route("/")
  .get(cartProductController.findAllCartProducts);

// cartProductRouter.route("/:orderId").get(orderController.getCartOrder);

module.exports = cartProductRouter;
