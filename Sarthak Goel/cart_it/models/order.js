var Mongoose=require('mongoose');
var Schema=Mongoose.Schema;

var schema= new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User'},
    cart:{type: Object, required: true},
    address:{type:String,required:true},
    name:{type:String,required:true},
    paymentId:{type:String,required:true}
});

module.exports = Mongoose.model('Order',schema);