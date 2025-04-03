const createHttpError = require("http-errors");
const { Cart } = require("../models");

module.exports.findCart = async (req, res, next) => {
  try {
    const {
      params: { cartId },
    } = req;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return next(createHttpError(404, "cart not found"));
    }

    console.log(cart)

    req.cart = cart;

    next();
  } catch (error) {
    next(error);
  }
};
