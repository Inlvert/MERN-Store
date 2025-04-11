const { User } = require("../models");
const createHttpErrors = require("http-errors");
const AuthService = require("../services/auth.service");


module.exports.registration = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

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
  } catch (error) {
    next(error);
  }
};
