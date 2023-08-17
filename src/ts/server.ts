// Custom Modules
import { cd } from './lib/cd.js'

// Load .ENV variables
import { config } from 'dotenv'
config({ path: cd('config/server.env') })

// Express config
import express from 'express'
const app: express.Application = express()
app.use(express.static(cd('web')))

// Network Info
const hostname: string = process.env.HOSTNAME! as string
const port: number = parseInt(process.env.HOSTNAME!) as number

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(cd('web/index.html'))
})

app.post('/createScripts', (req: express.Request, res: express.Response) => {

})

app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`)
})