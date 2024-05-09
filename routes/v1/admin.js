const AdminController = require('../../controllers/admin')
const AccountsController = require('../../controllers/accounts');
const AccountsProfileController = require('../../controllers/accounts_profile');

const express = require('express');
const accounts = express.Router();

accounts.route('/approve')
    .post(AdminController.approve)
    

accounts.get('/accounts/:id', AccountsController.get_by_id)

accounts.route('/accounts/upload/:id').get(AccountsProfileController.get_upload_by_id)

accounts.route('/accounts_profile').get(AccountsProfileController.get)

accounts.route('/accounts_profile/:id').get(AccountsProfileController.get_by_id)

module.exports = accounts

