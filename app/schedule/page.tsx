"use client"

import type React from "react"

import { useState } from "react"
import { useLeague } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Game } from "@/lib/types"
import Link from "next/link"

export default function SchedulePage() {
  const { games, teams, addGame, updateGame, deleteGame } = useLeague()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [filterTeam, setFilterTeam] = useState<string>("all")
  const [filterPhase, setFilterPhase] = useState<string>("all")
  const [formData, setFormData] = useState({
    date: "",
    homeTeamId: "",
    awayTeamId: "",
    phase: "regular",
    status: "scheduled",
    homeScore: "",
    awayScore: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const gameData: Omit<Game, "id"> = {
      date: formData.date,
      homeTeamId: formData.homeTeamId,
      awayTeamId: formData.awayTeamId,
      phase: formData.phase as "regular" | "playoff",
      status: formData.status as "scheduled" | "in_progress" | "final",
      homeScore: formData.homeScore ? Number.parseInt(formData.homeScore) : undefined,
      awayScore: formData.awayScore ? Number.parseInt(formData.awayScore) : undefined,
    }

    if (editingGame) {
      updateGame({ ...editingGame, ...gameData })
    } else {
      addGame({ id: Date.now().toString(), ...gameData })
    }
    setIsDialogOpen(false)
    setEditingGame(null)
    setFormData({
      date: "",
      homeTeamId: "",
      awayTeamId: "",
      phase: "regular",
      status: "scheduled",
      homeScore: "",
      awayScore: "",
    })
  }

  const handleEdit = (game: Game) => {
    setEditingGame(game)
    setFormData({
      date: game.date,
      homeTeamId: game.homeTeamId,
      awayTeamId: game.awayTeamId,
      phase: game.phase,
      status: game.status,
      homeScore: game.homeScore?.toString() || "",
      awayScore: game.awayScore?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this game?")) {
      deleteGame(id)
    }
  }

  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name || "Unknown"

  const filteredGames = games
    .filter((g) => {
      if (filterTeam !== "all" && g.homeTeamId !== filterTeam && g.awayTeamId !== filterTeam) return false
      if (filterPhase !== "all" && g.phase !== filterPhase) return false
      return true
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Schedule</h1>
          <p className="mt-2 text-muted-foreground">View and manage all games</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingGame(null)
                setFormData({
                  date: "",
                  homeTeamId: "",
                  awayTeamId: "",
                  phase: "regular",
                  status: "scheduled",
                  homeScore: "",
                  awayScore: "",
                })
              }}
            >
              <Plus className="mr-2 size-4" />
              Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingGame ? "Edit Game" : "Add New Game"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeTeamId">Home Team</Label>
                  <Select
                    value={formData.homeTeamId}
                    onValueChange={(value) => setFormData({ ...formData, homeTeamId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select home team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="awayTeamId">Away Team</Label>
                  <Select
                    value={formData.awayTeamId}
                    onValueChange={(value) => setFormData({ ...formData, awayTeamId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select away team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phase">Phase</Label>
                  <Select value={formData.phase} onValueChange={(value) => setFormData({ ...formData, phase: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular Season</SelectItem>
                      <SelectItem value="playoff">Playoff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(formData.status === "in_progress" || formData.status === "final") && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeScore">Home Score</Label>
                    <Input
                      id="homeScore"
                      type="number"
                      value={formData.homeScore}
                      onChange={(e) => setFormData({ ...formData, homeScore: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="awayScore">Away Score</Label>
                    <Input
                      id="awayScore"
                      type="number"
                      value={formData.awayScore}
                      onChange={(e) => setFormData({ ...formData, awayScore: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingGame ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
          <Label htmlFor="filterPhase">Phase:</Label>
          <Select value={filterPhase} onValueChange={setFilterPhase}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="regular">Regular Season</SelectItem>
              <SelectItem value="playoff">Playoff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredGames.map((game) => {
          const homeWon = game.status === "final" && (game.homeScore ?? 0) > (game.awayScore ?? 0)
          const awayWon = game.status === "final" && (game.awayScore ?? 0) > (game.homeScore ?? 0)

          return (
            <Card key={game.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {new Date(game.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" • "}
                      {new Date(game.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div
                          className={`text-lg font-semibold ${homeWon ? "text-foreground" : awayWon ? "text-muted-foreground" : ""}`}
                        >
                          {getTeamName(game.homeTeamId)}
                        </div>
                        <div
                          className={`text-lg font-semibold ${awayWon ? "text-foreground" : homeWon ? "text-muted-foreground" : ""}`}
                        >
                          {getTeamName(game.awayTeamId)}
                        </div>
                      </div>
                      {game.status === "final" && (
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${homeWon ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {game.homeScore}
                          </div>
                          <div
                            className={`text-2xl font-bold ${awayWon ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {game.awayScore}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          game.phase === "playoff" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {game.phase === "playoff" ? "Playoff" : "Regular"}
                      </span>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
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
                  <div className="flex gap-2">
                    {game.status === "final" && (
                      <Link href={`/schedule/${game.id}`}>
                        <Button size="sm" variant="outline">
                          Stats
                        </Button>
                      </Link>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(game)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(game.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
