import type { Team, Player, Game, PlayerGameStats } from "./types"

const STORAGE_KEYS = {
  TEAMS: "basketball_league_teams",
  PLAYERS: "basketball_league_players",
  GAMES: "basketball_league_games",
  STATS: "basketball_league_stats",
}

export const storage = {
  saveTeams: (teams: Team[]) => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams))
  },
  getTeams: (): Team[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TEAMS)
    return data ? JSON.parse(data) : []
  },
  savePlayers: (players: Player[]) => {
    localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players))
  },
  getPlayers: (): Player[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYERS)
    return data ? JSON.parse(data) : []
  },
  saveGames: (games: Game[]) => {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games))
  },
  getGames: (): Game[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GAMES)
    return data ? JSON.parse(data) : []
  },
  saveStats: (stats: PlayerGameStats[]) => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats))
  },
  getStats: (): PlayerGameStats[] => {
    const data = localStorage.getItem(STORAGE_KEYS.STATS)
    return data ? JSON.parse(data) : []
  },
}
