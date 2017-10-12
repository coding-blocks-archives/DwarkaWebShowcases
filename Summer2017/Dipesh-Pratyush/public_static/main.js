// var player=require('player.js');
var showme=$('#showMe');
var audio=$('#audio');
var aud_src=$('#aud_src');
var queue=localStorage.getItem('queue');
if(queue==undefined||queue==null){
    queue=[];
    localStorage.setItem('queue',JSON.stringify(queue));
}
else{
    // console.log(queue);
    queue=JSON.parse(queue);
}

var currentlyPlaying=0;
var queueView=$('#queueView');
var currId=0;
var loop=false;

$(function() {
    // var Quitem=generateQueue();
    generateQueue();
    $("#searchQuery").focus(function(){
        $(this).css("width", "400px");
        $(this).css("transition", "0.3s");

    });
    $("#searchQuery").focusout(function(){
        $(this).css("width", "280px");
        });

    $("nav li").click(function(){
        $("nav li").removeClass("active");
        $(this).addClass("active");
    })

    $("#favoritesNav").click(function(){
        // console.log('homeNav');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Favorites <i class="fa fa-heart" aria-hidden="true" style="color: #E91E63;"></i></h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/songs/library',function(data){
            // console.log(data);
            for(var i in data){
                // console.log(data[i].img_src);
                if(parseInt(data[i].fav)>0){
                    $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="'+data[i].img_src+'" alt="img not found" onerror=this.src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">'+data[i].name+'</div>                <div class="playButton">                    <i class="fa fa-play-circle-o " id='+data[i].song_id+' aria-hidden="true" onclick="playSongButton(id)"></i></div><div class="text">Artist: '+data[i].artist+'<br>Genre:'+data[i].genre+'</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: '+(parseInt(data[i].fav)>0?'#e91e63':'white')+';" href="#"><i class="fa fa-heart heartLogo" '+
                    'onclick=toggleFavourite('+data[i].song_id+',this)'
                    +' data-toggle="tooltip" title="Add to Favorites" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#">'+
                    '<i class="fa fa-plus-circle" onclick="addtoPlaylistHelper('+data[i].song_id+')"data-toggle="tooltip" title="Add to Playlist" aria-hidden="true" style="position: relative; left: 92px;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul listLogo" data-toggle="tooltip" title="Add to Queue" aria-hidden="true" style="position: relative; left: 185px;" onclick=addtoqueue('+data[i].song_id+')></i></a></div></div><h3>Song Name</h3></div>')
                    }
            }// showme.html('')
        })
    });
    $('#playlistNav').click(function () {
        showme.html('');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Playlists</h1>'+'<button style="float: right; position: relative; top: -45px; background-color: #2ecc71;border-color: transparent;outline: none; border-radius: 18px; font-size: 16px;" type="button" class="btn btn-info" data-toggle="modal" data-target="#addtoPlaylist">Create New Playlist</button>'+
        '<div class="modal fade" id="addtoPlaylist" role="dialog">'+'<!-- dont remove this; this is for target-->'+'<div class="modal-dialog"><div class="modal-content">                    <div class="modal-header alert alert-success">                      <button type="button" class="close" data-dismiss="modal">&times;</button>                      <h4 class="modal-title">Creating New Playlist</h4>                    </div>                    <div class="modal-body">                      <input id="newPlayIn" type="text" class="form-control" placeholder="Enter the Name of Playlist" style="font-size: 16px;">                    </div>                    <div class="modal-footer">'+
        '<button type="button" onclick="newPlayAdd()" class="btn btn-default" data-dismiss="modal">SUBMIT</button>'+
        '<button type="button" class="btn btn-default" data-dismiss="modal">CANCEL</button>                    </div>              </div>            </div>        </div>'+
        '</div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/user/playlist',{"user":"1"},function (data) {
            $('favDisp').html('');
            for(var i in data.playlists){
                $('#favDisp').append('<div id='+data.user+'_'+i+' class="col-lg-3 holder">'+
                '<div class="main">'+
                '<img src="def.jpg" height="100%" width="100%;">'+
                                            '<div class="blackFrame">'+
                                            +'</div>'+
                                            '<div class="songName">'+
                                                data.playlists[i].name
                                            +'</div>'+
                                            '<div class="playButton playlist">'+
                                                '<i data-toggle="tooltip" onclick="playPlaylist('+JSON.stringify(data.playlists[i].list.map(function(x){return parseInt(x)}))+')" title="Play Playlist" class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>'+
                                            '</div>'+
                                            '<div class="options">'+
                                                '<a data-toggle="tooltip" title="Delete Playlist" onclick="deletePlaylist('+data.user+','+i+')" style="text-decoration: none; color: white;" href="#"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
                                                '<a data-toggle="tooltip" title="View Playlist" onclick="dispPlaylist('+data.user+','+i+')" style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul" aria-hidden="true" style="position: relative; left: 200px;"></i></a>'+
                                            '</div></div></div>')
            }
        })
    })
    $('#form-upload').click(function(){
        // console.log('uploadNav');
        // showme.html('<div id="dropBox">        <img src="cloud-upload.png" id="cloud">            <h3>Drag Your mp3 To Upload</h3></div>');
        // $.getScript('dropzone.js');
        var songName=$("#nameform").val();
        var artist=$("#artistform").val();
        var genre=$("#genreform").val();
        var img_src=$("#srcform").val();
        if (songName!=''){
            $.post('/upload/form',{"name":songName,"artist":artist,"genre":genre,"img_src":img_src},function (data) {

                showme.html('<div id="cloudContainer"><iframe style="border:none;" width=100% height=80% src="upload.html"></iframe></div>')

            });
        }
    })
    $('#libraryNav').click(function(){
        showme.html('');
        showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Your Library</h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
        $.post('/songs/library',function(data){
            // console.log(data);
            for(var i in data){
                // console.log(data[i].img_src);
                $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="'+data[i].img_src+'" alt="img not found" onerror=this.src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">'+data[i].name+'</div>                <div class="playButton">                    <i class="fa fa-play-circle-o " id='+data[i].song_id+' aria-hidden="true" onclick="playSongButton(id)"></i></div><div class="text">Artist: '+data[i].artist+'<br>Genre:'+data[i].genre+'</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: '+(parseInt(data[i].fav)>0?'#e91e63':'white')+';" href="#"><i class="fa fa-heart heartLogo" '+
                'onclick=toggleFavourite('+data[i].song_id+',this)'
                +' data-toggle="tooltip" title="Add to Favorites" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#">'+
                '<i class="fa fa-plus-circle" onclick="addtoPlaylistHelper('+data[i].song_id+')"data-toggle="tooltip" title="Add to Playlist" aria-hidden="true" style="position: relative; left: 92px;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul listLogo" data-toggle="tooltip" title="Add to Queue" aria-hidden="true" style="position: relative; left: 185px;" onclick=addtoqueue('+data[i].song_id+')></i></a></div></div><h3>Song Name</h3></div>')
            }
        })
    });
    $('#libraryNav').click();
    search();

    $('#finalClear').click(function(){
        queue = [];
        localStorage.setItem('queue',JSON.stringify(queue));
        queueView.html('');
        if (!audio[0].paused){
            playOrPause();
        }
        $('#img-wrapper').attr("src",'');
        $('.song-name').html('');
        $('.album-name').html('');
        // aud_src.attr('src',data.location);
        aud_src.attr('src','');
        // playSong();
        audio[0].load();
    });
});

