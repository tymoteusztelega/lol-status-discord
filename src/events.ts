import { Client, Message } from 'discord.js';
import { commands } from './commands';
import { tasks } from './tasks';

const COMAND_LOOKUP = {
  '!help': (msg: Message) => msg.channel.send(commands.getHelp()),
  '!status': async (msg: Message, name: string) => msg.channel.send(await commands.getMatch(name)),
  '!rank': async (msg: Message, name: string) => msg.channel.send(await commands.getRank(name)),
  '!game': async (msg: Message, name: string) => msg.channel.send(await commands.getGame(name)),
};

export const onReady = (client: Client) => {
  console.log(`Logged in as ${client.user?.tag}!`);
  setInterval(async () => await tasks.checkGame(client), 20 * 60 * 1000);
};

export const onMessage = async (msg: Message) => {
  if (msg.author.bot) return;
  const [command, args] = msg.content.split('|');
  const action = COMAND_LOOKUP[(command || '').trim() as keyof typeof COMAND_LOOKUP];

  if (!action) return;
  await action(msg, (args || '').trim());
};
