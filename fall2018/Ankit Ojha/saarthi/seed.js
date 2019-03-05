// const mongoose = require('mongoose');
// const config = require('./config/keys');
// const bcrypt  = require('bcryptjs');
// const db = require('./config/keys').MongoURI;
// mongoose.connect(db,{useNewUrlParser:true})
//     .then(()=>console.log('MongoDB Connected....'))
//     .catch(err=>console.log(err));
// let TechnicalUser=require('./models/TechnicalUser');
// TechnicalUser.remove({})
//     .then(()=>{
//         let technicalUser=[];
//         technicalUser.push({
//             name:"Kartike Dutta",
//             email:"kartikdutta29@gmail.com",
//             password:"Saarthi@123"
//         });
//         return TechnicalUser.create(technicalUser);
//     })
//     .then(()=>{
//         process.exit(); 
//     })
//     .catch((e)=>{
//         console.log(e);
//         process.exit(1);
//     });