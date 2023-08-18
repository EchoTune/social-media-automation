// Video Idea array
export let videoIdeas = []

// Import the displayVideoIdeas function
import displayVideoIdeas from './displayVideoIdeas.js'

// Spinner imports
import createSpinner, { removeSpinner } from "./loader.js"

// Initialise page
import init from "./init.js"
init()

// Generate Scripts
const generateButton = document.getElementById('generate')
generateButton.addEventListener('click', async () => {
    generateButton.style.display = 'none'
    createSpinner('container-inner-1')

    try {
        const url = 'http://192.168.0.249:10001/createScripts'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            videoIdeas.length = 0
            videoIdeas.push(responseData)
            console.log(videoIdeas)
            displayVideoIdeas(responseData)
        } else {
            console.error('Request failed:', response.status, response.statusText)
        }
    } catch (error) {
        console.error('Error:', error)
    } finally {
        removeSpinner('container-inner-1')
        generateButton.style.display = 'initial'
    }
})

// Copy to clipboard
import copy from "./copy.js"

const pathButton = document.getElementById('pathButton')
pathButton.addEventListener('click', () => {
    copy('H:\\social media automation\\src\\audio')
    alert('Path has been copied to clipboard')
})

// TTS
const ttsButton = document.getElementById('makeTTS')
ttsButton.addEventListener('click', async () => {
    ttsButton.style.display = 'none'
    createSpinner('container-inner-2')

    console.log(videoIdeas)
    const modifiedVideoIdeas = videoIdeas[0]

    try {
        const url = 'http://192.168.0.249:10001/createTTS'
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ videoIdeas: modifiedVideoIdeas }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.error('Request failed:', response.status, response.statusText)
        }
    } catch (error) {
        console.error('Error:', error)
    } finally {
        removeSpinner('container-inner-2')
        ttsButton.style.display = 'initial'
    }
})
