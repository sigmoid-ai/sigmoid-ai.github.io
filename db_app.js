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
    console.log('Dashboard loaded...')

    const ref = firebase.database().ref()
    ref.child('Training Data').once('value', (snapshot) => {
        snapshot.forEach((child) => {
            child.forEach((child2) => {
                var data = child2.val()
                newProjectCard(data['Title'], data['Project type'], data['Classes'])
            })
        })
    })

    const addProjectButton = document.getElementById('add-project-button')
    const projectWorkspace = document.getElementById('project-dashboard')

    const jobsTotal = document.querySelector('#jobs-total span')
    var numberJobs = 0

    addProjectButton.onclick = () => {
        window.location = 'project.html'
    }

    function newProjectCard(title, type, classes) {
        var projectCard = new ProjectCard()
        projectCard.projectInit(title, type, classes)
        projectCard.addProjectCard(projectWorkspace)
        numberJobs += 1
        jobsTotal.innerHTML = numberJobs
    }
})