function playSongButton(id) {
    // console.log(queue);
    // console.log(id);
    // console.log(queue.indexOf(id));
    if(queue.indexOf(parseInt(id))==-1){
        // console.log("in button if");
        var quetemp=queue.splice(0,queue.length);
        // console.log(quetemp);
        queue.push(parseInt(id));
        // console.log(queue);
        queue=queue.concat(quetemp);
        // console.log(queue);
        currentlyPlaying=0;
        localStorage.setItem("queue",JSON.stringify(queue));
        generateQueue();
    }
    playSong(id);
}
function toggleFavourite(id,e){
    // console.log(id);
    $.post('/songs/update/toggleFav',{'song_id':id},function(data){
        if(data!='0'){
            e.style.color='#e91e63';
        }
        else{
            e.style.color='white';
        }
        // console.log($(e));
        if($('#favoritesNav').hasClass('active')){
            $('#favoritesNav').click();
        }
        generateQueue();
    })
}
function playSong(song_id){
    // console.log(song_id);
    // console.log("playing shit");
    currId=song_id;
    currentlyPlaying=queue.indexOf(parseInt(song_id));
    if(song_id!=undefined){
        $.post('/songs/data',{"song_id":song_id},function(data){
            $('#img-wrapper').attr("src",data.img_src);
            $('.song-name').html(data.name);
            $('.album-name').html(data.artist);
            aud_src.attr('src',data.location);
            // playOrPause();myTrack.play();
            audio[0].load();
            audio[0].play();
            playButton.style.display='none';
            pauseButton.style.display='inline-block';
            updateTime=setInterval(update,200);
            $('.list-group-item').removeClass("active");
            $('#q'+currId).addClass("active");
            $('.playingicon').hide()
            $('#q'+currId+' i').show();
        })
    }
    else{
        $('#img-wrapper').attr("src",'');
        $('.song-name').html('');
        $('.album-name').html('');
        aud_src.attr('src',"");
        // playOrPause();myTrack.play();
        audio[0].load();
    }
}
function addtoqueue(song_id) {
    if(queue.length==0){
        playSong(song_id);
    }
    if(queue.indexOf(song_id)==-1){
        queue.push(song_id);
        // console.log(queue);
        localStorage.setItem("queue",JSON.stringify(queue));
        generateQueue();
    }
    else {
        alert('song already in queue');
    }


}
function generateQueue(){
    // var data=[];
    if(queue.length==0){
        // queueView.html('queue is empty')
    }
    else
        queueView.html('');
    for(var i in queue){
        $.post('/songs/data',{"song_id":queue[i]},function(data){
            // data.push(recvData);
            if(data.song_id==currId){
                // queueView.append('<a id="q'+data.song_id+'" href="#" onclick=playSong('+data.song_id+') class="list-group-item active"><img src="'+data.img_src+'" style="width: 40px; display: inline; margin-right: 10px;">'+data.name+'<i class="playingicon fa fa-volume-up" aria-hidden="true" style="font-size: 26px; float: right; position: relative; top: 8px;"></i></a>')
                // queueView.append('<li id="q'+data.song_id+'" class="list-group-item active"><img onclick=playSong('+data.song_id+') src="'+data.img_src+'" style="cursor:pointer;width: 40px; display: inline; margin-right: 10px;"><a onclick=playSong('+data.song_id+') style="cursor:pointer;color:inherit">'+data.name+'</a>'+
                // '<i class="playingicon fa fa-volume-up" aria-hidden="true" style="margin-left: 5px; font-size: 26px; float: right; position: relative; top: 8px;"></i>'+
                //     '<div class="dropdown" style="float: right; top: 2px;">'+
                //     '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><img src="add.png" width="26px"></button>'+
                //     '<ul class="dropdown-menu" style="position: absolute; left: -170px;" >'+
                //     '<li><a onclick=toggleFavourite("'+data.song_id+'",this)><i class="fa fa-heart" aria-hidden="true" style="color: lightgray;"></i> Add to Favourites</a></li>'+
                //     '<li onclick="removeFromQueue('+data.song_id+')"><a href="#"><i class="fa fa-trash-o" aria-hidden="true" style="color: #E91E63;"></i> Remove from queue</a></li>'+
                //     '<li onclick="addtoPlaylistHelper('+data.song_id+')"><a href="#"><i class="fa fa-times" aria-hidden="true" style="color: lightgray; font-size: 18px;"></i>Add to Playlist</a></li>'+
                //     '<li class="divider"></li>'+
                //     '<li><a href="#">Info, Artist, and more...</a></li></ul></div></li>')
                queueView.append('<li id="q'+data.song_id+'" class="list-group-item active"><img onclick=playSong('+data.song_id+') src="'+data.img_src+'" style="cursor:pointer;width: 40px; display: inline; margin-right: 10px;"><a onclick=playSong('+data.song_id+') style="cursor:pointer;color:inherit">'+data.name+'</a>'+
                '<div class="dropdown" style="float: right; top: 2px;">'+
                '<button class="btn btn-default dropdown-toggle dropdown-button" type="button" data-toggle="dropdown">'+
                '<img src="add.png" width="26px">'+'</button>'+
                '<ul class="dropdown-menu" style="position: absolute; left: -230px;">'+

                (parseInt(data.fav)<=0?'<li onclick=toggleFavourite("'+data.song_id+'",this)><a href="#"><i class="fa fa-heart" aria-hidden="true" style="color: lightgray;"></i> Add to Favourites</a></li>':'<li onclick=toggleFavourite("'+data.song_id+'",this)><a href="#"><i class="fa fa-heart" aria-hidden="true" style="color: #E91E63;"></i> Added to Favourites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: gray">Remove</span></a></li>')

                +'<li onclick="removeFromQueue('+data.song_id+')"><a href="#"><i class="fa fa-times" aria-hidden="true" style="color: lightgray; font-size: 18px;"></i> Remove from Queue</button></a></li>'+
                '<li onclick="addtoPlaylistHelper('+data.song_id+')"><a href="#"><i class="fa fa-list-ul" aria-hidden="true" style="color: lightgray"></i><button type="button" name="button" class="call_modal">Add to Playlist</button></a></li>'+
                ''+'</ul></div>'+

                // '    <li class="divider"></li>'+
                // '<li><a href="#">Info, Artist, and more...</a></li>'+'</ul></div>'+

                '<i class="playingicon fa fa-volume-up" aria-hidden="true" style="margin-left: 5px; font-size: 26px; float: right; position: relative; top: 8px; left: -3px;"></i></li>')
            }
            else{
                queueView.append('<li id="q'+data.song_id+'" class="list-group-item "><img onclick=playSong('+data.song_id+') src="'+data.img_src+'" style="cursor:pointer;width: 40px; display: inline; margin-right: 10px;"><a onclick=playSong('+data.song_id+') style="cursor:pointer;color:inherit">'+data.name+'</a>'+
                '<div class="dropdown" style="float: right; top: 2px;">'+
                '<button class="btn btn-default dropdown-toggle dropdown-button" type="button" data-toggle="dropdown">'+
                '<img src="add.png" width="26px">'+'</button>'+
                '<ul class="dropdown-menu" style="position: absolute; left: -230px;">'+(parseInt(data.fav)<=0?'<li onclick=toggleFavourite("'+data.song_id+'",this)><a href="#"><i class="fa fa-heart" aria-hidden="true" style="color: lightgray;"></i> Add to Favourites</a></li>':'<li onclick=toggleFavourite("'+data.song_id+'",this)><a href="#"><i class="fa fa-heart" aria-hidden="true" style="color: #E91E63;"></i> Added to Favourites &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: gray">Remove</span></a></li>')+
                '<li onclick="removeFromQueue('+data.song_id+')"><a href="#"><i class="fa fa-times" aria-hidden="true" style="color: lightgray; font-size: 18px;"></i> Remove from Queue</button></a></li>'+
                '<li onclick="addtoPlaylistHelper('+data.song_id+')"s><a href="#"><i class="fa fa-list-ul" aria-hidden="true" style="color: lightgray"></i><button type="button" name="button" class="call_modal" >Add to Playlist</button></a></li>'+
                // '<li class="divider"></li>'+
                // '<li><a href="#">Info, Artist, and more...</a></li>'+
                '</ul></div>'+
                '<i class="playingicon fa fa-volume-up" aria-hidden="true" style="margin-left: 5px; font-size: 26px; float: right; position: relative; top: 8px; left: -3px;"></i></li>')

            }
            $('.playingicon').hide()
            $('#q'+currId+' .playingicon').show();
        })
    }
    // return data;
}
function playPrev(){
    if(currentlyPlaying>0){
        currentlyPlaying--;
        playSong(queue[currentlyPlaying]);
    }
}
function playNext(){
    // console.log(queue);
    // console.log(queue[currentlyPlaying]);
    if(currentlyPlaying<queue.length-1){
        currentlyPlaying++;
        playSong(queue[currentlyPlaying]);
    }
}

