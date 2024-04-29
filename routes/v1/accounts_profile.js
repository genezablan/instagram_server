const AccountsProfileController = require('../../controllers/accounts_profile')
const express = require('express');
const accountsProfile = express.Router();

accountsProfile.route('/')
    .post(AccountsProfileController.create)
    
module.exports = accountsProfile

