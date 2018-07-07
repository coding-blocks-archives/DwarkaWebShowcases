window.onload=function(){
  if(innerWidth<=1024){
    $('#menu').remove();
    $('#a').append("<div id='menu'> </div>");
  }
  var m={};
  function initMap(){
    var map = new google.maps.Map(document.getElementById('map'),{center:{lat:21.08,lng:79.13},zoom:8});
    map.addListener('click',function(data){
      console.log("map");
      var t=data.latLng.toJSON();
      var marker = new google.maps.Marker({position:data.latLng , map:map});
      marker.addListener('rightclick',function(){this.setVisible(false)});
      marker.addListener('click',function(){
        sessionStorage.setItem('Position' , JSON.stringify(this.getPosition().toJSON()));
      });
      });
    }
  window.initMap=initMap;
  console.log('hi');
  $.ajax({url:"https://googleapi-dhruva.herokuapp.com/load",success:function(data){
      $('body').append(`<script> ${data} </script>`);
  }});
}
var module=(function(){
  function getData(a)  ///a is for new request
  {
    $('#menu')[0].innerHTML='';
    if(a)
      sessionStorage.setItem('nexttoken',JSON.stringify(''));
    var type=$('select').val();
    var position=JSON.parse(sessionStorage.getItem('Position')) || {};
    var abort=false;
    if(type==null){
      window.alert("Please choose a category");
      abort=true;
    }
    if(Object.keys(position).length==0){
      window.alert("Please Select a position");
      abort=true;
    }
    if(abort){
      console.log("ABORTED");
      return;
    }
    var url=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&rankby=distance&type=${type}&key=AIzaSyC2pVstLbByOKulz3GsfvHgwFT2s8kgeqU`;
    var b=JSON.parse(sessionStorage.getItem('nexttoken')) || '';
      if(b)
        url+=`&pagetoken=${b}`;
    $.post({url:"https://googleapi-dhruva.herokuapp.com/fetch",'data':{'url':`${url}`},success:function(data){
      console.log(data);
      var npt='';
      if(data.hasOwnProperty('next_page_token'))
        npt=data.next_page_token;
      sessionStorage.setItem('nexttoken',JSON.stringify(npt));
      let results=[];
      let details=[];
      for(var i=0;i<data.results.length;i++){
        results[i]=data.results[i].place_id;
      }
      for(let t=0;t<results.length;t++){
        var urln=`https://maps.googleapis.com/maps/api/place/details/json?placeid=${results[t]}&key=AIzaSyC2pVstLbByOKulz3GsfvHgwFT2s8kgeqU`;
        $.post({url:"https://googleapi-dhruva.herokuapp.com/fetch",'data':{'url':`${urln}`},success:function(data){
          var obj={};
            if(data.result.hasOwnProperty('formatted_address'))
              obj.address=data.result.formatted_address;
            if(data.result.hasOwnProperty('formatted_phone_number'))
              obj.number=data.result.formatted_phone_number;
            if(data.result.hasOwnProperty('rating'))
              obj.rating=data.result.rating;
            if(data.result.hasOwnProperty('website'))
              obj.website=data.result.website;
            if(data.result.hasOwnProperty('name'))
              obj.name=data.result.name;
            if(data.result.hasOwnProperty('opening_hours'))
              obj.open=data.result.opening_hours.open_now;
          $('#menu').append(`<div class="r"> <p> ${obj.name} </p> <p>  Phone Number: ${obj.number} </p> <p> Rating: ${obj.rating} </p> Address: ${obj.address} </p> <br> Open Now: ${obj.open} </div> <hr>`);
          details.push(obj);
          if(details.length==results.length){
            $('#menu').append(`<div id='next' style="text-align:center;"> <p> <button onclick=module.next()> Next </button> </p> </div>`);
            console.log('done');
          }
        }});
      }
    }});
  }
  function submit(){
    getData(1);
  }
  function next(){
    getData();
  }
  var t={};
  t.submit=submit;
  t.next=next;
  return t;
})();
