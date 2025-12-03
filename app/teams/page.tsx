"use client"

import type React from "react"

import { useState } from "react"
import { useLeague } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Team } from "@/lib/types"

export default function TeamsPage() {
  const { teams, players, games, addTeam, updateTeam, deleteTeam } = useLeague()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [formData, setFormData] = useState({ name: "", shortName: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTeam) {
      updateTeam({ ...editingTeam, ...formData })
    } else {
      addTeam({ id: Date.now().toString(), ...formData })
    }
    setIsDialogOpen(false)
    setEditingTeam(null)
    setFormData({ name: "", shortName: "" })
  }

  const handleEdit = (team: Team) => {
    setEditingTeam(team)
    setFormData({ name: team.name, shortName: team.shortName || "" })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const hasPlayers = players.some((p) => p.teamId === id)
    const hasGames = games.some((g) => g.homeTeamId === id || g.awayTeamId === id)

    if (hasPlayers || hasGames) {
      alert("Cannot delete team with associated players or games")
      return
    }

    if (confirm("Are you sure you want to delete this team?")) {
      deleteTeam(id)
    }
  }

  const getPlayerCount = (teamId: string) => players.filter((p) => p.teamId === teamId).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Teams</h1>
          <p className="mt-2 text-muted-foreground">Manage all teams in your league</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingTeam(null)
                setFormData({ name: "", shortName: "" })
              }}
            >
              <Plus className="mr-2 size-4" />
              Add Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTeam ? "Edit Team" : "Add New Team"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortName">Short Name (Optional)</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  placeholder="e.g., LAL"
                  maxLength={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingTeam ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl">{team.name}</CardTitle>
                {team.shortName && <div className="text-sm font-medium text-muted-foreground">{team.shortName}</div>}
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(team)}>
                  <Edit className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(team.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {getPlayerCount(team.id)} {getPlayerCount(team.id) === 1 ? "player" : "players"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
