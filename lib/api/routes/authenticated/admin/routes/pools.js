/** api/pool :
 * CRUD api/pool
 */

var express = require('express');
var router  = express.Router({ mergerParams : true });
var pools = require('../controllers/pools');

/* GET :  /api/pool/ */
router.get('/', pools.apiGetAll);

/* POST : /api/admin/pool/  */
router.post('/', pools.apiCreate);

/* GET :  /api/admin/pool/4 */  
router.get('/:pool-id', pools.apiFindById);

/* PUT : /api/admin/pool/5 */
router.put('/:pool-id', pools.apiUpdate);

/* DELETE : /api/admin/pool/6 */
router.delete('/:pool-id', pools.apiDelete);

module.exports = router;