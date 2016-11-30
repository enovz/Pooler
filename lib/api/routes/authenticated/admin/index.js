/**admin can :
 * 1. contorl pools
 * 2. control users
 */
var express = require('express');
var router = express.Router();
var pools = require('./routes/pools');
var users = require('./routes/users');

/* handle api/admin/pools */
router.use('/pools', pools);

/* handle api/admin/users */
router.use('/users', users);


module.exports = router;