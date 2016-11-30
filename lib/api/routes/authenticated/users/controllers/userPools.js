/**PoolAPI accepts req, res, next and does basic db querrying
 * 1.getAll return all Pool
 * 2.findById return Pool wiht id
 * 3.create return new instance of Pool
 * 4.update updates Pool with id  
 * 5.delete deletes Pool with id
 */

var mongoose = require('mongoose');
var Pool = require('../../../../models/pool');

var userApi = {
    apiGetAll:  (req, res, next)=> {
        Pool.find({ postedBy: req.user._id }, (err, pools) => {
            if (err) { return res.send(err); }
            res.status(200).json(pools);
        });
    },
    apiCreate:  (req, res, next)=> {
        Pool.create({
            title: req.body.title,
            dataset: req.body.dataset,
            postedBy: req.user._id
        },  (err)=> {
            if (err) { res.send(err); }
            res.status(200);
        });

    },
    apiFindById:  (req, res, next) =>{
        Pool.find({
            _id: req.params.pool_id,
            postedBy: req.user._id
        },  (err, pool) =>{
            if (err) { res.send(err); }
            res.status(200).json(pool);
        });
    },
    apiDelete:  (req, res, next) =>{
        Pool.remove({
            _id: req.params.pool_id,
            postedBy: req.user._id
        },  (err) =>{
            if (err) { res.status(err); }
            res.status(200);
        });
    },
    apiVote:  (req, res, next)=> {
        Pool.FindById(req.params.pool_id, (err, pool) => {
            if (err) { res.send(err); }
            else {
                if (pool.canVote(req.params.user - id)) {
                    var i = 0;
                    pool.voted.push(req.user._id);
                    pool.dataset.forEach(data => {
                        data.value += req.body.dataset[i].value;
                        if (req.body.dataset[i].value !== 0) {
                            data.supporters.push(req.user._id);
                        }
                        i++;
                    });
                    pool.save((err) => {
                        if (err) { res.send(422) }
                        res.status(200);
                    });
                }
                else { res.status(401); }
            }
        });

    }
};



module.exports = userApi;