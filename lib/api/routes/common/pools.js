/**admin_pool API:
 * 1. apiGetAll     = return all pools
 * 2. apiByVotes   = return pools orderd by number of votes submited
 * 3. apiLatest     = return pools orderd by date published
 */

const mongoose = require('mongoose');
const Pool = require('../../models/pool');


const commonPoolApi = {
    apiGetAll: (req, res, next) => {
        Pool.find({}, (err, pools) => {
            if (err) { res.send(err); }
            res.status(200).json(pools);
        });
    },
    apiByVotes: (req, res, next) => {
        Pool.find({}, (err, pools) => {
            if (err) { return res.send(err); }
            pools.sort((a, b) => { return b.voted.length - a.voted.length });
            res.status(200).json(pools);
        });
    },
    apiLatest: (req, res, next) => {
        Pool.find({}, (err, pools) => {
            if (err) { return res.send(err); }
            else {
                pools.sort((a, b) => { return b._id.getTimestamp() - a._id.getTimestamp(); })
                res.status(200).json(pools);
            }
        });
    }
};



module.exports = commonPoolApi;