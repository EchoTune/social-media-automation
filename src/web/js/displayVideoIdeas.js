export default function displayVideoIdeas(ideas) {
    const terminalElement = document.getElementById('terminal')
    terminalElement.innerHTML = ''

    ideas.forEach((item) => {
        const pElement = document.createElement('p')
        pElement.innerText = item
        terminalElement.appendChild(pElement)

        const brElement = document.createElement('br')
        terminalElement.appendChild(brElement)
    })
}