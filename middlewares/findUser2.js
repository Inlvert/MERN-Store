const createHttpError = require("http-errors");
const { User2 } = require("../models");

module.exports.findUser2 = async (req, res, next) => {
  try {
    const {
      params: { user2Id },
    } = req;
    const user = await User2.findById(user2Id);

    if (!user) {
      return next(createHttpError(404, "user not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};