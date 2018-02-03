

window.onload= function(){
    let inp=document.getElementById('inp');
    let result=document.getElementById('result');
    let btn=document.getElementById('btn');


    var myStorage = window.localStorage;
    let todoList=JSON.parse(myStorage.getItem("todoArray")) || [];
    display();
    btn.onclick = function () {
        let todo=inp.value;
        let task={
            val:todo,
            stat: false
        }
        inp.value="";
        todoList.push(task);
        myStorage.setItem("todoArray",JSON.stringify(todoList));
        display();
    }
    function display(){
        let finalList="";
        for (var i=0;i<todoList.length;i++){

                finalList+=`<li><input class="out" type="text" value="${todoList[i].val}" id="i${i}" >
                               <button class="but" onclick="hogaya('${i}')" id="h${i}"><i class="fa fa-check" style="font-size: 3.5vh"></i></button>
                            <button class="but" onclick="delet(${i})" id="d${i}"><i class="fa fa-trash-o" style="font-size: 3.5vh"></i></button><button class="but" onclick="updat(${i})" id="u${i}" style="font-size: 3.5vh"><i class="fa fa-pencil"></i></button></li>`;
        }
        result.innerHTML="";         //No need as such, since innerHTML replaces the previous content internally, but still it is a good practice
        result.innerHTML=finalList;
        for (var i=0;i<todoList.length;i++) {
            console.log(i);
            inputKoRangDo(i);
        }
    }

    function inputKoRangDo(i) {
        var el=document.getElementById("i"+i);
        if(todoList[i].stat==false) {
            el.style.backgroundColor="#c9d7ff";
        }
        else{
            el.style.backgroundColor="#ffd3c5";
            el.style.textDecoration="line-through";
        }

    }

    function delet(i){
        todoList.splice(i,1);
        myStorage.setItem("todoArray",JSON.stringify(todoList));
        display();
    }
    window.delet=delet;

    function updat(i){
        var el=document.getElementById("i"+i);
        todoList[i].val=el.value;
        myStorage.setItem("todoArray",JSON.stringify(todoList));
        display();
    }
    window.updat=updat;

    function hogaya(i){
        if(todoList[i].stat==false) {
            todoList[i].stat = true;
        }
        else {
            todoList[i].stat = false;
        }
        myStorage.setItem("todoArray",JSON.stringify(todoList));
        display();
    }
    window.hogaya=hogaya;
}