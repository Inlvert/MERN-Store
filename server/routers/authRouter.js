const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const { checkRefreshToken } = require('../middlewares/token.mw');

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/refresh',checkRefreshToken, authController.refresh);

module.exports = authRouter;
