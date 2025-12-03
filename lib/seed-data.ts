import type { Team, Player, Game, PlayerGameStats } from "./types"

export const seedTeams: Team[] = [
  { id: "1", name: "Thunder Wolves", shortName: "TWO" },
  { id: "2", name: "Phoenix Flyers", shortName: "PHX" },
  { id: "3", name: "Metro Knights", shortName: "MTK" },
  { id: "4", name: "Coastal Sharks", shortName: "CSH" },
  { id: "5", name: "Valley Vipers", shortName: "VVP" },
  { id: "6", name: "Summit Eagles", shortName: "SEG" },
]

export const seedPlayers: Player[] = [
  { id: "1", firstName: "Marcus", lastName: "Johnson", teamId: "1", position: "PG", jerseyNumber: 7 },
  { id: "2", firstName: "James", lastName: "Williams", teamId: "1", position: "SG", jerseyNumber: 23 },
  { id: "3", firstName: "Andre", lastName: "Davis", teamId: "1", position: "SF", jerseyNumber: 12 },
  { id: "4", firstName: "Tyler", lastName: "Brown", teamId: "1", position: "PF", jerseyNumber: 34 },
  { id: "5", firstName: "Kevin", lastName: "Martinez", teamId: "1", position: "C", jerseyNumber: 21 },

  { id: "6", firstName: "Chris", lastName: "Anderson", teamId: "2", position: "PG", jerseyNumber: 1 },
  { id: "7", firstName: "Ryan", lastName: "Taylor", teamId: "2", position: "SG", jerseyNumber: 3 },
  { id: "8", firstName: "Jordan", lastName: "Thomas", teamId: "2", position: "SF", jerseyNumber: 15 },
  { id: "9", firstName: "Brandon", lastName: "Moore", teamId: "2", position: "PF", jerseyNumber: 42 },
  { id: "10", firstName: "Jason", lastName: "Jackson", teamId: "2", position: "C", jerseyNumber: 33 },

  { id: "11", firstName: "Michael", lastName: "White", teamId: "3", position: "PG", jerseyNumber: 10 },
  { id: "12", firstName: "David", lastName: "Harris", teamId: "3", position: "SG", jerseyNumber: 5 },
  { id: "13", firstName: "Daniel", lastName: "Martin", teamId: "3", position: "SF", jerseyNumber: 22 },
  { id: "14", firstName: "Matthew", lastName: "Garcia", teamId: "3", position: "PF", jerseyNumber: 44 },
  { id: "15", firstName: "Joseph", lastName: "Rodriguez", teamId: "3", position: "C", jerseyNumber: 50 },

  { id: "16", firstName: "Anthony", lastName: "Wilson", teamId: "4", position: "PG", jerseyNumber: 2 },
  { id: "17", firstName: "Steven", lastName: "Lee", teamId: "4", position: "SG", jerseyNumber: 14 },
  { id: "18", firstName: "Robert", lastName: "Walker", teamId: "4", position: "SF", jerseyNumber: 24 },
  { id: "19", firstName: "Brian", lastName: "Hall", teamId: "4", position: "PF", jerseyNumber: 32 },
  { id: "20", firstName: "Nicholas", lastName: "Allen", teamId: "4", position: "C", jerseyNumber: 55 },

  { id: "21", firstName: "Eric", lastName: "Young", teamId: "5", position: "PG", jerseyNumber: 11 },
  { id: "22", firstName: "Justin", lastName: "King", teamId: "5", position: "SG", jerseyNumber: 8 },
  { id: "23", firstName: "Adam", lastName: "Wright", teamId: "5", position: "SF", jerseyNumber: 18 },
  { id: "24", firstName: "Derek", lastName: "Lopez", teamId: "5", position: "PF", jerseyNumber: 40 },
  { id: "25", firstName: "Trevor", lastName: "Hill", teamId: "5", position: "C", jerseyNumber: 30 },

  { id: "26", firstName: "Aaron", lastName: "Scott", teamId: "6", position: "PG", jerseyNumber: 4 },
  { id: "27", firstName: "Kyle", lastName: "Green", teamId: "6", position: "SG", jerseyNumber: 20 },
  { id: "28", firstName: "Connor", lastName: "Adams", teamId: "6", position: "SF", jerseyNumber: 25 },
  { id: "29", firstName: "Cameron", lastName: "Baker", teamId: "6", position: "PF", jerseyNumber: 35 },
  { id: "30", firstName: "Austin", lastName: "Nelson", teamId: "6", position: "C", jerseyNumber: 45 },
]

