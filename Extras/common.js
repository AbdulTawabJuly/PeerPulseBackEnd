const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//     port: 465,
//     secure: true, //true for 465 and false for other ports
//     auth: {
//       user: "tawabmasood456@gmail.com",
//       pass:   "adff wujz omcz aqme",
//     },
//   })

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //true for 465 and false for other ports
    auth: {
      user: "PeerPulse69@gmail.com",
      pass: "phtz fonm iowl wnvv",
    },
  })
);

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"PeerPulse 👻" <PeerPulse69@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
