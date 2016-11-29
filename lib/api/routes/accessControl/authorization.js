/**authorization of users by roles */

'use strict';

module.exports = (roles) => {
    return (req, res, next) => {
        User.findById(req.user._id, (err, foundUser) => {
            if (err) {
                res.status(422).json('No user found.');
                return next(err);
            }
            if (roles.indexOf(foundUser.role) > -1) { return next(); }
            res.status(401).json('You are not authorized to view this content');
            return next('Unauthorized');
        });
    }
}