const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../Extras/common");

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
const resetPasswordRequest = async (req, res) => {
  const resetPage = "http://localhost:3000/reset-password";
  const subject = "Reset Password for Peer Pulse";
  const text = "Click Here to Reset Password";
  const html = `<p>Click <a href = "${resetPage}">Here</a> to Reset Password</p>`;
  const to = req.body.email;
  //console.log(req.body.email);
  if (req.body.email) {
    const response = await sendMail({
      to: req.body.email,
      subject,
      text,
      html,
    });
    console.log(response);
    //Mail({ to: req.body.email, subject,html });
    //await Users.findOne({ email: req.body.email });
    //console.log(response);
    //res.json(response);
    //let token = crypto.randomBytes(32).toString('hex');
  }
};

module.exports = { register, login, resetPasswordRequest };
