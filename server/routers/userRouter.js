const userRouter = require("express").Router();
const userController = require("../controllers/users.controller");
const { checkAccessToken } = require("../middlewares/token.mw");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(checkAccessToken, userController.getUsers);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = userRouter;
