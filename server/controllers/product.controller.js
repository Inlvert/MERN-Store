const { Product, Cart, CartProduct } = require("../models");

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await Product.create(body);

    console.log(product);

    res.status(201).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    console.log(products);

    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId);

    console.log(product);

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.addProductToCart = async (req, res, next) => {
  try {
    const {
      params: { productId },
      body: { cartId, quantity },
    } = req;

    console.log("productId", productId);
    console.log("cartId", cartId);
    console.log("quantity", quantity);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartProduct = await CartProduct.create({
      cart: cart._id,
      product: productId,
      quantity: 1,
    });

    await cart.updateOne({
      $push: { cartProducts: cartProduct._id}
    })

    res.status(200).json({ message: "Product added to cart", data: cartProduct });
  } catch (error) {
    next(error);
  }
};