export const seedGames: Game[] = [
  // Week 1
  {
    id: "1",
    date: "2025-01-15T19:00:00",
    homeTeamId: "1",
    awayTeamId: "2",
    phase: "regular",
    status: "final",
    homeScore: 98,
    awayScore: 92,
  },
  {
    id: "2",
    date: "2025-01-15T20:00:00",
    homeTeamId: "3",
    awayTeamId: "4",
    phase: "regular",
    status: "final",
    homeScore: 105,
    awayScore: 110,
  },
  {
    id: "3",
    date: "2025-01-16T19:00:00",
    homeTeamId: "5",
    awayTeamId: "6",
    phase: "regular",
    status: "final",
    homeScore: 88,
    awayScore: 95,
  },

  // Week 2
  {
    id: "4",
    date: "2025-01-22T19:00:00",
    homeTeamId: "2",
    awayTeamId: "3",
    phase: "regular",
    status: "final",
    homeScore: 102,
    awayScore: 99,
  },
  {
    id: "5",
    date: "2025-01-22T20:00:00",
    homeTeamId: "4",
    awayTeamId: "5",
    phase: "regular",
    status: "final",
    homeScore: 97,
    awayScore: 91,
  },
  {
    id: "6",
    date: "2025-01-23T19:00:00",
    homeTeamId: "6",
    awayTeamId: "1",
    phase: "regular",
    status: "final",
    homeScore: 89,
    awayScore: 103,
  },

  // Week 3
  {
    id: "7",
    date: "2025-01-29T19:00:00",
    homeTeamId: "1",
    awayTeamId: "3",
    phase: "regular",
    status: "final",
    homeScore: 112,
    awayScore: 108,
  },
  {
    id: "8",
    date: "2025-01-29T20:00:00",
    homeTeamId: "2",
    awayTeamId: "4",
    phase: "regular",
    status: "final",
    homeScore: 95,
    awayScore: 101,
  },
  {
    id: "9",
    date: "2025-01-30T19:00:00",
    homeTeamId: "5",
    awayTeamId: "1",
    phase: "regular",
    status: "final",
    homeScore: 84,
    awayScore: 96,
  },

  // Upcoming games
  { id: "10", date: "2025-12-05T19:00:00", homeTeamId: "3", awayTeamId: "6", phase: "regular", status: "scheduled" },
  { id: "11", date: "2025-12-06T19:00:00", homeTeamId: "4", awayTeamId: "2", phase: "regular", status: "scheduled" },
  { id: "12", date: "2025-12-07T19:00:00", homeTeamId: "5", awayTeamId: "3", phase: "regular", status: "scheduled" },
]

