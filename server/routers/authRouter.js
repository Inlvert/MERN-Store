const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller')

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
// authRouter.post('/refresh', authController.refresh);

module.exports = authRouter;
