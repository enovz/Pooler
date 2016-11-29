/**main router :
 * 1. requires middleware
 * 2. handles public routes (register, login, and publicly available operations on pool resource)
 * 3. handles authenticated routes
*/

'use strict';

//middleware
const authentication = require('./accessControl/authentication');
const passport = require('passport');
const passportConfig = require('../config/passport');
const requireJwt = passport.authenticate('jwt', { session: false });
const localLogin = passport.authenticate('local', { session: false });

//routes
const express = require('express');
const authenticated = require('./authenticated');
const publicPools = require('./public/pools');
const router = express.Router();

//public routes start
router.post('/api/register', authentication.registerUser);
router.post('/api/login', localLogin, authentication.loginSuccess);
router.use('/api/pools', publicPools);
//public routes end

//authenticated routes start
router.use('/api', requireJwt, authenticated);
//authenticated routes end

//invalid routes
router.get('/*', function (req, res) {
    res.status(404);
});

module.exports = router;