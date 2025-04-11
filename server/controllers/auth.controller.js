const { User, RefreshToken } = require("../models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const createHttpErrors = require("http-errors");

const jwtSign = promisify(jwt.sign);

module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const accessToken = await jwtSign(tokenPayload, "aa11", {
      expiresIn: "60000ms",
    });

    const refreshToken = await jwtSign(tokenPayload, "bb22", {
      expiresIn: "5d",
    });

    await RefreshToken.create({ token: refreshToken, userId: user._id });

    res
      .status(201)
      .send({ data: { user, tokenPair: { accessToken, refreshToken } } });
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

    const tokenPayload = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const accessToken = await jwtSign(tokenPayload, "aa11", {
      expiresIn: "60000ms",
    });

    const refreshToken = await jwtSign(tokenPayload, "bb22", {
      expiresIn: "5d",
    });

    await RefreshToken.create({ token: refreshToken, userId: user._id });

    res
      .status(201)
      .send({ data: { user, tokenPair: { accessToken, refreshToken } } });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
