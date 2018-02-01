let prevMarker = null;
let map = null;
let table = document.getElementById('tab');
let url = "http://api.openweathermap.org/data/2.5/weather";
let currLoc ;
let key1 = "61863211ddcd1ae6f550c344619be1a3";
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: currLoc,
                disableDefaultUI: true
            });
            placeMarker(map, currLoc);
            google.maps.event.addListener(map, 'click', function (event) {
                placeMarker(map, event.latLng);
            });
        });
    }
};
function placeMarker(map, location) {
    if(prevMarker !== null) {
        prevMarker.setMap(null);
    }
    map.setZoom(10);
    map.setCenter(location);
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
    prevMarker = marker;
    getData(location.lat(), location.lng());
}
function getData(lati, longi) {
    let finalUrl = url + `?lat=${lati}&lon=${longi}&APPID=${key1}&units=metric`;
    let request = new XMLHttpRequest();
    let flag = true;
    request.onreadystatechange = function () {
        if((this.status === 404 || this.status === 403) && flag){
            if(flag){
                flag = false;
            }
            alert("Not Available");
        }
        if(this.readyState === 4 && this.status === 200){
            display(JSON.parse(this.responseText));
        }
    };
    request.open('GET', finalUrl, true);
    request.send();
}
function display(data) {
    let cells = document.getElementsByTagName('td');
    cells[0].innerHTML = `${data['name']}`;
    cells[1].innerHTML = `${data['main']['temp']}<sup> o</sup>C`;
    cells[2].innerHTML = `${data['main']['humidity']}<span> %</span>`;
    cells[3].innerHTML = `${data['wind']['speed']}<span> m/s</span>`;
    cells[4].innerHTML = `${data['wind']['deg']}<sup> o</sup></td>`;
    cells[5].innerHTML = `${data['main']['pressure']}</td><span> Pa</span>`;
}