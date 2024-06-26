const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UsersService = require('../services/users')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JwtPrivate_Pass

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    UsersService.findOne({ id: jwt_payload.id }).then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        return done(err, false);
    });
}));