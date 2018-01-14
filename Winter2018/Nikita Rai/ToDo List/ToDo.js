  var taskarray = JSON.parse(localStorage.getItem('data'))||[];
    
    window.onload = function () 
{

    var taskvalue = document.getElementById('task');
    var btn = document.getElementById('add');
    var list = document.getElementById('list');
    display();
    btn.onclick = function () 
    {
        var task = {
                    "taskvalue":taskvalue.value,
                    "done":false,
                     "edit": false,
                    "displayy" : true,
                    };
        taskarray.push(task);
        localStorage.setItem('data',JSON.stringify(taskarray));
        display();
    };

    function display() 
    {
        var data ="";
        for(var i=0;i<taskarray.length;i++)
        {
            if(taskarray[i].done === true && taskarray[i].displayy===true)
            {
                data += '<li id='+ i +' style="text-decoration: line-through; color: red;">' +'<input type="checkbox" name="todolist" value="list" class="checkbo" id=checkbo'+i+' checked="true" onclick="check(this)">'+ taskarray[i].taskvalue + '<span id="close" class='+ i + ' onclick="closee(this)" >\u00D7</span>  ' + ' <div class="icons" ><i class="fa fa-pencil-square-o" input type="text" class="update" id="update'+i+' value=" aria-hidden="true" onclick="update('+ i +')"></i></div>'+ '</li>';
            } 
            else if(taskarray[i].done === false && taskarray[i].displayy===true)
            {
                data += '<li id='+ i +' >' + '<input type="checkbox" name="todolist" value="list" class="checkbo" id=checkbo'+i+' onclick="check(this.id)" >' + '<span id="close" class='+ i + ' onclick="closee(this)" >\u00D7</span> '+ taskarray[i].taskvalue + '<div class="icons" ><i class="fa fa-pencil-square-o" input type="text" class="update" id="update'+i+' value=" aria-hidden="true" onclick="update('+ i +')"></i></div>'+ '</li>';
            }
         taskvalue.value="";   
        } 
        list.innerHTML = data;
    }
}

function check(i)
{
        var ret = i.replace('checkbo','');
        el = document.getElementById(ret)
        // console.log(ret);
        // console.log(i);
        // console.log(el);
        if(taskarray[el.id].done === true)
        {
            el.style.textDecoration = 'none';
            el.style.color = 'black';
             document.getElementById("checkbo"+el.id).checked = false;
        }
        else
        {
            el.style.textDecoration = 'line-through';
            el.style.color = 'red'; 
            document.getElementById("checkbo"+el.id).checked = true;
        }
        taskarray[el.id].done = !taskarray[el.id].done;
        localStorage.setItem('data' ,JSON.stringify(taskarray));
}


function closee(ee)
{   
    console.log(taskarray);
    taskarray[ee.className].displayy = false;
    var div = ee.parentElement;
    div.style.display = "none";
    localStorage.setItem('data' ,JSON.stringify(taskarray));
} 


function update(id){
   console.log(id);
   console.log(taskarray[id].taskvalue);
    var btn = document.getElementById('add');
    btn.innerHTML = 'UPDATE';
   var taskvalue = document.getElementById('task');
        taskvalue.placeholder = 'Enter updated item...';

     btn.onclick = function () 
    {   
        btn.innerHTML = 'ADD';
        taskarray[id].taskvalue = taskvalue.value;
        localStorage.setItem('data',JSON.stringify(taskarray));
        location.reload();
    }
            
}


