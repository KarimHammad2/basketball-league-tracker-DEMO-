"use client"

import { useLeague } from "@/lib/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { teams, players, games } = useLeague()

  const finalGames = games
    .filter((g) => g.status === "final")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const upcomingGames = games
    .filter((g) => g.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name || "Unknown"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to your basketball league management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Trophy className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{teams.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{players.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{games.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingGames.slice(0, 3).map((game) => (
                <div
                  key={game.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {getTeamName(game.homeTeamId)} vs {getTeamName(game.awayTeamId)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(game.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {game.phase === "playoff" ? "Playoff" : "Regular"}
                  </div>
                </div>
              ))}
              {upcomingGames.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">No upcoming games scheduled</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {finalGames.slice(0, 3).map((game) => {
                const homeWon = (game.homeScore ?? 0) > (game.awayScore ?? 0)
                return (
                  <div key={game.id} className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${homeWon ? "text-foreground" : "text-muted-foreground"}`}>
                          {getTeamName(game.homeTeamId)}
                        </div>
                        <div
                          className={`text-sm font-medium ${!homeWon ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {getTeamName(game.awayTeamId)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${homeWon ? "text-foreground" : "text-muted-foreground"}`}>
                          {game.homeScore}
                        </div>
                        <div className={`text-sm font-bold ${!homeWon ? "text-foreground" : "text-muted-foreground"}`}>
                          {game.awayScore}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                )
              })}
              {finalGames.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">No completed games yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
