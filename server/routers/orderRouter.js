const orderRouter = require("express").Router();
const orderController = require("../controllers/order.controller");
const { checkAccessToken } = require("../middlewares/token.mw");

orderRouter
  .route("/")
  .post(checkAccessToken, orderController.createOrder)
  .get(orderController.getAllOrders);

orderRouter
  .route("/my-orders")
  .get(checkAccessToken, orderController.getAllUserOrders);

module.exports = orderRouter;
