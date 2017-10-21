//pratyush1687@gmail.com
    var map;
    var marker;
    var myLatlng = new google.maps.LatLng(28.608372, 77.034974);
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
    function initialize(){
        var mapOptions = {
            zoom: 7,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

        marker = new google.maps.Marker({
            map: map,
            position: myLatlng,
            draggable: true
        });

        //It is for getting the initial address's position
        geocoder.geocode({'latLng': myLatlng }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#latitude,#longitude').show();
                    $('#address').val(results[0].formatted_address);
                    $('#latitude').val(marker.getPosition().lat());
                    $('#longitude').val(marker.getPosition().lng());
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                }
            }
        });

        google.maps.event.addListener(marker, 'dragend', function() {

            geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('#address').val(results[0].formatted_address);
                        $('#latitude').val(marker.getPosition().lat());
                        $('#longitude').val(marker.getPosition().lng());
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    }
                }
            });
        });
    }

function codeAddress() {
    var marks;
    var geocodes = new google.maps.Geocoder();

    var address = document.getElementById('address').value;
    geocodes.geocode( { 'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            marks = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true
            });
        }

        geocodes.geocode({'latLng': marks.getPosition()}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#latitude,#longitude').show();
                    console.log('in soifdcsz');
                    console.log(marks.getPosition());
                    $('#latitude').val(marks.getPosition().lat());
                    $('#longitude').val(marks.getPosition().lng());
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marks);
                }
            }
        });

        google.maps.event.addListener(marks, 'dragend', function() {

            geocodes.geocode({'latLng': marks.getPosition()}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('#address').val(results[0].formatted_address);
                        $('#latitude').val(marks.getPosition().lat());
                        $('#longitude').val(marks.getPosition().lng());
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marks);
                    }
                }
            });
        });

    });

}

google.maps.event.addDomListener(window, 'load', initialize);

  function weatherRequest(x,y) {

      $(document).ready(function () {
          var summary = $('#summary');
          var cliendId = 'c85ab82876d0ef90cf43d128797c91dc';
          var endpoint = 'https://api.darksky.net/forecast/';
          var parameters = '/' + x + ',' + y;
          var Data = [];
          var url = endpoint + cliendId + parameters;

          function AjaxRequest(url, callback) {
              $.ajax({
                  url: url, dataType: 'jsonp', success: function (data) {
                      callback(data)
                  }
              })
          }

          AjaxRequest(url, function (d) {
              Data.push(d);
              currentSummary(Data[0].currently)
          });


          function  currentSummary(cs) {
              var current  =  {
                  Current_Summary: cs.summary +' - Day',
                  Temperature: cs.temperature+' F',
                  Pressure: cs.pressure +' Pa' ,
                  Humidity: cs.humidity +' Relative',
                  Nearest_Storm_Distance: cs.nearestStormDistance,
                  Precipitation: cs.precipIntensity,
                  Visibility: cs.visibility,
                  WindSpeed: cs.windSpeed,
                  UV_Index: cs.uvIndex

              };
              console.log(current);

              var output = '';
              for (var property in current) {
                  output += property + ' : ' + current[property]+'<br>';
              }
              document.getElementById('summary').style.display = 'inline';
              document.getElementById('summary').innerHTML=output;
          }

      });
  }
