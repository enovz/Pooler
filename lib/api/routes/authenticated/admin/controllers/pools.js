/**admin_pool API:
 * 1. apiGetAll     = return all pools
 * 2. apiFindById   = return pool wiht id
 * 3. apiCreate     = return new instance of pool
 * 4. apiUpdate     = updates pool with id  
 * 5. apiDelete     = deletes pool with id
 */

const mongoose = require('mongoose');
const commonPool = require('../../../common/controllers/pools')
const Pool = require('../../../../models/pool');


var poolApi = {
    apiGetAll: (req, res, next) => {
        Pool.find({}, (err, pools) => {
            if (err) { res.send(err); }
            res.status(200).json(pools);
        });
    },
    apiCreate: (req, res, next) => {
        Pool.create({
            title: req.body.title,
            dataset: req.body.dataset,
            postedBy: req.body.admin_id
        }, (err) => {
            if (err) { res.send(err); }
            res.send(200);
        });
    },
    apiFindById: (req, res, next) => {
        Pool.FindById(req.params.pool_id, (err, pool) => {
            if (err) { res.send(err); }
            res.status(200).json(pool);
        });
    },
    apiDelete: (req, res, next) => {
        Pool.remove({ _id: req.params.pool_id }, (err) => {
            if (err) { res.send(err); }
            res.send(200);
        });
    },
    apiByVotes: (req, res, next) => {
        return common.apiByVotes(req, res, next);
    },
    apiLatest: (req, res, next) => {
        return commonPool.apiLatest(req, res, next);
    },
    apiUpdate: (req, res, next) => {
        Pool.update({ _id: req.params.pool_id }, { $set: { title: req.body.title, dataset: req.body.dataset } },
            (err) => {
                if (err) { res.send(err); }
                res.send(200);
            });
    }
};



module.exports = poolApi;