export const seedStats: PlayerGameStats[] = [
  // Game 1: Thunder Wolves 98 vs Phoenix Flyers 92
  { id: "1", gameId: "1", playerId: "1", points: 24, rebounds: 5, assists: 8, steals: 2, blocks: 0, turnovers: 3 },
  { id: "2", gameId: "1", playerId: "2", points: 18, rebounds: 4, assists: 3, steals: 1, blocks: 0, turnovers: 2 },
  { id: "3", gameId: "1", playerId: "3", points: 22, rebounds: 7, assists: 2, steals: 3, blocks: 1, turnovers: 1 },
  { id: "4", gameId: "1", playerId: "4", points: 16, rebounds: 9, assists: 1, steals: 0, blocks: 2, turnovers: 2 },
  { id: "5", gameId: "1", playerId: "5", points: 18, rebounds: 11, assists: 2, steals: 1, blocks: 3, turnovers: 1 },

  { id: "6", gameId: "1", playerId: "6", points: 21, rebounds: 3, assists: 7, steals: 2, blocks: 0, turnovers: 4 },
  { id: "7", gameId: "1", playerId: "7", points: 19, rebounds: 5, assists: 2, steals: 1, blocks: 0, turnovers: 2 },
  { id: "8", gameId: "1", playerId: "8", points: 15, rebounds: 6, assists: 3, steals: 0, blocks: 1, turnovers: 3 },
  { id: "9", gameId: "1", playerId: "9", points: 14, rebounds: 8, assists: 1, steals: 1, blocks: 1, turnovers: 1 },
  { id: "10", gameId: "1", playerId: "10", points: 23, rebounds: 10, assists: 1, steals: 0, blocks: 4, turnovers: 2 },

  // Game 2: Metro Knights 105 vs Coastal Sharks 110
  { id: "11", gameId: "2", playerId: "11", points: 28, rebounds: 4, assists: 9, steals: 3, blocks: 0, turnovers: 2 },
  { id: "12", gameId: "2", playerId: "12", points: 22, rebounds: 3, assists: 4, steals: 2, blocks: 0, turnovers: 1 },
  { id: "13", gameId: "2", playerId: "13", points: 19, rebounds: 6, assists: 2, steals: 1, blocks: 1, turnovers: 2 },
  { id: "14", gameId: "2", playerId: "14", points: 18, rebounds: 10, assists: 2, steals: 0, blocks: 2, turnovers: 3 },
  { id: "15", gameId: "2", playerId: "15", points: 18, rebounds: 12, assists: 1, steals: 1, blocks: 3, turnovers: 1 },

  { id: "16", gameId: "2", playerId: "16", points: 30, rebounds: 5, assists: 11, steals: 2, blocks: 0, turnovers: 3 },
  { id: "17", gameId: "2", playerId: "17", points: 25, rebounds: 4, assists: 3, steals: 3, blocks: 1, turnovers: 2 },
  { id: "18", gameId: "2", playerId: "18", points: 21, rebounds: 7, assists: 4, steals: 1, blocks: 0, turnovers: 1 },
  { id: "19", gameId: "2", playerId: "19", points: 16, rebounds: 9, assists: 2, steals: 0, blocks: 2, turnovers: 2 },
  { id: "20", gameId: "2", playerId: "20", points: 18, rebounds: 11, assists: 1, steals: 1, blocks: 5, turnovers: 1 },

  // Game 3: Valley Vipers 88 vs Summit Eagles 95
  { id: "21", gameId: "3", playerId: "21", points: 19, rebounds: 3, assists: 6, steals: 1, blocks: 0, turnovers: 4 },
  { id: "22", gameId: "3", playerId: "22", points: 16, rebounds: 4, assists: 2, steals: 2, blocks: 0, turnovers: 2 },
  { id: "23", gameId: "3", playerId: "23", points: 20, rebounds: 5, assists: 3, steals: 1, blocks: 1, turnovers: 3 },
  { id: "24", gameId: "3", playerId: "24", points: 14, rebounds: 8, assists: 1, steals: 0, blocks: 1, turnovers: 1 },
  { id: "25", gameId: "3", playerId: "25", points: 19, rebounds: 9, assists: 2, steals: 1, blocks: 2, turnovers: 2 },

  { id: "26", gameId: "3", playerId: "26", points: 26, rebounds: 4, assists: 8, steals: 3, blocks: 0, turnovers: 2 },
  { id: "27", gameId: "3", playerId: "27", points: 18, rebounds: 5, assists: 3, steals: 1, blocks: 0, turnovers: 1 },
  { id: "28", gameId: "3", playerId: "28", points: 17, rebounds: 6, assists: 2, steals: 2, blocks: 1, turnovers: 2 },
  { id: "29", gameId: "3", playerId: "29", points: 15, rebounds: 10, assists: 1, steals: 0, blocks: 3, turnovers: 1 },
  { id: "30", gameId: "3", playerId: "30", points: 19, rebounds: 13, assists: 2, steals: 1, blocks: 4, turnovers: 2 },
]
