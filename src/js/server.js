// Custom Modules
import { cd } from './lib/cd.js';
// Node Modules
import express from 'express';
// Load .ENV variables
import { config } from 'dotenv';
config({ path: cd('config/server.env') });
const app = express();
app.use(express.static(cd('web')));
const hostname = process.env.HOSTNAME;
const port = parseInt(process.env.HOSTNAME);
app.get('/', (req, res) => {
    res.sendFile(cd('web/index.html'));
});
app.post('/createScripts', (req, res) => {
});
app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`);
});
