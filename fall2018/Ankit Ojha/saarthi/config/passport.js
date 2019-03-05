const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
const TechnicalUser=require('../models/TechnicalUser');

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports = function(passport) {
  passport.use('user-local',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })

  );
  passport.use('technical-local',new LocalStrategy({usernameField:'email'},(email,password,done)=>{
      // console.log(email);
      TechnicalUser.findOne({
        email: email
      }).then(tuser=>{
        if(!tuser){

          return done(null,false,{message:'That email is not registered sorry'});
        }else if(tuser){
          return done(null,tuser);
        }
      });
    })
  );
  passport.serializeUser(function(user, done) {
    let userGroup = User;
    let userPrototype = Object.getPrototypeOf(user);

    if(userPrototype === User.prototype){
      userGroup = "User";
    }else if(userPrototype === TechnicalUser.prototype){
      userGroup = "TechnicalUser";
    }

    let sessionConstructor = new SessionConstructor(user.id, userGroup, '');
    done(null,sessionConstructor);
  });

  passport.deserializeUser(function(sessionConstructor, done) {
    // User.findById(id, function(err, user) {
    // done(err, user);
    // });
    // TechnicalUser.findById(id,function(err,tuser){
    //   done(err,tuser);
    // });

    if(sessionConstructor.userGroup == "User"){
      User.findOne({
        _id: sessionConstructor.userId
    },function (err, user) { 
        done(err, user);
    });
    }else if(sessionConstructor.userGroup == 'TechnicalUser'){
      TechnicalUser.findOne({
        _id: sessionConstructor.userId
    },function (err, user) { 
        done(err, user);
    });
    }
  }); 
};
