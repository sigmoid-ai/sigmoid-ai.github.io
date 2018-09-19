function ProjectCard() {
    this.title = null
    this.type = null
    this.numClasses = null
    this.restURL = setURL()
    this.status = 'red-circle'
    this.training = false
}

ProjectCard.prototype.projectInit = function(title, type, numClasses) {
    this.title = title
    this.type = type
    this.numClasses = numClasses
}

ProjectCard.prototype.addProjectCard = function(workspace) {
    console.log('Adding new project card')

    var newCard = document.createElement('tr')
    newCard.classList += 'project-card'

    var cardTitle = document.createElement('td')
    cardTitle.innerHTML = this.title
    cardTitle.classList += 'project-title'

    var cardType = document.createElement('td')
    cardType.innerHTML = this.type
    cardType.classList += 'project-type'

    var cardClasses = document.createElement('td')
    cardClasses.innerHTML = this.numClasses
    cardClasses.classList += 'project-classes'

    var cardURL = document.createElement('td')
    cardURL.innerHTML = this.restURL
    cardURL.classList += 'project-url'

    var cardStatus = document.createElement('td')
    cardStatus.innerHTML = '<div class="' + this.status + '"></div>'
    cardStatus.classList += 'project-status'

    var cardOptions = document.createElement('td')
    cardOptions.classList += 'options'

    var copyButton = document.createElement('i')
    copyButton.classList = 'fas fa-copy'
    var deleteButton = document.createElement('i')
    deleteButton.classList = 'fas fa-trash-alt'
    var playButton = document.createElement('i')
    playButton.classList = 'fas fa-play'
    
    playButton.onclick = () => {
        if (this.training) {
            playButton.classList = 'fas fa-play'
            this.status = 'red-circle'
            cardStatus.innerHTML = '<div class="' + this.status + '"></div>'
            this.training = false
        } else {
            playButton.classList = 'fas fa-pause'
            this.status = 'green-circle'
            cardStatus.innerHTML = '<div class="' + this.status + '"></div>'
            this.training = true
        }
    }

    deleteButton.onclick = () => {
        this.deleteJob(workspace, newCard)
    }

    cardOptions.appendChild(copyButton)
    cardOptions.appendChild(deleteButton)
    cardOptions.appendChild(playButton)

    newCard.appendChild(cardTitle)
    newCard.appendChild(cardType)
    newCard.appendChild(cardClasses)
    newCard.appendChild(cardURL)
    newCard.appendChild(cardStatus)
    newCard.appendChild(cardOptions)
    workspace.appendChild(newCard)
}

ProjectCard.prototype.deleteJob = function(workspace, ele) {
    console.log('Deleting model')
    workspace.removeChild(ele)
}

var setURL = function() {
    var RESTEndpoint = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 8; i++) {
        RESTEndpoint += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return 'www.sigmoid.com/' + RESTEndpoint
}

// ------------------------------------------------------------------------------------------------------------------------

function ClassBlock() {
    this.label = ''
    this.numberOfInstances = 0
}

ClassBlock.prototype.addClass = function(workspace) {
    var newCard = document.createElement('div')
    newCard.classList += 'training-data-card'

    var top = document.createElement('div')
    top.classList = 'tdc-top'

    var bottom = document.createElement('div')
    bottom.classList = 'tdc-bottom'

    var cardLabel = document.createElement('input')
    cardLabel.type = 'text'
    cardLabel.placeholder = 'Class label'
    cardLabel.innerHTML = this.label
    cardLabel.classList += 'training-data-class'

    var cardNumInstances = document.createElement('p')
    cardNumInstances.innerHTML = this.numberOfInstances + ' Instances'
    cardNumInstances.classList += 'num-training-instances'

    var fileChoose = document.createElement('input')
    fileChoose.type = 'file'
    fileChoose.classList = 'tdc-file-choose'
    // fileChoose.attributes += 'multiple'
    // fileChoose.attributes += 'directory'
    // fileChoose.attributes += 'webkitdirectory'
    fileChoose.setAttribute('multiple', 'true')
    fileChoose.setAttribute('directory', 'true')
    fileChoose.setAttribute('webkitdirectory', 'true')

    var uploadButton = document.createElement('button')
    uploadButton.classList = 'tdc-upload-button'
    uploadButton.innerHTML = '<i class="fas fa-upload"></i>'

    uploadButton.addEventListener('click', () => {
        fileChoose.click()
        fileChoose.addEventListener('change', function() {
            var files = handleFileUploadChange(fileChoose)
            handleFileUploadSubmit(files)
        })
    })

    top.appendChild(cardLabel)
    top.appendChild(cardNumInstances)

    bottom.appendChild(fileChoose)
    bottom.appendChild(uploadButton)

    newCard.appendChild(top)
    newCard.appendChild(bottom)

    workspace.appendChild(newCard)
}

function handleFileUploadChange(e) {
    let selectedFile
    selectedFile = e.files;
    return selectedFile
}

function handleFileUploadSubmit(selectedFile) {
    var userID = randomID()
    var projectID = randomID()
    const ref = firebase.storage().ref()

    for (var i = 0; i < selectedFile.length; i++) {
        const uploadTask = ref.child('Training Data').child(userID).child(projectID).child('Class').child(selectedFile[i].name).put(selectedFile[i]); //create a child directory called images, and place the file inside this directory
        uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
            console.log(snapshot)
        }, (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, () => {
           // Do something once upload is complete
           console.log('Images sent');
        })
    }
}

function randomID() {
    var randomID = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 8; i++) {
        randomID += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomID        
}

// ------------------------------------------------------------------------------------------------------------------------