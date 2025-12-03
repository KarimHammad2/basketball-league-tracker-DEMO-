"use client"

import { useLeague } from "@/lib/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlayoffsPage() {
  const { games, teams } = useLeague()

  const playoffGames = games
    .filter((g) => g.phase === "playoff")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name || "Unknown"

  // Group games by round (you can add round field to Game type for better organization)
  const groupedByRound = playoffGames.reduce(
    (acc, game) => {
      const round = game.round || 1
      if (!acc[round]) acc[round] = []
      acc[round].push(game)
      return acc
    },
    {} as { [round: number]: typeof playoffGames },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Playoffs</h1>
        <p className="mt-2 text-muted-foreground">Playoff games and series</p>
      </div>

      {Object.keys(groupedByRound).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No playoff games scheduled yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByRound).map(([round, roundGames]) => (
            <div key={round}>
              <h2 className="mb-4 text-2xl font-bold">Round {round}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {roundGames.map((game) => {
                  const homeWon = game.status === "final" && (game.homeScore ?? 0) > (game.awayScore ?? 0)
                  const awayWon = game.status === "final" && (game.awayScore ?? 0) > (game.homeScore ?? 0)

                  return (
                    <Card key={game.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {new Date(game.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-lg font-semibold ${homeWon ? "text-foreground" : awayWon ? "text-muted-foreground" : ""}`}
                            >
                              {getTeamName(game.homeTeamId)}
                            </span>
                            {game.status === "final" && (
                              <span
                                className={`text-2xl font-bold ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {game.homeScore}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-lg font-semibold ${awayWon ? "text-foreground" : homeWon ? "text-muted-foreground" : ""}`}
                            >
                              {getTeamName(game.awayTeamId)}
                            </span>
                            {game.status === "final" && (
                              <span
                                className={`text-2xl font-bold ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {game.awayScore}
                              </span>
                            )}
                          </div>
                          <div className="pt-2">
                            <span
                              className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${
                                game.status === "final"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : game.status === "in_progress"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {game.status === "scheduled"
                                ? "Scheduled"
                                : game.status === "in_progress"
                                  ? "In Progress"
                                  : "Final"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
