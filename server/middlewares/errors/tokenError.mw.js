const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");

module.exports = async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    return res.status(419).send({
      errors: ["Token expired"],
    });
  }

  if (err instanceof JsonWebTokenError) {
    return res.status(401).send({
      errors: [err.message],
    });
  }

  next(err);
};
