var global = {};
window.onload = function() {

    let inp = document.getElementById('inp');
    let result = document.getElementById('result');
    let btn = document.getElementById('btn');

    global.todoList = JSON.parse(localStorage.getItem("todoList"))||[];
    display();

    inp.onkeydown = function(event){
        if(event.keyCode === 13)
        btn.onclick();
    };

    btn.onclick = function() {

        if (inp.value.length >= 1) {
            let task = {
                task: inp.value,
                done: false
            };

            global.todoList.push(task);
            localStorage.setItem("todoList", JSON.stringify(global.todoList));

            display();
        }

    };
    function display() {
        let finalList = "";
        for(let i=0; i<global.todoList.length; i++) {

                finalList +=   `<li id="li${i}" class="collection-item" style="background-color:bisque !important;">
                               <input onclick="toggle(this)" id="check${i}" type="checkbox">
                              <label for="check${i}" id="${i}" style="color:#5081ff;font-family:'Open Sans',sans-serif;font-weight:bold">${global.todoList[i].task}</label>                 
                           <i class="small material-icons" id="icon2${i}" onclick="Delete(this);" style="float:right;">delete</i>
                           <i class="small material-icons" id="icon1${i}" onclick="Edit(this);" style="float:right;">edit</i>
                          </li>`;
        }
        result.innerHTML = "";
        result.innerHTML = finalList;
        for(let i=0; i<global.todoList.length; i++)
            strikeOff(global.todoList[i].done,i);
        inp.value = "";
    }

    window.display = display;
};

function toggle(el){

    let id = el.id.substr(5);
    global.todoList[id].done = !global.todoList[id].done;
    let checked = global.todoList[id].done;
    strikeOff(checked, id);

}

function strikeOff(check, id) {
    let el = document.getElementById(id);

    if (check) {
        document.getElementById('check' + id).checked = true;                   //Just to ensure(keep tickedones ticked after dipslay is called again and again) as incase of Call from EDIT()
        el.style.textDecoration = 'line-through';
        document.getElementById('li' + id).style.backgroundColor = '#16487b2e';
        console.log("jiejnfi")
    }
    else {
        el.style.textDecoration = 'none';
        document.getElementById('li' + id).style.backgroundColor = 'bisque';
    }

    localStorage.setItem("todoList", JSON.stringify(global.todoList));

}

function Delete(el){
    let id = el.id.substr(5);
    global.todoList.splice(id,1);
    localStorage.setItem("todoList",JSON.stringify(global.todoList));
    display();

}

function Edit(el) {
    let id = el.id.substr(5);
    let ele = document.getElementById(id);
    ele.innerHTML = `<input type="text" id="editedText" placeholder="Enter the new value" ><button class="btn hoverable" id="Btn">Update</button>`;

    document.getElementById('Btn').onclick = function () {
        global.todoList[id].task = editedText.value;
        localStorage.setItem("todoList", JSON.stringify(global.todoList));
        display();
    };

    editedText.onkeydown = function (event) {
        if (event.keyCode === 13) {
            global.todoList[id].task = this.value;
            localStorage.setItem("todoList", JSON.stringify(global.todoList));
            display();
        }
    };
}


