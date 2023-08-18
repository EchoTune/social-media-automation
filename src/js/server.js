// Node Modules
import fs from "fs";
// Custom Modules
import { createScripts } from './scriptMaker.js';
import { cd } from './lib/cd.js';
// Load .ENV variables
import { config } from 'dotenv';
config({ path: cd('config/server.env') });
// Express config
import express from 'express';
const app = express();
app.use(express.static(cd('web')));
// BodyParser setup
import bodyParser from 'body-parser';
app.use(bodyParser.json());
// Network Info
const hostname = process.env.HOSTNAME;
const port = parseInt(process.env.PORT);
// Homepage
app.get('/', (req, res) => {
    res.sendFile(cd('web/index.html'));
});
// Create video scripts route
app.post('/createScripts', (req, res) => {
    createScripts().then(() => {
        const text = fs.readFileSync(cd('prompts.txt'), 'utf-8');
        const videoIdeas = text.split('\n'); // Split by newline to get separate ideas
        res.json(videoIdeas);
    }).catch((err) => {
        res.status(400).json(err);
    });
});
// Initialise the page
app.post('/init', (req, res) => {
    const text = fs.readFileSync(cd('prompts.txt'), 'utf-8');
    const videoIdeas = text.split('\n');
    res.json(videoIdeas);
});
// Create TTS .mp3 Files
// Imports
import { spawn } from 'child_process';
app.post('/createTTS', async (req, res) => {
    const pyPath = cd('python/tts.py');
    const videoIdeas = req.body.videoIdeas;
    console.log('Type of videoIdeas:', typeof videoIdeas);
    console.log(videoIdeas);
    // Array to store all the spawned processes
    const pythonProcesses = [];
    // Create TTS .mp3 files
    videoIdeas.forEach((idea, index) => {
        const pythonProcess = spawn('python', [pyPath, idea, (index + 1).toString()], {
            stdio: 'inherit', // Redirect stdout and stderr to parent process
        });
        pythonProcesses.push(pythonProcess);
        // When the script finishes
        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
        });
    });
    // Wait for all the Python processes to finish
    await Promise.all(pythonProcesses.map(p => new Promise(resolve => p.on('close', resolve))));
    res.status(200).send('TTS generation completed'); // Send the response after all processes are done
});
app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});
