var tskarray =  [];
var disp={};

window.onload = function () {

    var lists = document.getElementById('lists');
    var taskvalue = document.getElementById('tasks');
    var btns = document.getElementById('adds');

display();
    btns.onclick = function() {
        var tsks = {
            "taskvalue": taskvalue.value,
            "done": false
        };
        tskarray.push(tsks);
         //localStorage.setItem('data', JSON.stringify(tskarray));
        display();
    };


    function display() {
        var datas ="";
        lists.innerHTML = "";
        for (var i = 0; i < tskarray.length; i++) {

         if(i%2 === 0){if(tskarray[i].done === true) {
             datas += '<li  class="list-group-item" id=' + i + ' onclick= "checks(this)"  style="text-decoration: line-through; background-color : dimgrey;">' +parseInt(i+1)+". "+ tskarray[i].taskvalue + '<i  style="margin-right: 0px;float: right;" id='+i+' class= " fa fa-trash"  aria-hidden="true"'+'onclick= "deletes(this)">'+'</i>'+'</li>';

         }
         else{
             datas += '<li style="background-color: dimgrey;" class="list-group-item"  id=' + i + ' onclick= "checks(this)" >' +parseInt(i+1)+". "+ tskarray[i].taskvalue +' <i  style="margin-right: 0px;float: right;" id='+i+'  class=" fa fa-trash"  aria-hidden="true"'+'onclick= "deletes(this)">'+'</i>' +'</li>'  ;

         }
         }
         else{
             if(tskarray[i].done === true) {
                 datas += '<li  class="list-group-item" id='+i+' onclick= "checks(this)" style="text-decoration: line-through; background-color: gainsboro;">' +parseInt(i+1)+ ". "+tskarray[i].taskvalue + '<i  style="margin-right: 0px;float: right;"id='+i+' class= " fa fa-trash"  aria-hidden="true"'+'onclick= "deletes(this)">'+'</i>'+'</li>';

             }
             else{
                 datas += '<li style="background-color: gainsboro;" class="list-group-item"  id='+i+ ' onclick= "checks(this)" >' +parseInt(i+1)+". "+ tskarray[i].taskvalue +' <i  style="margin-right: 0px;float: right;" id='+i+'  class=" fa fa-trash"  aria-hidden="true"'+'onclick= "deletes(this)">'+'</i>' +'</li>';

             }
         }


        }
        lists.innerHTML = datas;
disp.show=display;

    }

};
var global ;
function checks(el) {
global = el;
    
    if(tskarray[el.id].done === true) {
        el.style.textDecoration = 'none';


    }
    else {
        el.style.textDecoration = 'line-through';

    }





    tskarray[el.id].done = !tskarray[el.id].done;

    console.log(tskarray);
}
function deletes(el) {
    // tskarray.splice(parseInt( global.id) , parseInt(global.id+1) );

    document.getElementById(el.id).style.display='none';
    tskarray.splice(parseInt(el.id),1);
    localStorage.setItem('data',tskarray);

   //

}






