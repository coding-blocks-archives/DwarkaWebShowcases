const server = require('express');
const app = server();



const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

/*
*
* This file creates the connection to the database
*
* */
const db = require('./database');

let PORT = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use('/',server.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


/*
*
* since the elements are not stored on the server
* we dont need todoList[]
*
* */
// var todoList = [];

app.get('/newuser', function (req, res) {
    getUserTop(function (data) {
        let userTop = parseInt(data[0]["userTop"]);
        db.insertNewUser(++userTop);
        res.cookie("userID", userTop, {
            expires: new Date(2147483647000)
        });
        res.send(userTop.toString());
    })

});

function getUserTop (callback) {
    db.getUserTop(function (data) {
        callback(data);
    })
}


app.post('/add', function(req,res) {
    let userID = req.cookies.userID;
    let todo = req.body.todo;
    console.log(todo);
    // todo = JSON.parse(todo);
    todo = todo.task;
    console.log(todo, "inside /add:  ", userID, "userID");
    let done = false;

    /*
    *
    * This send the new todo
    * entry in the database
    * and return the id of the data element
    * in the database
    *
    *
    * */
    db.insertTodo(userID, todo, done, function (data) {
        res.send(data);
    });

});




app.post('/delete', function(req,res){
    let userID = parseInt(req.cookies.userID);
    let task = (req.body.todo).toString();
    // task = task.task;
    /*
    *
    * This deletes the index
    *
    *
    * */
    db.deleteElement(userID, task);
    res.sendStatus(200);
});





app.get('/display', function(req,res) {
    // Send TodoList Array to the client
    // res.send(todoList);
    /*
    *
    * since we need to send the data from the data base we can use telescoping
    * that calls the display () in the database.js
    *
    * */
    let userId = parseInt(req.cookies.userID);
    console.log(userId, "inside display");
    db.retrieveAll(userId, function (data) {
        console.log(data);
        res.send(data);
    })
});





app.post ('/update', function (req, res) {
    let newval = req.body.val.toString();
    let prevVal = req.body.prevVal.toString();
    let done = false;
    let userID = parseInt(req.cookies.userID);

    db.updateElement(userID, prevVal, newval, function (data) {
        res.send(data);
    })
});





app.post ('/deleteMultiple', function (req, res) {
    let task = req.body.task;
    let userID = parseInt(req.cookies.userID);
    console.log(task);
    db.deleteMul(userID, task);
    res.sendStatus(200);
});

app.listen(PORT, function() {
   console.log("Server running on port ", PORT);
   db.connectDb();
});