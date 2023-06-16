const nodemailer = require("nodemailer")

module.exports = class email {
  constructor(user, url) {
    this.to = user.email
    this.firstName = user.name.split(" ")[0]
    this.url = url
    this.from = `mahmoud saad <${process.env.EMAIL_FROM}`
  }
  newTransport() {
    return nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  async sendEmail(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: `HELLO ${this.firstName}`,
      text: `${subject}  ${this.url} `,
      //html: this.url
    }
    await this.newTransport().sendMail(mailOptions)
  }
  async sendWelcome() {
    await this.sendEmail("welcome to my new Ecommerce-app")
  }

  async sendPasswordReset() {
    await this.sendEmail("Your password reset token valid for only 10 minutes")
  }
}
