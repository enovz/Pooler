/**PoolAPI accepts req, res, next and does basic db querrying
 * 1.apiFriends gets array of users that have simmilar votes
 */

var mongoose = require('mongoose');
var Pool = require('../../../../models/pool');

var suggestedApi = {
    apiFriends:  (req, res, next) =>{
        var friends = [];
        Pool.find().exec( (err, pools)=> {
            if (err) { res.send(err); }
            else {
                var options = {
                    path: 'dataset.data.supporters',
                    model: 'supporters',
                    select: '_id username'
                };
                Pool.populate(pools, options,  (err, documents)=> {
                    for (document in documents) {
                        for (data in document.dataset) {
                            for (supporter in data.supporters) {
                                if (supporter._id === req.params.user_id) { friends.concat(data.supporters); }
                            }
                        }
                    }
                    var result = friends.filter( (friend) =>{
                        if (friend._id !== req.params.user_id) { return friend }
                    })
                    res.send(200).json(friends);
                });
            }
        });
    },

};



module.exports = suggestedApi;