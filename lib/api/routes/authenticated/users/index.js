/**user has access :
 * 1. to view other users profiles
 * 2. to his pools
 */
const express = require('express');
const router = express.Router();
const pools = require('./routes/pools');
const suggested = require('./routes/suggested');

/* handle /api/users/7/pools */
router.use('/:user-id/pools', pools);

/* handle /api/users/querry */
router.use('/:user-id/suggested', suggested);


module.exports = router;