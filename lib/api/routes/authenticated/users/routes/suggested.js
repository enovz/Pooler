/** suggested router handles : 
 *  1. '/api/user/3/suggested/friends' get list of users with same votes as user
 */

var express = require('express');
var router  = express.Router({ mergerParams : true });
var userSuggested = require('../controllers/suggested');

/* GET :  /api/user/3/suggested/friends */
router.get('/friends', userSuggested.apiFriends);


module.exports = router;