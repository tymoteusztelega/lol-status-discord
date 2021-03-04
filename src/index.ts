import { Client } from 'discord.js';
import { onMessage, onReady } from './events';
import { config } from './config';

const client = new Client();
client.login(config.BOT_ID);

client.on('ready', () => onReady(client));
client.on('message', onMessage);
