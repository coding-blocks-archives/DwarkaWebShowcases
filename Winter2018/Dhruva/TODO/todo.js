(function(){
 "use strict";
 window.onload=function (){
   var box=document.getElementById("a");
   var obox=document.getElementById('b');
   var innerHTML=JSON.parse(localStorage.getItem("data")) || [];
   function display()
   {
     obox.innerHTML=null;
     let final="<div id='table'><table> <tr> <th> Activity </th> <th> Remove </th> <th> Update </th> <th> Done </th> </tr>";
     if(innerHTML)
     {
       for(var i=0;i<innerHTML.length;i++)
       {

         if(innerHTML[i].done)
         {
           final+=`<tr> <td> ${i+1} . &nbsp; <input type="text" class="display-box" value= "${innerHTML[i].value}" id=${i} > </td> <td> &nbsp <button onclick="remove('${i}')"> REMOVE </button> </td> <td> <button onclick="text(${i})"> UPDATE </button> </td>  <td> <input type="checkbox" onclick="update('${i}')" checked > </td> </tr>`;
         }
         else
         {
           final+=`<tr> <td> ${i+1} . &nbsp; <input type="text" class="display-box" value= "${innerHTML[i].value}" id=${i} > </td> <td> &nbsp <button onclick="remove('${i}')"> REMOVE </button> </td> <td> <button onclick="text(${i})"> UPDATE </button> </td> <td> <input type="checkbox" onclick="update('${i}')"> </td> </tr>`;
         }
       }
       final+="</table></div>";
       obox.innerHTML=final;
       for(i=0;i<innerHTML.length;i++)
       {
         if(innerHTML[i].done)
         {
           let el=document.getElementById(i);
           el.style.textDecoration="line-through";
         }
       }
     }
   }
   display();
   function c()
   {
     var text=box.value;
     if(text)
     {
       let task={};
       task.value=text;
       task.done=false;
       innerHTML.push(task);
       localStorage.setItem("data" ,JSON.stringify(innerHTML));
       display();
       box.value=null;
     }
   }
   function d(index)
   {
     innerHTML.splice(index,1);
     localStorage.setItem("data" ,JSON.stringify(innerHTML));
     display();
   }
   function e(index)
   {
        innerHTML[index].done=!innerHTML[index].done;
        localStorage.setItem("data" ,JSON.stringify(innerHTML));
        display();
    }
    function f(index)
    {
      innerHTML[index].value=document.getElementById(index).value;
      localStorage.setItem("data" ,JSON.stringify(innerHTML));
      display();
    }
   window.update=e;
   window.add=c;
   window.remove=d;
   window.text=f;
 }
})();
