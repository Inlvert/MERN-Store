const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      // unique: true,
      // match: /^[a-zA-Z0-9]{1, 32}@[a-zA-Z]{2,8}.[a-zA-Z]{2,8}$/,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    isOnline: { type: Boolean, default: false },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
