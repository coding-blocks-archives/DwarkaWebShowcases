function loadXMLDoc()
    {
        var inp2 = document.getElementById('inp2').value;
        var inp1 = document.getElementById('inp1').value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200)
            {
                let x=JSON.parse(this.responseText);
                console.log(x);
                let y=x.result;
                document.getElementById("demo").innerHTML =`The answer is ${y}`;
                document.getElementById("demo").style.fontSize="30px";
                document.getElementById("demo").style.fontFamily="cursive";
            }
        };
        xhttp.open("GET", `https://newton.now.sh/${inp1}/${inp2}`, true);
        xhttp.send();
    }
