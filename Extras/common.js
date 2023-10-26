const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    port: 465,
    secure: true, //true for 465 and false for other ports
    auth: {
      user: "tawabmasood456@gmail.com",
      pass:   "adff wujz omcz aqme",
    },
  })

// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, //true for 465 and false for other ports
//     auth: {
//       user: "tawabmasood456@gmail.com",
//       pass: "adff wujz omcz aqme",
//     },
//   })
// );

exports.sendMail = async function ({ to, subject, text, html }) {
  console.log({ to, subject, text, html });
  console.log("To", to);
  const info = await transporter.sendMail({
    from: '"PeerPulse 👻" <tawabmasood456@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  console.log("Info", info);
  return info;
};