function dispPlaylist(user,id) {
    $.post("/user/playlist",{"user":user},function(data){
        $('#favDisp').html('');
        var array=data.playlists[id].list;
        $('#favDisp').append('<div class="col-lg-3 col-md-3 col-sm-3 albumHolder"><div class="main"><img id="imgTrials" src="def.jpg" height="100%" width="100%;">                <div class="blackFrame">                </div>                <div class="playButton" onclick=playPlaylist('+JSON.stringify(data.playlists[id].list)+')>                    <i data-toggle="tooltip" title="Play Playlist" class="fa fa-play-circle-o " aria-hidden="true"></i></div>'+
        '<div class="songName">'+data.playlists[id].name+'<div></div></div>');
        $('#favDisp').append('<div class="col-lg-7 col-md-7 col-sm-7">'+
        '<div class="list-group" id="playlist" style="padding: 70px 50px 150px 30px;width: 100%;">'+
        '</div></div>')
        if((array.length==1&&(array[0]==0||array[0]=='0'))||!array){
            $('#playlist').append('<li href="#" class="list-group-item"><span onclick="playSong()" style="color: lightgray; margin-right: 20px; margin-left: 15px;">'+(it++)+'</span><div onclick="playSong()" data-toggle="tooltip" title="play song" style="display: inline-block; cursor: pointer; "><img src="Divide_cover.png" style="width: 40px; display: inline; margin-right: 10px;"></div><div onclick="playSong()" style="display: inline-block;position: relative; top: 12px;">'+
            '<span class="songTitle">No Songs Added</span><br>'+
            '<span class="art">Add from Library</span></div>'
            )
        }
        else{
            for(var i in array){
                var it=1;
                $.post('/songs/data',{"song_id":array[i]},function(recvData){
                    if(it==1){$('#imgTrials').attr("src",recvData.img_src);}
                    $('#playlist').append('<li href="#" class="list-group-item"><span onclick="playSong('+recvData.song_id+')" style="color: lightgray; margin-right: 20px; margin-left: 15px;">'+(it++)+'</span><div onclick="playSong('+recvData.song_id+')" data-toggle="tooltip" title="play song" style="display: inline-block; cursor: pointer; "><img src="'+recvData.img_src+'" style="width: 40px; display: inline; margin-right: 10px;"></div><div onclick="playSong('+recvData.song_id+')" style="display: inline-block;position: relative; top: 12px;">'+
                    '<span class="songTitle">'+recvData.name+'</span><br>'+
                    '<span class="art">'+recvData.artist+'</span></div>'+
                    '<div class="dropdown" style="float: right; top: 10px;">'+
                    '<button class="btn btn-default dropdown-toggle" type="button" style="border: none; outline: none;;" data-toggle="dropdown"><img src="add.png" width="26px"></button>'+
                    '<ul class="dropdown-menu" style="position: absolute; left: -135px;" >'+
                    '<li onclick=toggleFavourite("'+recvData.song_id+'",this)><a ><i class="fa fa-heart" aria-hidden="true" style="color: lightgray;"></i> Add to Favourites</a></li>'+
                    '<li onclick="removeFromPlaylist('+recvData.song_id+','+user+','+id+')"><a href="#"><i class="fa fa-trash-o" aria-hidden="true" style="color: #E91E63;"></i> Remove from playlist</a></li>'+
                    '</ul></div></li>')
                })
            }
        }
    });
}

