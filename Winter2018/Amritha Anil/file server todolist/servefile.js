const express=require('express');
const app=express();
const bp=require('body-parser');
const file=require('fs');


app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.use('/',express.static('public'));


app.listen('4000',function(){
  console.log("server-file is running");
})
/*
app.post('/todo/add',function(req,res){

  console.log("data sent  by browser", req.body.data);
  td.push(req.body.data);
  let obj={arr:td};
//  res.send("sad");

  file.writeFile('./todo.txt',JSON.stringify(obj),function(err){
    if(!err){
      console.log("written in the file");
      file.readFile('./todo.txt',function(err,data){
        if(!err){
          let x=JSON.parse(data.toString()).arr;
           res.send(x);
        }

      })
    }
  })

})*/

app.post('/todo/add', function(req,res){
  console.log("data sent by the browser",req.body.data);
  file.readFile('./todo.txt',function(err,data){
    if(data==null){
      console.log("thefile was empty");
      let td=[];
      td.push(req.body.data);
      let obj={arr:td};
        file.writeFile('./todo.txt',JSON.stringify(obj),function(err){
          if(!err){
            console.log("written into file");
          }
        });

    }
    else {
      console.log("file was not empty");
      file.readFile('./todo.txt',function(err,data){
        if(!err){
          let x=JSON.parse(data.toString()).arr;
          x.push(req.body.data);
            let obj={arr:x};
              file.writeFile('./todo.txt',JSON.stringify(obj),function(err){
                console.log("written into the file");
              });
           res.send(x);
        }
    })
  }
})
})

app.post('/todo/del',function(req,res){
  console.log("inside delete");
  file.readFile('./todo.txt',function(err,data){
    if(!err){
      let x=JSON.parse(data.toString()).arr;
      x.splice(req.body.i,1);
      let obj={arr:x};
      file.writeFile('./todo.txt', JSON.stringify(obj),function(err){
        if(!err)
        {
          console.log("file rewritten");
        }
        
        res.send(x);
      })
    }
  })

})
