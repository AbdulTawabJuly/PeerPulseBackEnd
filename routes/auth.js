const express = require("express");
const auth = express.Router();
const Users = require("../models/User");
const {
  register,
  login,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/userController");

auth
  .post("/register", register)
  .post("/login", login)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword);
// auth.get("logout",logout);

module.exports = auth;
