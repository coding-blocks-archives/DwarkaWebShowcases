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
        document.getElementById('search').value = "";
        $.get(url, function (data) {
            console.log(data);
            for (i = 0; i < data.items.length; i++) {

                results.innerHTML += "<h2> <em>Title:</em> "  + data.items[i].volumeInfo.title + "</h2>";
                results.innerHTML += "<h3> <em>By: </em>  "  + data.items[i].volumeInfo.authors + "</h3><br>";
                results.innerHTML += '<img id = "img" src= "' + data.items[i].volumeInfo.imageLinks.thumbnail + '">';
                results.innerHTML+= "<h4> Published on:    " + data.items[i].volumeInfo.publishedDate + "</h4><br><br>"
            }
        });

    }

}

document.getElementById('button').addEventListener('click',bookSearch,false);