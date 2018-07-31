var express = require("express"); 
var app= express(); 
var request = require("request"); 
app.set("view engine", "ejs"); 
//------------------ 

app.get("/",function(req, res){
	res.render("search");
}); 

app.use(express.static(__dirname + '/public'));
//--------------------
app.get("/results",function(req, res){ 
	var query= req.query.search; 
	var url ="http://www.omdbapi.com/?s="+query+"&apikey=b865a98";
	
	request(url, function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body) 
			var imdbid=data["imdbID"] 
			console.log(data["imdbID"])
			res.render("results",{data: data,imdbid: imdbid});
		}
	});
		
});


app.listen(process.env.PORT || 8080, process.env.ID, function() {

	console.log("server started");
}); 
