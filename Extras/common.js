const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");

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

exports.invoiceTemplate = function (PaymentID, RoomName, RoomPrice) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Receipt</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        /**
     * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
     */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
  
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
  
        /**
     * Avoid browser level font resizing.
     * 1. Windows Mobile
     * 2. iOS / OSX
     */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%;
          /* 1 */
          -webkit-text-size-adjust: 100%;
          /* 2 */
        }
  
        /**
     * Remove extra space added to tables and cells in Outlook.
     */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
  
        /**
     * Better fluid images in Internet Explorer.
     */
        img {
          -ms-interpolation-mode: bicubic;
        }
  
        /**
     * Remove blue links for iOS devices.
     */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
  
        /**
     * Fix centering issues in Android 4.4.
     */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
  
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
  
        /**
     * Collapse table borders to avoid space between cells.
     */
        table {
          border-collapse: collapse !important;
        }
  
        a {
          color: #1a82e2;
        }
  
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
      </style>
    </head>
    <body style="background-color: #D2C7BA;">
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;"> A preheader is the short summary text that follows the subject line when an email is viewed in the inbox. </div>
      <!-- end preheader -->
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                      <td align="center" valign="top" width="600">
                        <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Thank you for your Payment!</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#D2C7BA">
            <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                      <td align="center" valign="top" width="600">
                        <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Here is a summary of your recent payment. If you have any questions or concerns about your payment, please <a href="PeerPulse69@gmail.com">contact us</a>. </p>
                </td>
              </tr>
              <!-- end copy -->
              <!-- start receipt table -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="left" bgcolor="#D2C7BA" width="75%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <strong>Payment ID</strong>
                      </td>
                      <td align="left" bgcolor="#D2C7BA" width="25%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        <strong>${PaymentID}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" width="75%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">Room Name</td>
                      <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${RoomName}</td>
                    </tr>
                    <tr>
                      <td align="left" width="75%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">Price</td>
                      <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">$${RoomPrice}</td>
                    </tr>
                    <tr>
                      <td align="left" width="75%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;">
                        <strong>Total</strong>
                      </td>
                      <td align="left" width="25%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;">
                        <strong>$${RoomPrice}</strong>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end reeipt table -->
            </table>
            <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
        <!-- start receipt address block -->
        <tr>
          <td align="center" bgcolor="#D2C7BA" valign="top" width="100%">
            <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                      <td align="center" valign="top" width="600">
                        <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
          </td>
        </tr>
        <!-- end receipt address block -->
        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                      <td align="center" valign="top" width="600">
                        <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <!-- start permission -->
              <tr>
                <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"></td>
              </tr>
              <!-- end permission -->
              <!-- start unsubscribe -->
              <tr>
                <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;"></td>
              </tr>
              <!-- end unsubscribe -->
            </table>
            <!--[if (gte mso 9)|(IE)]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
          </td>
        </tr>
        <!-- end footer -->
      </table>
      <!-- end body -->
    </body>
  </html>`;
};

exports.tokenGenerator = async function (channel,userEmail) {
  const appID = process.env.Agora_APP_ID;
  const appCertificate = process.env.Agora_APP_CERTIFICATE;
  const channelName = channel;
  const uid = userEmail;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 4200;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  return token;
};
