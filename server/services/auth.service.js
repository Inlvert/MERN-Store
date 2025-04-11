const { RefreshToken } = require("../models");
const jwtService = require("./jwt.service");

module.exports.createSession = async (user) => {
  const tokenPayload = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const tokenPair = await jwtService.createTokenPair(tokenPayload);

  await RefreshToken.create({
    token: tokenPair.refreshToken,
    userId: user._id,
  });

  return {
    user,
    tokenPair,
  };
};
