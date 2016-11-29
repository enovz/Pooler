/**Data 
 * Data represents an Data of choice, either food or drink.
 * Data properties are :
 *                      1. name
 *                      2. value
 *                      3. measure
 * Example > Data.name  = Coca-Cola
 *           Data.value = 5
 *           Data.measure = L
 *  
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
    label: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        default: 0
    },
    supporters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
});

module.exports =  DataSchema; 