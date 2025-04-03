const { Cart } = require("../models");

module.exports.createCart = async (req, res, next) => {
  try {
    const {body} = req;

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

    const cart = await Cart.findById(cartId);

    // console.log(cart);
    // console.log(user);

    res.send({ data: cart });
  } catch (error) {
    next(error);
  }
};

module.exports.getCarts = async (req, res, next) => {
  try {

    const carts = await Cart.find();

    res.send({data: carts})
    
  } catch (error) {
    next(error)
  }
}