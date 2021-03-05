import { getCurrentRank, getGameStatus, getLastMatch, getTimeSpentLastWeek } from './controller';

const getMatch = (name: string) => {
  if (!name) return 'Name was not provided.';
  return getLastMatch(name);
};

const getRank = (name: string) => {
  if (!name) return 'Name was not provided.';
  return getCurrentRank(name);
};

const getGame = (name: string) => {
  if (!name) return 'Name was not provided.';
  return getGameStatus(name);
};

const getTime = (name: string) => {
  if (!name) return 'Name was not provided.';
  return getTimeSpentLastWeek(name);
};

const getHelp = () => {
  return 'Available commands:\n1. !status|{summoner name}\n2. !rank|{summoner name}\n3. !game|{summoner name}';
};

export const commands = {
  getMatch,
  getRank,
  getHelp,
  getGame,
  getTime,
};
