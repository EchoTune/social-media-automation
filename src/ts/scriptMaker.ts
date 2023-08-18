// Custom Modules
import { cd } from './lib/cd.js'

// Load .ENV variables
import { config } from 'dotenv'
config({ path: cd('config/openai.env') })

// Node Modules
import axios from 'axios'
import fs from 'fs'

export const createScripts: Function = async () => {
    let message: string = ''
    const apiUrl: string = 'https://api.openai.com/v1/completions'
    const predefinedPrompt: string = `Hey, make me 10 TikTok videos about EchoTune, my MP3/MP4 YouTube Converter, that are 60 seconds or less, generate them in this format  replace 2 with the corresponding number "2. Get the perfect song for any moment with EchoTune- the #1 YouTube MP3/MP4 Converter". Do not GENERATE hashtags with trends at the end like "#EchoTune #MP3MP4"!! you must not do that, JUST STICK TO THE SCRIPT! YOUR PROMPT SHOULD NOT CONTAIN ANY TAGS AT THE END. THE APP TAKES A LINK AS AN INPUT AND CANNOT SEARCH FOR VIDEOS IN IT DONT SAY THAT IT CANT SEARCH OR THAT IT REQUIRES A YOUTUBE LINK BUT USE THAT TO GUIDE YOUR IDEAS. If you DARE to WRITE something else except the ideas, there will be consequences! All the files go into a propietary file format that requires only the IDEAS to be inside and not contain any spaces between them , just a line break after each idea!`

    try {
        const response = await axios.post(
            apiUrl,
            {
                model: "text-davinci-003",
                prompt: predefinedPrompt,
                max_tokens: 2048,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GPT_API_KEY!}`
                }
            }
        )

        message = response.data.choices[0].text

    } catch (err) {
        const axiosError = err as any // Cast the error to 'any'

        fs.writeFileSync(cd('prompts.txt'), 'API Error:' + axiosError.response?.data || axiosError.message, 'utf-8')
    } finally {
        // Write the message to the file
        fs.writeFileSync(cd('prompts.txt'), message, 'utf-8')

        // Trim empty lines from the beginning of the file
        const filePath = cd('prompts.txt') // Provide the correct file path
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const trimmedContent = fileContent.replace(/^\s*\n/, '') // Remove leading empty lines
        fs.writeFileSync(filePath, trimmedContent, 'utf-8')
    }
}
