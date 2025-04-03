const { Schema, model } = require("mongoose");

const user2Schema = new Schema({
  name: { type: String },
  email: { type: String },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const User2 = model("User2", user2Schema);

module.exports = User2;
