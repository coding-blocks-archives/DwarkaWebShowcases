let todolist = JSON.parse(localStorage.getItem('todolist')) || [];
window.onload= function() {
    let inp = document.getElementById('inp');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');

    display();
    btn.onclick = function () {
        let task = {
            item: inp.value,
            done: false
        };
        todolist.push(task);
        localStorage.setItem('todolist', JSON.stringify(todolist));
        display();
    }
    window.display=display;
};

    function display() {
        let list = " ";
        for (let i = 0; i < todolist.length; i++) {
            // list += `<tr></td><td>&nbsp;${i+1}. &nbsp; <input type="text" size="60" id="${i}" value="${todolist[i].item}"></td><td> <button class=" list-group-item list-group-item-success " onclick= "toggle(this)" id="i${i}"> <i class="fa fa-check" aria-hidden="true"></i>Done</button></td><td><button class=" list-group-item list-group-item-danger " onclick= "toggle1(this)" id="i${i}"> <i class="fa fa-times" aria-hidden="true"></i>Delete</button></td></tr>`
            list+=`<tr><td>&nbsp;${i+1}.</td><td> &nbsp; <input type="text" size="25%" id="${i}" value="${todolist[i].item}"></td><td><button class="done" id="i${i}" title="Done" onclick="toggle(this)"> <i class="fa fa-check fa-lg"> </i> </button></td><td><button class="delete" id="i${i}" title="Delete" onclick="toggle1(this)" ><i class="fa fa-trash fa-lg"></i></button></td><td><button class="update" id="i${i}" title="Remove" onclick="toggle3(this)" ><i class="fa fa-edit fa-lg"></i></button></td></tr>`

        }
        result.innerHTML = " ";
        result.innerHTML = list;
        for (let i = 0; i < todolist.length; i++) {
            let checked = todolist[i].done;
            console.log(checked);
            strikeOff(checked, i);
        }
        document.getElementById('inp').value = ' ';
    }


todolist=JSON.parse(localStorage.getItem('todolist')) || [];
function toggle(e1)
{

    let id=e1.id.substr(1);
    todolist[id].done=!todolist[id].done;
    let checked=todolist[id].done;


    strikeOff(checked,id);
    localStorage.setItem('todolist',JSON.stringify(todolist));

}

function strikeOff(check,id)
{let e1=document.getElementById(id);
    let c=`i${id}`;
    let checkbox=document.getElementById(c);
    if(check)
    {

        e1.style.textDecoration="line-through";
        checkbox.checked=true;
        console.log(check);

    }
    else
    {    checkbox.checked=false;
        e1.style.textDecoration="none";
        console.log(check);
    }
}

function toggle1(e)
{
    var ans = window.confirm("Are you sure you want to delete this item?");
    if(ans) {
        console.log(e);
        let id = e.id.substr(1);
        console.log(id);
        todolist.splice(id, 1);
        localStorage.setItem('todolist', JSON.stringify(todolist));
        display();
    }
}
function toggle2()
{

    var ans = window.confirm("Are you sure you want to delete all items ?");
    if(ans) {
        todolist = [];
        localStorage.setItem('todolist', JSON.stringify(todolist));
        display();
    }
}

function toggle3(e2){
    let index=e2.id.substr(1);
    var newVal=document.getElementById(index);
          todolist[index].item=newVal.value;
        localStorage.setItem('todolist',JSON.stringify(todolist));
        display();
}