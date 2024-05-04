const AdminController = require('../../controllers/admin')
const express = require('express');
const accounts = express.Router();

accounts.route('/approve')
    .post(AdminController.approve)


module.exports = accounts

