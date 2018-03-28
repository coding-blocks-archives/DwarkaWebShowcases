var taskarray;
var counter=0;
function del(el)
{

            var id =$(el).parent().parent().parent().attr('id');
            taskarray[id].keep=0;
            $(el).parent().parent().parent().remove();
            localStorage.setItem('data',JSON.stringify(taskarray));
}
function check(el)
{
           var result2=$('#result2');
           var id =$(el).parent().parent().attr('id');
           taskarray[id].done=true;
           var value=taskarray[id].name;
           $(el).parent().parent().remove();
           //taskarray[id].keep=0;
           var val=$(el).is(':checked');
           if(val==true)
           {
             result2.append(`<div class="cont" id=${id}><div id="task"><input class="tick" type="checkbox" checked="true" onclick="uncheck(this)"><input class="para" type="text" disabled="true" value=${value}>
                           <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div></div>`);
            }
            else {
              result2.append(`<div class="cont" id=${id}><div id="task"><input class="tick" type="checkbox" onclick="uncheck(this)"><div class="yo"><input class="para" type="text" disabled="true" value=${value}>
                            <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div></div>`);
            }
            localStorage.setItem('data',JSON.stringify(taskarray));
}
function uncheck(el)
{
           var result=$('#result');
           var id =$(el).parent().parent().attr('id');
           taskarray[id].done=false;
           var value=taskarray[id].name;
           $(el).parent().parent().remove();
           var val=$(el).is(':checked');
           if(val==true)
           {
             result.append(`<div class="cont" id=${id}><div id="task"><input class="tick" type="checkbox" checked="true" onclick="check(this)"><div class="yo"><input class="para" type="text" disabled="true" value=${value1}>
                           <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div>`);
            }
            else {
              result.append(`<div class="cont" id=${id}><div id="task"><input class="tick" type="checkbox" onclick="check(this)"><input class="para" type="text" disabled="true" value=${value}>
                            <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div>`);
            }
            localStorage.setItem('data',JSON.stringify(taskarray));
}

function update(el)
{
            alert("Click the CONFIRM button after you update the task!!")
            $(el).parent().prev().prop('disabled',false);
            $(el).next().prop('disabled',false);
            $("#confirm_btn").on("click",function(){
               $(el).parent().prev().prop('disabled',true);
               $(el).next().prop('disabled',true);
               var id =$(el).parent().parent().parent().attr('id');
               var val=$(el).parent().prev().val();
               taskarray[id].name=val;
               $(el).parent().prev().prop('value',val);
               localStorage.setItem('data',JSON.stringify(taskarray));
             });

}

$(document).ready(function(){
              taskarray = JSON.parse(localStorage.getItem('data')) || [] ;
              var inp=$('#inp');
              var add_btn=$('#add_btn');
              var result=$('#result');
              var result2=$('#result2');

              display();

              $("#inp").keyup(function(event) {
                   if (event.keyCode === 13) {
                       $("#add_btn").click();
                   }
               });

            add_btn.on('click',function(){
                  var val=inp.val();
                  if(val!=""){
                        var task={
                          name:val,
                          done:false,
                          keep:1
                        }
                        taskarray.push(task);
                        result.append(`<div class="cont" id=${counter}><div id="task"><input class="tick" type="checkbox" onclick="check(this)"><input class="para" type="text" disabled="true" value=${val}>
                                      <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div>`);
                        inp.val("");
                        counter++;
                      //  localStorage.setItem('counter',JSON.stringify(counter));
                        localStorage.setItem('data',JSON.stringify(taskarray));
                  }
                  else{
                      alert("Enter the Task Name !!")
                  }
            });

            function display(){
              var c=0;
              var arr=taskarray;
              //console.log(arr.length);
              for(var i=0;i<arr.length;i++){
                if(arr[i].keep==1){
                        if(arr[i].done==true){

                          result2.append(`<div class="cont" id=${i}><div id="task"><input class="tick" type="checkbox" checked="true" onclick="uncheck(this)"><input class="para" type="text" disabled="true" value=${arr[i].name}>
                                        <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)">DELETE TASK</button></span></div></div>`);
                        }
                        else {
                          result.append(`<div class="cont" id=${i}><div id="task"><input class="tick" type="checkbox" onclick="check(this)"><input class="para" type="text" disabled="true" value=${arr[i].name}>
                                          <span id="sp"><button class="btn btn-dark" id="update_btn" onclick="update(this)" >UPDATE TASK</button><button class="btn btn-success" id="confirm_btn" disabled>CONFIRM</button><button class="btn btn-danger" id="del_btn" onclick="del(this)" >DELETE TASK</button></span></div></div>`);
                        }
                        c++;
                    }
                }
                counter=c;
            }
});
