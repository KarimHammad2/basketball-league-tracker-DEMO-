import type { Team, Player, Game, PlayerGameStats, Standing, PlayerStats } from "./types"

export function calculateStandings(teams: Team[], games: Game[]): Standing[] {
  const standings: Standing[] = teams.map((team) => ({
    team,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    winPercentage: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointDifferential: 0,
  }))

  const finalGames = games.filter((g) => g.status === "final")

  finalGames.forEach((game) => {
    const homeStanding = standings.find((s) => s.team.id === game.homeTeamId)
    const awayStanding = standings.find((s) => s.team.id === game.awayTeamId)

    if (homeStanding && awayStanding && game.homeScore !== undefined && game.awayScore !== undefined) {
      homeStanding.gamesPlayed++
      awayStanding.gamesPlayed++

      homeStanding.pointsFor += game.homeScore
      homeStanding.pointsAgainst += game.awayScore
      awayStanding.pointsFor += game.awayScore
      awayStanding.pointsAgainst += game.homeScore

      if (game.homeScore > game.awayScore) {
        homeStanding.wins++
        awayStanding.losses++
      } else {
        awayStanding.wins++
        homeStanding.losses++
      }
    }
  })

  standings.forEach((standing) => {
    standing.winPercentage = standing.gamesPlayed > 0 ? standing.wins / standing.gamesPlayed : 0
    standing.pointDifferential = standing.pointsFor - standing.pointsAgainst
  })

  return standings.sort((a, b) => {
    if (b.winPercentage !== a.winPercentage) {
      return b.winPercentage - a.winPercentage
    }
    return b.pointDifferential - a.pointDifferential
  })
}

export function calculatePlayerStats(players: Player[], teams: Team[], stats: PlayerGameStats[]): PlayerStats[] {
  const playerStats: PlayerStats[] = players.map((player) => {
    const playerGames = stats.filter((s) => s.playerId === player.id)
    const gamesPlayed = playerGames.length
    const totalPoints = playerGames.reduce((sum, s) => sum + s.points, 0)
    const totalRebounds = playerGames.reduce((sum, s) => sum + s.rebounds, 0)
    const totalAssists = playerGames.reduce((sum, s) => sum + s.assists, 0)

    return {
      player,
      team: teams.find((t) => t.id === player.teamId)!,
      gamesPlayed,
      totalPoints,
      totalRebounds,
      totalAssists,
      ppg: gamesPlayed > 0 ? totalPoints / gamesPlayed : 0,
      rpg: gamesPlayed > 0 ? totalRebounds / gamesPlayed : 0,
      apg: gamesPlayed > 0 ? totalAssists / gamesPlayed : 0,
    }
  })

  return playerStats
}
