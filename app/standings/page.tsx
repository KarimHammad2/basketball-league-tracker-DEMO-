"use client"

import { useLeague } from "@/lib/context"
import { calculateStandings } from "@/lib/calculations"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy } from "lucide-react"

export default function StandingsPage() {
  const { teams, games } = useLeague()
  const standings = calculateStandings(teams, games)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Standings</h1>
        <p className="mt-2 text-muted-foreground">League standings based on completed games</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">GP</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">WIN%</TableHead>
              <TableHead className="text-right">PF</TableHead>
              <TableHead className="text-right">PA</TableHead>
              <TableHead className="text-right">DIFF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing, index) => (
              <TableRow key={standing.team.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1">
                    {index === 0 && <Trophy className="size-4 text-yellow-500" />}
                    {index + 1}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{standing.team.name}</TableCell>
                <TableCell className="text-center">{standing.gamesPlayed}</TableCell>
                <TableCell className="text-center">{standing.wins}</TableCell>
                <TableCell className="text-center">{standing.losses}</TableCell>
                <TableCell className="text-center font-medium">
                  {standing.gamesPlayed > 0 ? (standing.winPercentage * 100).toFixed(1) : "0.0"}%
                </TableCell>
                <TableCell className="text-right">{standing.pointsFor}</TableCell>
                <TableCell className="text-right">{standing.pointsAgainst}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    standing.pointDifferential > 0
                      ? "text-green-600 dark:text-green-400"
                      : standing.pointDifferential < 0
                        ? "text-red-600 dark:text-red-400"
                        : ""
                  }`}
                >
                  {standing.pointDifferential > 0 ? "+" : ""}
                  {standing.pointDifferential}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
