import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from './config';

const { RIOT_TOKEN, RIOT_URL } = config;

export interface SummonerDTO {
  id: string;
  accountId: string;
  puuid: string;
}

export enum QueueTypes {
  RANKED = 420,
}

export interface MatchReferenceDTO {
  gameId: number;
  champion: number;
  timestamp: number;
  queue: QueueTypes;
  role: string;
  lane: string;
}

export interface LeagueEntryDTO {
  summonerName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
}

export interface MatchListDTO {
  matches: MatchReferenceDTO[];
}

export interface TeamStatsDTO {
  teamId: number;
  win: string;
}

export interface ParticipantStatsDTO {
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
}

export interface ParticipantDTO {
  teamId: number;
  championId: number;
  stats: ParticipantStatsDTO;
}

export interface MatchDTO {
  gameDuration: number;
  teams: TeamStatsDTO[];
  participants: ParticipantDTO[];
}

export class RiotApi {
  protected api: AxiosInstance = axios.create({ baseURL: RIOT_URL });

  constructor() {
    this.api.interceptors.request.use(this.authenticate);
  }

  public getSummonerByName(name: string) {
    return this.api.get<SummonerDTO>(`/summoner/v4/summoners/by-name/${encodeURI(name)}`).then((res) => res.data);
  }

  public getActiveGameBySummonerId(encryptedSummonerId: string) {
    return this.api
      .get<SummonerDTO>(`/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`)
      .then(() => true)
      .catch(() => false);
  }

  public getEntriesById(encryptedSummonerId: string) {
    return this.api
      .get<LeagueEntryDTO[]>(`/league/v4/entries/by-summoner/${encryptedSummonerId}`)
      .then((res) => res.data);
  }

  public getMatchById(matchId: number) {
    console.log('GET MATCH', new Date().toString());
    return this.api.get<MatchDTO>(`/match/v4/matches/${matchId}`).then((res) => res.data);
  }

  public getMatchList(accountId: string, queryParams = '') {
    return this.api
      .get<MatchListDTO>(`/match/v4/matchlists/by-account/${accountId}${queryParams}`)
      .then((res) => res.data);
  }

  private authenticate(config: AxiosRequestConfig) {
    config.headers['X-Riot-Token'] = RIOT_TOKEN;
    return config;
  }
}
