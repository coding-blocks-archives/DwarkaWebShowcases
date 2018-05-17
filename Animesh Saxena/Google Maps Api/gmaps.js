function initMap() {
    var pos = {lat: 23.363, lng:79.44};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom:5,
        center: pos
    });
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat : position.coords.latitude,
                lng : position.coords.longitude
            };

                       console.log(pos.lat, pos.lng);
            map.setCenter(pos);
        });
        var marker = new google.maps.Marker({
            position: pos,
            map : map,
            draggable:true,
            title:"Drag me!"
        });


    }

    google.maps.event.addListener(marker, 'dragend', function(ev){

           var latitude = ev.latLng.lat().toFixed(3);
            var longitude = ev.latLng.lng().toFixed(3);
            document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + latitude + ' Current Lng: ' + longitude + '</p>';

                // FETCHING THE CURRENT WEATHER
                    let url = ("https://api.darksky.net/forecast/a1e2c034cc0988736d3da59909cc21f6/" + latitude + "," + longitude );
       $.ajax({
                    url : url,
                    dataType : 'JSONP',
                    success : function (response) {
                        var result = response.currently.summary;
                        console.log(result);
                        // console.log(result)
                            $('.weather').html(result);
                    }
            });

    google.maps.event.addListener(marker, 'dragstart', function(evt){
        document.getElementById('current').innerHTML = `<p>Currently dragging marker...</p>`;
    });
    });
}