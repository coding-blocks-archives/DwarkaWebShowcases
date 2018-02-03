

var URL = '  https://newton.now.sh'
function simp(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/simplify/"+inp);
}

function fact(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/factor/"+inp);
}

function diff(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/derive/"+inp);
}

function intg(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/integrate/"+inp);
}

function zero(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/zeroes/"+inp);
}

function abs(){
  var inpel=document.getElementById('inp');
  var inp=inpel.value;
  NetworkCall("/abs/"+inp);
}

function clr(){
  var inpel=document.getElementById('inp');
  inpel.value="";
  var el=document.getElementById("ans");
  el.innerHTML="";
}

function NetworkCall(inp) {
    var callObject = new XMLHttpRequest();
    var res;
    callObject.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            res=(JSON.parse(this.responseText))["result"];
            var el=document.getElementById("ans");
            el.innerHTML=`<p>${res}</p>`;
            el.style.color="white";
            el.style.fontSize="25px";
            el.style.marginTop="5vw";
            el.style.marginLeft="25vw";
        }
    };

    callObject.open("GET", URL+inp , true);
    callObject.send();

}
