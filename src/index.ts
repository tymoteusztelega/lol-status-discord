import { Client } from 'discord.js';
import { onMessage, onReady } from './events';
import { config } from './config';
import axios from 'axios';

const client = new Client();
client.login(config.BOT_ID);

client.on('ready', () => onReady(client));
client.on('message', onMessage);

/* KEEP GLITCH ALIVE */
setInterval(async () => await axios.get('https://rough-alkaline-slope.glitch.me').then(() => 'Pinged!'), 4 * 60 * 1000);
