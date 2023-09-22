const Users = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "fields are empty" });
  }
  const salt = await bcrypt.genSalt(10);
  const secPas = await bcrypt.hash(password, salt);
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ error: "a user with this email already exists" });
    return;
  }
  try {
    const user = await Users.create({ name, email, password: secPas });
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      friends: user.friends,
      interest: user.interest,
    };
    res.status(200).json({ user: data });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while registering", msg: err.message });
  }
};

const login = async (req, res) => {
  const email = req.body.email; 
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({ error: "email or password cannot be empty" });
  }
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
      friends: user.friends,
      interest: user.interest,
    };
    res.status(200).json({ user: data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occured while logging in", msg: err.message });
  }
};

module.exports = { register, login };
