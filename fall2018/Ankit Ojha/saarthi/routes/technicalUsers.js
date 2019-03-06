const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');
const {ensureAuthenticated}=require('../config/auth')
const passport = require('passport');
const multer = require('multer');
const path = require('path');



//artcle model
let Article = require('../models/articles');
let TechnicalUser = require('../models/TechnicalUser');

router.get('/login',(req,res)=>res.render('technicalLogin'));

//technical usrs's homepage
router.get('/technicalindex',ensureAuthenticated,(req,res)=>{
    Article.find({},(err,articles)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.render('technicalindex',{
                title: 'Articles',
                articles: articles,
                TechnicalUser: TechnicalUser
            });
        }
    });
});

//edit article
router.get('/technicalindex/edit/:id',ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('edit_article', {
                title: 'Edit article',
                article: article
            })
        }
    });
});


//update article post route
router.post('/technicalindex/edit/:id',ensureAuthenticated, (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.Category = req.body.category;
    article.Author = req.body.author;
    article.Body = req.body.body;

    let query = {
        _id: req.params.id
    };
    Article.updateOne(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'article updated');
            res.redirect('/technicalUsers/technicalindex');
        }
    })
});


//delete an article
router.get('/technicalindex/delete/:id',ensureAuthenticated, (req, res) => {
    let query = {
        _id: req.params.id
    }

    Article.remove(query, (err) => {
        if (err) {
            console.log(err);

        }else{
            req.flash('success', 'article deleted');
            res.redirect('/technicalUsers/technicalindex');
        // res.send('success');
        }
        
    })
});



// router.get('/technicalindex/add_articles',ensureAuthenticated,(req,res)=>{   
//     res.render('add_articles', {
//         title: 'Add Article'
//     });
// });



let authorname;
// add article post route
router.post('/technicalindex/add_articles', (req, res) => {
    // res.send('OK');
    // console.log('inside post route');
    let article = new Article();
    article.title = req.body.title;
    article.steptitiles = req.body.steptitle;
    article.Category = req.body.category;
    article.Body = req.body.step;
    
    //get author id
    let authorid = req.body.author;

    // get author name
    TechnicalUser.findById({_id:authorid},(err,author)=>{
        if(err){
            console.log(err);
        }else{
            authorname = author.name; 
            console.log('aurthorname: '+authorname);
            article.Author = authorname;
            article.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.redirect('/technicalUsers/technicalindex');
                }
            }); 
        }
    });
    
    // authorname = authorname.toString();
   
    // console.log('name: '+article.Author);
    // article.Author = authorname.toString();
    // eval(require('locus'));
    
});

//update profile post route
router.post('/technicalindex/updateprofile',ensureAuthenticated,(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    if(name == "" && email == ""){
        req.flash('error_msg','please fill the values to update your profile');
    }else if(name != "" && email == ""){
        TechnicalUser.findOneAndUpdate({_id:req.body.author},{$set: {name: name}},{upsert: true},(err,author)=>{
            if(err){
                console.log(err);
            }else{
                req.flash('success_msg','profile updated')  ; 
            }
        });
    }else if(name == "" && email != ""){
        TechnicalUser.findOneAndUpdate({_id:req.body.author},{$set: {email: email}},{upsert: true},(err,author)=>{
            if(err){
                console.log(err);
            }else{
                req.flash('success_msg','profile updated')  ; 
            }
        });
    }else if(name != "" && email != ""){
        TechnicalUser.findOneAndUpdate({_id:req.body.author},{$set: {name: name,email: email}},{upsert: true},(err,author)=>{
            if(err){
                console.log(err);
            }else{
                req.flash('success_msg','profile updated')  ; 
            }
        });
    }
    res.redirect('/technicalUsers/technicalindex');
});


router.post('/login',(req,res,next)=>{
    passport.authenticate('technical-local',{
        successRedirect:'/technicalUsers/technicalindex',
        failureRedirect:'/technicalUsers/login',
        failureFlash:true
    })(req,res,next);
});
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/technicalUsers/login');
});


router.get('/technicalindex/add_pictures',ensureAuthenticated,(req,res)=>{
    res.render('upload_pictures');
});

//get single article
router.get('/technicalindex/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('article', {
                title: 'articles',
                article: article
            })
        }
    });
});


//Multer stuff
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits:{fileSize: 5000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}
router.post('/technicalindex/add_pictures', (req, res) => {
    upload(req, res, (err) => {  
      if(err){
        res.render('upload_pictures', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('upload_pictures', {
            msg: 'Error: No File Selected!'
          });
        } else {
          res.render('upload_pictures', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
});
  
//get single article
router.get('/technicalindex/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render('article', {
                title: 'articles',
                article: article
            })
        }
    });
});

module.exports = router;