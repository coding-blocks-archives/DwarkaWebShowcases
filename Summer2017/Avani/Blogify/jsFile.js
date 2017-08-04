function initializeFirebase() {
    var config = {
        apiKey: "AIzaSyA8nn0pWs7IRqEqHvFmBdgvgYrmYZrw4Do",
        authDomain: "webfire-99c02.firebaseapp.com",
        databaseURL: "https://webfire-99c02.firebaseio.com",
        projectId: "webfire-99c02",
        storageBucket: "webfire-99c02.appspot.com",
        messagingSenderId: "1000608967632"
    };
    firebase.initializeApp(config);
}

var closeModal=function cm() {
    $('.myModal').hide();
    $('.modalImage').attr('src', ' ');
    $('.modalUserImage').attr('src', ' ');
    $('.modalUserName').empty();
    $('.modalTitle').empty();
    $('.modalContent').empty();
}


function displayModal(post) {
    console.log("Display modal called with : " + post);
    var top = $(document).scrollTop()+50;
    // console.log=myUser;
    var style="";
    var postRef = firebase.database().ref('/Posts/' + post + '/');
    postRef.once('value').then(function (snapshot) {
        //    console.log(snapshot.val());
        var postid="'"+post+"'";

        if(snapshot.val().starcount && snapshot.val().stars[myUser.uid]=== true)
            style=' style="color:red;" ';

        var x='<div class="heartIt" ' +style+
            ' onclick="toggleStar('+postid+', this)"  >'+
            '<i class="fa fa-heart" aria-hidden="true"></i>'+
            '&ensp;<span>'+snapshot.val().starcount+'</span>'+'</div>';
        postObj = snapshot.val();
        console.log(postObj);
        $('.modalImage').attr('src', postObj.Image);
        $('.modalUserImage').attr('src', postObj.author);
        $('.modalUserImage').attr('id', postObj.uid);
        $('.modalUserName').attr('id', postObj.uid);
        $('.modalUserName').text(postObj.User);
        $('.modalTitle').text(postObj.Title);
        $('.modalContent').text(postObj.Post);
        $('.myModal').css('top', top);
        $('.modalLikes').html(x);
        $('.myModal').show();
    });
}

function toggleStar(post, item) {
    var postRef=firebase.database().ref('/Posts/'+post+'/');
    // console.log("toggle called with : "+ post);
    // console.log(item);
    var cnt=0;
    var uid=myUser.uid;
    postRef.transaction(function(post) {
        if (post) {
            if (post.stars && post.stars[uid]) {
                post.starcount--;
                post.stars[uid] = null;
                item.style.color='';
            } else {
                post.starcount++;
                if (!post.stars) {
                    post.stars = {};
                }
                post.stars[uid] = true;
                item.style.color='red';
            }
            cnt=post.starcount;
            $(item).find('span').text(post.starcount);
        }
        return post;
    });
}

function fetchProfile(uid) {
    localStorage.setItem('key', JSON.stringify(uid));
    userData = localStorage.getItem('key');
    console.log("fetch profile called with : " + uid +"=============" +userData);
    window.open("profile.html","_self");
}

function goToHome() {
    window.open("index.html", "_self");
}


function fetchThisUser(data) {

    console.log("fetchThisUser called with : ");
    console.log(data);

    var emailMapuid=JSON.parse(localStorage.getItem('emailMapuid'));
    console.log(emailMapuid);
     fetchProfile(emailMapuid[data]);
}
