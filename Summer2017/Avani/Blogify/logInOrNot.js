$(function () {
    console.log("In function");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().onAuthStateChanged(function(user) {
        console.log("heard it here alt");
        $('#pageLoader').hide();
        if (user) {
            // User is signed in.
            console.log("user logged in alt ");
            myUser=user;
            var id=myUser.uid;
            firebase.database().ref('user-data/'+myUser.uid+'/').set({name:myUser.displayName, email:myUser.email,
                image:myUser.photoURL}).then(function (result) {
                console.log("User-data successfully written");
                firebase.database().ref('Users/'+id).set(myUser.email).then(function (result) {
                    console.log("Data successfully written");
                    location.href='loggedIn.html';
                });
            });

            localStorage.setItem('myUser', JSON.stringify(myUser));
            console.log(myUser);

        } else {
            // No user is signed in.
            console.log("error logging in alt");
            $('#notLoggedIn').show();
            // myUser=null;
        }
    });

    // Executed when user logs in
    $('#loginBtn').click(function () {

        console.log("heard it here ");
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
           // var token = result.credential.accessToken;
            // The signed-in user info.
            console.log("user logged in");
            myUser = result.user;
            firebase.database().ref('user-data/'+myUser.uid+'/').set({name:myUser.displayName, email:myUser.email,
                image:myUser.photoURL});
            localStorage.setItem('myUser', JSON.stringify(myUser));
            $('#notLoggedIn').hide();




        }).catch(function(error) {
            // Handle Errors here.
            console.log("error logging in");
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            Materialize.toast(errorMessage, 7000) // 4000 is the duration of the toast
        });

    });


    $('#sendMsg').click(function () {
        console.log("You clicked");
        $('#contactForm').trigger('reset');
    })

});