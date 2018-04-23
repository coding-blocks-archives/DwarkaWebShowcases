var Mongoose=require('mongoose');
var Schema=Mongoose.Schema;

var schema= new Schema({
   imagePath: {type: String, required:true},
   title: {type:String, required:true},
   description: {type:String, required:true},
   price:{type:Number,required:true}
});

module.exports = Mongoose.model('Product',schema);