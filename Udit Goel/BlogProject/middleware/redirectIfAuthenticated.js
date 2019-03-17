const User = require('../database/models/User')
 
module.exports = (req, res,error,next) => {
    if (req.session.userId)
    return next();
     else{
        console.log(error);
        res.redirect('/');
        
     }
   
   

}