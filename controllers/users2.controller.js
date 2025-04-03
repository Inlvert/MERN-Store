const { User2 } = require("../models");

module.exports.createUser2 = async (req, res, next) => {
  try {
    const { body } = req;

    const user2 = await User2.create(body);

    res.send({ data: user2 });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers2 = async (req, res, next) => {
  try {
    const users2 = await User2.find(null, 'name email messages').populate('messages', 'body');

    res.send({ data: users2 });
  } catch (error) {
    next(error);
  }
};
