let global = {};
window.onload = function () {
    let inp = document.getElementById('input');
    let result = document.getElementById('todo');
    let bt = document.getElementById('bt');
    let cl = document.getElementById('clr');

    let todoList = JSON.parse(localStorage.getItem('task'))||[];
    global.todoList = todoList;
    display();

    bt.onclick = function () {
        if(inp.value !== '') {
            let todo = {
                item: inp.value,
                done: false
            };
            inp.value = '';
            todoList.push(todo);
            localStorage.setItem('task', JSON.stringify(todoList));
            global.todoList = todoList;
            display();
        }
    };

    cl.onclick = function () {
        result.innerHTML = "";
        todoList = [];
        localStorage.removeItem('task');
    };

    inp.onkeydown = function () {
        if(event.keyCode === 13)
            bt.onclick();
    };

    function display() {
        let finalList = "";
        for(let i=0; i<todoList.length; i++){
            finalList += `<a class="collection-item center-align col s1" style="height: 30px">${i+1}.</a>     
                          
                          <a class="collection-item col s1 switch" style="height: 30px">
                            <label>                              
                              <input type="checkbox" id="i${i}" onclick="toggle(this)">
                              <span class="lever"></span>                              
                            </label>
                          </a>             
       
                          <a href="#!" class="collection-item center-align col s8" id=${i} style="height: 30px; font-size: 25px">${todoList[i].item}</a>
                                                    
                          
                          <a href="#!" class="collection-item col s1 center-align" id="u${i}" onclick="update(this.id)" style="height: 30px"><i class="material-icons">create</i></a>
                          <a href="#!" class="collection-item col s1 center-align" id="d${i}"  onclick="del(this.id)" style="height: 30px"><i class="material-icons">clear</i></a>`;
        }

        result.innerHTML = "";
        result.innerHTML = finalList;
        for(let i=0; i<todoList.length; i++){
            if(todoList[i].done === true) {
                document.getElementById('i'+i).checked = 1;
                document.getElementById(i).style.textDecoration = 'line-through';
            }
        }
    }

    function del(ev) {
        let id = ev.slice(1);
        todoList.splice(id,1);
        localStorage.setItem('task', JSON.stringify(todoList));
        display();
    }

    window.del = del;
};

function update(ev) {
    let id = ev.slice(1);
    let item = document.getElementById(id);
    let v = item.innerHTML;
    item.innerHTML = `<input type="text" class="center-align valign-center" id="np" placeholder="Enter data" onkeydown="if(event.keyCode===13) up(this.id)">`;

    function up(e) {
        let val = document.getElementById(e).value;
        item.innerHTML = val;
        item.style.textDecoration = 'none';
        document.getElementById('i'+id).checked = 0;
        global.todoList[id].item = val;
        global.todoList[id].done = false;
        localStorage.setItem('task', JSON.stringify(global.todoList));
    }
    window.up = up;
}

function toggle(el) {
    let id = el.id.slice(1);
    global.todoList[id].done = !global.todoList[id].done;
    localStorage.setItem('task', JSON.stringify(global.todoList));
    let checked = global.todoList[id].done;
    strikeThrough(checked,id);
}

function strikeThrough(checked, id){
    if(checked){
        document.getElementById(id).style.textDecoration = 'line-through';
    }
    else
        document.getElementById(id).style.textDecoration = 'none';
}