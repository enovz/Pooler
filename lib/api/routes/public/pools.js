/** publicPools handles:
 * 1.GET '/pool/byVotes' calls api return all pools sorted by number of votes
 * 2.GET '/pool/byValue' calls api return all pools sorted by value 
 */

const express = require('express');
const publicRouter = express.Router();
const commonPool = require('../common/controllers/pools');

/* GET : /api/pool/byVotes  */
publicRouter.get('/byVotes', commonPool.apiByVotes);

/* GET : /api/pool/latest  */
publicRouter.get('/latest', commonPool.apiLatest);

/* GET :  /api/pool */
publicRouter.get('/', commonPool.apiGetAll);

module.exports = publicRouter;