window.onload=function(){
  var me=document.getElementById('me');
  var btn=document.getElementById('btn');
  var reply=document.getElementById('reply');
  var cs='';
  var endPoint='https://www.cleverbot.com/getreply?key=';
  var api='CC6ei4i2ZeuXhvBGYNHg6LPz_aQ';
  var url=endPoint+api;

  btn.onclick=function(){
    var botmsg;
    var bot;
    var botcon;
    var botspan;
    var myspan;
    var mymsg;
    var mytext;
    var bottext;
    var my;
    var myicon;
    if(me.value)
    {
      my=document.createElement("DIV");
      mymsg=document.createElement("DIV");
      myspan=document.createElement("SPAN");
      myspan.className="myspan";
      mymsg.className="mydiv";
      myicon=document.createElement("I");
      my.className="my";
      myicon.className="fa fa-male fa-lg";
      mytext=document.createTextNode(` ${me.value} `);
      mymsg.appendChild(mytext);
      myspan.appendChild(myicon);
      my.appendChild(myspan);
      my.appendChild(mymsg);
      reply.appendChild(my);
      var xhttp=new XMLHttpRequest();
      if(cs)
          url=url+`&input=${me.value}`+`&cs=${cs}`;
      else {
          url=url+`&input=${me.value}`;
      }
      me.value=null;
      xhttp.open('GET',url,true);
      xhttp.send();
      xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
          var t=JSON.parse(this.responseText);
          cs=t.cs;
          // console.log(t);
          bot=document.createElement("DIV");
          botmsg=document.createElement("DIV");
          botspan=document.createElement("SPAN");
          botspan.className="botspan";
          botcon=document.createElement("I");
          botcon.className="fa fa-github-alt fa-lg";
          botmsg.className="botdiv";
          bot.className="bot";
          bottext=document.createTextNode(` ${t.output} `);
          botspan.appendChild(botcon);
          botmsg.appendChild(bottext);

          bot.appendChild(botspan);
          bot.appendChild(botmsg);
          reply.appendChild(bot);
        }
      }
      // mymsg.style.textAlign='right';


    }


  }
}
