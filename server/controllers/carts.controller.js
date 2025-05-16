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
      body: { cartId },
    } = req;

    const cart = await Cart.findById(cartId)
      .populate("user", "firstName")
      .populate({
        path: "cartProducts",
        populate: {
          path: "product",
          select: "name category description images price",
        },
      });

    // Total price
    const totalPrice = cart.cartProducts.reduce((accumulator, currentValue) => {
      const price = currentValue.product?.price || 0;
      const quantity = currentValue.quantity || 1;
      return accumulator + price * quantity;
    }, 0);

    console.log('totalPrice', totalPrice)
    console.log('cart', cart)

    res.send({ data: cart, totalPrice });
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
