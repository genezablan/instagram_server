
const express = require('express');
const router = express.Router();

const AccountsRoute = require('./accounts');
const AccountsProfileRoute = require('./accounts_profile');
const ValidateMiddleware = require('../../middlewares/validate')

router.use('/accounts', AccountsRoute )
router.use('/accounts_profile', ValidateMiddleware, AccountsProfileRoute )

module.exports = router

