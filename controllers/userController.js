const Users = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../Extras/common");
const crypto = require("crypto");
const Binary=require('mongodb');

const register = async (req, res) => {
  const { name, username, email, password,age,gender,bsField,msField,bsUni,msUni,interest,image} = req.body;
  
  if (!name||!email || !password || !username||!age||!gender||!interest||!image) {
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
    const user = await Users.create({ username, name, email, password: secPas,age,gender,bsField,msField,bsUni,msUni,interest,image});
    const data = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      friends: user.friends,
      interest: user.interest,
      image:user.image,
      age:user.age,
      gender:user.gender,
      bsField:user.bsField,
      bsUni:user.bsUni,
      msField:user.msField,
      msUni:user.msUni,
    };
    res.status(200).json({ user: data });
  } catch (err) {
    console.log(err.message);
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
      username: user.username,
      name: user.name,
      email: user.email,
      friends: user.friends,
      interest: user.interest,
      image:user.image,
      age:user.age,
      gender:user.gender,
      bsField:user.bsField,
      bsUni:user.bsUni,
      msField:user.msField,
      msUni:user.msUni,
    };
    res.status(200).json({ user: data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occured while logging in", msg: err.message });
  }
};
const resetPasswordRequest = async (req, res) => {
  // email bhejne se pehle aik token generate hoga or databse mai store kiya jaye ga or jab response aye ga wapis tou check kare ge ke wohi token hai ke ni take koi bhi localhost:300 pe jake khudi password change na karte phire
  const email = req.body.email;
  const user = await Users.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    await user.save();

    const resetPageLink =
      "http://localhost:3000/reset-password?token=" + token + "&email=" + email;

    const subject = "Reset Password for Peer Pulse";
    const text = "Click Here to Reset Password";
    const html = `<p>Click <a href = "${resetPageLink}">Here</a> to Reset Password</p>`;
    // Sending email and a token in the mail body so we can verify that user has clicked on the right link
    if (email) {
      const response = await sendMail({
        to: email,
        subject,
        text,
        html,
      });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;
  const user = await Users.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
    await user.save();

    const subject = "Password Successfully Reset";
    const text = "Password Successfully Reset for Email: " + email;
    const html = `<p>Password Successfully Reset for Email: "${email}" </p>`;
    if (email) {
      const response = await sendMail({
        to: email,
        subject,
        text,
        html,
      });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

const GetUser=async(req,res)=>{
  const userID=req.query.id;
  try{
  const user=await Users.findOne({_id:userID});
  const data = {
    id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    friends: user.friends,
    interest: user.interest,
    image:user.image,
    age:user.age,
    gender:user.gender,
    bsField:user.bsField,
    bsUni:user.bsUni,
    msField:user.msField,
    msUni:user.msUni,
  };
  if(user){
    res.status(200).json(data);
  }else{
    res.status(404).json({error:"User not found"});
  }
}catch(error){
  res.status(500).json({error:"Error fetching user"});
}


}
const UpdateUser=async(req,res)=>{
  const data=req.body.data;
  const emailnotAvailable=await Users.findOne({_id:{$ne:data.id},email:data.email}).lean();
  const usernamenotAvailable=await Users.findOne({_id:{$ne:data.id},username:data.username});
  if(emailnotAvailable)
  {
    res.status(404).json({error:"A user with this email already exists"});
  }else if(usernamenotAvailable){
    res.status(404).json({error:"A user with this username already exists"});
  }
  else{
    try{
          const response=await Users.findOneAndUpdate({_id:data.id},{$set:{name:data.name,age:data.age, email:data.email,username:data.username,bsField:data.bsField,bsUni:data.bsUni,msField:data.msField,msUni:data.msUni,interest:data.interest,image:data.image}});
          if(response){
            res.status(200).json(data);
          }
    }
    catch(error){
      res.status(500).json({error:"error updating user"});
    }
  }
}

module.exports = { register, login, resetPasswordRequest, resetPassword,GetUser,UpdateUser };
