
var i = 0;
function change() {

  function getRandomColor() {
    var letters = '0123456789DEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 13)];
    }
    return color;
}

  var doc = document.getElementById("background");
  var color = ["#030d1c", "#00050c", "#091321", "#021e44"];
  doc.style.backgroundColor = color[i];
   i = (i + 1) % color.length;
}
setInterval(change, 500);
