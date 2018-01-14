var todoList = JSON.parse(localStorage.getItem('finalList')) || [];

window.onload = function(){

    var taskValue = document.getElementById('task');
    var btn = document.getElementById('add');
    var list = document.getElementById('list');
    console.log(todoList);
    show();
    btn.onclick = function(){
        if(taskValue.value != ""){
            var task = {
                "taskValue" : taskValue.value,
                "done" : false,
                "up" : false,
            };

            todoList.push(task);
            taskValue.value = "";
            localStorage.setItem('finalList',JSON.stringify(todoList));
            show();
        }
    }


}

function show(){
    var finalList="";
    for(i=0;i<todoList.length;i++){
        if(todoList[i].done == true){
            finalList+= '<li class="list-group-item list-group-item-success"  style="text-decoration: line-through" onclick="toggle(this)" id='+i+'>';
            if(todoList[i].up == true){
                finalList+= ' <input type="text" class="update" id="update'+i+'" value="' + todoList[i].taskValue + '">';
            }
            else{
                finalList+= todoList[i].taskValue ;
            }
            finalList+= '<span class="fa fa-check" aria-hidden="true" style="float: right;"></span></li>';
        }
        else if(todoList[i].up == true){

            finalList+= '<li class="list-group-item list-group-item-warning" onclick="toggle(this)" id='+i+'>';
            finalList+= '<input type="text" class="update" id="update'+i+'" value="' + todoList[i].taskValue + '">';
            finalList+= '</li>';

        }
        else
            finalList += '<li class="list-group-item list-group-item-warning" onclick="toggle(this)" id='+ i +'>'+ todoList[i].taskValue +'</li>';

        finalList+='<ul class="list-inline" >'
        finalList+='<li class="list-inline-item"> <button class=" yo list-group-item list-group-item-danger " type="button" onclick= "del('+ i + ')"> <i class="fa fa-times" aria-hidden="true"></i>   </button> </li>';
        finalList+='<li class="list-inline-item"> <button class=" yo list-group-item list-group-item-success " type="button" onclick= "markdone('+ i + ')"> <i class="fa fa-check" aria-hidden="true"></i> </button> </li>';
        finalList+='<li class="list-inline-item"> <button class=" yo list-group-item list-group-item-info " type="button" onclick= "update('+ i + ')"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i>  </button> </li>';
        finalList+='</ul>'
    }
    list.innerHTML = finalList;
}

function toggle(el){

    console.log(el.id);
    if( todoList[el.id].up == false){
        todoList[el.id].up = true;
        show();
        localStorage.setItem('finalList',JSON.stringify(todoList));
    }

}

function update(id){

    if(todoList[id].up == true){
        todoList[id].taskValue = document.getElementById('update'+id).value;
        todoList[id].up = false;
    }
    else{
        todoList[id].up = true;
    }
    show();
    localStorage.setItem('finalList',JSON.stringify(todoList));
}

function del(id){

        console.log("deleting "+id);
        todoList.splice(id,1);
        show();
        localStorage.setItem('finalList',JSON.stringify(todoList));

}


function markdone(id){

    var donebtn= document.getElementById(id);
    if(todoList[id].done == true){
        donebtn.setAttribute("style","text-decoration: none");
        todoList[id].done = false;
    }
    else{
        donebtn.setAttribute("style","text-decoration: line-through");
        todoList[id].done= true;
    }
    show();
    localStorage.setItem('finalList',JSON.stringify(todoList));
}
