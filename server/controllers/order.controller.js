const { Order, CartProduct } = require("../models");

module.exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.tokenData.id;
    const cart = req.tokenData.cart;

    const cartProducts = await CartProduct.find({ cart }).populate(
      "product",
      "name price"
    );

    if (!cartProducts.length) {
      return res.status(400).json({ message: "cart is empty" });
    }

    const totalPrice = cartProducts.reduce((accumulator, currentValue) => {
      const price = currentValue.product?.price || 0;
      const quantity = currentValue.quantity || 1;
      return accumulator + price * quantity;
    }, 0);

    // const order = await Order.create({
    //   user: userId,
    //   cartProduct: cartProducts.map((item) => item._id),
    //   totalPrice,
    // });

    const order = await Order.create({
      user: userId,
      cartProduct: cartProducts.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice,
    });

    await CartProduct.deleteMany({ cart });

    console.log(order);

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    console.log(orders);

    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserOrders = async (req, res, next) => {
  try {
    const user = req.tokenData.id;

    const orders = await Order.find({ user }).populate({
      path: "cartProduct",
      populate: {
        path: "product",
        select: "name price images",
      },
    });

    console.log(orders);

    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};
