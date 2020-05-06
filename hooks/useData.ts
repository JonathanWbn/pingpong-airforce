import axios from 'axios'
import React from 'react'

import { Game, Player } from '../interfaces'

export default function useData(initialData: { players: Player[]; games: Game[] }) {
  const [players, setPlayers] = React.useState(initialData.players)
  const [games, setGames] = React.useState(initialData.games)

  const fetchData = () =>
    Promise.all([
      axios.get('/api/players').then(({ data }: { data: Player[] }) => setPlayers(data)),
      axios.get('/api/games').then(({ data }: { data: Game[] }) => setGames(data)),
    ])

  return { players, games, refetch: fetchData }
}