function playPlaylist(list) {
    if(list.length==1&&list[0]==0){return;}
    queue=list.map(function(x){
        return parseInt(x);
    });
    var uniqueQueue= [];
    $.each(queue, function(i, el){
        if($.inArray(el, uniqueQueue) === -1) uniqueQueue.push(el);
    });
    queue=uniqueQueue;
    localStorage.setItem("queue",JSON.stringify(queue));

    currentlyPlaying=0;
    currId=queue[0];
    generateQueue();
    playSong(queue[0]);

}


function deletePlaylist(user,id) {
    $.post("/user/playlist",{"user":user},function(data){
        data.playlists.splice(id,1);
        $.post("/user/update",{"data":data},function(data) {
            $('#'+user+'_'+id).hide();
            // console.log('#'+user+'*'+id);
        })
    })
}

function newPlayAdd(optional_arg,callback,callbackarg1,callbackarg2){
    var name=optional_arg;
    if(!optional_arg){
        name=$("#newPlayIn").val();
    }
    if(name!=''){
        $.post('/user/playlist',{"user":1},function(data){
            if(!data.playlists){
                data.playlists=[];
            }
            // console.log(data);
            data.playlists.push({"name":name,"list":[0]});
            $.post("/user/update",{"data":data},function(data){
                // console.log(data);
                if ($('#playlistNav').hasClass('active'))
                    $('#playlistNav').click();
                callback(callbackarg1,callbackarg2)
            })
        })
    }
}
function removeFromQueue(id,e){
    $('#q'+id).hide();
    // console.log(queue);
    // console.log("in remove");
    var index=queue.indexOf(id);
    queue.splice(index,1);
    // console.log(queue);
    localStorage.setItem('queue',JSON.stringify(queue));
    if(currId==id){
        playSong(undefined);
    }
    // playNext();
}
function removeFromPlaylist(song_id,user,id){
    // console.log(song_id+'song_id');
    $.post('/user/playlist',{"user":user},function (data) {
        var i=data.playlists[id].list.indexOf(JSON.stringify(song_id));
        // console.log(i);
        // console.log(data.playlists[id].list);
        if (i!=-1) {
            data.playlists[id].list.splice(i,1);
            if(data.playlists[id].list.length==0){
                data.playlists[id].list=["0"];
            }
            $.post('/user/update',{"data":data},function(data){
                dispPlaylist(user,id);
            })
        }
    })
}

