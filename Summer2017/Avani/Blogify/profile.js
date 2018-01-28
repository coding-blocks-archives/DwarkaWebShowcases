
var uid, userEmail=[];
var myUser, user;

$(function () {

    console.log("In profile : " );
    uid = JSON.parse(localStorage.getItem('key'));

    //fetches list of users for autocomplete
    firebase.database().ref('/Users/').once('value').then(function(snapshot) {
        var x = snapshot.val();
        for (var key in x) {

            var item = x[key];
            userEmail.push(item);
        }


        $('.mySearch').autocomplete({
            lookup:userEmail,
            onSelect: function (suggestion){
                fetchThisUser(suggestion.value);
            }
        });

        // console.log("User emails follow");
        // console.log(userEmail);
    });



    myUser=JSON.parse(localStorage.getItem('myUser'));
    if(myUser===null)
    {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
          //  console.log("Logged out");
            localStorage.clear();
            window.open("index.html", "_self");

        }).catch(function (error) {
            // An error happened.
        });
    }


    $('#userPicOnNav').attr('src', myUser.photoURL);
    $('#userPicOnNav').click(function () {
        fetchProfile(myUser.uid);
    });

    firebase.database().ref('/user-data/'+uid).once('value').then(function (snapshot) {
      //  console.log(snapshot.val());
        user=snapshot.val();
        $('#userProfileName').text(snapshot.val().name );
        $('#userProfilePic').attr('src', snapshot.val().image);
        $('#userProfileName').append('<hr style="width: 30%; text-align: center;">');

        fetchPosts();



    });




    $('.signOut').click(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Logged out");
            localStorage.clear();
            window.open("index.html", "_self")

        }).catch(function (error) {
            // An error happened.
        });
    });

    $('.close').click(function () {
        closeModal();
    });


    $('.mySearch').autocomplete({
        data: userEmail,
        limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function(val) {
            // Callback function when value is autcompleted.
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });

});



function fetchPosts() {
    var i=0;
    console.log("In fetchPosts");
    var user_posts= firebase.database().ref('/user-posts/' + uid);
    user_posts.on('child_added', function (snap) {
        // console.log(snap.val());
        var x;
        var likes=0, style="";
        var postid="'"+snap.val().postid+"'";

        var postRef = firebase.database().ref('/Posts/' + snap.val().postid + '/');
        postRef.once('value').then(function (snap) {

            likes=snap.val().starcount;
            console.log("starcount : ");
            console.log(likes);
            if(snap.val().starcount && snap.val().stars[myUser.uid]=== true)
                style=' style="color:red;" ';


            console.log("i="+i);
            if(i%2===0)
                x='<div class="userPostCard" onclick="displayModal('+postid+')" >'+
                    '<div class="userPostImageContainer" >'+
                    '<div class="userPostImage" >'+
                    '<img src="' +snap.val().Image +'" style="max-width: 90%;"  >'+
                    '</div>'+
                    '</div>'+
                    '<hr class="userPostHr" >'+
                    '<div class="userPostTitleContainer">'+
                    '<div class="userPostTitle">'+
                    snap.val().Title+
                    '<br>'+
                    '<span style="font-size: 15px;"><i class="fa fa-heart" '+style+'aria-hidden="true"></i>  &ensp; ' + likes + '</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
            else
                x='<div class="userPostCard" onclick="displayModal('+postid+')"  >'+
                    '<div class="userPostTitleContainer">'+
                    '<div class="userPostTitle">'+
                    snap.val().Title+
                    '<br>'+
                    '<span style="font-size: 15px;"><i class="fa fa-heart" '+style+'aria-hidden="true"></i> &ensp; ' + likes + '</span>'+
                    '</div>'+
                    '</div>'+
                    '<hr class="userPostHr" >'+
                    '<div class="userPostImageContainer" >'+
                    '<div class="userPostImage" >'+
                    '<img src="'+snap.val().Image+'"  style="max-width: 90%;">'+
                    '</div>'+
                    '</div>'+
                    '</div>';

            $('#Posts').prepend(x);
            i++;

        });


    });

}



