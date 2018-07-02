window.onload= function () {
     let btn=document.getElementById("btn");
    let result=document.getElementById("result");
    let input=document.getElementById("input");
    let value="";
   /* btn.onclick= function () {
        value += '<li>'+input.value+'</li>';
        result.innerHTML=value;
    }
*/
    //function update
    //function delete
    //function create node optimize this method using create node
    buts = new Array();
    ups=new Array();
    todoList =new Array();
    btn.onclick= function () {
        var newLi= document.createElement("li");
        var butt=document.createElement("button");
        var content=document.createElement("span");


        todoList.push(content);
        var up=document.createElement("button");
        var newUp=document.createElement("button");
        var newUpText=document.createTextNode("Update");
        newUp.appendChild(newUpText);
        buts.push(butt);
        ups.push(up);
        var buttText=document.createTextNode("Delete");
        var upText=document.createTextNode("Update");
        var newLiText=document.createTextNode(input.value);

        content.appendChild(newLiText);
          butt.appendChild(buttText);
        // newLi.appendChild(newLiText);

        newLi.appendChild(content);
        up.appendChild(upText);
        newLi.appendChild(butt);
        console.log(newLi);
        newLi.appendChild(up);
        console.log(newLi);
        result.appendChild(newLi);

        /*
         document.body.insertBefore(newLi, result);*/
        butt.onclick=function () {
            for (var i=0;i<buts.length;i++){
                if(butt === buts[i]){
                   result.removeChild(buts[i].parentElement);
                   var f=todoList.indexOf(buts[i].parentElement);
                   todoList.splice(f,1);
                }
            }
        }

        up.onclick=function () {
            for (var i=0;i<ups.length;i++){
                if(up===ups[i]){

                    var newbox= document.createElement("INPUT");
                    ups[i].parentElement.appendChild(newbox);
                    ups[i].parentElement.appendChild(newUp);
                    ups[i].style.display="none";

                }
            }
          newUp.onclick =function () {
              for (var i=0;i<ups.length;i++){
                  if(up===ups[i]){
                        if(!newbox){
                            ups[i].parentNode.removeChild(newbox);
                            todoList[ups[i].parentElement.firstElementChild.id -1]=newbox.value;
                        }
                      ups[i].parentElement.firstElementChild.innerHTML=newbox.value;
                      ups[i].parentNode.removeChild(newbox);

                      ups[i].style.display="inline-block";
                      ups[i].parentNode.removeChild(newUp);
                  }
              }
          }
        }


    };

};



