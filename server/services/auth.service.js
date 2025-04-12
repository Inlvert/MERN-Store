const createHttpError = require("http-errors");
const { RefreshToken, User } = require("../models");
const JwtService = require("./jwt.service");

module.exports.createSession = async (user) => {
  const tokenPayload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const tokenPair = await JwtService.createTokenPair(tokenPayload);

  await RefreshToken.create({
    token: tokenPair.refreshToken,
    userId: user._id,
  });

  return {
    user,
    tokenPair,
  };
};

module.exports.refreshSession = async (refreshTokenInstance) => {
  const user = await User.findById(refreshTokenInstance.userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const tokenPayload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const tokenPair = await JwtService.createTokenPair(tokenPayload);

  await RefreshToken.findOneAndUpdate(
    { token: refreshTokenInstance.token },
    { token: tokenPair.refreshToken }
  );

  return {
    user,
    tokenPair,
  };
};
