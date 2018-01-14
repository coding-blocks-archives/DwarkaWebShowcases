
    function loadDoc(){
    var cityname= document.getElementById("City_name");
    var url="http://universities.hipolabs.com/search?";
    var country1="country=";
    var country=cityname.value;
    var api=url+country1+country;


    function NetworkCall(result) {

            demo.innerHTML='';
        var callObject = new XMLHttpRequest();

          callObject.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

             var result=JSON.parse(this.responseText);
             var div = document.createElement("div");
             div.style.width = "96%";
             div.style.color = "black";
             div.style.marginLeft="23px";
             div.style.marginBottom="10px";
             div.style.marginTop="10px";

             for (var i = 0; i < (result.length<20?result.length:20); i++) {

                 div.innerHTML += `

                      <div class="col s6 ">
                            <div class="card horizontal">
                            <div class="card-image">
                             <img src="images/12.jpg">
                             </div>
                          <div class="card-stacked">
                            <div class="card-content">
                              <div>
                         <p><strong>Name:${result[i].name}</strong></p>
                         <p><strong>Domain:${result[i].domains}</strong></p>
                         <p><strong>Country:${result[i].country}</strong></p>
                         <p><strong>Country Code:${result[i].alpha_two_code}</strong></p>
                         <p><strong>Website:${result[i].web_pages}</strong></p>
                     </div>
                 </div>
                 <div class="card-action">
                     <a href="${result[i].web_pages}">${result[i].name}</a>
                 </div>
             </div>
         </div>

                  `

             }
                       document.getElementById("demo").appendChild(div);
         }
         this.send(null);
     };
     callObject.open("GET", api , true);
     callObject.send();
 }
    NetworkCall(function(data){


       });
}
