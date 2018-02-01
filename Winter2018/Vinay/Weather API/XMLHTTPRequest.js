

btn = document.getElementById("btn");
inp = document.getElementById("place");
div = document.getElementById("weather");
let lo;
let url;
let li = `<a href="#!" class="collection-item col s6 center-align waves-effect waves-green" style="border: 0; border-radius: 30px; height: 40px;  font-size: 20px">`;
btn.onclick = function() {
    lo = inp.value;
    url = `http://api.apixu.com/v1/current.json?key=2dccdc53e5dc4bd7b2e113548180801&callback=foo&q=${lo}`;
    Network(function (result) {
        console.log(result);
        for(let x in result) {
            //div.innerHTML = `<p>${JSON.stringify(result[x])}</p>`;
            console.log(result[x]);
        }
        div.innerHTML = `<div class="collection" style="border: 0">
                         <a href="#!" class="collection-item center-align active" style="margin: 5px 0 10px 0; order: 0; height: 50px;  font-size: 35px">${result.location.name}</a>
                         <div class="row">
                         ${li}Region</a>
                         ${li}${result.location.region}</a> 
                         </div>
                         <div class="row">
                         ${li}Country</a>
                         ${li}${result.location.country}</a>
                         </div> 
                         <div class="row">
                         ${li}Latitude</a>
                         ${li}${result.location.lat}°N</a>
                         </div>  
                         <div class="row">
                         ${li}Longitude</a>
                         ${li}${result.location.lon}°E</a>
                         </div>
                         <div class="row">
                         ${li}Temperature</a> 
                         ${li}${result.current.temp_c}°C / ${result.current.temp_f}°F</a>
                         </div>
                         <div class="row">
                         ${li}Wind Speed</a> 
                         ${li}${result.current.wind_kph} km/h</a>
                         </div>
                         <div class="row">
                         ${li}Wind Direction</a> 
                         ${li}${result.current.wind_dir}</a>
                         </div>
                         <div class="row">
                         ${li}Humidity</a> 
                         ${li}${result.current.humidity}%</a>
                         </div>
                         <div class="row">
                         ${li}Pressure</a> 
                         ${li}${result.current.pressure_mb} milliBars</a>
                         </div>
                         </div>`;
    });
};

inp.onkeydown = function () {
    if(event.keyCode == 13)
        btn.onclick();
};

function Network(data) {
    let callObject = new XMLHttpRequest();
    callObject.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            data(JSON.parse(this.responseText));
        }
    };
    callObject.open("GET", url, true);
    callObject.send();
}

