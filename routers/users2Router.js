const users2Router = require("express").Router();
const user2Controller = require("../controllers/users2.controller");
const { findUser2 } = require("../middlewares/findUser2");
const messageRouter = require("./messageRouter");

users2Router.route("/").post(user2Controller.createUser2).get(user2Controller.getUsers2);

users2Router.use("/:user2Id/messages", findUser2, messageRouter)

module.exports = users2Router;
