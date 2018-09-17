document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded...')

    const addProjectButton = document.getElementById('add-project-button')
    const projectWorkspace = document.getElementById('project-dashboard')

    const jobsTotal = document.querySelector('#jobs-total span')
    var numberJobs = 0

    addProjectButton.onclick = () => {
        window.location = 'project.html'
        // var projectCard = new ProjectCard()
        // projectCard.projectInit('Starter project', 'Classification', '2')
        // projectCard.addProjectCard(projectWorkspace)
        // numberJobs += 1
        // jobsTotal.innerHTML = numberJobs
    }
})