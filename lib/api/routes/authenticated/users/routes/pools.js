/** pool router :
 * 3.GET '/api/user/3/pools' get users pools
 * 3.POST '/api/user/4/pools' user create pool
 * 2.GET '/api/user/5/pools/6' get users pool
 * 4.PUT '/api/user/7/pools/8' users vote on pool
 * 5.DELETE '/api/user/9/pools/10' remove users pool
 */

var express = require('express');
var router  = express.Router({ mergerParams : true });
var userPools = require('../controllers/UserPools');

/* GET :  /api/user/3/pool */
router.get('/', userPools.apiGetAll);

/* POST : /api/user/4/pool  */
router.post('/', userPools.apiCreate);

/* GET :  /api/user/5/pool/6 */  
router.get('/:pool-id', userPools.apiFindById);

/* PUT : /api/user/7/pool/8 */
router.put('/:pool-id', userPools.apiVote);

/* DELETE : /api/user/9/pool/10 */
router.delete('/:pool-id', userPools.apiDelete);

module.exports = router;