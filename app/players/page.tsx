"use client"

import type React from "react"

import { useState } from "react"
import { useLeague } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, User } from "lucide-react"
import type { Player } from "@/lib/types"
import Link from "next/link"

export default function PlayersPage() {
  const { players, teams, addPlayer, updatePlayer, deletePlayer } = useLeague()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)
  const [filterTeam, setFilterTeam] = useState<string>("all")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    teamId: "",
    position: "",
    jerseyNumber: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const playerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      teamId: formData.teamId,
      position: formData.position || undefined,
      jerseyNumber: formData.jerseyNumber ? Number.parseInt(formData.jerseyNumber) : undefined,
    }

    if (editingPlayer) {
      updatePlayer({ ...editingPlayer, ...playerData })
    } else {
      addPlayer({ id: Date.now().toString(), ...playerData })
    }
    setIsDialogOpen(false)
    setEditingPlayer(null)
    setFormData({ firstName: "", lastName: "", teamId: "", position: "", jerseyNumber: "" })
  }

  const handleEdit = (player: Player) => {
    setEditingPlayer(player)
    setFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      teamId: player.teamId,
      position: player.position || "",
      jerseyNumber: player.jerseyNumber?.toString() || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this player?")) {
      deletePlayer(id)
    }
  }

  const getTeamName = (id: string) => teams.find((t) => t.id === id)?.name || "Unknown"

  const filteredPlayers = filterTeam === "all" ? players : players.filter((p) => p.teamId === filterTeam)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Players</h1>
          <p className="mt-2 text-muted-foreground">Manage all players in your league</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPlayer(null)
                setFormData({ firstName: "", lastName: "", teamId: "", position: "", jerseyNumber: "" })
              }}
            >
              <Plus className="mr-2 size-4" />
              Add Player
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPlayer ? "Edit Player" : "Add New Player"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamId">Team</Label>
                <Select value={formData.teamId} onValueChange={(value) => setFormData({ ...formData, teamId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g., PG, SG, SF"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jerseyNumber">Jersey #</Label>
                  <Input
                    id="jerseyNumber"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({ ...formData, jerseyNumber: e.target.value })}
                    placeholder="0-99"
                    min="0"
                    max="99"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingPlayer ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Label htmlFor="filterTeam">Filter by Team:</Label>
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Jersey #</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <Link
                    href={`/players/${player.id}`}
                    className="flex items-center gap-2 font-medium hover:text-primary"
                  >
                    <User className="size-4" />
                    {player.firstName} {player.lastName}
                  </Link>
                </TableCell>
                <TableCell>{getTeamName(player.teamId)}</TableCell>
                <TableCell>{player.position || "-"}</TableCell>
                <TableCell>{player.jerseyNumber || "-"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(player)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(player.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
