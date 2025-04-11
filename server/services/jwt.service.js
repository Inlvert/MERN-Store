const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtSign = promisify(jwt.sign);
const jwtVerify = promisify(jwt.verify);

const tokenConfig = {
  access: {
    secret: "aa11",
    expiresIn: "60000ms",
  },
  refresh: {
    secret: "bb22",
    expiresIn: "5d",
  },
};

const createToken = (payload, { secret, expiresIn }) =>
  jwtSign(payload, secret, { expiresIn });

const verifyToken = (token, { secret }) => jwtVerify(token, secret);

module.exports.createTokenPair = async (payload) => {
  return {
    accessToken: await createToken(payload, tokenConfig.access),
    refreshToken: await createToken(payload, tokenConfig.refresh),
  };
};

module.exports.verifyAccessToken = (token) =>
  verifyToken(token, tokenConfig.access);

module.exports.verifyRefreshToken = (token) =>
  verifyToken(token, tokenConfig.refresh);
