var userEmail=[], emailMapuid={};
var  myUser;
$(function () {


    myUser=JSON.parse(localStorage.getItem('myUser'));
    if(myUser===null)
    {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Logged out");
            localStorage.clear();
            window.open("index.html", "_self");
            //   window.close = function () { window.open("index.html", "_blank"); };


        }).catch(function (error) {
            // An error happened.
        });
    }


    //fetches list of users for autocomplete
    firebase.database().ref('/Users/').once('value').then(function(snapshot) {
        var x = snapshot.val();
        for (var key in x) {

            var item = x[key];
            userEmail.push(item);
             emailMapuid[item] = key;
        }

        localStorage.setItem('emailMapuid',JSON.stringify(emailMapuid));

        $('.mySearch').autocomplete({
            lookup:userEmail,
            onSelect: function (suggestion){
                fetchThisUser(suggestion.value);
            }
        });

      //  console.log("User emails follow");
       // console.log(userEmail);
    });

    //gets info of current logged in user


    //If clicked on profile pic, fetch profile of current user
    $('#userPicOnNav').click(function () {
        fetchProfile(myUser.uid);
    });


    //If user clicks on this image, add an image and display it on screen
    $('#addImageIcon').attr('src', 'imageAdd.png');



    var database = firebase.database();
    var provider = new firebase.auth.GoogleAuthProvider();
    var storage = firebase.storage();


    // set the src of nav pic as user pic
    $('#userPicOnNav').attr('src', myUser.photoURL);

    //fetch posts
    addPostsToFeed();





    //if user signs out, delete data from local storage and redirect user to login page
    $('.signOut').click(function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Logged out");
            localStorage.clear();
            window.open("index.html", "_self");
         //   window.close = function () { window.open("index.html", "_blank"); };


        }).catch(function (error) {
            // An error happened.
        });
    });


    //If user clicks on add Post btn, display box to add posts
    $('#menu_btn').click(function () {
        $('#displaythis').show();
        $('#menu_btn').hide();
    });


    //If user clicks on close add-post box, reset data of add post box to null and close it
    $('#closePostBox').click(function () {
        $('#displaythis').hide();
        $('#menu_btn').show();
        $('#postForm').trigger('reset');
        $('#addImageIcon').attr('src', 'imageAdd.png');
    });

    //write function to add posts
    $('#postBtn').click(function () {
        // console.log("function called to add post to database");

        var title = $('#postTitle');
        var content = $('#postContent');


        if (!title.val().trim() || !content.val().trim()) {
            $('#error_message').text("Please fill all the fields");
            return;
        }

        if (!$('#imageUpload').val()) {
            $('#error_message').text("Please add a photograph.");
            return;
        }

        $('#postBtn').prop('disabled', true);
        var ref = database.ref('Posts/').push().key;

        var storageRef = storage.ref('postImages/' + ref);
        storageRef.put(postImage).then(function (snapshot) {

            var postData = {
                Title: title.val().toUpperCase(),
                Post: content.val(),
                Image: snapshot.downloadURL,
                User: myUser.displayName,
                uid: myUser.uid,
                starcount: 0,
                author: myUser.photoURL,
                postid: ref
            };

            var updates = {};
            updates['/Posts/' + ref] = postData;
            updates['/user-posts/' + myUser.uid + '/' + ref] = postData;

            firebase.database().ref().update(updates);

            // console.log("at the end of post function");
            $('#displaythis').hide();
            $('#menu_btn').show();
            $('#postForm').trigger('reset');
            $('#addImageIcon').attr('src', 'imageAdd.png');
            $('#postBtn').prop('disabled', false);

        });

        $('#imageUpload').off('change');

    });

    //function to close modal
    $('.close').click(function () {
        closeModal();
    });

});

function addPostsToFeed() {
    var recentPostsRef = firebase.database().ref().child('Posts');
    recentPostsRef.limitToLast(10).on('child_added', function (snap) {
        // console.log(snap.val());
        var id="'"+snap.val().uid+"'";
        var postid="'"+snap.val().postid+"'";

        var style='';
        if(snap.val().starcount && snap.val().stars[myUser.uid]=== true)
            style=' style="color:red;" ';
        var x='<div class="heartIt" ' +style+
            ' onclick="toggleStar('+postid+', this)"  >'+
            '<i class="fa fa-heart" aria-hidden="true"></i>'+
            '&ensp;<span>'+snap.val().starcount+'</span>'+'</div>';

        if(snap.val().starcount && snap.val().stars[myUser.uid]=== true)
            style=' style="color:pink;" ';
        var imageTag='<div style="height: 200px;display: table; width: 100%; cursor: pointer; "  onclick="displayModal('+postid+')"  >'+'<div style="display: table-cell; text-align: center; vertical-align: middle">'+
            '<img src="'+snap.val().Image+'"class="myCardImage" >'+
            '</div>'+'</div>';
        var titleTag='<div class="myCardTitle">'+snap.val().Title+'</div>';
        var str='<div class="myCardClass">'+imageTag+'<br>'+titleTag+x+'</div>';

        $('#home_feed').prepend(str);
    });
}

function uploadImage() {
    $('#imageUpload').click();
    $('#imageUpload').change(function (e) {
        postImage=e.target.files[0];
        var input=$('#imageUpload');
        // console.log(input[0].files);
            var reader = new FileReader();
            reader.readAsDataURL(input[0].files[0]);
            reader.onload = function(e) {
                 $('#addImageIcon').attr('src', e.target.result);
            }

    });
}
