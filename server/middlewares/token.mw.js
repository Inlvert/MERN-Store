const createHttpErrors = require("http-errors");
const JwtService = require("../services/jwt.service");
const { RefreshToken } = require("../models");

module.exports.checkAccessToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      return next(createHttpErrors(401, "Access token required"));
    }

    const [type, token] = authorization.split(" ");

    const tokenPayload = await JwtService.verifyAccessToken(token);

    req.tokenData = tokenPayload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { refreshToken },
    } = req;

    if (!refreshToken) {
      return next(createHttpErrors(400, "Refresh token required"));
    }

    const tokenPayload = await JwtService.verifyRefreshToken(refreshToken);

    const tokenInstance = await RefreshToken.findOne({
      token: refreshToken,
      userId: tokenPayload.id,
    });

    if (!tokenInstance) {
      return next(createHttpErrors(404, "Refresh token does not exists"));
    }

    req.tokenInstance = tokenInstance;

    next();
  } catch (error) {
    next(error);
  }
};
