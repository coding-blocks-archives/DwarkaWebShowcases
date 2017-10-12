var myTrack=document.getElementById('audio');
var playButton=document.getElementById("play");
var pauseButton=document.getElementById("pause");
var muteButton=document.getElementById('mute');
var unmuteButton=document.getElementById('unmute');
var barSize=800;
var defBar=document.getElementById('mainbar');
var progBar=document.getElementById('progBar');
var time=document.getElementById('time');
var defVol=document.getElementById('defVol');
var volProg=document.getElementById('volProg');
var searchQ=document.getElementById('searchQuery');
defVol.addEventListener('click',changeVol,false);
document.getElementsByClassName('thumbs')[1].onclick=function(){
    document.getElementsByClassName('volume_container')[0].style.display='none';

}
muteButton.addEventListener('mouseover',function(){
    document.getElementsByClassName('volume_container')[0].style.display='inline-block';
});
unmuteButton.addEventListener('mouseover',function(){
    document.getElementsByClassName('volume_container')[0].style.display='inline-block';
});
defBar.addEventListener('click',changeTime,false);
// defBar.addEventListener('mouseover',showTime,false);

document.addEventListener('keydown',function(){
    if(event.which==32&&document.activeElement!=searchQ){
        // console.log();
        event.preventDefault();
        playOrPause();
    }
});

function playOrPause() {
    if (!myTrack.paused && !myTrack.ended) {
        myTrack.pause();
        pauseButton.style.display='none';
        playButton.style.display='inline-block';
        window.clearInterval(updateTime);

    }
    else {
        myTrack.play();
        playButton.style.display='none';
        pauseButton.style.display='inline-block';
        updateTime=setInterval(update,500);
    }
}
var w;
function muteOrUnmute() {
    if (myTrack.muted==true) {
        myTrack.muted=false;
        muteButton.style.display='inline-block';
        unmuteButton.style.display='none';
        volProg.style.width=w;

    } else {
        myTrack.muted=true;
        muteButton.style.display='none';
        unmuteButton.style.display='inline-block';
        w=volProg.style.width;
        volProg.style.width=0+'px';

    }

}

function update(){
    if (!myTrack.ended){
        var playedMin=parseInt(myTrack.currentTime/60);
        var playedsec=parseInt(myTrack.currentTime%60);
        var size=parseInt(myTrack.currentTime*barSize/myTrack.duration);
        progBar.style.width=size+'px';
    }
    else{
        pauseButton.style.display='none';
        playButton.style.display='inline-block';
        progBar.style.width=0+'px';
        window.clearInterval(updateTime);
        // var temp_id=queue.splice(0,1);
        // playSong
        if(currentlyPlaying!=queue.length-1)
            playNext();
        // currentlyPlaying++;
        // playSong(queue[currentlyPlaying]);
    }
}

function changeTime(e){
    if (!myTrack.ended) {
        var moX=e.pageX-defBar.offsetLeft -8;
        var newtime=moX*myTrack.duration/barSize;
        myTrack.currentTime=newtime;
        progBar.style.width=moX+'px';
    }
}
//
// function showTime(e){
//     if (!myTrack.ended) {
//         var moX=e.pageX-defBar.offsetLeft;
//         var newtime=moX*myTrack.duration/barSize;
//         myTrack.currentTime=newtime;
//         time.innerText=myTrack.currentTime;
//         time.offsetLeft=e.pageX;
//         console.log("praty");
//         time.style.display='inline-block';
//
//     }
// }
function changeVol(e) {
    // console.log(e.pageY);
    var space = window.innerHeight - defVol.offsetTop + defVol.offsetHeight;
    // console.log(space);
    var moY=space-e.pageY + 6;
    // console.log(moY);
    myTrack.volume=moY/150;
    // console.log(myTrack.volume);
    volProg.style.width=moY+'px';
}
//
// module.exports = {
//     playOrPause
// };
