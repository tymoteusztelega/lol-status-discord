/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Client, TextChannel } from 'discord.js';

import { getIsPlaying } from './controller';
import { config } from './config';

const checkGame = async (client: Client) => {
  const isPlaying = await getIsPlaying(config.MAIN_RESEARCH_OBJECT);

  if (isPlaying) {
    const channel = client.channels.cache.get(config.BOT_TEST_CHANNEL || '') as TextChannel;
    channel?.send(`${config.MAIN_RESEARCH_OBJECT} is in game!`);
  }
};

export const tasks = {
  checkGame,
};
