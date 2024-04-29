
const express = require('express');
const router = express.Router();

const AccountsRoute = require('./accounts');
const AccountsProfileRoute = require('./accounts_profile');

router.use('/accounts', AccountsRoute )
router.use('/accounts_profile', AccountsProfileRoute )

module.exports = router

