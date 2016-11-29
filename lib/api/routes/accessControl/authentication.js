/**controlls access to routes: 
 * 1. user registration
 * 2. user login
 * 3. authoriztion of users
 * 4. user operations on pools Resource (canVote, isOwner)
 */

'use strict';

var jwt = require('jsonwebtoken');
var User = require('../../models/user');
var authConfig = require('../../config/auth');

var accessControl = {
    loginSuccess: (req, res, next) => {
        var userInfo = setUserInfo(req.user);
        res.status(200).json({
            token: 'JWT ' + generateToken(userInfo),
            userInfo: userInfo
        })
    },
    registerUser: (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.status(422).send('username password ??');
        }
        User.findOne({ username: username }, (err, existingUser) => {
            if (err) { return res.send(err); }
            if (existingUser) {
                return res.status(422).send('That username is already in use');
            }
            var user = new User({
                username: username,
                password: password
            });
            user.save((err, user) => {
                if (err) { res.send(err); }
                var userInfo = setUserInfo(user);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    token: 'JWT ' + generateToken(userInfo),
                    userInfo: userInfo
                })
            });
        });
    }
}

function generateToken(user) {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 86400
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        username: request.username,
        role: request.role
    };
}

module.exports = accessControl;