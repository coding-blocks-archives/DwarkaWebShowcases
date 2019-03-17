const User = require('../database/models/User')
 
module.exports = (req, res, next) => {
    if (!req.session.userId)
    return next();
else{
    res.redirect("/home");
}
    
   

}