const { CartProduct } = require("../models");

module.exports.findAllProductFromCartProduct = async (req, res, next) => {
  try {
    const foundProducts = await CartProduct.find();

    res.send({ data: foundProducts });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProductQuantity = async (req, res, next) => {
  try {
    const {
      params: { cartProductId },
      body: { quantity },
    } = req;

    const updatedCartProduct = await CartProduct.findByIdAndUpdate(
      cartProductId,
      { quantity },
      { new: true }
    ).populate("product", "name price");

    res.send({ data: updatedCartProduct });

  } catch (error) {
    next(error);
  }
};
