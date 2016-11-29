/** authorized routes:
 * 1. requires middleware 
 * 1. handles '/admin' routes
 * 2. hanles '/user' routes
 */

'use strict';


var express         = require('express');
var router          = express.Router();
var authorization   = require('../accessControl/authorization');
var admin           = require('./admin');
var users           = require('./users');


/*  /api/admin  */
router.use('/admin', authorization(['admin']), admin);

/* /api/users */
router.use('/users', authorization(['editor', 'admin']),  users);


module.exports = router;


