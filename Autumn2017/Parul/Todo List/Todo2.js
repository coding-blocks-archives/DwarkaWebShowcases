var taskArray = JSON.parse(localStorage.getItem('data')) || [];
window.onload=function(){
    var taskValue=document.getElementById('task');
    var btn= document.getElementById('add');
    var list=document.getElementById('list');
    display();
    
    
    btn.onclick=function(){
        var task={
            "taskValue":taskValue.value,
            "done":false
        };
        
    
        taskArray.push(task);
        localStorage.setItem('data', JSON.stringify(taskArray));
        display();
        
    }
    
}

function display(){
    var data="";
    list.innerHTML="";
//    var span=document.createElement("SPAN");
//    var txt=document.createTextNode("\u00D7");
//    span.className="close";
//    span.appendChild(txt);
//    var cross='<span>'+ #x2717;
//    +'</span>';
    
    for(var i=0;i<taskArray.length;i++){
        if(taskArray[i].done === true)  {
                
                data += '<li> <span id='+ i + ' onclick= "check(this)" style="text-decoration: line-through;">' + taskArray[i].taskValue +'</span> <button onclick="remove(this)" class="remove" id=' + "c" + i  + '>x</button></li>';
            
//                 var cross=document.getElementById(i);
//                 cross.appendChild(span);
//                 data += cross;
            
            }
            else {
//                data += '<li> <span id='+ i + ' onclick= "check(this)">' + taskArray[i].taskValue  +  '</span> <button onclick="remove(this)" class="remove" id=' +"c" + i + '>x</button></li>';
                        data += '<li> <span id='+ i + ' onclick= "check(this)">' + taskArray[i].taskValue  +  '</span> <button onclick="remove(this)" class="remove" id=' +"c" + i + '>x</button></li>';
                
//                cross.appendChild(span);
//                data += cross;
            }
        
            list.innerHTML= data;
    }
}

function check(el) {

    if(taskArray[el.id].done === true) {
        el.style.textDecoration = 'none';
    }
    else {
        el.style.textDecoration = 'line-through';
    }



    taskArray[el.id].done = !taskArray[el.id].done;
    localStorage.setItem('data', JSON.stringify(taskArray));
    console.log(taskArray);
}

function remove(obj){
    var index=obj.id.toString();
    console.log(index);
    var i=index.substr(1,1);
    console.log(i);
    i=parseInt(i);
    taskArray.splice(i,1);
    display();
    localStorage.setItem('data', JSON.stringify(taskArray));
    
}

