const { Schema, model } = require("mongoose");

const refreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const RefreshToken = model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
