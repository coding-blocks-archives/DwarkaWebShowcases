const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.Port || 4500;

server.listen(port, () => {
    console.log(`listening to server on port ${port}`);
});

//set public folder
app.use('/', express.static(path.join(__dirname, '/public')));

let userinfo = [];

//on connecting a user 
io.on('connection', function (socket) {
    //event username
    socket.on('username', (username) => {
        let info = {
            'name': username,
            'id': socket.id
        };
        userinfo.push(info);
        console.log(userinfo);
        socket.broadcast.emit('user connected', userinfo[userinfo.length-1]);
    });

    //event chat message
    socket.on('chat message', function (info) {
        io.emit('chat message', info.username, info.msg);
    });

    //event disconnect
    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', userinfo[userinfo.length-1]);
    });
});