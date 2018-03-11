var markers = [];
var parameters
var cliendId = 'c85ab82876d0ef90cf43d128797c91dc';
var endpoint = 'https://api.darksky.net/forecast/';
var list = document.getElementById('list');
var summary = document.getElementById('summary');

function initMap() {
    var uluru = {lat: 28.6139, lng: 77.2090};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    addMarker({coords:uluru});

    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        parameters = "";
        parameters = '/'+ e.latLng.lat() + ',' + e.latLng.lng();
        getWeather(parameters);
    });
}
function addMarker(props)
{
    var marker = new google.maps.Marker({
        positon:props.coords,
        map:map
    });
    markers.push(marker);
    if(props.iconImg)
    {
        icon:props.iconImg;
    }
    getWeather('/28.6139,77.2090');
}
function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
	
    map.panTo(latLng);
    markers[0].setMap(null);
    markers =[];
    markers.push(marker);
    markers[0].setMap(map);
}

function getWeather(parameters)
{
    var Data = [];
    var url = endpoint + cliendId + parameters;
    function AjaxRequest(url,callback) {
        $.ajax({ url: url,dataType: 'jsonp', success: function(data) {
            callback(data)
        }})
    }
    AjaxRequest(url, function(d) {
        Data.push(d);
		currentSummary(Data[0].currently);
    });
	
	function  currentSummary(cs) {
		var current  =  "";
		list.innerHTML = "";
		current += '<li>Dew Point : '+cs.dewPoint+' &#x2109</li>'+'<li>Humidity : '+cs.humidity+' %</li>'+'<li>Wind Speed : '+cs.windSpeed+' km/h</li>'+'<li>Cloud Cover : '+cs.cloudCover+' %</li>'+'<li>Temperature : '+cs.temperature+' &#8457</li>'+'<li>UV Index : '+cs.uvIndex+'</li>';
		
		list.innerHTML = current;
		
		summary.innerHTML = cs.summary;

		 if(cs.icon=="clear-day")
        {
            $("#clear-day").attr({width: "62", height: "62"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});
        }
        else if(cs.icon==='clear-night')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "62", height: "62"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});
        }
        else if(cs.icon==='rain')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "62", height: "62"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});
        }
        else if(cs.icon==='snow')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "62", height: "62"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});

        }
        else if(cs.icon==='sleet')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "62", height: "62"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});

        }
        else if(cs.icon==='wind')
        {
            $("#wind").attr({width: "62", height: "62"});
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});

        }
        else if(cs.icon==='fog')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "62", height: "62"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});

        }
        else if(cs.icon==='cloudy')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "62", height: "62"});
            $("#partly-cloudy-night").attr({width: "0", height: "0"});
        }
        else if(cs.icon==='partly-cloudy-day')
        {
            $("#clear-day").attr({width: "0", height: "0",display: "none"});
            $("#clear-night").attr({width: "0", height: "0",display: "none"});
            $("#rain").attr({width: "0", height: "0",display: "none"});
            $("#snow").attr({width: "0", height: "0",display: "none"});
            $("#sleet").attr({width: "0", height: "0",display: "none"});
            $("#wind").attr({width: "0", height: "0",display: "none"});
            $("#fog").attr({width: "0", height: "0",display: "none"});
            $("#partly-cloudy-day").attr({width: "62", height: "62",display: "block"});
            $("#cloudy").attr({width: "0", height: "0",display: "none"});
            $("#partly-cloudy-night").attr({width: "0", height: "0",display: "none"});

        }
        else if(cs.icon==='partly-cloudy-night')
        {
            $("#clear-day").attr({width: "0", height: "0"});
            $("#clear-night").attr({width: "0", height: "0"});
            $("#rain").attr({width: "0", height: "0"});
            $("#snow").attr({width: "0", height: "0"});
            $("#sleet").attr({width: "0", height: "0"});
            $("#wind").attr({width: "0", height: "0"});
            $("#fog").attr({width: "0", height: "0"});
            $("#partly-cloudy-day").attr({width: "0", height: "0"});
            $("#cloudy").attr({width: "0", height: "0"});
            $("#partly-cloudy-night").attr({width: "62", height: "62"});

        }
	}
}









