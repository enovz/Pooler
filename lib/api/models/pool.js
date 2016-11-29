/**pool 
 * pool represents a collection of Items, either food or drink.
 * pool properties are : 1. name, 
 *                       2. postedBy
 *                       3. items
 * Example > pool.name  = pool for New Years
 *           pool.postedBy = Tomislav
 *           pool.items = Beer, Coca-Cola, Shugar, Becon, Chicken etc.
 *  
 */

'use strict';

var mongoose = require('mongoose');
var dataSchema = require('./data');
var Schema = mongoose.Schema;

var poolSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    dataset: [dataSchema],
    voted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: false
        }
    ]
},
    {
        timestamps: true
    }
);

poolSchema.methods.canVote = (user_id) => {
    this.voted.forEach(voter => {
        if (voter._id === user_id) { return false; }
        return true;
    });
}
poolSchema.methods.isOwner = (user_id) => {
        return (this.postedBy === user_id);
}


module.exports = mongoose.model('Pool', poolSchema); 