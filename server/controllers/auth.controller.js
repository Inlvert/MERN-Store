const { User, Cart, Favorite } = require("../models");
const createHttpErrors = require("http-errors");
const AuthService = require("../services/auth.service");

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const cart = await Cart.create({ userId: user._id });
    
    user.cart = cart._id;
    
    const favorite = await Favorite.create({ user: user._id });

    user.favorite = favorite._id;

    await user.save();

    console.log(user)

    const userWithToken = await AuthService.createSession(user);

    res.status(201).send({ data: userWithToken });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createHttpErrors(404, "invalid data"));
    }

    if (user.password !== password) {
      return next(createHttpErrors(404, "invalid data"));
    }

    const userWithToken = await AuthService.createSession(user);

    res.send({ data: userWithToken });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { tokenInstance } = req;

    const userWithToken = await AuthService.refreshSession(tokenInstance);
    res.send({ data: userWithToken });
  } catch (error) {
    next(error);
  }
};
