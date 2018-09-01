var config = {
    apiKey: "AIzaSyCTF4OsQ1tvnyabjE_dZpEJ3nwE2GkIS-4",
    authDomain: "sigmoid-3e5f4.firebaseapp.com",
    databaseURL: "https://sigmoid-3e5f4.firebaseio.com",
    projectId: "sigmoid-3e5f4",
    storageBucket: "sigmoid-3e5f4.appspot.com",
    messagingSenderId: "841883044467"
};
firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Add loaded')

    var DBref = firebase.database().ref()
    var Strref = firebase.storage().ref()

    var emailSignUp = document.getElementById('sign-up-field')
    var signUpButton = document.getElementById('sign-up-button')
    var signInButton = document.getElementById('sign-in-button')

    signUpButton.onclick = () => {
        console.log(emailSignUp.value)
        validEmail = validateEmail(emailSignUp.value)
        if (validEmail) {
            var userID = makeID()
            DBref.child('USERS').child(userID).set({
                'email': emailSignUp.value,
                'userID': userID
            })
        } else {
            console.log('Invalid email')
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 16; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

})