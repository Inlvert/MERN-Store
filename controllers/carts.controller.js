const { Cart } = require("../models");

module.exports.createCart = async (req, res, next) => {
  try {
    const { body } = req;

    const cart = await Cart.create(body);

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports.getCart = async (req, res, next) => {
  try {
    const {
      params: { cartId },
    } = req;

    const cart = await Cart.findById(cartId)
      .populate("user", "firstName")
      .populate({
        path: "cartProducts",
        populate: {
          path: "product",
          select: "name description images price"
        },
      });
    

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports.getCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();

    res.send({ data: carts });
  } catch (error) {
    next(error);
  }
};
