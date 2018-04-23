var express = require('express');
var router = express.Router();
var csrf=require('csurf');
var csrfProtection = csrf();
var passport=require('passport');
var Order=require('../models/order');
var Cart=require('../models/cart');
router.use(csrfProtection);

router.get('/profile',isLoggedIn,function (req,res) {
    Order.find({user:req.user},function(err,orders){
       if(err){
           return res.write('Error!');
       }
       var cart;
       orders.forEach(function(order){
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
       });
       res.render('user/profile',{orders: orders});
    });
});
router.get('/signup',function (req,res) {
    var messages=req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post('/signup',passport.authenticate('local.signup',{
    failureRedirect:'/user/signup',
    failureFlash:true
}),function(req,res){
    if(req.session.oldURL){
        var oldUrl=req.session.oldURL;
        req.session.oldURL=null;
        res.redirect(oldUrl);
    }
    else{
        res.redirect('/user/profile');
    }
});


router.get('/logout',isLoggedIn, function (req,res) {
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn,function (req,res,next) {
    next();
});


router.get('/signin',function (req,res) {
    var messages=req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post('/signin', passport.authenticate('local.signin',{
    failureRedirect:'/user/signin',
    failureFlash:true
}),function(req,res){
    if(req.session.oldURL){
        var oldUrl=req.session.oldURL;
        req.session.oldURL=null;
        res.redirect(oldUrl);
    }
    else{
        res.redirect('/user/profile');
    }
});
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}