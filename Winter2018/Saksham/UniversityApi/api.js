

var univ = document.getElementById('univ');
var cont = document.getElementById('cont');
var results = document.getElementById('results');
var btn = document.getElementById('btn');
var search = document.getElementById('search');
var caution = document.getElementById('caution');

var check =function(keyy) {
    if(keyy.keyCode === 8 ) {
        if (univ.value.length === 2) {
            caution.innerHTML = `NOTE: Please Enter atleast two characters`;

        }
        else {
            caution.innerHTML = '';
        }
    }
    else
    {
        if (univ.value.length === 0) {
            caution.innerHTML = `NOTE: Please Enter atleast two characters`;

        }
        else {
            caution.innerHTML = '';
        }
    }
};

function Request(data) {

    var url = `http://universities.hipolabs.com/search?name=${univ.value}&country=${cont.value}`;
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {

        if (this.status === 200 && this.readyState === 4) {
            data(JSON.parse(this.responseText));
        }
    };

    httpRequest.open('GET', url, true);
    httpRequest.send();

    if(httpRequest.readyState !==  4)
    {
        results.innerHTML = `<div id="outer"><div class="inner one"></div><div class="inner two"></div></div><div class="blue-text lighten-2 center-align" style="font-style:italic;">The Search results are loading...</div>`;
    }
}

var dataItemArr = [];

btn.onclick = function () {
    dataItemArr = [];
    search.innerHTML = "<h3 style='margin-top:30px;'>Search Results</h3>\n";
    results.innerHTML = "";
    Request(function (data) {
        var i = 0;
        results.innerHTML = '';

        for (dataItem of data) {
            dataItemArr.push(dataItem);
            console.log(dataItem);
            results.innerHTML += `<div id="${i}" style="cursor:pointer" class="listItem col s12 l12 m12 collection-item" onclick="importData(this)">${dataItem.name}</div>`;
            i++;
        }

        if (results.innerHTML === "") {
            results.innerHTML = `<div class="center-align" id="Error"><i class="large material-icons">error</i><div class="teal-text lighten-4"><h4 style="font-family:'Courier 10 Pitch';">Sorry, No results match your Query<br>Please try a different search</h4></div></div>`;
        }
    });
};

function importData(ele) {

    if (ele.innerHTML === dataItemArr[ele.id].name) {

        ele.innerHTML = `<table class=" highlight"><tr><td style="color:rosybrown;font-weight: bolder;">University</td><td>${dataItemArr[ele.id].name}</td></tr><tr><td style="color:rosybrown;font-weight:bolder;">Country</td><td>${dataItemArr[ele.id].country}</td></tr></table><a href="${dataItemArr[ele.id].web_pages[0]}"><button class=" btn-large">Explore</button></a>`;
        ele.classList.add("Active");
    }
    else {
        ele.innerHTML = dataItemArr[ele.id].name;
        ele.classList.remove("Active");
    }
}


function Submit(event) {

    if (event.keyCode == 13)
        btn.onclick();
}
