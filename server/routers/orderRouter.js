const orderRouter = require("express").Router();
const orderConroller = require("../controllers/order.controller");
const { checkAccessToken } = require("../middlewares/token.mw");

orderRouter.route("/").post(checkAccessToken, orderConroller.createOrder);

module.exports = orderRouter;
