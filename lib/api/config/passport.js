var User = require('../models/user');
var config = require('./auth');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        user.comparePassword(password, function (err, foundMatch) {
            if (err) { return done(err); }
            if (!foundMatch) {
                return done(null, false, { message: 'Incorrect password' })
            }
            if (foundMatch) {
                return done(null, user);
            }
        });
        return done(null, user);
    });
}));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;

passport.use(new JwtStrategy(opts, function (payload, done) {

    User.findById(payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

