const { Message } = require("../models");

module.exports.createMessage = async (req, res, next) => {
  try {
    const { body, user } = req;

    const message = await Message.create({
      ...body,
      user: user._id,
    });

    await user.updateOne({
      $push: {messages: message._id}
    })

    console.log(user);

    console.log(message);

    res.send({data: message})

  } catch (error) {
    next(error);
  }
};


module.exports.getAllMessages = async (req, res, next) => {
  try {

    const messages = await Message.find(null, 'body').populate('user.name')

    res.send({data: messages})
    
  } catch (error) {
    next(error)
  }
}