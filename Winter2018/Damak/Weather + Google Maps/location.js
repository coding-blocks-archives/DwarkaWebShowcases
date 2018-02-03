function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 28.6618976, lng: 77.22739580000007},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

        $('#pac-input').on('keypress', function (e) {
         if(e.which === 13){

            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            //Do Stuff, submit, etc..
            $('#weather').css('display','block');
            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
         }
       });

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

          var markers = [];

        map.addListener('click', function(e) {
          input.value="";
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers=[];
          markers.push(placeMarkerAndPanTo(e.latLng, map));
          detectWeather(markers[0].position.lat(),markers[0].position.lng())
          $('#weather').css('display','block');
        });


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            detectWeather(markers[0].position.lat(),markers[0].position.lng());
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
            $('#weather').css('display','block');
          });
          map.fitBounds(bounds);
        });
      }

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    return marker;
}

function detectWeather(lat,lng){
  console.log('in detectWeather');
  $.get({url:`https://api.darksky.net/forecast/d9aea39c3d17aa8ff4d9a6a26b5f3837/${lat},${lng}`, success: function(result){
    console.log(result);
    setWeatherhtml(result);
  }});
}

function setWeatherhtml(result){
  if(result.currently.icon=="partly-cloudy-day"){
    $(".icon").html(`<i class="wi wi-day-partly-cloudy"></i>`);
  }
  else if(result.currently.icon=="partly-cloudy-night"){
    $(".icon").html(`<i class="wi wi-night-partly-cloudy"></i>`);
  }
  else if(result.currently.icon=="clear-day"){
    $(".icon").html(`<i class="wi wi-day-clear"></i>`);
  }
  else if(result.currently.icon=="clear-night"){
    $(".icon").html(`<i class="wi wi-night-clear"></i>`);
  }
  else {
    $(".icon").html(`<i class="wi wi-${result.currently.icon}"></i>`);
  }
  $(".temp").html(`<p>${result.currently.temperature}</p>`);
  $(".summ").html(`<p>${result.currently.summary}</p>`)
  $(".humidity").html(`<p>HUMIDITY: ${result.currently.humidity}</p>`)
  $(".presprob").html(`<p>PRECIPITATION PROBABILITY: ${result.currently.precipProbability}</p>`)
  $(".windspd").html(`<p>WIND SPEED: ${result.currently.windSpeed}</p>`)
  $(".weeksumm").html(`<p>WEEK SUMMARY: ${result.daily.summary}</p>`)
}
