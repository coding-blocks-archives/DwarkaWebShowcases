const mongoose =require('mongoose');

//User SCHEMA
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required : true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default :Date.now
  }
});

//the model User is based on UserSchema
const User = module.exports = mongoose.model('User',UserSchema);
