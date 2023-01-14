const User = require('../models/User');

// Helpers
const createUserToken = require('../helpers/create-user-token');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

let type = '';

module.exports = class UserController {
  static async register(req, res) {
    type = 'register';

    const { name, secondname, age, email, password, confirmpassword } =
      req.body;

    if (!name) {
      res.status(402).json({ message: 'O nome é obrigatório!' });
      return;
    }

    if (!secondname) {
      res.status(402).json({ message: 'O segundo nome é obrigatório!' });
      return;
    }

    if (!age) {
      res.status(402).json({ message: 'A idade é obrigatória!' });
      return;
    }

    if (!email) {
      res.status(402).json({ message: 'O e-mail é obrigatório!' });
      return;
    }

    if (!password) {
      res.status(402).json({ message: 'A senha é obrigatória!' });
      return;
    }

    if (!confirmpassword) {
      res
        .status(402)
        .json({ message: 'A confirmação de senha é obrigatória!' });
      return;
    }

    if (password !== confirmpassword) {
      res.status(402).json({ message: 'As senhas não são iguais!' });
    }

    // Check user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(402).json({
        message:
          'E-mail já cadastrado no sistema! Por favor utilize outro e-mail',
      });
      return;
    }

    // Create a password
    const salt = await bcrypt.genSaltSync(12);
    const passwordHash = await bcrypt.hashSync(password, salt);

    // Create object User
    const user = new User({
      name: name,
      secondname: secondname,
      age: age,
      email: email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(type, newUser, req, res);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async login(req, res) {
    type = 'login';

    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' });
      return;
    }

    // login
    const user = await User.findOne({ email: email });
    if (!user) {
      res
        .status(422)
        .json({ message: 'Não há usuários cadastrados com esse e-mail!' });
      return;
    }

    // Check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha incorreta!' });
      return;
    }

    console.log('login');

    await createUserToken(type, user, req, res);
  }
};
