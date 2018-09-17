document.addEventListener('DOMContentLoaded', () => {
    console.log('App loaded')

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

    var typeBlockChosen = 1
    var dataBlockChosen = 1

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

    addDataButton.onclick = () => {
        console.log('Adding training data')
        fileChoose.click()      
        fileChoose.addEventListener('change', (event) => {
            console.log(event)
        })
    }

})