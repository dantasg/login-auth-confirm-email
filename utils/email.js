const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.AUTH_USER}`,
    pass: `${process.env.AUTH_PASS}`,
  },
});

async function emailRegister(emailUser) {
  await transporter
    .sendMail({
      from: `Genival Dantas <${process.env.AUTH_USER}`,
      to: emailUser,
      subject: 'E-mail de confirmação de registro!',
      text: 'Parabéns por efetuar o registro no nosso sistema!',
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function emailLogin(emailUser) {
  await transporter
    .sendMail({
      from: `Genival Dantas <${process.env.AUTH_USER}`,
      to: emailUser,
      subject: 'E-mail de confirmação de login!',
      text: 'Parabéns por efetuar o login no nosso sistema!',
    })
    .then((message) => {
      console.log(message);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { emailRegister, emailLogin };
