

function bookSearch() {
    var search = document.getElementById('search').value;
    document.getElementById('results').innerHTML = "";
    if (search == '') {
        alert("Please enter some value in the field first");
    }
    //  console.log(search);
    else {
        var i;
        let url = "https://www.googleapis.com/books/v1/volumes?q=" + search;

        $.get(url, function (data) {
            console.log(data);
            for (i = 0; i < data.items.length; i++) {

                results.innerHTML += "<h2> Title:  " + data.items[i].volumeInfo.title + "</h2>";
                results.innerHTML += "<h3> By:  " + data.items[i].volumeInfo.authors + "</h3><br>";
                results.innerHTML += '<img id = "img" src= "' + data.items[i].volumeInfo.imageLinks.thumbnail + '"><br><br>';

            }
        });

    }
    // $(document).ready(function () {
    //
    //     $("#search").click(function () {
    //         var search = $("#inp").val();
    //         if(search == ''){
    //             alert("Please enter some value in the field first");
    //         }
    //         else{
    //             var url = '';
    //             var img='';
    //             var title = '';
    //             var author = '';
    //             $.get("https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?&key=AIzaSyAkSke9dsX-ymCCNuXrQ7R8lh8jTjby_xw"+search,function(response){
    //                 console.log(response);
    //                 // for(i =0;i<response.items.length;i++){
    //                 //     title = $('<h5>'+ response.items[i].volumeInfo.title + '</h5>');
    //                 //     author= $('<h5>'+ response.items[i].volumeInfo.authors + '</h5>');
    //                 //     img = $('<img><br><a href='+ response.item[i].volumeInfo.infoLink +'><button id="image">ReadMore</button></a>');
    //                 //     url = response.items[i].volumeInfo.imageLinks.thumbnail;
    //                 //     img.attr('src',url);
    //                 //     // title.appendTo("#result");
    //                 //     // author.appendTo("#result");
    //                 //     // img.appendTo("#result");
    //                 //     document.getElementById('#result').innerHTML= title;
    //                 //     document.getElementById('#result').innerHTML=author;
    //                 //     document.getElementById('#result').innerHTML=img;
    //                 // }
    //             });
    //         }
    //     });
    //     return false;
    // });
    //  url1 = data.items[i].volumeInfo.imageLinks.thumbnail;
    // $(img).attr({src:data.items[i].volumeInfo.authors.categories.imageLinks.thumbl});
    // results.innerHTML+=img;
    // results.innerHTML+= "<a href= data.item[i].volumeInfo.categories.imageLinks.infoLink ><button id='btn'>ReadMore</button></a>";
   // results.innerHTML += '<button id="btn" onclick="function fun() { results.innerHTML += data.items[i].volumeInfo.description }">Read More</button>'

    //  $.ajax({
   //      url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
   //      dataType:"json",
   //
   //      success:function (data) {
   //          console.log(data);

    // for( var i=0; i<data.items.length ;i++){
    //     results.innerHTML+="<h3>" + data.items[i].volumeInfo.title + "</h3>";
    //     results.innerHTML+="<h4>" + data.items[i].volumeInfo.authors + "</h4>";
    //     results.innerHTML+="<img src='data.items[i].volumeInfo.imageLinks.thumbnail'>";
    //     results.innerHTML+= "<a href='+ data.item[i].volumeInfo.infoLink +'><button id='button'>ReadMore</button></a>";
    //
    // img=$('<img><br><a href='+ data.item[i].volumeInfo.infoLink +'><button id="image">ReadMore</button></a>');
    // url1 = data.items[i].volumeInfo.imageLinks.thumbnail;
    // img.attr('src',url1);
    // results.innerHTML+=img;
    //
    // var url1= '';
    // var url2='';
    // var img='';
    // var title = '';
    // var author = '';    //
    // }
   //
   //      },
   //      type:'GET'
   //  });

//     finallist+=`<li>
//                      "<h2>" ${data.items[i].volumeInfo.title } "</h2>"
//                      "<h4>"${data.items[i].volumeInfo.authors }"</h4>
//                       <img src="data.items[i].volumeInfo.imageLinks.thumbnail">
//                       <a href="+data.items[i].volumeInfo.description+"><button id="btn">Read More</button></a>
//               </li>`
//
// }
// results.innerHTML="";
// results.innerHTML=finallist;

}

document.getElementById('button').addEventListener('click',bookSearch,false);