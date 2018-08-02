

$(document).ready(function () {
    let btn = $('#btn');
    // let inp = $('#inp').val();
    let list = $('#list');
    let prmt;

    while (!prmt) {
        prmt = prompt("Please enter your name");
    }

    let socket = io();



    socket.emit('name', prmt);

    socket.on('initConnect', function (data) {
        console.log(data);
        $('#connected').text('');
        for (let id in data) {
            if (data.hasOwnProperty(id)) {
                console.log(data[id]);
                $('#connected').append(`<li>${data[id]}</li>`);
            }
        }
    });

    socket.on('chat', function (data) {
        data.forEach(function(chatItem) {
            list.append(`<li><strong>${chatItem[1]}</strong>:- ${chatItem[0]}</li>`);
        })
    });

    btn.click(function () {
        let inp = $('#inp').val();
        console.log(inp);
        socket.emit('message', [inp, prmt]);
        list.append(`<li><strong>${prmt}</strong>:- ${inp}</li>`);
    });

    socket.on('reciveData', function (data) {
        console.log(data);
        list.append(`<li><strong>${data[1]}</strong>:- ${data[0]}</li>`);
    })
})