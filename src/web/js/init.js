// Import the video ideas variable
import { videoIdeas } from "./main.js"

// Import the displayVideoIdeas function
import displayVideoIdeas from './displayVideoIdeas.js'

export default async function init() {
    const url = 'http://192.168.0.249:10001/init'

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            videoIdeas.push(responseData)
            displayVideoIdeas(responseData)
        } else {
            console.error('Request failed:', response.status, response.statusText)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}