function addToPlaylist(song_id,playlist_index){
    $.post('/user/playlist',{"user":1},function(data){
        var list=data.playlists[playlist_index].list
        if (list.length==1&&(list[0]==0||list[0]=='0')){
            data.playlists[playlist_index].list.pop();
        }
        data.playlists[playlist_index].list.push(song_id);
        $.post('/user/update',{"data":data},function (result) {
            // console.log(result);
        })
    })
}
// addToPlaylist(12,1);

function search(e) {
    var q=window.location.href.split('?')[1];
    var query=$('#searchQuery').val();
    if(!q&&query=='') return;
    var ty=q.split("=")[0];
    var q=q.split("=")[1];
    // console.log(q);
    if(e!="searchButton"){
        query=q;
        // console.log(e);
    }
    // console.log(query);
    if (query=='') {
        alert('please enter a valid search query');
        return;
    }
    if(query==undefined)
    {
    return
    }    // if
    // query=q;
    showme.html('');
    showme.html('<div class="container-fluid" ><div class="row"><h1 style="text-align: center;">Search Results</h1></div><div id="favDisp" class="row" style="margin-left: 40px;display: flex; flex-wrap: wrap;"></div></div>');
    $.get('/songs/search?q='+query,function (data) {
        $('#favDisp').html('');
        // console.log(data);
        for(var i in data){
            // console.log(data[i].img_src);
            // console.log($('#favDisp'));
            $('#favDisp').append('<div class="col-lg-3 holder"><div class="main"><img src="'+data[i].img_src+'" alt="img not found" onerror=this.src="Divide_cover.png" height="100%" width="100%;">           <div class="blackFrame"></div>                <div class="songName">'+data[i].name+'</div>                <div class="playButton">                    <i class="fa fa-play-circle-o " id='+data[i].song_id+' aria-hidden="true" onclick="playSongButton(id)"></i></div><div class="text">Artist: '+data[i].artist+'<br>Genre:'+data[i].genre+'</div><div class="options"><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-heart-o" aria-hidden="true" style="display: none;"></i></a><a style="text-decoration: none; color: '+(parseInt(data[i].fav)>0?'#e91e63':'white')+';" href="#"><i class="fa fa-heart heartLogo" '+
            'onclick=toggleFavourite('+data[i].song_id+',this)'
            +' data-toggle="tooltip" title="Add to Favorites" aria-hidden="true"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-plus-circle" data-toggle="tooltip" title="Add to Playlist" aria-hidden="true" style="position: relative; left: 92px;"></i></a><a style="text-decoration: none; color: white;" href="#"><i class="fa fa-list-ul listLogo" data-toggle="tooltip" title="Add to Queue" aria-hidden="true" style="position: relative; left: 185px;" onclick=addtoqueue('+data[i].song_id+')></i></a></div></div><h3>Song Name</h3></div>')
        }
        if(data.length==0){
            // console.log(true);
            showme.html('<h2 style="text-align: center;">Search Not Found</h2>');
        }
    })
}
function createModal(){
    $('#list-of-playlist').html('');
    $.post('/user/playlist',{"user":1},function(data){
        list=data.playlists;
        for(i in list){
            $('#list-of-playlist').append('<label class="btn"><input value='+i+' type="radio" name="gender1"><i class="fa fa-circle-o fa-2x"></i><i class="fa fa-dot-circle-o fa-2x"></i> <span>'+list[i].name+'</span></label>')
        }
    })
}

function addtoPlaylistHelper(song_id){
    createModal();
    $('#playlistToggle').click();
    $('#tempId').attr("id",'qatar '+song_id);
}
function sendData(song_id){
    playlist_index=$('input[name=gender1]:checked').val();
    song_id=parseInt(song_id.split(' ')[1]);
    if(!$('input[name=gender1]:checked').val()){
        playlist_index=$('input[name=gender1]').length;
        newPlayAdd($('#playName').val(),addToPlaylist,song_id,playlist_index);
    }
    else {
        // console.log(song_id+'-'+playlist_index);
        addToPlaylist(song_id,playlist_index);
    }
    $('#qatar '+song_id).attr('id','tempId');
}
