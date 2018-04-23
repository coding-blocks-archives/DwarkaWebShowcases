var Product= require('../models/product');

var Mongoose=require('mongoose');
Mongoose.connect('mongodb://sarthak:goel@ds031892.mlab.com:31892/shopping');
var products= [
    new Product({
        imagePath: "https://s4.thcdn.com/productimg/600/600/11482358-1654517750289525.jpg",
        title:'Fifa 18 Video Game',
        description: 'Awesome Game!!!!',
        price: 30
    }),
    new Product({
        imagePath: "https://images-na.ssl-images-amazon.com/images/I/81IRIbID6IL._SX342_.jpg",
        title:'Need For Speed Video Game',
        description: 'Speedy Game!!!!',
        price: 20
    }),
    new Product({
        imagePath: "http://product.takwene.com/Files/Catalog/Products/612/photo_72e1d78b-29ed-4b0d-b51f-906a9718f49d.jpg",
        title:'Assasins Creed Video Game',
        description: ' Weapons Out !!!!',
        price: 15
    }),
    new Product({
        imagePath: "http://heavyarm-asia.com/wp-content/uploads/2018/03/ps4-injustice-legendary-350x435.jpg",
        title:'Injustice2 Video Game',
        description: 'Thrill !!!!',
        price: 10
    }),
    new Product({
        imagePath: "https://static-ca.ebgames.ca/images/products/724315/3max.jpg",
        title:'Call of Duty Video Game',
        description: 'War !!!!',
        price: 25
    }),
    new Product({
        imagePath: "https://s.s-bol.com/imgbase0/imagebase3/large/FC/6/9/9/6/9200000079446996.jpg",
        title:'WWE2k18 Video Game',
        description: 'Lets Fight!!!!',
        price: 13
    }),
];

var done=0;
for (var i=0;i<products.length;i++){
    console.log(products[i]);
    products[i].save(function(){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    Mongoose.disconnect();
}
