const mongodb = require('mongodb').MongoClient;
let dbuser = 'ankit';
let passwd = 'qwerty123';
let dbname = 'test'
let collection = 'todo';

let url = `mongodb+srv://${dbuser}:${passwd}@cluster0-ozcdd.mongodb.net/test?retryWrites=true`;


let connect = (cb) => {
    mongodb.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) throw err;
        let db = client.db(dbname);
        collection = db.collection(`${collection}`);
        cb();
    });
}

let findList = (cb) => {
    collection.find({}).toArray((err,docs)=>{
        if(err) throw err
        else{
            // console.log('from db '+docs[0].work)
            cb(docs);
        }
    });
}

let addTask = (work, doneval, cb) =>{
    var document = {work:work, done:doneval, created_on:Date.now()};
    collection.insertOne(document,(err,records)=>{
        if(err) throw err
        else{
            console.log(`records inserted`);
            cb();
        }
    });
}

let removeTask = (item,cb)=>{
    // console.log(`items's value ${item}`)
    collection.deleteOne({'work':item}, (err,result)=>{
        if(err) throw err
        else{
            // console.log(result);
            cb();
        }
    });
}

let updateTask = (item,doneval,cb)=>{
    collection.findOneAndUpdate({'work':item},{$set:{'done':doneval}},(err,result)=>{
        if(err) throw err
        else{
            // console.log(result);
            cb();
        }
    });
}

module.exports = {
    connect,
    findList,
    addTask,
    removeTask,
    updateTask
}