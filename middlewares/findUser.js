const createHttpError = require("http-errors");
const { User } = require("../models");

module.exports.findUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findById(userId);

    if (!user) {
      return next(createHttpError(404, "user not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
