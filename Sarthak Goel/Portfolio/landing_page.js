
var i = 0;
var txt = 'HI , I AM SARTHAK GOEL!'; /* The text */
var speed = 200; /* The speed/duration of the effect in milliseconds */

function typeWriter() {

       //audioElement.play();
  if (i < txt.length) {
    document.getElementById("result").innerHTML += txt.charAt(i);

      //audioElement.pause();
    setTimeout(typeWriter, speed);
      i++;
  }


    if(i==txt.length)
  {

  var btn=document.createElement('a');
  btn.className="btn btn-success";
  btn.href="portfolio.html";
  btn.id="know";
  btn.innerHTML="Know More";
  document.body.appendChild(btn);
  document.getElementById('box2').appendChild(btn);
  var btn2=document.createElement('a');
  btn2.className="btn btn-success";
  btn2.href="resume.html";
  btn2.innerHTML="Download Resume";
  document.body.appendChild(btn2);
  document.getElementById('box3').appendChild(btn2);
  i++;
 }
}
setTimeout(typeWriter,1000);
// function but(){
//
// }
// setTimeout(but,6000);
