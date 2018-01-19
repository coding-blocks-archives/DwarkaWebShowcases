window.onload = function() {
    let inp = document.getElementById('inp');
    //let btn = document.getElementById('btn');
    let list = document.getElementById('list');
    let counter = document.getElementById('counter');
    let todoList = JSON.parse(localStorage.getItem('toDo')) || [];
    display();
    function Submit(e) {
        if(e.keyCode !== 13)
            return;
        if(inp.value === '')
        {
            alert("Task can't be Empty");
            return;
        }
        let task = {
            "name" : inp.value,
            "check" : false
        };
        todoList.push(task);
        display();
    }

    function display() {
        let finalList = "";
        counter.innerHTML = "";
        counter.innerHTML = todoList.length.toString();
        for(let i=todoList.length-1; i>=0; i--)
        {
            if(todoList[i].check) {
                finalList += `<li style="text-decoration: #000000 line-through" class="complete">
                                   <div class="check">
                                        <input onclick="x(this)" checked type='checkbox' id = "task${i}">
                                        <label for="task${i}"></label>
                                    </div>
                                    <div class="text">
                                        ${todoList[i].name}
                                    </div>
                                    <a role="button" onclick="del(this)" id="del${i}"></a>
                              </li>`
            }else {
                finalList += `<li style="text-decoration: none">
                                   <div class="check">
                                        <input onclick="x(this)" type='checkbox' id = "task${i}">
                                        <label for="task${i}"></label>
                                    </div>
                                    <div class="text">
                                        ${todoList[i].name}
                                    </div>
                                    <a role="button" onclick="upd(this)" id="del${i}"><i class="ion-edit">edit</i></a>
                              </li>`
            }
        }
        localStorage.setItem('toDo', JSON.stringify(todoList));
        list.innerHTML = "";
        list.innerHTML = finalList;
    }

    function x(e) {
        let temp = e.id.substring(4);
        let parpar = e.parentElement.parentElement;
        if(parpar.style.textDecoration === 'none'){
            let newa = `<div class="check">
                             <input onclick="x(this)" checked type='checkbox' id = "task${temp}">
                             <label for="task${temp}"></label>
                        </div>
                        <div class="text">
                            ${todoList[temp].name}
                        </div>
                        <a role="button" onclick="del(this)" id="del${temp}"></a>`;
            parpar.innerHTML = "";
            parpar.innerHTML = newa;
            parpar.classList.add("complete");
            parpar.style.textDecoration = "#000000 line-through";
            todoList[temp].check = true;
        }
        else{
            let newa = `<div class="check">
                            <input onclick="x(this)" type='checkbox' id = "task${temp}">
                            <label for="task${temp}"></label>
                        </div>
                        <div class="text">
                            ${todoList[temp].name}
                        </div>
                        <a role="button" onclick="upd(this)" id="del${temp}"><i class="ion-edit">edit</i></a>`;
            parpar.innerHTML = "";
            parpar.innerHTML = newa;
            parpar.style.textDecoration = 'none';
            todoList[temp].check = false;
            parpar.classList.remove("complete");
        }
        localStorage.setItem('toDo', JSON.stringify(todoList));
    }

    function del(e) {
        let temp = e.id.substring(3);
        todoList.splice(temp,1);
        display();
    }

    function upd(e) {
        let temp = e.id.substring(3);
        let parentli = e.parentElement;
        let newa = `<div class="check">
                        <input onclick="x(this)" type='checkbox' id = "task${temp}">
                        <label for="task${temp}"></label>
                    </div>
                    <div class="text">
                        <input type="text" value="${todoList[temp].name}" id="val${temp}">
                    </div>
                    <a role="button" onclick="ok(this)" id="del${temp}"><i class="ion-android-done-all">ok</i></a>`;
        parentli.innerHTML = "";
        parentli.innerHTML = newa;
        document.getElementById(`val${temp}`).focus();
    }
    function ok(e) {
        let parentli = e.parentElement;
        let temp = e.id.substring(3);
        let val = document.getElementById( `val${temp}`);
        todoList[temp].name = val.value;
        localStorage.setItem('toDo', JSON.stringify(todoList));
        let newa = `<div class="check">
                        <input onclick="x(this)" type='checkbox' id = "task${temp}">
                        <label for="task${temp}"></label>
                    </div>
                    <div class="text">
                        ${todoList[temp].name}
                    </div>
                    <a role="button" onclick="upd(this)" id="del${temp}"><i class="ion-edit">edit</i></a>`;
        parentli.innerHTML = "";
        parentli.innerHTML = newa;
    }
    window.ok = ok;
    window.del = del;
    window.x = x;
    window.Submit = Submit;
    window.upd = upd;
};

