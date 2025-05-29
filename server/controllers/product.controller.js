const { Product, Cart, CartProduct, User, Favorite } = require("../models");

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
      product,
      body: { quantity },
      tokenData: { id },
    } = req;

    const user = await User.findById(id).populate("cart");

    const cart = user.cart;
    console.log(cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingCartProduct = await CartProduct.findOne({
      cart: cart._id,
      product: product._id,
    });

    let cartProduct;

    if (existingCartProduct) {
      existingCartProduct.quantity += quantity;
      await existingCartProduct.save();
      cartProduct = existingCartProduct;
    } else {
      cartProduct = await CartProduct.create({
        cart: cart._id,
        product: product._id,
        quantity,
      });
      cart.cartProducts.push(cartProduct._id);
      await cart.save();
    }

    res
      .status(200)
      .json({ message: "Product added to cart", data: cartProduct });
  } catch (error) {
    next(error);
  }
};

module.exports.addProductToFavorite = async (req, res, next) => {
  try {
    const {
      tokenData: { id: userId },
      product: { _id: productId },
    } = req;

    const favorite = await Favorite.findOne({ user: userId });
    
    console.log("favorite", favorite);
    if (!favorite.products.includes(productId)) {
      favorite.products.push(productId);
      await favorite.save();
    }

    res.status(200).json({ message: "Product added to favorites", favorite });
  } catch (error) {
    next(error);
  }
};
