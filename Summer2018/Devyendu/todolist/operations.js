const databsase = require('./database') ;

// query for sending the todolist back
function sendTodoList(connection , data ){
    connection.query('SELECT * FROM TASK1' , function(error , results , fields ){
        if(error) throw error ;
        data(results) ;
    }) ;
}

// query for adding a new todo to the database
function addTodo(connection ,  name , status , data ){
   connection.query(`INSERT INTO TASK1( name , status ) VALUES( ?, ? )`, [ name , status] , function(error , results , fields ){
      if(error) throw error ;
      data(results) ;
   });
}

// query for deleting a todo from the database
function deleteTodo(connection , id ,data ){

    connection.query(`DELETE FROM TASK1 where(id = ?) `, [id] , function( error , results , fields ){
       if(error) throw error
       data(results) ;
    }) ;

}

// query for updating a todo
function updateTodo(connection , i , item , data ){
    connection.query(`update TASK1 SET name = ? where id = ? ` , [item , i ] , function(error , results , fields){
        if(error) throw error
        data(results) ;
    }) ;
}

// query for checking/unchecking  a todo
function toggleTodo(connection , i , value , data ){
    connection.query('update TASK1 SET status = ? where id = ? ' , [value , i],function(error , results , fields){
      if(error) throw error
        data(results) ;
    }) ;
}

module.exports = {
    sendTodoList ,
    addTodo ,
    deleteTodo ,
    updateTodo ,
    toggleTodo
}
