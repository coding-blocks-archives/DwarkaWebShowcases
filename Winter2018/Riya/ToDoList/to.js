(function(){
  "use strict";
  window.onload=function(){
    var inp=document.getElementById('inp');
    var bt=document.getElementById('bt');
    var res=document.getElementById('res');
    var todoList=JSON.parse(localStorage.getItem("mylist")) || [];

    bt.onclick=function(){
      var task={};
      task.act=inp.value;
      task.done=false;
      todoList.push(task);
      localStorage.setItem('mylist',JSON.stringify(todoList));
      display();
      inp.value="";
    }
    display();
    function display(){
        res.innerHTML=null;
        let final="";
        final=`<div class="list"><table>`;
        for(var i=0;i<todoList.length;i++)
        {

            final+=`<tr></td><td>&nbsp;${i+1}. &nbsp; <input type="text" size="60" id="${i}" value="${todoList[i].act}"></td><td><button class="done" title="Mark as done" onclick="updateDone('${i}')"> <i class="fa fa-check fa-lg"> </i> </button> <td><button class="up" title="Update" onclick="update('${i}')"><i class="fa fa-edit fa-lg"></i></button></td><td><button class="rem" title="Remove" onclick="remove('${i}')" ><i class="fa fa-trash fa-lg"></i></button></td></tr>`

        }
        final+=`</table></div>`;
        res.innerHTML=final;
        for(let k=0;k<todoList.length;k++){
          if(todoList[k].done){
            console.log(document.getElementById(k));
            document.getElementById(k).style.textDecoration='line-through';
            document.getElementById(k).style.backgroundColor='#66bb6a';
          }
        }
    }

    function updateDone(index){
      if(todoList[index].done==false){
        todoList[index].done=true;
        localStorage.setItem('mylist',JSON.stringify(todoList));
        display();
      }
      else{
        todoList[index].done=false;
        localStorage.setItem('mylist',JSON.stringify(todoList));
        display();

      }
    }
    function remove(index){
      todoList.splice(index,1);
      localStorage.setItem('mylist',JSON.stringify(todoList));
      display();
    }
    function update(index){
      var newVal=document.getElementById(index);
      todoList[index].act=newVal.value;
      localStorage.setItem('mylist',JSON.stringify(todoList));
      display();
    }
    window.display=display;
    window.updateDone=updateDone;
    window.remove=remove;
    window.update=update;
  }

})();
