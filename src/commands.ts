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

const getTime = (args: string) => {
  const [name, days] = args.split('/').map((arg) => arg.trim());
  if (!name) return 'Name was not provided.';

  const daysAsNumber = Number(days);
  const daysProcessed = Number.isNaN(daysAsNumber) ? 7 : Math.min(7, daysAsNumber);
  return getTimeSpentLastWeek(name, daysProcessed);
};

const getHelp = () => {
  return 'Commands are separated from arguments with | (pipe). Aruments are separated with / (slash). Spaces are trimmed.\nAvailable commands:\n1. !status | {summoner name}\n2. !rank | {summoner name}\n3. !game | {summoner name}\n4. !time | {summoner name} / {days amount, default: 7, max: 7}';
};

export const commands = {
  getMatch,
  getRank,
  getHelp,
  getGame,
  getTime,
};
