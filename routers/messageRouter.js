const messageRouter = require("express").Router();
const messageController = require("../controllers/message.controller");

messageRouter
  .route("/")
  .post(messageController.createMessage)
  .get(messageController.getAllMessages);

module.exports = messageRouter;
