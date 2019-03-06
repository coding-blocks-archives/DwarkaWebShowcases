$(()=> {
    const socket = io();
    let usernameg;
    usernameg = prompt('Please enter your name ');
    socket.emit('username',usernameg);
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message',{'username':usernameg, 'msg': $('#m').val()});
      $('#m').val('');
      return false;
    });

    socket.on('chat message', (username,msg)=>{
      if(username == usernameg){
        $('#messages').append($('<li id="right">').text(`You : ${msg}`));
        // $('#right').css({'text-align':'right'});
      }else{
        $('#messages').append($('<li id="left">').text(`${username} : ${msg}`));
        // $('#left').css({'text-align':'left'});
      }
      
    });

    socket.on('user connected', (username)=>{
      $('#messages').append($('<li class="info">').text(`user connected : ${username.name}`));
    });

    socket.on('user disconnected', (username)=>{
      $('#messages').append($('<li class="info">').text(`user disconnected : ${username.name}`));
    });
  });

