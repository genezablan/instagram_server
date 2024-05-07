const AccountsProfileController = require('../../controllers/accounts_profile')
const express = require('express');
const accountsProfile = express.Router();

accountsProfile.route('/')
    .post(AccountsProfileController.create);

accountsProfile.post('/upload', AccountsProfileController.upload);
accountsProfile.get('/upload', AccountsProfileController.get_upload)
accountsProfile.route('/').get(AccountsProfileController.get_by_id);

module.exports = accountsProfile

