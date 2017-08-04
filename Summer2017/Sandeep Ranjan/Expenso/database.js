/**
 * Created by sandeep on 17/07/17.
 */
var mdb = require('mongodb');

var url = 'mongodb://localhost/expenso';

var _db = "";
var name = "";

function connectDB(run_server) {

    mdb.MongoClient.connect(url,function (err,db) {
        if(err) throw err;
        console.log('connected to db');
        _db = db;
        run_server();
    });

}

function get(info,cb) {
    name = info.user;
    _db.collection(info.user).find({_id: info.id}).toArray(function (err, data) {
        cb(data);
    });

}


function insertT(info,cb) {
    _db.collection(info.user).updateOne({ _id : "2" },{ $push : { passbook : info.trns } },{ upsert: true},function(err,res){
        cb(res);
    });
}

function insertP(info,cb) {
    _db.collection(info.user).updateOne({ _id : "3" },{ $push : { pending : info.pend } },{ upsert: true},function(err,res){
        cb(res);
    });
}

function deletePassbook(info,cb) {
    _db.collection(info.user).updateOne({_id : "2" },{$pull:{"passbook": {"desp":info.up }}},function(err,res){
        cb(res);
    });
}

function deletePending(info,cb) {
    _db.collection(info.user).updateOne({_id : "3" },{$pull:{"pending": {"desp":info.up }}},function(err,res){
        cb(res);
    });
}

function editPassbook(info,cb) {
    console.log(info.p);
    _db.collection(name).updateOne({_id : "2", "passbook.desp" : info.p.desp },
                                    { $set: {'passbook.$.bank' : info.n.bank, 'passbook.$.desp' : info.n.desp,
                                    'passbook.$.sign' : info.n.sign , 'passbook.$.amt' : info.n.amt}}
                                    ,function (err,res) {
        cb(res);
    });

}

function editPending(info,cb) {
    console.log(info.p);
    _db.collection(name).updateOne({_id : "3", "pending.desp" : info.p.desp },
        { $set: {'pending.$.desp' : info.n.desp, 'pending.$.d_date' : info.n.ddate , 'pending.$.amt' : info.n.amt}}
        ,function (err,res) {
            cb(res);
        });

}



function settingsForm(info,cb) {

    _db.collection(info.user).updateOne({_id : "1"},{settings : info.set},{upsert : true},function (err,res) {
        cb(res);
    });
}

function picture(file,cb) {

    _db.collection(name).updateOne({_id : "4"},{picture : file},{upsert : true},function (err,res) {
        cb(res);
    });
}












module.exports = {
    connectDB : connectDB,
    get : get,
    settingsForm : settingsForm,
    insertT : insertT,
    insertP : insertP,
    deletePassbook : deletePassbook,
    deletePending : deletePending,
    editPassbook : editPassbook,
    editPending : editPending,
    picture: picture


};



/*8287146146*/