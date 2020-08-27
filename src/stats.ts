import * as matchupDataJson from './resources/matchupData.json';
import * as stageDataJson from './resources/stageData.json';
import * as characterRankingsDataJson from './resources/characterRankingsData.json';

import { characterNames } from './resources/characters';
import { stageNames } from './resources/stages';


const allCharacterSlugs: string[] = Object.keys(characterNames);
const allStageSlugs: string[] = Object.keys(stageNames);

interface Record {
  wins: number;
  losses: number;
}

interface AllMatchupStats {
  [characterSlug1: string]: {
    [characterSlug2: string]: {
      [stageSlug: string]: Record;
    };
  };
}

interface TotalGames {
  totalGames: number;
}

export interface CharacterStats {
  overall: Record;
  stage: {
    [stageSlug: string]: Record;
  };
  character: {
    [characterSlug: string]: Record;
  };
}

export interface MatchupStats {
  overall: {
    character1Wins: number;
    character2Wins: number;
  };
  stage: {
    [stageSlug: string]: {
      character1Wins: number;
      character2Wins: number;
    };
  };
}

export interface StageStats {
  overall: TotalGames;
  character: {
    [characterSlug: string]: Record;
  };
}

export interface CharacterRankingsStats {
  overall: TotalGames;
  character: {
    [characterSlug: string]: Record;
  };
}

interface AllCharacterStats {
  [slug: string]: CharacterStats;
}

interface AllStageStats {
  [slug: string]: StageStats;
}

const allMatchupStats: AllMatchupStats = matchupDataJson;
const allStageStats: AllStageStats = stageDataJson;
const characterRankingsStats: CharacterRankingsStats = characterRankingsDataJson;


function getMatchupStatsOnStage(charSlug1: string, charSlug2: string, stageSlug: string): [number, number] {
  const orientation = charSlug1 < charSlug2;
  const charSlugKey1 = orientation ? charSlug1 : charSlug2;
  const charSlugKey2 = orientation ? charSlug2 : charSlug1;
  const winKey = orientation ? 'wins' : 'losses';
  const loseKey = orientation ? 'losses' : 'wins';

  return [
    allMatchupStats[charSlugKey1][charSlugKey2][stageSlug][winKey],
    allMatchupStats[charSlugKey1][charSlugKey2][stageSlug][loseKey],
  ];
}

export function getCharacterStats(slugs: string[]): CharacterStats {
  const stats: CharacterStats = {
    overall: {
      wins: 0,
      losses: 0,
    },
    stage: {},
    character: {},
  };

  const vsCharSlugs = allCharacterSlugs.filter(slug => !slugs.includes(slug));

  for (let charSlug of slugs) {
    for (let stageSlug of allStageSlugs) {
      for (let vsCharSlug of vsCharSlugs) {
        const [wins, losses] = getMatchupStatsOnStage(charSlug, vsCharSlug, stageSlug);

        stats.overall.wins += wins;
        stats.overall.losses += losses;

        if (!stats.stage.hasOwnProperty(stageSlug)) {
          stats.stage[stageSlug] = {
            wins: 0,
            losses: 0,
          };
        }
        stats.stage[stageSlug].wins += wins;
        stats.stage[stageSlug].losses += losses;

        if (!stats.character.hasOwnProperty(vsCharSlug)) {
          stats.character[vsCharSlug] = {
            wins: 0,
            losses: 0,
          };
        }
        stats.character[vsCharSlug].wins += wins;
        stats.character[vsCharSlug].losses += losses;
      }
    }
  }

  return stats;
}

export function getMatchupStats(slugs1: string[], slugs2: string[]): MatchupStats {
  const stats: MatchupStats = {
    overall: {
      character1Wins: 0,
      character2Wins: 0,
    },
    stage: {},
  };

  for (let charSlug of slugs1) {
    for (let vsCharSlug of slugs2) {
      for (let stageSlug of allStageSlugs) {
        const [wins, losses] = getMatchupStatsOnStage(charSlug, vsCharSlug, stageSlug);

        stats.overall.character1Wins += wins;
        stats.overall.character2Wins += losses;

        if (!stats.stage.hasOwnProperty(stageSlug)) {
          stats.stage[stageSlug] = {
            character1Wins: 0,
            character2Wins: 0,
          };
        }
        stats.stage[stageSlug].character1Wins += wins;
        stats.stage[stageSlug].character2Wins += losses;
      }
    }
  }

  return stats;
}

export function getStageStats(stageSlug: string): StageStats {
  return allStageStats[stageSlug];
}

export function getCharacterRankingsStats(): CharacterRankingsStats {
  return characterRankingsStats;
}

export function getWinPercent(wins: number, losses: number): number | string {
  const total = wins + losses;
  if (total === 0) {
    return (0).toFixed(2);
  } else {
    return (100.0 * wins / total).toFixed(2);
  }
}
