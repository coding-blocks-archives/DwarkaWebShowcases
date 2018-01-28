function initMap() 
    {
      	
      	var longitude;
        var uluru = {lat: 20.5937, lng: 78.9629};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });

		google.maps.event.addListener(map,'click',function(event) 
		{
                 // document.getElementById('latlongclicked').value = event.latLng.lat();
                 // document.getElementById('lotlongclicked').value =  event.latLng.lng();    // ASK FUNCTION DOUBT AND OTHER SCRIPT(How to 																				access it outside)
                 var x= event.latLng.lat();
                 var y= event.latLng.lng();
                 uluruu = {lat : x, lng : y};
				 var marker = new google.maps.Marker({
          				position: uluruu,
          				map: map
        			});

				var clientId = '824574d36911eae2397be86330301aaa';
				var endpoint = 'https://api.darksky.net/forecast/';
				var parameters = '/'+x+','+y;
				var Data= [];
				var url = endpoint + clientId + parameters ;		
					function AjaxRequest(url,callback){
						$.ajax({ url: url, dataType: 'jsonp', success: function(data){
							callback(data);            
						}})
					}

					AjaxRequest(url, function(d){
						console.log(d);
						$("#weather-location").text(d.timezone);
						$("#weather-current").text(d.currently.temperature+' F');
						$("#summary").text(d.currently.summary);
						$("#wind").text("Wind Speed : "+d.currently.windSpeed+" knots");
						var x = d.currently.icon;
						// document.getElementById('humidity').value = d.currently.humidity;
						// document.getElementById('ws').value = d.currently.windSpeed;
						var o;
						if(x==="clear-day")
							o= "01d";
						else if(x==="clear-night")
							o= "01n";
						else if(x==="rain")
							o= "10d";
						else if(x==="snow")
							o= "13d";
						else if(x==="sleet")
							o= "13d";
						else if(x==="wind")
							o= "50d";
						else if(x==="fog")
							o= "50n";
						else if(x==="cloudy")
							o= "02d";
						else if(x==="partly-cloudy-day")
							o= "04d";
						else if(x==="partly-cloudy-night")
							o= "04d";
						$("#icon").html('<img src="http://openweathermap.org/img/w/' + o + '.png">');
             	 });
		})
		
    }  
    //http://openweathermap.org/img/w/10d.png