window.onload=function(){
var key="fbdbc2ec-c5e4-41fd-97d8-303bb487735e";
var url="https://content.guardianapis.com/";
var t={};
t.page=1;
t.text='';
t.max=1;
t.days=1;
localStorage.setItem("data",JSON.stringify(t));
function d()
{
  var b=JSON.parse(localStorage.getItem('data')) || {};
  var x=JSON.parse(localStorage.getItem('object')) || {};
  if(Object.keys(x).length!=0)
  {
    // var g=document.getElementsByClassName('input')[0];
    var l=document.getElementsByClassName('Content')[0];
    var f=document.getElementsByClassName('footer')[0];
    if(x.response.total){
      l.style.display="flex";
      l.style.flexWrap="wrap";
      l.style.textAlign="center";
      // var strin='';
      var strin2='';
      var strin3='';
      // strin=`<input type="date" id="w"> <button id="f"> Set Date </button>`;
      strin2=`<button id="prev" onclick="previous()"><i style="font-size:3vw" class="fa fa-chevron-left"></i></button>`;
      for(var y=0;(y<5)&&(y+b.page<=x.response.pages);y++)
        strin2+=`<span onclick="paged(${y+b.page})">&nbsp ${y+b.page} &nbsp</span>`;
      strin2+=`<button id="prev" onclick="next()"><i class="fa fa-chevron-right" style="font-size:3vw" ></i></button>`;
      // g.innerHTML+=strin;
      for(var o=0;o<x.response.results.length;o++)
        strin3+=`<p style="height:12vh;padding:0.5vw; display:inline-block;"> <a href="${x.response.results[o].webUrl}" target="_blank">${x.response.results[o].webTitle} </a> </p>`;
      l.innerHTML=strin3;
      f.innerHTML=strin2;
      document.getElementById('f').onclick=function(){
        older(document.getElementById('w').value);
      }
    }
    else {
      g.innerHTML='';
      l.innerHTML=`<h1> Sorry We Could not find what you were looking for </h1>`;
    }
  }
}
var today = new Date();
today.setDate(today.getDate()-1);
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10)
    dd='0'+dd;
if(mm<10)
    mm='0'+mm;
var fromDate = yyyy+'-'+mm+'-'+dd;
var stype='';
function convert(g){
  var t=g.split(' ');
  var r='';
  for(var i=0;i<t.length;i++){
    if(i!=(t.length-1))
      r+=`${t[i]}%20`;
    else
      r+=`${t[i]}`;
  }
  return r;
}
function showoptions(){
  var a=document.getElementById('dp');
  var b=document.getElementsByClassName('dropdown')[0];
  a.style.visibility="hidden";
  b.style.visibility="visible";
}
window.showoptions=showoptions;
function hideoptions(option){
    if(option=='a')
      stype='search?';
    else if(option=='b')
      stype='tags?';
    else if(option=='c')
      stype='sections?';
    var a=document.getElementById('dp');
    var b=document.getElementsByClassName('dropdown')[0];
    a.style.visibility="visible";
    b.style.visibility="hidden";
}
window.hideoptions=hideoptions;
function mar(url,t){
  var x=new XMLHttpRequest();
  x.open('GET',url,true);
  x.send();
  x.onreadystatechange=function(){
    console.log("came here");
    if (this.readyState == 4 && this.status == 200){
      let f=JSON.parse(this.responseText);
      localStorage.setItem("object",JSON.stringify(f));
      t.max=f.response.pages;
      localStorage.setItem("data",JSON.stringify(t));
      d();
      console.log(f);
    }
  }
}
function submit(a){
  var m=JSON.parse(localStorage.getItem('data'));
  var t=document.getElementById('ibox');
  if((m.text!=t.value)||(!(a===undefined))){
    m.page=1;
    m.text=t.value;
    m.max=1;
    m.days=1;
  }
  var today = new Date();
  today.setDate(today.getDate()-m.days);
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10)
      dd='0'+dd;
  if(mm<10)
      mm='0'+mm;
  var fromDate = yyyy+'-'+mm+'-'+dd;
  var addend;
  if(stype)
    addend=`${stype}from-date=${fromDate}&page=${m.page}&q=${convert(m.text)}&api-key=${key}`;
  else
    addend=`search?from-date=${fromDate}&page=${m.page}&q=${convert(m.text)}&api-key=${key}`;
  mar(url+addend,m);
}
window.submit=submit;
function next(){
  var f=JSON.parse(localStorage.getItem('data'));
  var t=f.page;
  var m=f.max;
  var call=true;
  t=t+1;
  if(t>m){
    t=m;
    call=false;
  }
  f.page=t;
  localStorage.setItem('data',JSON.stringify(f));
  if(call)
    submit();
}
window.next=next;
function previous(){
  var f=JSON.parse(localStorage.getItem('data'));
  var t=f.page;
  var m=f.max;
  t=t-1;
  var call=true;
  if(t<1){
    t=1;
    call=false;
  }
  f.page=t;
  localStorage.setItem('data',JSON.stringify(f));
  if(call)
    submit();
}
window.previous=previous;
window.paged=function(a){
  var f=JSON.parse(localStorage.getItem('data'));
  f.page=a;
  localStorage.setItem('data',JSON.stringify(f));
  submit();
}
window.older=function(date){
  // console.log(Date.parse(date));
  var f=JSON.parse(localStorage.getItem('data'));
  var t=new Date();
  f.days=Math.round((t.getTime()-Date.parse(date))/(24*60*60*1000));
  localStorage.setItem('data',JSON.stringify(f));
  submit();
}
}
