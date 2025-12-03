export interface Team {
  id: string
  name: string
  shortName?: string
}

export interface Player {
  id: string
  firstName: string
  lastName: string
  teamId: string
  position?: string
  jerseyNumber?: number
}

export interface Game {
  id: string
  date: string
  homeTeamId: string
  awayTeamId: string
  phase: "regular" | "playoff"
  status: "scheduled" | "in_progress" | "final"
  homeScore?: number
  awayScore?: number
  round?: number
}

export interface PlayerGameStats {
  id: string
  gameId: string
  playerId: string
  points: number
  rebounds: number
  assists: number
  steals?: number
  blocks?: number
  turnovers?: number
}

export interface Standing {
  team: Team
  gamesPlayed: number
  wins: number
  losses: number
  winPercentage: number
  pointsFor: number
  pointsAgainst: number
  pointDifferential: number
}

export interface PlayerStats {
  player: Player
  team: Team
  gamesPlayed: number
  totalPoints: number
  totalRebounds: number
  totalAssists: number
  ppg: number
  rpg: number
  apg: number
}
