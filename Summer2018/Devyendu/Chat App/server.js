const http = require('http') ;
const express = require('express') ;
const app = express() ;

const socketServer = http.Server(app) ;
const socket = require('socket.io') ;
const io = socket(socketServer) ;

const port = process.env.PORT || 8080 ;

app.use('/',express.static('public') ) ;

let id=[];
let users=[];
let messages=[];

io.on('connection',function (socket) {

    id.push(socket.id);
    socket.emit('get_username');


    socket.on('username',function (name) {
        users.push(name);
        io.emit('newactive',users[id.indexOf(socket.id)])
    })

    socket.on('newmessage',function (message) {
        messages.push(`<li>${message}</li> <h4>-  ${users[id.indexOf(socket.id)]}</h4><br>`);
        io.emit('message',{msg:message , user:users[id.indexOf(socket.id)]});
    })

    socket.emit('pageload',messages);

    socket.emit('activeusers',users);

    socket.on('disconnect',function () {
        let index = id.indexOf(socket.id);
        users.splice(index,1);
        id.splice(index,1);
        io.emit('userleft',users);
    })

});//io.on connection


// .emit vs .on   (.emit emits the information     ||||    .on recieves the information)
socketServer.listen(port , function(){
    console.log("Server is listening on port " + port ) ;
}) ;


// show connected users and disconnected users
