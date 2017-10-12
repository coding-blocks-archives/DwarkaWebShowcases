const MongoClient = require('mongodb').MongoClient;
var url='mongodb://newuser:password@ds051868.mlab.com:51868/music_player';
var obj;

function connectToMongo(run_server){
    MongoClient.connect(url,function (err,db) {
        if (err) throw err;
        console.log("connected to db");
        obj=db;
        run_server();
        // db.close();
    });
}

function insertToMongo(item,callback) {
    obj.collection('users').insertOne(item,function (err,result) {
        if(err) throw err;
        callback(result);
    });
}

function getList(query,callback) {
    obj.collection('users').findOne(query,function (err,result) {
        if(err) throw err;
        callback(result);
    });
}

function updateItem(query,newItem,callback) {
    obj.collection('users').updateOne(query,newItem,function (err,result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports = {
    connectToMongo,
    insertToMongo,
    getList,
    updateItem
};
