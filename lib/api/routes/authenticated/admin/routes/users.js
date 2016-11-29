/**admin/users :
 * CRUD admin/users
 */
var express = require('express');
var router = express.Router();
var users = require('../controllers/users');


/* GET :  /api/admin/user/ */
router.get('/', users.apiGetAll);

/* POST : /api/admin/user/  */
router.post('/', users.apiCreate);

/* GET :  /api/admin/user/4 */ 
router.get('/:user-id', users.apiFindById);

/* PUT : /api/admin/user/5 */
router.put('/:user-id', users.apiUpdate);

/* DELETE : /api/admin/user/6 */
router.delete('/:user-id', users.apiDelete);



module.exports = router;