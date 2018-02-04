$(function(){

  function deltodo(i){
    console.log(i);

    let x=result.innerHTML;
    $.post({ 'url':'/todo/del', 'data':{'i':i},'success':function(res){
      console.log(res);
      let r=document.getElementById('result');
      r.innerHTML="";
        let result=$('#result');
      for(let i=0;i<res.length;i++)
      {result.append(`<p>${res[i]}<button id="d${i}" onclick="deltodo(${i})">  delete</button></p>`);}
    }})
  }

console.log("window loaded");

  function sendTodo(){
    let data=$('#inp').val();
    let result=$('#result');
    console.log(data);
    $.post({ 'url':'/todo/add', 'data':{'data':data}, 'success':function(res){
      console.log(res);
      let r=document.getElementById('result');
      r.innerHTML="";
      for(let i=0;i<res.length;i++)
      {result.append(`<p>${res[i]}<button id="d${i}" onclick="deltodo(${i})">  delete</button></p>`);}
    }})
  }
$('#addbtn').on('click',function(){
  console.log("add button is clicked");
    sendTodo();
  })

window.deltodo=deltodo;


})
