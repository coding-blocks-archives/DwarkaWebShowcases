const app=require('express')();
const request=require('request');
const bodyParser = require('body-parser');
let port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/load',function(req,res){
  console.log(res);
  var options={
    url:"https://maps.googleapis.com/maps/api/js?key=AIzaSyC2pVstLbByOKulz3GsfvHgwFT2s8kgeqU&callback=initMap"
 }
  function callback(err,response,body){
    res.send(response.body);
    console.log("response sent");
  }
  request(options,callback);
})
app.post('/fetch',function(req,res){
  console.log(req.body);
  request(req.body.url,function(err,response,body){
    res.send(JSON.parse(response.body));
  })
})
app.listen(port,function(err){
  if(err) throw err;
  console.log("Server is Running");
});
