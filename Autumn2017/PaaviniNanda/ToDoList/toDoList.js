var taskArray;
var funcOut;

window.onload= function () {
	taskArray = JSON.parse(localStorage.getItem('data')) || [] ;
	var taskValue=document.getElementById('task');
	var btn=document.getElementById('add');
	var list=document.getElementById('list');
    var list2=document.getElementById('list2');

	display();

	btn.onclick = function (){
		var task={
			taskValue : taskValue.value,
			'done' : false ,

		}
		taskArray.push(task);
		console.log(task.taskValue);
		display();
	}

	function display(){
		var data = "";
		var data2 = "";
		list.innerHTML="";
		for(var i=0;i<taskArray.length;i++){
			console.log(taskArray[i]);
			if(taskArray[i].done==true){
				data2+='<li class="list-group-item justify-content-between" id='+ i + '> <input type="checkbox" id=' + "in"+ i + ' checked=true onclick="uncheck('+ i + ',this)"> <input style="border:0; width:80%; " id=' + "tex" + i + ' type= "text" disabled="true" value=" '+ taskArray[i].taskValue+ ' ">  <div class="icons" > <i class="fa fa-times-circle" onclick="deletee(' + i + ')"> </i> <i class="fa fa-check-circle" aria-hidden="true" onclick="check('+ i +')" ></i> <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit('+ i +')" ></i></div></li>' ;
			}
			else{
				data += '<li class="list-group-item justify-content-between" id='+ i +' > <input type="checkbox" id=' +"in"+ i + ' onclick="uncheck(' + i + ',this)"> <input style="border:0; width:80%;" id=' + "tex" + i + ' type= "text" disabled="true" value=" '+ taskArray[i].taskValue+ ' "> <div class="icons" > <i class="fa fa-times-circle" onclick="deletee(' + i + ')"> </i> <i class="fa fa-check-circle" aria-hidden="true" onclick="check('+ i +')" ></i> <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="edit('+ i +')"></i></div></li>' ;
			}
		}
		list.innerHTML = data;
		list2.innerHTML = data2;
		localStorage.setItem('data',JSON.stringify(taskArray));
	}
	funcOut=display;
}

function deletee(el){
	console.log('del calle');
	console.log(taskArray);
	console.log(el);
	if(taskArray.length>1){
		var temp=taskArray.splice(parseInt(el)) ;
		console.log(temp);
		for(var i=1;i<temp.length;i++){
			//temp[i].style.id=taskArray.length+1;
			taskArray.push(temp[i]);
		}
	}
	else{
		taskArray=[];
	}
	console.log(taskArray);
	funcOut();
}


function check(el){
	console.log(el);
	var tex=document.getElementById('tex' + el);
	taskArray[el].taskValue=tex.value;
	console.log(tex.value);
	tex.disabled=true;
	localStorage.setItem('data',JSON.stringify(taskArray));
}



function uncheck(i,elem){
	console.log('toggle');
	elem.checked=!(elem.checked);

	taskArray[parseInt(i)].done=!taskArray[parseInt(i)].done;
	localStorage.setItem('data',JSON.stringify(taskArray));
	funcOut();
}

function edit(el){
	console.log('edit allowed now');
	var tex=document.getElementById('tex' + el);
	tex.disabled=false;
	tex.border=2;
}