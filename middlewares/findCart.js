const createHttpError = require("http-errors");
const { Cart } = require("../models");

module.exports.findCart = async (req, res, next) => {
  try {
    const {
      params: { cartId },
    } = req;

    const foundCart = await Cart.findById(cartId);

    if (!foundCart) {
      return next(createHttpError(404, "cart not found"));
    }

    console.log(foundCart)

    req.cart = foundCart;

    next();
  } catch (error) {
    next(error);
  }
};
