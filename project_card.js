function ProjectCard() {
    this.title = null
    this.type = null
    this.numClasses = null
    this.restURL = null
    this.status = 'red-circle'
    this.training = false
}

ProjectCard.prototype.projectInit = function(title, type, numClasses, url) {
    this.title = title
    this.type = type
    this.numClasses = numClasses
    this.restURL = url
}

ProjectCard.prototype.addProjectCard = function(workspace, userID, projectID) {
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
    this.deleteButton = document.createElement('i')
    this.deleteButton.classList = 'fas fa-trash-alt'
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

    copyButton.addEventListener('click', () => {
        var temp = document.createElement('span')
        temp.innerHTML = this.restURL
        temp.onclick = () => {
            const el = document.createElement('textarea');
            el.value = this.restURL;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);            
            console.log('copied')
        }
        temp.click()
    })

    this.deleteButton.onclick = () => {
        var task = window.confirm('Are you sure you want to delete this model? This cannot be undone.')
        if (task) {
            this.handleDelete(userID, projectID)
            workspace.removeChild(newCard)
        }
    }

    cardOptions.appendChild(copyButton)
    cardOptions.appendChild(this.deleteButton)
    cardOptions.appendChild(playButton)

    newCard.appendChild(cardTitle)
    newCard.appendChild(cardType)
    newCard.appendChild(cardClasses)
    newCard.appendChild(cardURL)
    newCard.appendChild(cardStatus)
    newCard.appendChild(cardOptions)
    workspace.appendChild(newCard)
}

ProjectCard.prototype.handleDelete = (userID, projectID) => {
    console.log(this.projectID)
    const ref = firebase.database().ref()
    ref.child('Training Data').child(userID).child(projectID).remove()
    console.log('Deleted record')
}

// ------------------------------------------------------------------------------------------------------------------------

function ClassBlock() {
    this.label = ''
    this.numberOfInstances = 0
}

ClassBlock.prototype.getLabel = function() {
    return this.label
}

ClassBlock.prototype.getNumInstances = function() {
    return this.numberOfInstances
}

ClassBlock.prototype.addClass = function(workspace, userID, projectID) {
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
            this.numberOfInstances = files.length
            cardNumInstances.setAttribute('value', files.length + ' Instances')

            const ref = firebase.storage().ref()
            for (var i = 0; i < files.length; i++) {
                const uploadTask = ref.child('Training Data').child(userID).child(projectID).child(cardLabel.value).child(files[i].name).put(files[i]); //create a child directory called images, and place the file inside this directory
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

// ------------------------------------------------------------------------------------------------------------------------