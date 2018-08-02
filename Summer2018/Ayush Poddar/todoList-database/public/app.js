let todoList = [{}];
let delMul = [];
let taskArr = [];
let result = $('#list');
let inp = $('#inp');
// let userID;
// let ind = 0;
$(document).ready(function(){

    (function () {
        let userID = Cookies.get('userID');
        console.log(userID);
        if (!userID) {
            let res = prompt("Are you a new user (y/n)");
            if (res[0].toLowerCase() === 'y') {
                $.ajax({
                    url: '/newuser',
                    method: 'get',
                    success: function (data) {
                        $('#userid').text(`${data}`);
                        // userID = data;
                        Cookies.set('userID', `${data}`);
                        document.location.reload(true);
                    }
                })
            }
            else {
                console.log("not a new user");
                let userid;
                while (!userid) {
                    userid = prompt("Enter you UserID");
                }
                userid = Number(userid);

                if (userid.toString() !== 'NaN') {
                    console.log(userid);
                    Cookies.set('userID', userid.toString());
                    $('#userid').text(`${userid}`);
                }
            }
        } else {
            $('#userid').text(`${userID}`);
        }
    }());

    display();

    function display(){
        let data = JSON.parse(localStorage.getItem('todo')) || [];
        console.log(data);
        if(data.length) {
           render(data);
           todoList = data;
        }
        else {
            $.ajax({
                url: '/display',
                method: 'get',
                success: function(data) {
                    localStorage.setItem('todo', JSON.stringify(data));
                    render(data);
                    todoList = data;
                }
            })
        }
    }
});



function makeRequest() {

    let input = inp.val();
    let tick = $('#tick');
    tick.css('visibility', 'visible');

    setTimeout(function () {
        tick.css('visibility', 'hidden');
    }, 400);

    if (!input) {
        return null;
    }

    let test = {
        "task" : input,
        "done": false
    };

    inp.val('');

    $.ajax({
        url: '/add',
        method: 'post',
        data: {todo: test},

        success: function(data) {
            todoList[0][data] = "false";
            localStorage.setItem('todo', JSON.stringify(todoList));
            result.append(`<li>
                              <input type="checkbox" onclick="selMultiple(this)">
                              <span>${data}</span>
                              <button class="updDel" onclick="deleteKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/baseline-delete.svg" ></button>
                              <button class="updDel" onclick="updateKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/edit.svg" ></button>
                              </li>`
            )
        }
    });
}


function render(data) {
    console.log(data);
    for(let prop in data[0]) {
        if (prop === "user" || prop === "_id" || !data[0].hasOwnProperty(prop)) {
            continue;
        }
        result.append(`<li>
                              <input type="checkbox" onclick="selMultiple(this)">
                              <span>${prop}</span>
                              <button class="updDel" onclick="deleteKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/baseline-delete.svg" ></button>
                              <button class="updDel" onclick="updateKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/edit.svg" ></button>
                              </li>`)
    }
}


/*
*
*
* Used to <img src="baseline-delete-24px.svg" > element
*
* */




function deleteKey(element) {
    let index = $(element).parent().index();
    let task = $(element).prev().text();
    console.log(task);

    $.ajax({
        url: '/delete',
        method: 'post',
        data: {todo: task},
        success: function() {
            $(element).parent().remove();
            console.log(index);
            console.log(todoList);
            console.log(todoList[0][task]);
            delete todoList[0][task];
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })

}



/*
*
*
* This is code for updation of an element of
* todo list
*
*
* */


function updateKey(element) {

    let parent = $(element).parent();
    let index = parent.index();
    let prevVal = $(element).prev().prev().text();
    let newVal = prompt('Enter New Value');
    if (!newVal) {
        return;
    }
    $.ajax({
        url: '/update',
        method: 'post',
        data: {val: newVal, prevVal: prevVal},
        success: function (data) {
            parent.html(`<input type="checkbox" onclick="selMultiple(this)">
                         <span>${data}</span>
                         <button class="updDel" onclick="deleteKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/baseline-delete.svg"></button>
                         <button class="updDel" onclick="updateKey(this)"><img src="https://cdn.rawgit.com/Mr-Magnificent/2aab55badc3bed98638aba4bdfa82c94/raw/208e6e149fe0872894031644c3caf4225e003f63/edit.svg"></button>`);
            delete todoList[0][prevVal];
            todoList[0][newVal] = false;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
}


function deleteMultiple() {
    console.log(taskArr);
    $.ajax ({
        url: '/deleteMultiple',
        method: 'POST',
        data: {task: taskArr},
        success: function(data) {
            delMul.sort();
            delMul.reverse();
            for (let i = 0; i < delMul.length; i++) {
                $('#list').children().eq(delMul[i]).remove();
                delete todoList[0][taskArr[i]];
            }
            localStorage.setItem('todo', JSON.stringify(todoList));
            delMul = taskArr = [];
        }
    });
}

function selMultiple(element) {
    let index = $(element).parent().index();
    console.log('hello');
    if (!element.checked) {
        console.log('hello');
        for (let i = 0; i < delMul.length; i++) {
            if (delMul[i] === index) {
                delMul.splice(i, 1);
                taskArr.splice(i, 1);
            }
        }
    }
    else {
        delMul.push(index);
        taskArr.push($(element).next().text());
    }
}

// Call the function at the top, display()

/*
* function display() {
*
*   Get Request at /display route
*   Loop that todoList and append on the page
* }
 *
* */