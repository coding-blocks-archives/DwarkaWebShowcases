$(function(){
  initMap();
  function initMap(){
    console.log("in init");
    var india={lat: 28.704, lng: 77.102};
    var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: india
       });
       console.log("map created");

       google.maps.event.addListener(map, "click", function (event){
         console.log("click recognised");
        // console.log("latitude:",event.ea.x," longitude:",event.ea.y);
      //  console.log("lat:",event.latLng.lat());
        var x=event.latLng.lat();
        var y=event.latLng.lng();
         var curr = event.latLng;
         var marker = new google.maps.Marker({
          position:curr,
          map: map,
          animation: google.maps.Animation.BOUNCE,

        });
        map.panTo(curr);
        marker.setMap(map);
      //  console.logmarker);
        $.ajax({
          url:` https://api.darksky.net/forecast/37d647958413020493a7e0d4cd81ec64/${x},${y}`,
          type:'GET',
          dataType:'jsonp',

          success:function(data){
              $('.weather').css(  {'margin':'2px solid black'});
            console.log("weather ap received");

            var place=data.timezone;
            var temp=data.currently.temperature;
            var summ=data.currently.summary;
          /*  var card=`<div class="card">
                      <div class="card-body">
                      <table>
                          <tr><td>Location</td><td>${place}</td></tr>
                          <tr><td>Temperature</td><td>${temp}</td></tr>
                          <tr><td>Description</td><td>${summ}</tr>
                      </table>
                      </div>
                      </div>`;*/

            // var colr;
            // if(temp>79)
            //
            //   colr='#B71C1C';
            //
            // }
            // else if (temp>=65) {
            //   colr='#FF6F00';
            // }
            // else if(temp>=48){
            //   colr='#FFD600';
            // }
            // else if (temp>=) {
            //
            // }

      var card=` <div class="card border-success mb-3" style="max-width: 40vw;">
            <div class="card-header">${place}</div>
            <div class="card-body text-success">
              <h3 class="card-title">Temperature: ${temp} .F</h3>
              <h2 class="card-text">${summ}</h2>
            </div>`;
            $('.weather').append(card);



          }
        })


       })


}})
