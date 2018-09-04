var config = {
    apiKey: codes.apiKey,
    authDomain: codes.authDomain,
    databaseURL: codes.databaseURL,
    projectId: codes.projectId,
    storageBucket: codes.storageBucket,
    messagingSenderId: codes.messagingSenderId
};
firebase.initializeApp(config);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Add loaded')

    var DBref = firebase.database().ref()
    var Strref = firebase.storage().ref()

    const emailSignUp = document.getElementById('sign-up-field')
    const signUpButton = document.getElementById('sign-up-button')
    const signInButton = document.getElementById('sign-in-button')
    const loginModal = document.getElementById('login-box')
    const left = document.getElementById('left')
    const right = document.getElementById('right')

    const registerButton = document.getElementById('register-button')
    const loginModalTopText = document.getElementById('login-box-top-text')
    var emailMessage = document.getElementById('email-message')

    const closeLoginModal = document.getElementById('close-login-modal')

    const nameField = document.getElementById('sign-in-name')
    const modalEmailField = document.getElementById('sign-in-email')
    const modalPwdField = document.getElementById('sign-in-pwd')
    const modalSubmit = document.getElementById('sign-in-submit')

    var signIn = 0

    closeLoginModal.onclick = () => {
        loginModal.style.display = 'none'
        left.style.opacity = 1
        right.style.opacity = 1
    }

    signInButton.onclick = () => {
        loginModal.style.display = 'block'
        left.style.opacity = 0.2
        right.style.opacity = 0.2
    }

    signUpButton.onclick = () => {
        if (validateEmail(emailSignUp.value)) {
            left.style.opacity = 0.2
            right.style.opacity = 0.2
            loginModal.style.display = 'block'
            nameField.style.visibility = 'visible'
            loginModalTopText.innerText = 'Sign Up'
            registerButton.innerHTML = 'Login instead'

            modalEmailField.value = emailSignUp.value
            emailSignUp.value = ''
        } else {
            emailMessage.innerText = 'Oops! Please enter a valid email...'
        }
    }

    registerButton.onclick = () => {
        left.style.opacity = 0.2
        right.style.opacity = 0.2
        if (signIn == 0) { // Login
            registerButton.innerHTML = 'Sign Up instead'
            nameField.style.visibility = 'hidden'
            loginModalTopText.innerText = 'Sign In'
            signIn = 1
        } else if (signIn == 1) { // Register
            registerButton.innerHTML = 'Login instead'
            nameField.style.visibility = 'visible'
            loginModalTopText.innerText = 'Sign Up'
            signIn = 0
        }
    }

    modalSubmit.onclick = () => {
        if (validateEmail(modalEmailField.value) && modalPwdField.value.length > 0 || validateEmail(modalEmailField.value) && modalPwdField.value.length > 0 && nameField.value.length > 0) { 
            console.log('Logged in')
        } else {
            console.log('Invalid credentials! Try again...')
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