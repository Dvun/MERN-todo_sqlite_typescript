const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass:process.env.SMTP_PASSWORD
    }
  });


  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  }

  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent!' + info.messageId)
    }
  })
}

module.exports = sendEmail