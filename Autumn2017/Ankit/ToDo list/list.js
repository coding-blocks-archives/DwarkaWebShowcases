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
                data += '<li id='+ i +' onclick="check(this)" style="text-decoration: line-through; color: red;">' + taskarray[i].taskvalue + '<span id="close" class='+ i + ' onclick="closee(this)" >\u00D7</span> '+ '</li>';
            }
            else if(taskarray[i].done === false && taskarray[i].displayy===true)
            {
                data += '<li id='+ i +' onclick="check(this)" >' + taskarray[i].taskvalue  + '<span id="close" class='+ i + ' onclick="closee(this)" >\u00D7</span> '+ '</li>';
            }
         taskvalue.value="";   
        } 
        list.innerHTML = data;

    }


}

function check(el)
{
        if(taskarray[el.id].done === true)
        {
            el.style.textDecoration = 'none';
            el.style.color = 'black';
        }
        else
        {
            el.style.textDecoration = 'line-through';
            el.style.color = 'red'; 

        }
        taskarray[el.id].done = !taskarray[el.id].done;
        localStorage.setItem('data' ,JSON.stringify(taskarray));
}


function closee(ee)
{   
    console.log(taskarray);
    taskarray[ee.className].displayy = ! taskarray[ee.className].displayy;
    var div = ee.parentElement;
    div.style.display = "none";
    localStorage.setItem('data' ,JSON.stringify(taskarray));
}