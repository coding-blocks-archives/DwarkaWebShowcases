/**
 * Created by avani on 13/7/17.
 */


var postImage, myUser;
var userEmail={}, emailMapuid={};



$(function () {



    // $('.modal').modal();
    // $(".button-collapse").sideNav();
    var database = firebase.database();
    var provider = new firebase.auth.GoogleAuthProvider();
    var storage=firebase.storage();
    var recentPostsRef = firebase.database().ref().child('Posts');

    $('.brand-logo').click(function () {
       $('#searchResult').hide();
       $('#parent').show();
    });

    $('#navUserPic').click(function () {
        fetchProfile(myUser.uid);
    })

    // Checks if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            location.href='loggedIn.html';
            window.name=JSON.stringify(user);
            myUser=user
            console.log(myUser);
            // goToHome();
            $('#pageLoader').hide();



           // userLoggedIn();
          //  listen();
            var id=myUser.uid;
            var tp={};
            tp[id]=myUser.email;
            var ref=firebase.database().ref('Users/'+id).set(myUser.email);



            firebase.database().ref('/Users/').once('value').then(function(snapshot) {
                var x=snapshot.val();
                for (var key in x) {
                    var item = x[key];
                    userEmail[item]=null;
                    emailMapuid[item]=key;
                }

                // console.log("x");
                // console.log(x);

                //console.log(emailMapuid);
                $('input.autocomplete').autocomplete({
                    data: userEmail,
                    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
                    onAutocomplete: function(val) {
                        // Callback function when value is autcompleted.
                    },
                    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
            });


            firebase.database().ref('user-data/'+myUser.uid+'/').set({name:myUser.displayName, email:myUser.email,
                image:myUser.photoURL});



        } else {
            // No user is signed in.
            $('#pageLoader').hide();
            $('#notLoggedIn').show();
            myUser=null;


        }
    });

    function listen() {
        recentPostsRef.limitToLast(10).on('child_added', function (snap) {
            console.log(snap.val());


            var id="'"+snap.val().uid+"'";
            var postid="'"+snap.val().postid+"'";
            // console.log(snap.val().stars[myUser.uid]);
            var style='';
            if(snap.val().starcount && snap.val().stars[myUser.uid]=== true)
                style=' style="color:pink;" ';

            var imageTag='<img src="'+snap.val().Image+'" style="width: 30%; height:auto; float: left;margin-left: 8%; margin-right: 5%;" >';

            var str='<div>'+'<span><a style="cursor: pointer; margin-left: 10%" onclick="fetchProfile('+ id + ')">  '+ snap.val().User +'</a>'+' posted this.'+
                '<p style="text-align: center; font-size: 30px; font-weight: bold;">' + snap.val().Title+'</p>'+imageTag+
            '<p style="width: 84%; margin-left: 8%; word-wrap: break-word; font-size: 15px;" >'+snap.val().Post+'</p> <br> <hr style="width: 50%; margin-left: 25%;">'+
             '<div '+style+'  onclick="toggleStar('+postid+', this)" >'+'<i class="material-icons"  >star</i>' +
                '<span>'+snap.val().starcount+'</span>'+'</div>'+'</div>';

             $('#Posts').prepend(str);
        });

    }


    // Invoked when user logs out
   $('.signOut').click(function () {
       firebase.auth().signOut().then(function() {
           // Sign-out successful.
           $('#loggedIn').hide();
           $('#notLoggedIn').show();
       }).catch(function(error) {
           // An error happened.
       });
   });

    // Invoked when user makes a new post
   $('#postBtn').click(function () {

       var title=$('#postTitle');
       var content=$('#postContent');

       if(!title.val().trim() || !content.val().trim())
       {
           $('#error_message').text("Please fill all the fields");
           return ;
       }

       if(! $('#imageUpload').val())
       {
           $('#error_message').text("Please add a photograph.");
           return ;
       }

       var ref=database.ref('Posts/').push().key;

           var storageRef=storage.ref('postImages/'+ref);
           storageRef.put(postImage).then(function (snapshot) {

               var postData={
                   Title : title.val(),
                   Post : content.val(),
                   Image : snapshot.downloadURL,
                   User: myUser.displayName,
                   uid: myUser.uid,
                   starcount:0,
                   author:myUser.photoURL,
                   postid:ref
               };

               var updates = {};
               updates['/Posts/' + ref] = postData;
               updates['/user-posts/' + myUser.uid + '/' + ref] = postData;

               firebase.database().ref().update(updates);

               title.val(" ");
               content.val(" ");
               $('.modal').modal('close');

           });

       $('#imageUpload').off('change');

   });

    $("#autocomplete-input").keypress(function(e) {

        console.log(e);
        var data=e.target.value;
        if(e.which === 13) {
            console.log("You pressed enter");
            if(userEmail[data]===null)
                fetchProfile(emailMapuid[data]);
            else
                return ;
        }
    });



})



function userLoggedIn() {
    $('#loggedIn').show();
    $('.userImage').attr('src', myUser.photoURL);
    $('#userName').text(myUser.displayName);
}

function uploadImage() {
    $('#imageUpload').click();

    $('#imageUpload').change(function (e) {
        postImage=e.target.files[0];

    })
}

function fetchProfile(uid) {

    $('#uName').text("");
    $('#uPic').attr('src', "");
    $('#uPosts').empty();
    console.log("fetchProfile called with : "+ uid);
    $('#parent').hide();
    $('#searchResult').show();

    firebase.database().ref('/user-data/'+uid).once('value').then(function (snapshot) {
       console.log(snapshot.val());
       $('#uPic').attr('src', snapshot.val().image);
       $('#uName').text(snapshot.val().name);
    });

    var user_posts= firebase.database().ref('/user-posts/' + uid);


    user_posts.on('child_added', function (snap) {
         console.log(snap.val());


        var id="'"+snap.val().uid+"'";
        console.log(id);

        var imageTag='<img src="'+snap.val().Image+'" style="width: 30%; height:auto; float: left;margin-left: 8%; margin-right: 5%;" >';

        var str='<div>'+'<p style="text-align: center; font-size: 30px; font-weight: bold;">' + snap.val().Title+'</p>'+imageTag+
            '<p style="width: 84%; margin-left: 8%; font-size: 15px;" >'+snap.val().Post+'</p> <br> <hr style="width: 50%; margin-left: 25%;">'+
            '</div>';

        $('#uPosts').prepend(str);
    });

}


function toggleStar(post, item) {
    var postRef=firebase.database().ref('/Posts/'+post+'/');
    console.log("toggle called with : "+ post);
    console.log(item);
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
                item.style.color='pink';
            }
            $(item).find('span').text(post.starcount);
        }
        return post;
    });
}


