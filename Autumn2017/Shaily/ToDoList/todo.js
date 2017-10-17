var taskarray=JSON.parse(localStorage.getItem('data'))||[];

window.onload=function () {
    var taskvalue = document.getElementById('task');
    var btn = document.getElementById('add');
    var list = document.getElementById('list');

    display();

    btn.onclick=function () {
        var task={
            'taskvalue': taskvalue.value,
            'done': false
        }

        taskarray.push(task);
        localStorage.setItem('data', JSON.stringify(taskarray));
        display();

    };

    function remove() {
        var id = this.getAttribute('id');

        taskarray.splice(id, 1);
        localStorage.setItem('data', JSON.stringify(taskarray));

        display();

    }

    function display() {
        var data='';
        for(var i=0;i<taskarray.length;i++){
            if(taskarray[i].done === true)  {
                data += '<div class="lidiv"><span><li id='+ i + ' onclick= "check(this)" style="text-decoration: line-through;"><button class="tick"><i class="fa fa-check fa-2x" aria-hidden="true"></i></button>'+taskarray[i].taskvalue +'</li><button class="remove" id="' + i  + '"><i class="fa fa-trash fa-3x" aria-hidden="true"></i></button></span></div>';
            }
            else {
                data += '<div class="lidiv"><span><li id='+ i + ' onclick= "check(this)"><button class="tick"><i class="fa fa-check fa-2x" aria-hidden="true"></i></button>' + taskarray[i].taskvalue+'</li><button class="remove" id="' + i  + '"><i class="fa fa-trash fa-3x" aria-hidden="true" ></i></button></span></div>';
            }
        }

        list.innerHTML = data;

        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', remove);
        };

    }
}



function check(el) {
    if(taskarray[el.id].done===true){
        el.style.textDecoration = 'none';
    }else{
        el.style.textDecoration = 'line-through';
    }
    taskarray[el.id].done = !taskarray[el.id].done;
    localStorage.setItem('data', JSON.stringify(taskarray));
    console.log(taskarray);
}

