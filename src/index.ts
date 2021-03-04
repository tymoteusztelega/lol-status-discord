import axios from 'axios';
import express from 'express';
import { Client } from 'discord.js';
import { onMessage, onReady } from './events';
import { config } from './config';

const client = new Client();
const app = express();

client.login(config.BOT_ID);
client.on('ready', () => onReady(client));
client.on('message', onMessage);

app.get('/', (_, res) => res.status(200).json({ message: 'The API is very healthy' }));
app.listen(config.PORT, () => console.log(`Running on port ${config.PORT}`));

/* KEEP GLITCH ALIVE */
setInterval(async () => {
  await axios
    .get(config.HOST || '')
    .then((res) => console.log('Pinged!', res.data))
    .catch((e) => console.log(e));
}, 4 * 60 * 1000);
