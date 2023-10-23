const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, //true for 465 and false for other ports
  auth: {
    user: "tawabmasood456@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
  debug: true, // Enable debugging
});

exports.sendMail = async function ({ to, subject, text, html }) {
  console.log({ to, subject, text, html });
  const info = await transporter.sendMail({
    from: '"PeerPulse 👻" <tawabmasood456@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  console("Info",info)
  return info;
};