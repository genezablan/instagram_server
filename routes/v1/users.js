const UsersController = require('../../controllers/users')
const express = require('express');
const accounts = express.Router();

accounts.route('/')
    .post(UsersController.create)


accounts.route('/login')
    .post(UsersController.login)

module.exports = accounts

