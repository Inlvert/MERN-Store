const { Product, Cart, CartProduct } = require("../models");

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body, files } = req;

    const images = files.map((file) => file.filename);

    const product = await Product.create({ ...body, images });

    console.log(product);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    res.status(201).send({ data: product });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      query: { page = 1, limit = 5 },
    } = req;

    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments();

    console.log(products);

    res.send({
      data: products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductById = async (req, res, next) => {
  try {
    const { product } = req;

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
      $push: { cartProducts: cartProduct._id },
    });

    res
      .status(200)
      .json({ message: "Product added to cart", data: cartProduct });
  } catch (error) {
    next(error);
  }
};
