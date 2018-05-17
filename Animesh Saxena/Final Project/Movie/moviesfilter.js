$(document).ready(() => {
$('#search').on('submit',(e) => {
    let searchMov;
    searchMov = $('#searchWrite').val();
    $("#quote").remove();
    ShowMovies(searchMov);
    e.preventDefault();
});
});



function ShowMovies(searchMov){
var yor = $('#releaseyr').val();
var type = $('#typ').val();
// console.log("yor = " + yor );
let url = 'http://www.omdbapi.com/?apikey=53fd6a67&s='+searchMov ;

$.ajax({

    url : url,
    dataType : 'JSONP',
    success : function (response) {
        let movies = response.Search;
        let resp = response.Response;
        console.log(response);
        if(resp=== "False"){
            alert("No Match Found");
        }


        let output = '';
        $.each(movies,(index,mov) => {

            if (yor && mov.Year < yor){
                return true;
                

            }


            if (type && mov.Type != type){
                return true;

            }



console.log(yor);
console.log(type);
output += `


            <div class = "col-sm-3">
            <div class="text-center">

            <div  style="height: 222px ; width: 150px ; border: solid 2px black"><img id="pos" onclick="SelectMovie('${mov.imdbID}') " src="${mov.Poster}" alt="Image not Available" style="height: 222px ; width: 150px ; border: solid 2px black ; color: white"></div>
          <h5 style="color: white ; position: relative; right: 25% ">${mov.Title}</h5>
</div>
            </div>


            `;




        });
        $('#items').html(output);

    }


});
}

function SelectMovie (id){
sessionStorage.setItem('imdbID', id);
window.location = 'info.html';
return false;

}


function details() {
let imdbID = sessionStorage.getItem('imdbID');

let url = 'http://www.omdbapi.com/?apikey=53fd6a67&i='+ imdbID;
$.ajax({

    url : url,
    dataType : 'JSONP',
    success : function (response) {
        console.log(response);
        let vid = response;
        let result = `

<div class = "row">
<div class="col-sm-4">
<img src="${vid.Poster}" class="embed-responsive embed-responsive-16by9" style="border-radius: 40px">
</div>
<div class="col-sm-8">
<h3 style="color: black">${vid.Title}</h3>
<ul class="list-group" >
<li class="list-group-item" style= "border-radius: 10px"><strong>Genre:</strong> ${vid.Genre}</li>
          <li class="list-group-item"  style= "border-radius: 10px"><strong>Released: </strong> ${vid.Released}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>Rated: </strong> ${vid.Rated}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>IMDB Rating: </strong> ${vid.imdbRating}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>Director: </strong> ${vid.Director}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>Starring: </strong> ${vid.Actors}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>Run Time: </strong> ${vid.Runtime}</li>
          <li class="list-group-item" style= "border-radius: 10px"><strong>Language: </strong>${vid.Language}</li>
</ul>
</div>
</div>
<div class="row">
<h3>Summary</h3></div>
<div class="row">

<div class="col">${vid.Plot}</div>
</div>
<br>
<div class="row">
<div class="col"><button onclick="window.location.href='https://www.imdb.com/title/${vid.imdbID}/?ref_=nv_sr_1'" type="button" class="btn btn-primary">Go to IMDb</button></div>


</div>

`;

        $('#movieInfo').html(result);

    }


});

}


