window.onload = function() {
    let inp = document.getElementById('inp');
    let list = document.getElementById('list');
    let todoList = JSON.parse(localStorage.getItem('toDo')) || [];
    display();
    function Submit(e) {
        if(e.keyCode !== 13)
            return;
        if(inp.value === ""){
            alert('You have nothing to do. Go find something !!');
            return;
        }

        let task = {
            "name" : inp.value,
            "check" : false
        };
        inp.value = "";
        todoList.push(task);
        display();
    }

    function display() {
        let finalList = "";
        for(let i=todoList.length - 1; i >= 0; i--) {
            if(todoList[i].check) {
                finalList += `<li style="text-decoration: line-through" id = "item${i}" class = "done">${todoList[i].name} </li><div id = "buttons"><i class="fa fa-check" onclick="x(this)" aria-hidden="true"></i><i onclick="update(this)" class="fa fa-pencil" aria-hidden="true"></i><i onclick="del(this)" id = "del${i}" class="fa fa-trash" aria-hidden="true"></i></div>`;
            }else {
                finalList += `<li style="text-decoration: none" id = "item${i}">${todoList[i].name} </li><div id = "buttons"><i class="fa fa-check" onclick="x(this)" aria-hidden="true"></i><i onclick="update(this)" class="fa fa-pencil" aria-hidden="true"></i><i onclick="del(this)" id = "del${i}" class="fa fa-trash" aria-hidden="true"></i></div>`;
            }
        }
        localStorage.setItem('toDo', JSON.stringify(todoList));
        list.innerHTML = "";
        list.innerHTML = finalList;

    }

    function x(e) {
        e = e.parentElement.previousSibling;
        let temp = e.id.substring(4);
        if(e.style.textDecoration === 'none'){
            e.style.textDecoration = 'line-through';
            e.classList.add('done');
            todoList[temp].check = true;
        }else{
            e.style.textDecoration = 'none';
            e.classList.remove('done');
            todoList[temp].check = false;
        }
        localStorage.setItem('toDo', JSON.stringify(todoList));
    }
    window.x = x;
    function del(e) {
        let temp = e.id.substring(3);
        todoList.splice(temp,1);
        display();
        localStorage.setItem('toDo', JSON.stringify(todoList));
    }
    function update(e) {
        e = e.parentElement.previousSibling;
        let temp = e.id.substring(4);
        let edit = `<input onkeypress="updatesubmit(event,this)" onfocus="true" type="text" value="${todoList[temp].name}">`;
        e.innerHTML = "";
        e.innerHTML = edit;
        e = e.firstChild;
    }

    function updatesubmit(e,ele) {
        if(e.keyCode !== 13)
            return;
        else {
            if(ele.value === ""){
                alert('You have nothing to do. Go find something !!');
                return;
            }
            let temp = ele.parentElement.id.substring(4);
            todoList[temp].name = ele.value;
            ele = ele.parentElement;
            ele.innerHTML = "";
            ele.innerHTML = `${todoList[temp].name}`;
            localStorage.setItem('toDo', JSON.stringify(todoList));
            display();
        }
    }
    window.del = del;
    window.updatesubmit = updatesubmit;
    window.Submit = Submit;
    window.update = update;
};
