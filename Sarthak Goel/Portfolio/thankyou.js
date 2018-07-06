window.onload=function(){
    var ele=document.createElement('h1');
    var ele2=document.createElement('p');
     var text=window.location.search;
     var text2="I will get back to you soon!";
     ele2.innerHTML=text2;
     ele.innerHTML="Thank You "+ (text.split('=')[1]).split(/[^A-Za-z]/)[0]+" !";
    var thankyou=document.getElementById('thankyou');
    document.body.appendChild(ele);
    document.body.appendChild(ele2);
    thankyou.appendChild(ele);
    thankyou.appendChild(ele2);
    //result.appendChild(ele);
    // var value=inp.value;
    // document.getElementById('result').innerHTML=value;
  }
//   console.log(inp);
// }
