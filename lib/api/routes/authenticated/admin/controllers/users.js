/**admin_userAPI :
 * 1. apiGetAll     = return all users
 * 2. apiFindById   = return user wiht id
 * 3. apiCreate     = return new user
 * 4. apiUpdate     = updates user with id  
 * 5. apiDelete     = deletes user with id
 */

var mongoose = require('mongoose');
var User = require('../../../../models/user');

var userApi = {
    apiGetAll : (req, res, next)=> {
        User.find({}, (err, users)=>{
            if(err){ res.send(err); } 
            return res.send(200).json(users);
        });
        
    },
    apiCreate : (req, res, next) =>{
       var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
 
        if(!username || !password){
            return res.status(422).send({error: 'uername password ??'});
        }
        User.findOne({username: username}, (err, existingUser)=>{
            if(err) {return next(err); }
            if(existingUser){
                return res.status(422).send({error: 'That username is already in use'});
            }
            var user = new User({
                username: username,
                password: password,
                role: role
            });
            user.save((err, user)=>{
                if(err){ return next(err); }
                var userInfo = setUserInfo(user);
                res.status(201).json({
                    token: 'JWT ' + generateToken(userInfo),
                    user: userInfo
                })
            });
        });

    },
    apiFindById : (req, res, next) =>{
        User.findById(req._id, (err, user) =>{
            if(err){ return res.send(err); }
            res.send(200).json(user);
        });
    },
    apiUpdate : (req, res, next)=>{
        User.update({'_id':req._id}, {$set : {name : req.body.name, password : req.body.password, role : req.body.role} },
         (err)=> {
            if (err){ res.send(err); }
            res.send(200);
        })
    },
    apiDelete : (req, res, next) =>{
        User.remove({'_id':req._id},(err)=> {
            if(err){ res.send(err); }
            res.send(200);
        });
    }
};

module.exports = userApi;