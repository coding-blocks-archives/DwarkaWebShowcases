const mongoose =require('mongoose');

//User SCHEMA
const RequestSchema = mongoose.Schema({
  title:{
    type: String,
    required : true
  },
  email:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default :Date.now
  }
});

//the model User is based on UserSchema
const Request = module.exports = mongoose.model('Request',RequestSchema);
