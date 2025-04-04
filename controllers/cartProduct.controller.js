const { CartProduct } = require("../models");

module.exports.findAllCartProducts = async (req, res, next) => {
  try {
    const { cart } = req;

    console.log('cart id is: ', cart._id,)

    const cartProducts = await CartProduct.find({
      cart: cart._id,
    });

    console.log(cartProducts);

    res.send({ data: cartProducts });
  } catch (error) {
    next(error);
  }
};
