const cartRouter = require("express").Router();
const cartController = require("../controllers/carts.controller");
const { findCart } = require("../middlewares/findCart");
const orderRouter = require("./orderRouter");

cartRouter.route("/").post(cartController.createCart).get(cartController.getCarts);

cartRouter.route("/:cartId").get(cartController.getCart);

cartRouter.use("/:cartId/orders",findCart, orderRouter);

module.exports = cartRouter;
