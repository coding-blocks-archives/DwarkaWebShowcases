const express = require('express');
const app=express();
const sql = require('./sql.js');
const fileUpload=require('express-fileupload');
const bodyParser=require('body-parser');
const port=process.env.PORT||5000;
var uploadID=0;
const mongodb=require('./mongodb.js');
app.use('/',bodyParser.json());
app.use('/',bodyParser.urlencoded({extended:true}));

app.use('/',express.static('public_static'));
app.use(fileUpload());
// app.get('/',function(req,res){
//     res.redirect(x.html);
// });
app.post('/songs/library',function(req,res){
    var query='SELECT * FROM songs';
    sql.sqlQuery(query,function (data){
        res.send(data);
    })
})


app.post('/songs/update/toggleFav',function(req,res){
    var query2="SELECT fav FROM songs WHERE song_id="+req.body.song_id;
    // console.log(query);
    sql.sqlQuery(query2,function (data){
        var fav=data[0].fav;
        var query1="UPDATE songs SET FAV="+(parseInt(fav)>0?0:1)+" WHERE song_id="+req.body.song_id;
        // console.log(query1);
        sql.sqlQuery(query1,function(data){});
        res.send(JSON.stringify(fav>0?0:1));
    })
})


app.post('/songs/data',function(req,res){
    var query="SELECT * FROM songs WHERE song_id="+req.body.song_id;
    sql.sqlQuery(query,function (data) {
        res.send(data[0]);
    })
})
app.get('/songs/search',function (req,res) {
    var query1="SELECT * FROM songs WHERE name='"+convert_case(req.query.q)+"'";
    sql.sqlQuery(query1,function (data) {
        var query2="SELECT * FROM songs WHERE artist='"+convert_case(req.query.q)+"'";
        sql.sqlQuery(query2,function (data2) {
            // console.log(data.concat(data2));
            res.send(data.concat(data2));
        })
    })
})

function convert_case(str) {
  var lower = str.toLowerCase();
  return lower.replace(/(^| )(\w)/g, function(x) {
    return x.toUpperCase();
  });
}

app.post('/upload', function(req, res) {
    // console.log("blhblaqkdksxz");
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let textfile = req.files.file;
    //  console.log(textfile);
    // the uploaded file object
    if(textfile.name.split('.')[1]=='mp3'&&uploadID!=0){
        textfile.mv('./public_static/music/'+textfile.name);
        res.send("File Uploaded");
        sql.sqlQuery("UPDATE songs SET location='music/"+textfile.name+"' WHERE song_id="+uploadID,function (data) {
            console.log(data);

        });
    }
    else{
        res.status(400).send('please upload mp3 file');
    }
});

app.post('/upload/form',function (req,res) {
    var query='INSERT INTO songs (name,artist,genre,img_src,fav) values ("'+convert_case(req.body.name)+'","'+convert_case(req.body.artist)+'","'+convert_case(req.body.genre)+'","'+req.body.img_src+'",0)';
    sql.sqlQuery(query,function(data){
        res.send(req.body.name);
        // console.log(data);
        uploadID=parseInt(data.insertId);
        console.log(uploadID);
    })
})

app.post('/user/playlist',function (req,res) {
    mongodb.getList({'user': req.body.user},function (data) {
        // console.log(data);
        res.send(data);
    })
})

app.post('/user/update',function (req,res) {
    mongodb.updateItem({'user':req.body.data.user},{$set:{playlists:req.body.data.playlists}},function (data) {
        // console.log(data);
        res.send(data);
    });
});

mongodb.connectToMongo(function () {
    app.listen(port,function(){
        console.log("listening on"+port);
    });
});
