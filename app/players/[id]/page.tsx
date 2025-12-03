"use client"

import { useLeague } from "@/lib/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function PlayerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { players, teams, games, stats } = useLeague()

  const player = players.find((p) => p.id === id)
  const team = player ? teams.find((t) => t.id === player.teamId) : null
  const playerStats = stats.filter((s) => s.playerId === id)

  if (!player || !team) {
    return <div>Player not found</div>
  }

  const gamesPlayed = playerStats.length
  const totalPoints = playerStats.reduce((sum, s) => sum + s.points, 0)
  const totalRebounds = playerStats.reduce((sum, s) => sum + s.rebounds, 0)
  const totalAssists = playerStats.reduce((sum, s) => sum + s.assists, 0)
  const ppg = gamesPlayed > 0 ? (totalPoints / gamesPlayed).toFixed(1) : "0.0"
  const rpg = gamesPlayed > 0 ? (totalRebounds / gamesPlayed).toFixed(1) : "0.0"
  const apg = gamesPlayed > 0 ? (totalAssists / gamesPlayed).toFixed(1) : "0.0"

  const getGameInfo = (gameId: string) => {
    const game = games.find((g) => g.id === gameId)
    if (!game) return { opponent: "Unknown", date: "", result: "" }

    const isHome = game.homeTeamId === player.teamId
    const opponent = isHome
      ? teams.find((t) => t.id === game.awayTeamId)?.name || "Unknown"
      : teams.find((t) => t.id === game.homeTeamId)?.name || "Unknown"

    let result = ""
    if (game.status === "final" && game.homeScore !== undefined && game.awayScore !== undefined) {
      const playerScore = isHome ? game.homeScore : game.awayScore
      const opponentScore = isHome ? game.awayScore : game.homeScore
      result = playerScore > opponentScore ? "W" : "L"
    }

    return {
      opponent: `vs ${opponent}`,
      date: new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      result,
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/players">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 size-4" />
          Back to Players
        </Button>
      </Link>

      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          {player.firstName} {player.lastName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {team.name} • {player.position || "N/A"} • #{player.jerseyNumber || "N/A"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Games Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gamesPlayed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">PPG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{ppg}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">RPG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{rpg}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">APG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{apg}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Season Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalRebounds}</div>
              <div className="text-sm text-muted-foreground">Rebounds</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalAssists}</div>
              <div className="text-sm text-muted-foreground">Assists</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Game Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Opponent</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-right">PTS</TableHead>
                  <TableHead className="text-right">REB</TableHead>
                  <TableHead className="text-right">AST</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playerStats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No games played yet
                    </TableCell>
                  </TableRow>
                ) : (
                  playerStats.map((stat) => {
                    const gameInfo = getGameInfo(stat.gameId)
                    return (
                      <TableRow key={stat.id}>
                        <TableCell>{gameInfo.date}</TableCell>
                        <TableCell>{gameInfo.opponent}</TableCell>
                        <TableCell className="text-center">
                          {gameInfo.result && (
                            <span className={gameInfo.result === "W" ? "text-green-600" : "text-red-600"}>
                              {gameInfo.result}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">{stat.points}</TableCell>
                        <TableCell className="text-right">{stat.rebounds}</TableCell>
                        <TableCell className="text-right">{stat.assists}</TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
