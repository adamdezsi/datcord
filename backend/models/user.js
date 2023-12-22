const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 12,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: 6,
      maxlength: 120,
    },
    mail: {
      type: String,
      required: [true, "Mail is required!"],
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
