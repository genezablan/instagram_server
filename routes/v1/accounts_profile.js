const AccountsProfileController = require('../../controllers/accounts_profile')
const express = require('express');
const accountsProfile = express.Router();
const uploadMiddleware = require('../../middlewares/upload');

accountsProfile.route('/')
    .post(AccountsProfileController.create)

accountsProfile.post('/upload', uploadMiddleware, AccountsProfileController.upload)

module.exports = accountsProfile

