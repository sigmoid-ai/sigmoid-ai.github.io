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

    var emailMessage = document.getElementById('email-message')

    signUpButton.onclick = () => {
        console.log(emailSignUp.value)
        validEmail = validateEmail(emailSignUp.value)
        if (validEmail) {
            var emailThere = false
            DBref.child('USERS').on('value', (snapshot) => {
                snapshot.forEach((child) => {
                    if (child.val()['email'] === emailSignUp.value) {
                        emailMessage.innerText = 'Oops! Looks like you already signed up...'
                        emailThere = true
                    }
                })
            })
            if (emailThere == false) {
                var userID = makeID()
                DBref.child('USERS').child(userID).set({
                    'email': emailSignUp.value,
                    'userID': userID
                })
                emailSignUp.value = ''
                emailMessage.innerText = 'Welcome on board. Check your inbox for more!'
                emailMessage.style.display = 'block'
            }
        } else {
            // emailMessage.style.display = 'block'
            emailMessage.innerText = 'Hold up! Please enter a valid Email address.'
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