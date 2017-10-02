var taskArray = JSON.parse(localStorage.getItem('data')) || [];

window.onload = function(){

	var taskValue = document.getElementById('task');
	var btn = document.getElementById('add');
	var list = document.getElementById('list');
	console.log(taskArray);
	display();
	btn.onclick = function(){
		if(taskValue.value != ""){
			var task = {
				"taskValue" : taskValue.value,
				"done" : false,
				"edit" : false,
			};

			taskArray.push(task);
			taskValue.value = "";
			localStorage.setItem('data',JSON.stringify(taskArray));
			display();
		}
	}

	
}

function display(){
		var data="";
		for(i=0;i<taskArray.length;i++){
			if(taskArray[i].done == true){
				data+= '<li class="list-group-item list-group-item-success"  style="text-decoration: line-through" onclick="check(this)" id='+i+'>';
				if(taskArray[i].edit == true){
					data+= ' <input type="text" class="update" id="update'+i+'" value="' + taskArray[i].taskValue + '">';
				}
				else{
					data+= taskArray[i].taskValue ;
				}
				data+= '<span class="fa fa-check" aria-hidden="true" style="float: right;"></span></li>';
			}
			else if(taskArray[i].edit == true){

				data+= '<li class="list-group-item list-group-item-warning" onclick="check(this)" id='+i+'>';
				data+= '<input type="text" class="update" id="update'+i+'" value="' + taskArray[i].taskValue + '">';
				data+= '</li>';
			
			}
			else
				data += '<li class="list-group-item list-group-item-warning" onclick="check(this)" id='+ i +'>'+ taskArray[i].taskValue +'</li>';

			data+='<ul class="list-inline" >'
			data+='<li class="list-inline-item"> <button class=" list-group-item list-group-item-danger " type="button" onclick= "remove('+ i + ')"> <i class="fa fa-times" aria-hidden="true"></i> Delete Item </button> </li>';
			data+='<li class="list-inline-item"> <button class=" list-group-item list-group-item-success " type="button" onclick= "markdone('+ i + ')"> <i class="fa fa-check" aria-hidden="true"></i> Mark as Done </button> </li>';
			data+='<li class="list-inline-item"> <button class=" list-group-item list-group-item-info " type="button" onclick= "update('+ i + ')"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update </button> </li>';
			data+='</ul>'
		}
		list.innerHTML = data;
}

function check(el){
	
	console.log(el.id);
	if( taskArray[el.id].edit == false){
		taskArray[el.id].edit = true;
		display();
		localStorage.setItem('data',JSON.stringify(taskArray));	
	}
	
}

function update(id){

	if(taskArray[id].edit == true){
		taskArray[id].taskValue = document.getElementById('update'+id).value;
		taskArray[id].edit = false;		
	}
	else{
		taskArray[id].edit = true;
	}
	display();
	localStorage.setItem('data',JSON.stringify(taskArray));
}

function remove(id){
	var ans = window.confirm("Are you sure you want to delete this item?");
	if(ans){
		console.log("deleting "+id);
		taskArray.splice(id,1);
		display();
		localStorage.setItem('data',JSON.stringify(taskArray));
	}
}


function markdone(id){

	var donebtn= document.getElementById(id);
	if(taskArray[id].done == true){
		donebtn.setAttribute("style","text-decoration: none");
		taskArray[id].done = false;
	}
	else{
		donebtn.setAttribute("style","text-decoration: line-through");
		taskArray[id].done= true;
	}
	display();
	localStorage.setItem('data',JSON.stringify(taskArray));
}	