const mongodb = require('mongodb').MongoClient;
let topUser = require('mongodb').ObjectID("5b637cfde7179a0733452cea");

const uri = 'YOUR_DATABASE_URI';

let database;
let collection;

function connectDb() {
    console.log("inside connectDb");
    mongodb.connect(uri, function (err, client) {
        console.log("inside mongodb.connect");
        if (err) {
            console.log(err);
            throw err;
        }
        database = client.db('todo');
        collection = database.collection('collection');

        // console.log(collection);

        // global.insertNewUser = insertNewUser;
        // global.insertTodo = insertTodo;
        // global.retrieveAll = retrieveAll;
        // global.deleteElement = deleteElement;
        // global.updateElement = updateElement;
        // global.deleteMul = deleteMul;
    });
}

function insertNewUser (userID) {
    collection.insertOne({
        user: {
            userId: userID
        }
    });
}

function getUserTop (callback) {
    collection.find({"_id" : topUser}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(result);
        incrementUserTop(result);
        callback(result);
    })
}

function incrementUserTop(data) {
    data = parseInt(data[0]['userTop']);
    collection.updateOne({"userTop": data}, {$set :{'userTop' : ++data}});
}



function insertTodo(userID, task, status, callback) {
    userID = parseInt(userID);
    task = task.toString();
    console.log(userID, task);
    status = status.toString();
    collection.updateOne({'user.userId': userID},{$set: {[task]: status}});
    callback(task);
}



function retrieveAll(userID, callback) {
    console.log(userID);
    collection.find({"user.userId": userID}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(result);
        callback(result);
    });
}

function deleteElement(userID, task) {
    collection.updateOne({ "user.userId": userID}, { $unset: { [task]: ""}});
}

function updateElement(userID, task, newTask, callback) {
    collection.updateOne({ "user.userId": userID}, { $rename: { [task]: newTask}});
    callback(newTask);
}

function deleteMul(userID, taskArr) {
    taskArr.forEach(function (task) {
        collection.updateOne({ "user.userId": userID}, { $unset: { [task]: ""}});
    })
}

module.exports = {
    insertNewUser,
    insertTodo,
    retrieveAll,
    deleteElement,
    deleteMul,
    updateElement,
    connectDb,
    getUserTop
};