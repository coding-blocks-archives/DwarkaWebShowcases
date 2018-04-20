function initMap()
{
    var markers = [];
    var longitude;
    var ul = {lat: 28.6223, lng: 77.027};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: ul
    });
    var marker = new google.maps.Marker({
        position: ul,
        map: map
    });

    google.maps.event.addListener(map,'click',function(event) {
        var x = event.latLng.lat();
        var y = event.latLng.lng();
        ul = {lat: x, lng: y};
        var marker;
        marker = new google.maps.Marker({
            position: ul,
            map: map
        });
        markers.push(marker);

    });
    google.maps.event.addListener(marker,'click',function popup() {

    })
    markers[0].setMap(map);
    markers=[];
}
