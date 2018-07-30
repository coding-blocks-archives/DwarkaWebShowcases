const mysql = require('mysql');
const operations = require('./operations') ;

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dsc712',
    password : 'd71298sc',
    database : 'mydb'
});


function connectDb() {
    connection.connect();
}

function display(getData){

    operations.sendTodoList(connection , function(data){
        getData(data) ;
    }) ;

}

function add(todo , status , addData){
    operations.addTodo(connection ,todo , status , function(data){
        addData(data) ;
    }) ;
}

function del(i , deleteData ){
   operations.deleteTodo(connection , i , function(data){
      deleteData(data) ;
   });
}

function update(i , item , updateTodo){
    operations.updateTodo(connection , i , item , function(data){
        updateTodo(data) ;
    })
}
function check(i , value , checkTodo){
    operations.toggleTodo(connection , i , value , function(data){
        checkTodo(data) ;
    }) ;
}
module.exports = {
    connectDb ,
    display ,
    add ,
    del ,
    check ,
    update
};
