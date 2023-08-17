// Custom Modules
import { cd } from './lib/cd.js';
// Load .ENV variables
import { config } from 'dotenv';
config({ path: cd('config/openai.env') });
// OpenAI API Configuration
import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.GPT_API_KEY });
export const createScripts = () => {
};
