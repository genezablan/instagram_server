const AccountsController = require('../../controllers/accounts')
const express = require('express');
const accounts = express.Router();

accounts.route('/')
    .get(AccountsController.getAll)
    .post(AccountsController.create)
    
accounts.post('/select', AccountsController.select)
module.exports = accounts

