"use client"

import { useState } from "react"
import { useLeague } from "@/lib/context"
import { calculatePlayerStats } from "@/lib/calculations"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type SortField = "ppg" | "rpg" | "apg" | "totalPoints"

export default function StatsPage() {
  const { players, teams, stats } = useLeague()
  const [filterTeam, setFilterTeam] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("ppg")

  let playerStats = calculatePlayerStats(players, teams, stats)

  if (filterTeam !== "all") {
    playerStats = playerStats.filter((ps) => ps.player.teamId === filterTeam)
  }

  playerStats = playerStats.sort((a, b) => b[sortField] - a[sortField])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Player Stats & Leaderboards</h1>
        <p className="mt-2 text-muted-foreground">League-wide player statistics</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="filterTeam">Team:</Label>
          <Select value={filterTeam} onValueChange={setFilterTeam}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Sort by:</Label>
          <div className="flex gap-2">
            <Button size="sm" variant={sortField === "ppg" ? "default" : "outline"} onClick={() => setSortField("ppg")}>
              PPG
            </Button>
            <Button size="sm" variant={sortField === "rpg" ? "default" : "outline"} onClick={() => setSortField("rpg")}>
              RPG
            </Button>
            <Button size="sm" variant={sortField === "apg" ? "default" : "outline"} onClick={() => setSortField("apg")}>
              APG
            </Button>
            <Button
              size="sm"
              variant={sortField === "totalPoints" ? "default" : "outline"}
              onClick={() => setSortField("totalPoints")}
            >
              Total PTS
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">GP</TableHead>
              <TableHead className="text-right">PTS</TableHead>
              <TableHead className="text-right">REB</TableHead>
              <TableHead className="text-right">AST</TableHead>
              <TableHead className="text-right">PPG</TableHead>
              <TableHead className="text-right">RPG</TableHead>
              <TableHead className="text-right">APG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playerStats.map((ps, index) => (
              <TableRow key={ps.player.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/players/${ps.player.id}`} className="font-medium hover:text-primary">
                    {ps.player.firstName} {ps.player.lastName}
                  </Link>
                </TableCell>
                <TableCell>{ps.team.name}</TableCell>
                <TableCell className="text-center">{ps.gamesPlayed}</TableCell>
                <TableCell className="text-right">{ps.totalPoints}</TableCell>
                <TableCell className="text-right">{ps.totalRebounds}</TableCell>
                <TableCell className="text-right">{ps.totalAssists}</TableCell>
                <TableCell className="text-right font-semibold text-primary">{ps.ppg.toFixed(1)}</TableCell>
                <TableCell className="text-right font-semibold">{ps.rpg.toFixed(1)}</TableCell>
                <TableCell className="text-right font-semibold">{ps.apg.toFixed(1)}</TableCell>
              </TableRow>
            ))}
            {playerStats.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-muted-foreground">
                  No player stats available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
