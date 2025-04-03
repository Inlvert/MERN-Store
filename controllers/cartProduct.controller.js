const { CartProduct } = require("../models");

// module.exports.createOrder = async (req, res, next) => {
//   try {
//     const { cart, body } = req;
//     const order = await CartProduct.create({
//       ...body,
//       cartId: cart._id,
//     });

//     res.status(201).send({ data: order });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.findAllCartProducts = async (req, res, next) => {
  try {
    const { cart } = req;

    console.log('cart id is: ', cart._id,)

    const cartProducts = await CartProduct.find({
      cart: cart._id,
    }).populate("products");

    console.log(cartProducts);

    res.send({ data: cartProducts });
  } catch (error) {
    next(error);
  }
};

// module.exports.getCartOrder = async (req, res, next) => {
//   try {
//     const {
//       params: { orderId },
//       cart: { _id: cartId },
//     } = req;

//     const order = await CartProduct.findOne({
//       _id: orderId,
//       cartId,
//     });

//     console.log(order);

//     res.send({ data: order });
//   } catch (error) {
//     next(error);
//   }
// };
