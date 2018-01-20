                                                                                                                                                                                                                                                                                                                                                                                               
window.onload=function(){
	let inp=document.getElementById('inp');
	let addbtn=document.getElementById('addbtn');
	let out=document.getElementById('out');
	var str=window.localStorage;
	let todolist=JSON.parse(str.getItem("todo")) || [];

	display();
	addbtn.onclick=function(){
		let task={};
		task.txt=inp.value;
		task.done=false;
		todolist.push(task);
		inp.value="";
		display();
	}
	function display(){
		let fl="";
		for(var i=0;i<todolist.length;i++)
		{
			fl+=`<tr id=${i}>
				<td><span class="oll"> -> </span></td>
			 	<td><input class="t" size="50" id=t${i} value="${todolist[i].txt}"></td>
			 	<td><button title="Finished?"id=c${i} class="c" onclick="toggle('${i}')"><i class="fa fa-check-circle fa-2x" aria-hidden="true"></i></button></td>
				<td><button title="Edit task!" id=e${i} class="e" onclick="edit('${i}')"><i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i></button></td>
				<td><button title="Delete!" id=d${i} class="i" onclick="deletee('${i}')"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button></td>
			 </tr>`
		}
		out.innerHTML=fl;
		  str.setItem("todo",JSON.stringify(todolist));

		  for(let i=0;i<todolist.length;i++)
		  {
		  	let t=document.getElementById('t'+i);
		  	if(todolist[i].done) t.style.backgroundColor="#d1ff91";
		  }

	}
	function toggle(i){
		console.log(i);
		todolist[i].done=!todolist[i].done;
		let x=document.getElementById('c'+i);
		let t=document.getElementById('t'+i);
		if(todolist[i].done)
		{
			
			x.innerHTML=`<i class="fa fa-minus-circle fa-2x" aria-hidden="true"></i>`;
			t.style.backgroundColor="#d1ff91";
		}
		else{
			x.innerHTML=`<i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>`;
			t.style.backgroundColor="#ffcece";
		}
		  str.setItem("todo",JSON.stringify(todolist));
		 
	}
	function deletee(i){
		let x=document.getElementById(i);
		console.log(todolist.splice(i,1));
		//console.log(todolist);

		x.style.display="none";
		  str.setItem("todo",JSON.stringify(todolist));
		
	}
	function edit(i){
		//let e=document.getElementById('e'+i);
		let x=document.getElementById('t'+i);
		let n=x.value;
		todolist[i].txt=n;

       	str.setItem("todo",JSON.stringify(todolist));    
	}

	window.toggle=toggle;
	window.deletee=deletee;
	window.edit=edit;
}