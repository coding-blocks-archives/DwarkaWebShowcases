const mongoose =require('mongoose');


//User SCHEMA
const ArticleSchema = mongoose.Schema({
  title:{
    type: String,
    required : true
  },
  Category:{
      type: String,
      required: true,
      default: 'miscellaneous'
  },
  Author:{
    type: String,
    // ref: 'TechnicalUser',
    required: true
  },
  Body:{
      type: [String],
      required: true
  },
  steptitiles:{
    type: [String],
    required: true
  },
  Created:{
     type: Date,
     default: Date.now
  },
  Updated:{
    type: Date,
    default: Date.now
  },
  Likes:{
      type: Number,
      default: 0
  }
});

//the model User is based on UserSchema
const User = module.exports = mongoose.model('articles',ArticleSchema);
