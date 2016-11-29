/**admin can :
 * 1. contorl pools
 * 2. control users
 */
var express = require('express');
var router = express.Router();
var pool = require('./routes/pools');
var user = require('./routes/users');

/* handle api/admin/pools */
router.use('/pools', pool);

/* handle api/admin/users */
router.use('/users', user);


module.exports = router;