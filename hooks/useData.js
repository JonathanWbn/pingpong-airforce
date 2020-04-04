import axios from 'axios'
import React from 'react'

export default function useData(initialData) {
  const [players, setPlayers] = React.useState(initialData.players)
  const [games, setGames] = React.useState(initialData.games)

  const fetchData = () =>
    Promise.all([
      axios.get('/api/players').then(({ data }) => setPlayers(data)),
      axios.get('/api/games').then(({ data }) => setGames(data)),
    ])

  return { players, games, refetch: fetchData }
}
