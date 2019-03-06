const mongoose =require('mongoose');

//User SCHEMA
const technicalUserSchema = mongoose.Schema({
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
  articles_written:[{
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'articles'
  }],
  date:{
    type: Date,
    default :Date.now
  }
});

//the model User is based on UserSchema
const User = module.exports = mongoose.model('TechnicalUser',technicalUserSchema);
