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
    console.log('App loaded')

    var userID = randomID()
    var projectID = randomID()

    const projectName = document.getElementById('new-project-title')
    const projectClasses = document.getElementById('new-project-classes')

    const classificationBlock = document.getElementById('classification')
    const recognitionBlock = document.getElementById('recognition')
    const estimationBlock = document.getElementById('estimation')

    const imagesBlock = document.getElementById('images')
    const textBlock = document.getElementById('text')
    const audioBlock = document.getElementById('audio')

    const fileChoose = document.getElementById('choose-training-data')
    const addDataButton = document.getElementById('training-data-choose-button')
    const dataContainer = document.getElementById('training-data-container')

    const getStartedButton = document.getElementById('train-button')

    var typeBlockChosen = 1
    var dataBlockChosen = 1

    var TYPES = ['Classification', 'Recognition', 'Estimation']
    var DATA = ['Images', 'Text', 'Audio']

    var CLASSLABELS = []

    var numClasses = 0

    classificationBlock.onclick = () => {
        classificationBlock.style.backgroundColor = 'rgba(65, 105, 225, 1)'
        recognitionBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        estimationBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        typeBlockChosen = 1
        console.log(typeBlockChosen)
    } 


    recognitionBlock.onclick = () => {
        classificationBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        recognitionBlock.style.backgroundColor = 'rgba(65, 105, 225, 1)'
        estimationBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        typeBlockChosen = 2
        console.log(typeBlockChosen)
    }

    estimationBlock.onclick = () => {
        classificationBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        recognitionBlock.style.backgroundColor = 'rgba(65, 105, 225, 0.50)'
        estimationBlock.style.backgroundColor = 'rgba(65, 105, 225, 1)'
        typeBlockChosen = 3
        console.log(typeBlockChosen)
    }

    imagesBlock.onclick = () => {
        imagesBlock.style.opacity = '1'
        textBlock.style.opacity = '0.5'
        audioBlock.style.opacity = '0.5'
        dataBlockChosen = 1
        console.log(dataBlockChosen)
    } 


    textBlock.onclick = () => {
        imagesBlock.style.opacity = '0.5'
        textBlock.style.opacity = '1'
        audioBlock.style.opacity = '0.5'
        dataBlockChosen = 2
        console.log(dataBlockChosen)
    }

    audioBlock.onclick = () => {
        imagesBlock.style.opacity = '0.5'
        textBlock.style.opacity = '0.5'
        audioBlock.style.opacity = '1'
        dataBlockChosen = 3
        console.log(dataBlockChosen)
    }

    addDataButton.onclick = function() {
        var classCard = new ClassBlock()
        classCard.addClass(dataContainer, userID, projectID)
        numClasses += 1
        CLASSLABELS.push(classCard.getLabel())
    }

    getStartedButton.onclick = function() {
        const ref = firebase.database().ref()
        ref.child('Training Data').child(userID).child(projectID).set({
            'Title': projectName.value,
            'Classes': numClasses,
            'Project type': TYPES[typeBlockChosen-1],
            'Project data': DATA[dataBlockChosen-1],
            'userID': userID,
            'projectID': projectID
        }).then(() => {
            console.log('Data sent')
            window.location = 'dashboard.html'
        })
    }

    function randomID() {
        var string = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < 8; i++) {
            string += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return string
    }

})