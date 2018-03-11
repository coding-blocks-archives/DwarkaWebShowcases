/*	<button type="button" id="done"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
	<button type="button" id="notdone"><i class="fa fa-thumbs-down" aria-hidden="true"></i></i></button>
	<button  type="button" id="remove"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
	*/
var taskArray = JSON.parse(localStorage.getItem('data')) || [];
var global={};
window.onload = function() {



    var taskValue = document.getElementById('task');
    var btn = document.getElementById('add');
    var list = document.getElementById('list');

    display();

    btn.onclick = function() {
        if(taskValue.value==="")
		{
			window.alert("Task Field can not be empty");
		}
		else
		{
				var task = {
				"taskValue": taskValue.value,
				"done": false
			};
			taskArray.push(task);
			localStorage.setItem('data', JSON.stringify(taskArray));
			display();
		}
    };

    function display() {
        var data ="";
        list.innerHTML = "";
        for(var i=0 ; i< taskArray.length; i++) {
            if(taskArray[i].done === true)  {
                data += '<div class="tasks" ><li id='+ i + ' style="text-decoration: line-through;background-color: #adebad;">' + taskArray[i].taskValue + '</li><button id="done'+ i +'" onclick="isDone(' + i + ')"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button><button id="notdone'+i+'" onclick="isNotDone(' + i + ')"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button><button id="remove'+ i +'" onclick="del('+ i +')"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>';
            }
            else {
                data += '<div class="tasks" ><li id='+ i + ' style="text-decoration: none;background-color: #85adad;">' + taskArray[i].taskValue + '</li><button id="done'+ i +'" onclick="isDone(' + i + ')"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button><button id="notdone'+ i +'" onclick="isNotDone(' + i + ')"><i class="fa fa-thumbs-down" aria-hidden="true"></i></button><button id="remove'+ i +'" onclick="del('+ i +')"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div>';
            }
        }
        list.innerHTML = data;
    }
	global.display = display;
};

function isDone(i)
{
	if(taskArray[parseInt(i)].done === false) {
        var el = document.getElementById(i);
		el.style.backgroundColor = "#adebad";
		el.style.textDecoration = 'line-through';
	}
	taskArray[parseInt(i)].done = true;
	localStorage.setItem('data', JSON.stringify(taskArray));	
	display();
};

function isNotDone(i)
{
	if(taskArray[i].done === true) {
        var el = document.getElementById(i);
		el.style.backgroundColor =  "#85adad";
		el.style.textDecoration = 'none';
	}
	taskArray[i].done = false;
	localStorage.setItem('data', JSON.stringify(taskArray));
	display();
}
function del(id)
{
		taskArray.splice(parseInt(id),1);
		localStorage.setItem('data',JSON.stringify(taskArray));
		global.display();
}