"use client"

import { useState } from "react"
import { useLeague } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import type { PlayerGameStats } from "@/lib/types"

export default function GameStatsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { games, teams, players, stats, addStats, updateStats, getTeamById } = useLeague()

  const game = games.find((g) => g.id === id)
  const homeTeam = game ? getTeamById(game.homeTeamId) : null
  const awayTeam = game ? getTeamById(game.awayTeamId) : null
  const gameStats = stats.filter((s) => s.gameId === id)

  const homePlayers = players.filter((p) => p.teamId === game?.homeTeamId)
  const awayPlayers = players.filter((p) => p.teamId === game?.awayTeamId)

  const [editingStats, setEditingStats] = useState<{ [playerId: string]: PlayerGameStats }>({})

  if (!game || !homeTeam || !awayTeam) {
    return <div>Game not found</div>
  }

  const handleStatChange = (playerId: string, field: keyof PlayerGameStats, value: string) => {
    const existing = gameStats.find((s) => s.playerId === playerId) || {
      id: `${Date.now()}-${playerId}`,
      gameId: id,
      playerId,
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
    }

    setEditingStats({
      ...editingStats,
      [playerId]: {
        ...existing,
        [field]: Number.parseInt(value) || 0,
      },
    })
  }

  const handleSave = () => {
    Object.values(editingStats).forEach((stat) => {
      const existing = gameStats.find((s) => s.playerId === stat.playerId)
      if (existing) {
        updateStats(stat)
      } else {
        addStats(stat)
      }
    })
    setEditingStats({})
    alert("Stats saved successfully!")
  }

  const getPlayerStats = (playerId: string) => {
    return (
      editingStats[playerId] ||
      gameStats.find((s) => s.playerId === playerId) || {
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
      }
    )
  }

  const renderTeamStats = (teamPlayers: typeof homePlayers, teamName: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{teamName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead className="w-20">PTS</TableHead>
                <TableHead className="w-20">REB</TableHead>
                <TableHead className="w-20">AST</TableHead>
                <TableHead className="w-20">STL</TableHead>
                <TableHead className="w-20">BLK</TableHead>
                <TableHead className="w-20">TO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamPlayers.map((player) => {
                const playerStat = getPlayerStats(player.id)
                return (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">
                      {player.firstName} {player.lastName}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.points}
                        onChange={(e) => handleStatChange(player.id, "points", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.rebounds}
                        onChange={(e) => handleStatChange(player.id, "rebounds", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.assists}
                        onChange={(e) => handleStatChange(player.id, "assists", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.steals || 0}
                        onChange={(e) => handleStatChange(player.id, "steals", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.blocks || 0}
                        onChange={(e) => handleStatChange(player.id, "blocks", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={playerStat.turnovers || 0}
                        onChange={(e) => handleStatChange(player.id, "turnovers", e.target.value)}
                        className="h-8 w-16"
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Link href="/schedule">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 size-4" />
          Back to Schedule
        </Button>
      </Link>

      <div>
        <h1 className="text-4xl font-bold tracking-tight">Game Stats</h1>
        <p className="mt-2 text-muted-foreground">
          {homeTeam.name} vs {awayTeam.name} • {new Date(game.date).toLocaleDateString()}
        </p>
        {game.status === "final" && (
          <p className="mt-1 text-xl font-semibold">
            Final Score: {homeTeam.name} {game.homeScore} - {awayTeam.name} {game.awayScore}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {renderTeamStats(homePlayers, homeTeam.name)}
        {renderTeamStats(awayPlayers, awayTeam.name)}
      </div>

      {Object.keys(editingStats).length > 0 && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setEditingStats({})}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  )
}
