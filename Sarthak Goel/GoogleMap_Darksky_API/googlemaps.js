var pos={lat: -34.397, lng: 150.644};
var markers = [];
function initMap(){
  // var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: pos
  });

     function addMarker(location) {
       var marker = new google.maps.Marker({
         position: location,
         map: map
       });
       markers.push(marker);
     }
     function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
     function clearMarkers() {
          setMapOnAll(null);
        }
        function yo(){
          google.maps.event.addListener(markers[0], 'click', function (event) {
            pos.lat= event.latLng.lat();
            pos.lng = event.latLng.lng();

             let url=`https://api.darksky.net/forecast/30fa46d72472e013c25e053820ab5f9c/${pos.lat},${pos.lng}`;
             $.ajax({
               url:url,
               dataType:"jsonp",
               success:function(data){
                 var contentString=`<p> Latitude : ${data.latitude}</p><p> Longitude: ${data.longitude}</p><p> Timezone : ${data.timezone} </p>
                 <p> Weather :${data.daily.summary}</p>`;
                  var infowindow = new google.maps.InfoWindow({
                    content: contentString
                  });
                 infowindow.open(map, markers[0]);

               }
             });
          });
        }
  if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
               pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              map.setCenter(pos);
            addMarker(pos);
            yo();
            });

          }

          google.maps.event.addListener(map, 'click', function (event) {
                  pos.lat= event.latLng.lat();
                  pos.lng = event.latLng.lng();
                  clearMarkers();
                  markers=[];
                  addMarker(pos);
                  yo();
              });

  }
