import moment from 'moment';

import { MatchDTO, RiotApi } from './api';

const riotApi = new RiotApi();

const handleError = (e: any) => {
  if (e.code === 'ETIMEDOUT') return `Error occured. Probably to much requests. Wait 2 minutes`;
  if (e.response.status === 404) return `User not found.`;
  return `Error occured. Try again later.`;
};

export const getLastMatch = async (name: string) => {
  try {
    const { accountId } = await riotApi.getSummonerByName(name);
    const { matches } = await riotApi.getMatchList(accountId);
    const [lastMatch] = matches;

    return `Last match: ${moment.utc(new Date(lastMatch.timestamp)).format('DD-MM-YYYY HH:mm')}`;
  } catch (e) {
    return handleError(e);
  }
};

export const getCurrentRank = async (name: string) => {
  try {
    const { id } = await riotApi.getSummonerByName(name);
    const [lastEntry] = await riotApi.getEntriesById(id);

    const { leaguePoints, rank, summonerName, tier } = lastEntry;
    return `Summoner ${summonerName} is in ${tier} ${rank} (${leaguePoints} point${leaguePoints === 1 ? '' : 's'})`;
  } catch (e) {
    return handleError(e);
  }
};

export const getIsPlaying = async (name: string) => {
  const { id } = await riotApi.getSummonerByName(name);
  return riotApi.getActiveGameBySummonerId(id);
};

export const getGameStatus = async (name: string) => {
  try {
    const isGameActive = await getIsPlaying(name);
    return `Summoner ${name} ${isGameActive ? 'is' : 'is not'} currenly playing`;
  } catch (e) {
    return handleError(e);
  }
};

export const getTimeSpentLastWeek = async (name: string) => {
  try {
    const { accountId } = await riotApi.getSummonerByName(name);
    const beginTime = moment().subtract(7, 'd').utc();
    const { matches } = await riotApi.getMatchList(accountId, `?beginTime=${beginTime}`);

    const delays = Array.from({ length: matches.length }).map((_, i) => i * 200);

    const promises = matches.map(async (match, i) => {
      return new Promise<MatchDTO>((res, rej) =>
        setTimeout(() => riotApi.getMatchById(match.gameId).then(res).catch(rej), delays[i]),
      );
    });

    const fullMatches = await Promise.all(promises);

    const secondsSpentInGame = fullMatches.reduce((acc, match) => (acc += match.gameDuration), 0);

    const hours = Math.floor(secondsSpentInGame / 3600);
    const minutes = Math.floor(secondsSpentInGame / 60) - hours * 60;
    const seconds = secondsSpentInGame - hours * 3600 - minutes * 60;

    return `${name} played ${matches.length} matches last week. Time spent: ${hours}h ${minutes}m ${seconds}s`;
  } catch (e) {
    console.log(e);
    return handleError(e);
  }
};
