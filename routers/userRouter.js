const userRouter = require("express").Router();
const userController = require("../controllers/users.controller");

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getUsers);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = userRouter;
