const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type:String,
    required:true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  interest: [String],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  resetPasswordToken: { type: String, default: "" },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
