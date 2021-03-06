/**USER
 * User represents a user
 * User properties are : 1. name, 
 *                       2. password
 *                       3. role
 * User methods are : 1. comparePassword(psw, cb)
 * 
 * Example > user.name  = Tomislav
 *           user.password = 32423kjh3k4h2i4uh
 *           user.role = 'admin', 'editor'
 * 
 * Users passwords are hashed before saving, comparisson is done by comparePassword method
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
 
var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    role: {
        type : String,
        enum : ['admin', 'editor'],
        default : 'editor',
        require : true
    }},
    {
        timestamps : true
    
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);