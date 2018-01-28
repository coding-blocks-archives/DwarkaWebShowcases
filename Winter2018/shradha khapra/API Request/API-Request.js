
window.onload=function() {
var btn=document.getElementById("btn");
    var inp=document.getElementById("inp");

btn.onclick=function() {
    var numb=inp.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("demo").innerHTML = this.responseText;

        }
    };

    xhttp.open("GET", `http://numbersapi.com/${numb}/math`, true);
    xhttp.send();
}
}
