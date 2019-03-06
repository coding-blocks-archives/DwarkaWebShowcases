const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth');
const article = require('../models/articles');
const Request = require('../models/Request');
router.get('/',(req,res)=>res.render('welcome'));



router.get('/dashboard',ensureAuthenticated,(req,res)=>
    res.render('dashboard',{
        name:req.user.name
    }));

router.get('/search_articles',(req,res)=>{
    let noMatch = null;
    console.log(req.query.search);
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all articles from DB
        // console.log(regex);
        article.find({title: regex}, (err, allarticles)=>{
           if(err){
               console.log(err);
           } else {
            //    console.log(allarticles);
              if(allarticles.length < 1) {
                  noMatch = "No articles match that query, please try again.";
              }
              res.render("searchedarticles",{allarticles:allarticles, noMatch: noMatch});
           }
        });
    } else {
        // Get all campgrounds from DB
        article.find({}, function(err, allarticles){
           if(err){
               console.log(err);
           } else {
              res.render("searchedarticles",{allarticles:allarticles, noMatch: noMatch});
           }
        });
    }
});


router.post('/explore',(req,res)=>{
    const newRequest=new Request();
    newRequest.title=req.body.RequestTitle;
    newRequest.email=req.body.RequestEmail;
    newRequest.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        res.redirect('/explore');
      }
    });
  
  });
  
//user single article
router.get('/explore/:id', (req, res) => {
  article.findById(req.params.id, (err, article) => {
      if (err) {
          console.log(err);
          return;
      } else {
          res.render('user_article', {
              article: article
          })
      }
  });
});
  

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;