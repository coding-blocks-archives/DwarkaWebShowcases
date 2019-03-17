const User = require('../database/models/User')
var mongoose = require('mongoose');
module.exports = (req, res, next) => {
    var mongoObjectId = mongoose.Types.ObjectId(req.session.userId);
    User.findById(mongoObjectId, (error, user) => {
        if (error || !user) {
           console.log(error);
            return res.redirect('/')
        }
 
        next()
    })
}
