let todolist = [] ;
let statusarray = [] ;
let idarray = [] ;

function display() {

       let data = JSON.parse(localStorage.getItem('todolist'))  || [] ;
       let data1 = JSON.parse(localStorage.getItem('statusarray') ) || [] ;
       let data2 = JSON.parse(localStorage.getItem('idarray') ) || [] ;

       todolist = data ;
       statusarray = data1 ;
       idarray = data2 ;

        if(data.length ){

            for(let i = 0 ; i < todolist.length ; i++ ){
                 createTodo(todolist[i] , statusarray[i] , false ) ;
            }

        }else{

            // ajax request to server , for fetching the todos from database
            $.ajax({
                url : '/display' ,
                method : 'GET' ,
                success : function(data){
                    console.log(data) ;
                    data.forEach(function(i){
                        createTodo(i.name , i.status , false ) ;
                        todolist.push(i.name) ;
                        statusarray.push(i.status) ;
                        idarray.push(i.id) ;
                    }) ;

                    localStorage.setItem('todolist' , JSON.stringify(todolist)) ;
                    localStorage.setItem('statusarray' , JSON.stringify(statusarray)) ;
                    localStorage.setItem('idarray' , JSON.stringify(idarray) ) ;
                    // for(let i = 0 ; i < data.todoListserver.length ; i++ ){
                    //     createTodo(data.todoListserver[i], data.status[i] , false ) ;
                    // }
                }
            }) ;
        }

}


$(document).ready( function(){

    let button = document.getElementById("btn");
    let input = document.getElementById("inp");


    display() ;

    button.onclick = abcd;
     function abcd(){
         $.ajax ( {
             url: '/add',
             method: 'POST',
             data: {todo : input.value  } ,
             success: function(data) {
                 console.log(data);
                 // append todo
                 createTodo(data , 0 , true ) ;
             }
         }) ;

         input.value = '' ;
     }


}) ;



// create a new todo_item  -- logic for rendering the page (specially appending the todoitems in todolist )
function createTodo(value , status , isNew ) {

    let output = document.getElementById("result");

    //For checking if a string is blank, null or undefined
    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };

    if (!value.isEmpty()) {

        // creating an li element
        let todo = document.createElement('li');
        todo.setAttribute("onclick" , "check(this)") ;
         todo.setAttribute("value" , status ) ;

        //creating delete button
        let del_btn = document.createElement('button');

        //creating update button
        let upd_btn = document.createElement('button');

        // creating delete icon
        let del_icon = document.createElement('i');
        del_icon.setAttribute("class", "fa fa-trash");
        del_icon.setAttribute("aria-hidden", "true");

        // putting del_icon to del_btn and set onclick attribute
        del_btn.append(del_icon);
        del_btn.setAttribute("onclick", "del(this)");

        // putting upd_icon to upd_btn and set onclick attribute
        let upd_icon = document.createElement("i") ;
        upd_icon.setAttribute("class" , "fa fa-edit ") ;
        upd_btn.append(upd_icon) ;
        upd_btn.setAttribute("onclick" , "update(this)") ;

        // append value and delete button to new_todo
        todo.append(value);
        todo.append(del_btn);
        todo.append(upd_btn);

        todo.setAttribute("class", "todoItem");
        // append the new_todo to our todo_list

        if(status == 1){
            todo.classList.add('done') ;
        }

        output.append(todo);

        if(isNew){

            todolist.push(value) ;
            statusarray.push(0) ;

            if(idarray.length){  // if idarray is not empty
                idarray.push(idarray[idarray.length - 1] + 1 ) ;
            }else{ // initially when idarray is empty
                idarray.push(1) ;
            }


            // modify the todolist and status array in localstorage
            localStorage.setItem('todolist' , JSON.stringify(todolist)) ;
            localStorage.setItem('statusarray' , JSON.stringify(statusarray)) ;
            localStorage.setItem('idarray' , JSON.stringify(idarray) ) ;

        }

    }else{
        alert("empty todos can't be created , try typing your todo , then click this button ") ;
    }


}

// delete function
function del(btn) {

    console.log( $(btn).parent().index() ) ;
    $.ajax({
        url : '/delete' ,
        method : 'POST' ,
        data : {index : idarray[$(btn).parent().index()]  }  ,
        success : function (data) {

            // modify the local storage if item deleted successfully
            todolist.splice($(btn).parent().index() , 1) ;
            statusarray.splice($(btn).parent().index() , 1 ) ;
            idarray.splice($(btn).parent().index() , 1 ) ;

            localStorage.setItem('todolist' , JSON.stringify(todolist)) ;
            localStorage.setItem('statusarray' , JSON.stringify(statusarray)) ;
            localStorage.setItem('idarray' , JSON.stringify(idarray)) ;


            $(btn).parent().remove() ;
        }

    }) ;



}

// check function
function check(todo) {
    // for  completed or uncompleted  work

            $.ajax({
                url : '/check' ,
                method : 'POST' ,
                data : {
                         val : todo.value ,
                         index : idarray[$(todo).index()]
                        }  ,
                success : function(){
                    if(todo.value == 0){
                        statusarray[$(todo).index()] = 1 ;
                    }else if(todo.value == 1){
                        statusarray[$(todo).index() ] = 0 ;
                    }else{
                        console.log("unexpected value of status ... ") ;
                    }

                    // modify the localstorage status array
                    localStorage.setItem('statusarray' , JSON.stringify(statusarray)) ;

                    todo.classList.toggle("done") ;
                    console.log("todo completed ") ;
                }

            }) ;

}


// update function
function update(btn) {

    let newValue = "";
    let li = btn.parentElement ;
    newValue = prompt("update your todo from , ( " + li.firstChild.textContent + " ) to " );

    li.textContent = "" ; // remove older value
    li.setAttribute("onclick" , "check(this)") ;

    //creating delete button
    let del_btn = document.createElement('button');

    //creating update button
    let upd_btn = document.createElement('button');

    // creating delete icon
    let del_icon = document.createElement('i');
    del_icon.setAttribute("class", "fa fa-trash");
    del_icon.setAttribute("aria-hidden", "true");

    // putting del_icon to del_btn and set onclick attribute
    del_btn.append(del_icon);
    del_btn.setAttribute("onclick", "del(this)");

    // putting upd_icon to upd_btn and set onclick attribute
    let upd_icon = document.createElement("i") ;
    upd_icon.setAttribute("class" , "fa fa-edit ") ;
    upd_btn.append(upd_icon) ;
    upd_btn.setAttribute("onclick" , "update(this)") ;

    // append value and delete button to new_todo
    li.append(newValue);
    li.append(del_btn);
    li.append(upd_btn);


    alert("todo updated successfully with " + newValue ) ;
    event.stopPropagation() ;

    $.ajax({
        url : '/update' ,
        method : 'POST' ,
        data : {
            position  : idarray[$(li).index()]  ,
            val : newValue
             } ,
        success : function(){
             console.log("todolist updated successfully ") ;
             todolist[$(li).index()] = newValue ;

             // modify the local storage todolist array
             localStorage.setItem('todolist' , JSON.stringify(todolist)) ;
        }

    }) ;



}