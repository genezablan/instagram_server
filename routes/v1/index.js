
const express = require('express');
const router = express.Router();

const AdminRoute = require('./admin');
const AccountsRoute = require('./accounts');
const AccountsProfileRoute = require('./accounts_profile');
const UsersProfileRoute = require('./users');
const ValidateMiddleware = require('../../middlewares/validate')
const passport = require('passport');

const auth =  passport.authenticate('jwt', { session: false }) 

router.use('/accounts', AccountsRoute )
router.use('/accounts_profile', ValidateMiddleware, AccountsProfileRoute )
router.use('/users', UsersProfileRoute )

router.use('/admin', auth, AdminRoute)


module.exports = router

