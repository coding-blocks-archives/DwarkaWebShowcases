const server = require('express');
const app = server();
const bodyParser = require('body-parser') ;
const db = require('./database') ;
const PORT = process.env.PORT || 5000;


// Create TodoList Array Here
let todoListserver = [] ;
let status = [] ;

app.use('/', server.static('./public'));
app.use( bodyParser.json() ) ;
app.use( bodyParser.urlencoded({extended : true})) ;  // allows nested object in req.body

app.post('/add', function(req,res) {

    // Get the todoItem using req.body.todo
      console.log(req.body.todo) ;

    // Push In todoList ARRAY and status array
    let status = 0 ;
    db.add(req.body.todo , status , function(data){
        res.send(req.body.todo) ;
    })

    //    todoListserver.push( req.body.todo ) ;
    //    status.push('false') ;
    //
    // // Response back => req.query
    //     res.send( req.body.todo  ) ;
});

app.get('/display', function(req,res) {

    // Send TodoList Array and Status array to the client
    db.display(function(data){
       res.send(data) ;
    }) ;

}) ;

app.post('/check' , function(req , res){
  let value = req.body.val ;
  let index = req.body.index ;   // id of the todo

  console.log(value) ;
  // toggle the state of todo.value
  if(value === '0' ){
      value = 1 ;
  }else if(value === '1'){
      value = 0 ;
  }

  db.check(index , value , function(data){
      res.sendStatus(200) ;
  }) ;

});

app.post('/update' , function(req , res){

    let i = req.body.position ;
    let item = req.body.val ;
    db.update(i , item , function(data){
       res.sendStatus(200) ;
    });
    // todoListserver[i] = item ;
    // res.sendStatus(200) ;

}) ;

app.post('/delete' , function(req , res){

    let i = req.body.index ;  // i is the id in database
    db.del( i,function(){
        res.sendStatus(200) ;
    });
}) ;

app.listen(PORT, function(){

    console.log("Server running on Port " + PORT);
    db.connectDb() ;

}) ;