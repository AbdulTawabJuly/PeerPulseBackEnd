const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Message = require('./Message');

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
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  interest: [String],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: Message }],
  resetPasswordToken: { type: String, default: "" },
  AgoraToken:{type:String}
});

const User = mongoose.model("user", userSchema);
module.exports = User;
