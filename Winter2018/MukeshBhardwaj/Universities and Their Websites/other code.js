// var URL = 'http://universities.hipolabs.com/search?name=middle&country=United%20States';
// function NetworkCall(data) {
//     var callObject = new XMLHttpRequest();
//
//     callObject.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(typeof(this.responseText));
//         }
//     };
//
//     callObject.open("GET", URL , true);
//     callObject.send();
// }
//
// NetworkCall(function(result){
//     console.log(result);
//
//
// });
// //
// //
// var university;
//
// function setup(){
//     loadJSON('http://universities.hipolabs.com/search?name=middle&country=United%20States');
// }
//
// function gotdata(data){
//
//     university=data;
// }

//http://universities.hipolabs.com/search?name=middle&country=United%20States
//http://universities.hipolabs.com/search?name=middle
//http://universities.hipolabs.com/search?name=middle&country=turkey
//
// var url="https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json";
// var country1="country=";
// var country="United%20Kingdom";
// var api=url;
// //
// // function loadDoc() {
// //     var xhttp = new XMLHttpRequest();
// //     xhttp.onreadystatechange = function() {
// //         if (this.readyState == 4 && this.status == 200) {
// //             document.getElementById("demo").innerHTML = this.responseText;
// //         }
// //     };
// //     xhttp.open("GET", JSON.[api], true);
// //     xhttp.send();
// // }
//
//
// var demo=document.getElementById('demo');
// var api = url+country1+country;
// function NetworkCall(result) {
//     var callObject = new XMLHttpRequest();
//
//     callObject.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(JSON.parse(this.responseText));
//             console.log(result[2]);
//         }
//     };
//
//     callObject.open("GET", api , true);
//     callObject.send();
// }
//
// NetworkCall(function(data){
//
// });
//


//
// function createNode(element) {
//     return document.createElement(element);
// }
//
// function append(parent, el) {
//     return parent.appendChild(el);
// }
//
// const ul = document.getElementById('demo');
// const url = 'http://universities.hipolabs.com/search?';
// fetch(url)
//     .then((resp) => resp.json())
//     .then(function(data) {
//         let authors = data.results;
//         return authors.map(function(author) {
//             let li = createNode('li'),
//                 img = createNode('img'),
//                 span = createNode('span');
//             img.src = author.picture.medium;
//             span.innerHTML = `${demo.name} ${demo.country}`;
//             append(li, img);
//             append(li, span);
//             append(ul, li);
//         })
//     })
//     .catch(function(error) {
//         console.log(JSON.stringify(error));
//     });



