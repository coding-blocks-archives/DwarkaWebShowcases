
function initMap()
{
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
        marker.setPosition(ul);
        infowindow.close();
    });
    var infowindow = new google.maps.InfoWindow({});
    google.maps.event.addListener(marker,'click',function() {
        var position = this.position;
        let url = "https://api.darksky.net/forecast/7ee3f5ebfdef604cbd5bfdea929ee302/";
        $.get(url + this.position.lat() + ',' + this.position.lng(), function(data){
            console.log(data);
            infowindow.setContent("<b><em>Latitude: </em></b>  " + position.lat() + "<br>"+
                "<b><em>Longitude:   </em></b>" + position.lng() +
                "<br>" + "<b><em>Daily Summary:</em></b>  " + data.daily.summary)
            infowindow.open(map,marker);
        },'jsonp');
    });
}
