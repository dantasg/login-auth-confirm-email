const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.get('/register', UserController.register);

router.get('/login', UserController.login);

module.exports = router;
