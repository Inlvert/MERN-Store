const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    body: { type: String },
    user: [{ type: Schema.Types.ObjectId, required: true, ref: "User2" }],
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

module.exports = Message;
