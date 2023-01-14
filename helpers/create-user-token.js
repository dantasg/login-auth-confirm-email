const jwt = require('jsonwebtoken');

const { emailLogin, emailRegister } = require('../utils/email');

const createUserToken = async (type, user, req, res) => {
  // Create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    `${process.env.SECRET}`,
  );

  if (type === 'register') {
    await emailRegister(user.email);
  } else if (type === 'login') {
    await emailLogin(user.email);
  }

  // Return token
  res.status(200).json({
    message: 'Você está autenticado!',
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
