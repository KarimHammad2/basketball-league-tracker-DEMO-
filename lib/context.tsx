"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Team, Player, Game, PlayerGameStats } from "./types"
import { storage } from "./storage"
import { seedTeams, seedPlayers, seedGames, seedStats } from "./seed-data"

interface LeagueContextType {
  teams: Team[]
  players: Player[]
  games: Game[]
  stats: PlayerGameStats[]
  addTeam: (team: Team) => void
  updateTeam: (team: Team) => void
  deleteTeam: (id: string) => void
  addPlayer: (player: Player) => void
  updatePlayer: (player: Player) => void
  deletePlayer: (id: string) => void
  addGame: (game: Game) => void
  updateGame: (game: Game) => void
  deleteGame: (id: string) => void
  addStats: (stat: PlayerGameStats) => void
  updateStats: (stat: PlayerGameStats) => void
  deleteStats: (id: string) => void
  getTeamById: (id: string) => Team | undefined
  getPlayerById: (id: string) => Player | undefined
  getGameById: (id: string) => Game | undefined
}

const LeagueContext = createContext<LeagueContextType | undefined>(undefined)

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [stats, setStats] = useState<PlayerGameStats[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage or initialize with seed data
  useEffect(() => {
    const storedTeams = storage.getTeams()
    const storedPlayers = storage.getPlayers()
    const storedGames = storage.getGames()
    const storedStats = storage.getStats()

    if (storedTeams.length === 0) {
      setTeams(seedTeams)
      setPlayers(seedPlayers)
      setGames(seedGames)
      setStats(seedStats)
    } else {
      setTeams(storedTeams)
      setPlayers(storedPlayers)
      setGames(storedGames)
      setStats(storedStats)
    }

    setIsLoaded(true)
  }, [])

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      storage.saveTeams(teams)
    }
  }, [teams, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      storage.savePlayers(players)
    }
  }, [players, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      storage.saveGames(games)
    }
  }, [games, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      storage.saveStats(stats)
    }
  }, [stats, isLoaded])

  const addTeam = (team: Team) => setTeams([...teams, team])
  const updateTeam = (team: Team) => setTeams(teams.map((t) => (t.id === team.id ? team : t)))
  const deleteTeam = (id: string) => setTeams(teams.filter((t) => t.id !== id))

  const addPlayer = (player: Player) => setPlayers([...players, player])
  const updatePlayer = (player: Player) => setPlayers(players.map((p) => (p.id === player.id ? player : p)))
  const deletePlayer = (id: string) => setPlayers(players.filter((p) => p.id !== id))

  const addGame = (game: Game) => setGames([...games, game])
  const updateGame = (game: Game) => setGames(games.map((g) => (g.id === game.id ? game : g)))
  const deleteGame = (id: string) => setGames(games.filter((g) => g.id !== id))

  const addStats = (stat: PlayerGameStats) => setStats([...stats, stat])
  const updateStats = (stat: PlayerGameStats) => setStats(stats.map((s) => (s.id === stat.id ? stat : s)))
  const deleteStats = (id: string) => setStats(stats.filter((s) => s.id !== id))

  const getTeamById = (id: string) => teams.find((t) => t.id === id)
  const getPlayerById = (id: string) => players.find((p) => p.id === id)
  const getGameById = (id: string) => games.find((g) => g.id === id)

  return (
    <LeagueContext.Provider
      value={{
        teams,
        players,
        games,
        stats,
        addTeam,
        updateTeam,
        deleteTeam,
        addPlayer,
        updatePlayer,
        deletePlayer,
        addGame,
        updateGame,
        deleteGame,
        addStats,
        updateStats,
        deleteStats,
        getTeamById,
        getPlayerById,
        getGameById,
      }}
    >
      {children}
    </LeagueContext.Provider>
  )
}

export function useLeague() {
  const context = useContext(LeagueContext)
  if (!context) {
    throw new Error("useLeague must be used within LeagueProvider")
  }
  return context
}
