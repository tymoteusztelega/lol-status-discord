import moment from 'moment';

import { RiotApi } from './api';

const riotApi = new RiotApi();

export const getLastMatch = async (name: string) => {
  const { accountId } = await riotApi.getSummonerByName(name);
  const { matches } = await riotApi.getMatchList(accountId);
  const [lastMatch] = matches;

  return `Last match: ${moment(new Date(lastMatch.timestamp)).format('DD-MM-YYYY HH:mm')}`;
};

export const getCurrentRank = async (name: string) => {
  const { id } = await riotApi.getSummonerByName(name);
  const [lastEntry] = await riotApi.getEntriesById(id);

  const { leaguePoints, rank, summonerName, tier } = lastEntry;
  return `Summoner ${summonerName} is in ${tier} ${rank} (${leaguePoints} point${leaguePoints === 1 ? '' : 's'})`;
};

export const getIsPlaying = async (name: string) => {
  const { id } = await riotApi.getSummonerByName(name);
  return riotApi.getActiveGameBySummonerId(id);
};

export const getGameStatus = async (name: string) => {
  const isGameActive = await getIsPlaying(name);
  return `Summoner ${name} ${isGameActive ? 'is' : 'is not'} currenly playing`;
};
