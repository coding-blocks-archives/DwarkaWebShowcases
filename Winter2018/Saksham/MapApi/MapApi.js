var loc;
var map;
var service;
var info = document.getElementById('Info');
var count = 0;
var infoWindowPrev;
var geocoder;

function initMap(){

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: -34.397, lng: 150.644}
    });
    service = new google.maps.places.PlacesService(map);
    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker();
    infoWindowPrev = new google.maps.InfoWindow;
}


document.getElementById('submit').addEventListener('click', function() {
    initMap();
    geocodeAddress(geocoder,map);
});
document.getElementById('find').addEventListener('click',function(){
    findNearbyLocations();
});


function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.panTo(results[0].geometry.location);
            loc = results[0].geometry.location;
            resultsMap.setZoom(6);

            marker.setPosition(results[0].geometry.location);
            marker.setMap(resultsMap);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function findNearbyLocations(){


    service.nearbySearch({

        location: loc,
        radius:10000,
        type: ['food']
    }, function(results, status){

        if(status === 'OK')
        {
            for(var i = 0; i<results.length; i++)
            {
                service.getDetails({
                    placeId:results[i].place_id,
                }, function(result, status){
                    if(status === 'OK')
                        putMarker(result);
                });
            }
            alert("Click on the markers on view the location details");
        }
        else{
            alert('Search Unsuccessful because:\n' + status);
        }
    });

}

function putMarker(result){

    let marker = new google.maps.Marker({
        position: result.geometry.location,
        map:map,
    });
    let infoWindow = new google.maps.InfoWindow;
    infoWindow.setContent(`<div><strong>${result.name}</strong><br>${result.vicinity}</div>`);
    map.setZoom(12);
    marker.addListener('click',function(){
        count++;

        if(count%2 !== 0)
        infoWindow.open(map,marker);
         else
             infoWindowPrev.close();
        infoWindowPrev = infoWindow;

        showDetails(this,result);
    });
}



function showDetails(marker,result){

    console.log(result);
    info.innerHTML = `<i class="large material-icons" onclick="info.classList.remove('animate');infoWindowPrev.close(); count++;" style="display:block;float:left; font-size:50px; ">close</i>
                        <div style="color:rgba(244,255,248,0.77);text-align:center;">
                            <h1>${result.name}</h1>
                            <div style="display:flex"> 
                                   <div style="display:flex; flex-flow:column;">
                                             <div>${result.formatted_address}</div>  
                                             <br>
                                             <br>
                                             <div style="color:rgba(236,255,242,0.67)">${result.formatted_phone_number}</div>
                                   </div> 
                                   <span class="pic" id="photo"></span>
                            </div>
                        </div>
                        
                        <hr>    
                        <div style="display:flex">
                              <div style="width:70%" id="openTime">
                                     <h2>Opening Timings</h2>
                            </div>
                            <div style="width:30%;">
                                     <i style="color:yellow; font-size:54px;" class="large material-icons">star</i><b style="bottom:10px;font-family:'Roboto', 'sans-serif';font-weight:bolder !important;text-shadow:1px 1px white;">${result.rating}</b>
                            </div>
                        </div>
                        <hr>
                        <div><br><br>
                           <a href="${result.website}"> <button style="padding:10px;display:block;margin:0 auto;">EXPLORE</button>
                        </div>`;

    if(result.photos)
        document.getElementById('photo').innerHTML += `<img style="border-radius:50%;" src="${result.photos[0].getUrl({'maxWidth':200})}">`;


    if(result.opening_hours)
    if(result.opening_hours.open_now)
        document.getElementById('openTime').innerHTML += `<div style="color:rgb(0,128,0)"><h3 >Open Now</h3></div>`;

    if(result.opening_hours)
    for(let i =0; i<result.opening_hours.weekday_text.length; i++)
        document.getElementById('openTime').innerHTML += result.opening_hours.weekday_text[i] + '<br>';
    else
        document.getElementById('openTime').innerHTML += 'Not Available';

    info.classList.toggle('animate');
}